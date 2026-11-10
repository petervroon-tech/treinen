import { TreinenWasmBridge } from './wasm_bridge.js';

// Global App State
const state = {
  bridge: new TreinenWasmBridge(),
  currentVersion: null,
  latestVersion: null,
  updateAvailable: false,
  selectedTrainId: null,
  simSpeed: 1.0,
  isPaused: false,
  isNightMode: false,
  soundEnabled: true,
  audioCtx: null,
  canvas: null,
  ctx: null,
  lastFrameTime: performance.now()
};

// -------------------------------------------------------------
// 1. Automatische Versiedetectie & Service Worker Lifecycle
// -------------------------------------------------------------
async function initVersionDetection() {
  const versionBadge = document.getElementById('versionBadge');
  const updateBanner = document.getElementById('updateBanner');
  const updateBannerText = document.getElementById('updateBannerText');
  const btnReloadUpdate = document.getElementById('btnReloadUpdate');
  const btnDismissUpdate = document.getElementById('btnDismissUpdate');

  // Haal initiële lokale versie op
  try {
    const res = await fetch('./version.json?_t=' + Date.now(), { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      state.currentVersion = data;
      localStorage.setItem('treinen_active_version', JSON.stringify(data));
      if (versionBadge) {
        versionBadge.textContent = `v${data.version} (${data.commit})`;
        versionBadge.title = `Gebouwd op: ${data.buildTime} | Branch: ${data.branch}`;
      }
      console.log('📦 Huidige applicatieversie:', data.version, data.commit);
    }
  } catch (e) {
    console.warn('Kon lokale version.json niet laden:', e);
  }

  // Functie om te controleren op nieuwere versies op de server
  async function checkForUpdates() {
    try {
      const res = await fetch('./version.json?_t=' + Date.now(), { credentials: 'omit', cache: 'no-store' });
      if (!res.ok) return;
      const remoteData = await res.json();

      if (state.currentVersion && (remoteData.version !== state.currentVersion.version || remoteData.commit !== state.currentVersion.commit)) {
        console.log('🚀 Nieuwe versie gedetecteerd!', remoteData);
        state.latestVersion = remoteData;
        state.updateAvailable = true;

        if (updateBanner && updateBannerText) {
          updateBannerText.innerHTML = `<strong>Nieuwe versie beschikbaar!</strong> Versie <code>v${remoteData.version}</code> (commit <code>${remoteData.commit}</code>) is gepubliceerd.`;
          updateBanner.classList.add('visible');
        }

        if (versionBadge) {
          versionBadge.classList.add('update-ready');
          versionBadge.textContent = `⚠️ Update naar v${remoteData.version}`;
        }
      }
    } catch (err) {
      console.debug('Achtergrond controle versie overgeslagen:', err);
    }
  }

  // Controleer direct bij laden
  checkForUpdates();

  // Controleer elke 30 seconden automatisch
  setInterval(checkForUpdates, 30000);

  // Controleer wanneer het tabblad weer actief wordt
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      checkForUpdates();
    }
  });

  // Knoppen in update banner
  if (btnReloadUpdate) {
    btnReloadUpdate.addEventListener('click', async () => {
      btnReloadUpdate.textContent = 'Bezig met bijwerken...';
      // Vertel eventuele service worker om te updaten
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ action: 'SKIP_WAITING' });
      }
      // Leeg browser caches en herlaad hard
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
      window.location.reload();
    });
  }

  if (btnDismissUpdate) {
    btnDismissUpdate.addEventListener('click', () => {
      updateBanner.classList.remove('visible');
    });
  }

  // Service Worker registreren voor offline PWA & cache updates
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js');
      console.log('🚆 Service Worker geregistreerd met scope:', reg.scope);

      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            checkForUpdates();
          }
        });
      });
    } catch (swErr) {
      console.warn('Service worker registratie overgeslagen:', swErr);
    }
  }
}

// -------------------------------------------------------------
// 2. Web Audio Geluidseffecten
// -------------------------------------------------------------
function getAudioContext() {
  if (!state.audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      state.audioCtx = new AudioContext();
    }
  }
  if (state.audioCtx && state.audioCtx.state === 'suspended') {
    state.audioCtx.resume();
  }
  return state.audioCtx;
}

function playStationChime() {
  if (!state.soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Klassieke Nederlandse stationsgong (drie opeenvolgende tonen: F4 -> A4 -> C5)
  const notes = [349.23, 440.0, 523.25];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.28);

    gain.gain.setValueAtTime(0.001, now + i * 0.28);
    gain.gain.exponentialRampToValueAtTime(0.18, now + i * 0.28 + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.28 + 0.55);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.28);
    osc.stop(now + i * 0.28 + 0.6);
  });
}

function playTrainHorn() {
  if (!state.soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  // Dubbeltonige tyfoon (370Hz en 440Hz)
  osc1.frequency.setValueAtTime(370, now);
  osc2.frequency.setValueAtTime(440, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.25, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.2, now + 0.6);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.95);
  osc2.stop(now + 0.95);
}

// -------------------------------------------------------------
// 3. Canvas Rendering Loop & Visualisatie
// -------------------------------------------------------------
function resizeCanvas() {
  const canvas = state.canvas;
  const rect = canvas.parentElement.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  state.ctx.resetTransform();
  state.ctx.scale(dpr, dpr);
}

function renderScene() {
  const ctx = state.ctx;
  const canvas = state.canvas;
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.width / dpr;
  const height = canvas.height / dpr;

  // Schaal en centreer het netwerk op het canvas
  // Originele coördinatenbox is ca 700x600
  const scale = Math.min(width / 750, height / 640);
  const offsetX = (width - 700 * scale) / 2 + 30 * scale;
  const offsetY = (height - 600 * scale) / 2 + 20 * scale;

  ctx.save();
  ctx.clearRect(0, 0, width, height);

  // Achtergrond / Topografie van Nederland
  if (state.isNightMode) {
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, width, height);
  } else {
    // Mooie zachte landkaart
    ctx.fillStyle = '#eaf0ea'; // Land
    ctx.fillRect(0, 0, width, height);

    // IJsselmeer & Noordzee wateraccenten
    ctx.fillStyle = '#d6e6f2';
    // IJsselmeer
    ctx.beginPath();
    ctx.ellipse(offsetX + 380 * scale, offsetY + 110 * scale, 55 * scale, 75 * scale, -0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Pas netwerkschaal toe
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  // A. Teken Sporen (Bielzen + Spoorstaven)
  state.bridge.tracks.forEach((track, idx) => {
    const p0 = state.bridge.stations[track.from];
    const p3 = state.bridge.stations[track.to];
    const cp1 = track.cp1;
    const cp2 = track.cp2;

    // 1. Spoorbedding (ballast)
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p3.x, p3.y);
    ctx.strokeStyle = state.isNightMode ? '#1e2433' : '#cbd5e1';
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.stroke();

    // 2. Bielzen (dwarsliggers)
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p3.x, p3.y);
    ctx.strokeStyle = state.isNightMode ? '#334155' : '#94a3b8';
    ctx.lineWidth = 7;
    ctx.setLineDash([3, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Dubbel spoor (Rails)
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p3.x, p3.y);
    ctx.strokeStyle = state.isNightMode ? '#475569' : '#475569';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  });

  // B. Teken Wissels (Junctions)
  state.bridge.switches.forEach((sw) => {
    const swState = state.bridge.getSwitchState(sw.id);
    ctx.save();
    ctx.translate(sw.x, sw.y);

    // Wissel indicator cirkel
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, Math.PI * 2);
    ctx.fillStyle = swState === 0 ? '#10b981' : '#f59e0b';
    ctx.shadowColor = swState === 0 ? '#10b981' : '#f59e0b';
    ctx.shadowBlur = state.isNightMode ? 10 : 4;
    ctx.fill();

    // Wissel pijl / stand
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (swState === 0) {
      // Rechtdoor
      ctx.moveTo(-5, 0);
      ctx.lineTo(5, 0);
      ctx.lineTo(2, -3);
    } else {
      // Afbuigend
      ctx.moveTo(-5, 3);
      ctx.lineTo(4, -4);
      ctx.lineTo(0, -5);
    }
    ctx.stroke();
    ctx.restore();
  });

  // C. Teken Seinen
  state.bridge.tracks.forEach((track, i) => {
    if (i % 2 === 0) {
      const sigState = state.bridge.getSignalState(i);
      const pos = state.bridge.getPointOnTrack(i, 0.45);
      const colors = ['#ef4444', '#f59e0b', '#10b981']; // Rood, Geel, Groen
      const sigColor = colors[sigState] || '#10b981';

      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate(pos.angle + Math.PI / 2);

      // Seinpaal
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(8, -6, 5, 12);

      // Seinlamp
      ctx.beginPath();
      ctx.arc(10.5, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = sigColor;
      ctx.shadowColor = sigColor;
      ctx.shadowBlur = state.isNightMode ? 12 : 5;
      ctx.fill();
      ctx.restore();
    }
  });

  // D. Teken Treinen
  const trainCount = state.bridge.getTrainCount();
  for (let i = 0; i < trainCount; i++) {
    const train = state.bridge.getTrain(i);
    if (!train) continue;

    ctx.save();
    ctx.translate(train.x, train.y);
    ctx.rotate(train.angle);

    const isSelected = state.selectedTrainId === train.id;

    // Selectie-glow
    if (isSelected) {
      ctx.beginPath();
      ctx.roundRect(-24, -14, 48, 28, 6);
      ctx.strokeStyle = '#00a8ff';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00a8ff';
      ctx.shadowBlur = 12;
      ctx.stroke();
    }

    // Treinschaduw
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.roundRect(-20, -7, 40, 16, 4);
    ctx.fill();

    // Treinlichaam (Locomotief / Rijtuig)
    ctx.fillStyle = train.typeColor;
    ctx.beginPath();
    ctx.roundRect(-20, -9, 40, 18, 5);
    ctx.fill();

    // NS Blauwe of type accentband
    ctx.fillStyle = train.typeAccent;
    ctx.fillRect(-12, -7, 24, 14);

    // Ramen
    ctx.fillStyle = state.isNightMode ? '#ffea85' : '#1e293b';
    ctx.fillRect(-8, -5, 6, 4);
    ctx.fillRect(2, -5, 6, 4);
    ctx.fillRect(-8, 1, 6, 4);
    ctx.fillRect(2, 1, 6, 4);

    // Koplampen (voorkant)
    ctx.fillStyle = '#fffbeb';
    ctx.shadowColor = '#fffbeb';
    ctx.shadowBlur = state.isNightMode ? 14 : 6;
    ctx.beginPath();
    ctx.arc(19, -4, 2.5, 0, Math.PI * 2);
    ctx.arc(19, 4, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Sluitlichten / achterkant
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.arc(-19, -4, 1.8, 0, Math.PI * 2);
    ctx.arc(-19, 4, 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Treinlabel (Snelheid & ID)
    ctx.restore();
    ctx.save();
    ctx.translate(train.x, train.y);

    ctx.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'center';
    ctx.fillStyle = state.isNightMode ? '#e2e8f0' : '#0f172a';
    ctx.fillText(`${train.id} (${Math.round(train.speed)} km/u)`, 0, -14);

    ctx.restore();
  }

  // E. Teken Stations
  state.bridge.stations.forEach((st) => {
    ctx.save();
    ctx.translate(st.x, st.y);

    // Station halo
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fillStyle = state.isNightMode ? 'rgba(0, 48, 130, 0.4)' : 'rgba(255, 201, 23, 0.3)';
    ctx.fill();

    // Station kern
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#003082'; // NS Blauw
    ctx.strokeStyle = '#ffc917'; // NS Geel
    ctx.lineWidth = 2.5;
    ctx.fill();
    ctx.stroke();

    // Station Naamplaat
    ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'center';
    ctx.fillStyle = state.isNightMode ? '#f8fafc' : '#020617';
    ctx.fillText(st.name, 0, 24);

    ctx.font = '400 9px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.fillStyle = state.isNightMode ? '#94a3b8' : '#64748b';
    ctx.fillText(`Spoor 1-${st.sporen}`, 0, 35);

    ctx.restore();
  });

  ctx.restore();
}

// -------------------------------------------------------------
// 4. Simulatie Loop (60 FPS)
// -------------------------------------------------------------
function simulationLoop(now) {
  const dt = Math.min((now - state.lastFrameTime) / 1000, 0.1);
  state.lastFrameTime = now;

  if (!state.isPaused && state.bridge.isLoaded) {
    const effectiveDt = dt * state.simSpeed;
    state.bridge.step(effectiveDt);
  }

  renderScene();
  updateLiveInfo();

  requestAnimationFrame(simulationLoop);
}

// -------------------------------------------------------------
// 5. UI Updates & Vertrekstaten
// -------------------------------------------------------------
function updateLiveInfo() {
  const simClockEl = document.getElementById('simClock');
  const activeTrainsCountEl = document.getElementById('activeTrainsCount');

  if (simClockEl && state.bridge.isLoaded) {
    const totalSec = Math.floor(state.bridge.getSimTime()) + 8 * 3600 + 15 * 60; // Start om 08:15
    const hrs = String(Math.floor((totalSec / 3600) % 24)).padStart(2, '0');
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    simClockEl.textContent = `${hrs}:${mins}:${secs}`;
  }

  if (activeTrainsCountEl && state.bridge.isLoaded) {
    activeTrainsCountEl.textContent = state.bridge.getTrainCount();
  }

  // Update geselecteerde trein paneel
  if (state.selectedTrainId !== null && state.bridge.isLoaded) {
    const count = state.bridge.getTrainCount();
    let selectedTrain = null;
    for (let i = 0; i < count; i++) {
      const t = state.bridge.getTrain(i);
      if (t && t.id === state.selectedTrainId) {
        selectedTrain = t;
        break;
      }
    }
    updateInspectorDrawer(selectedTrain);
  }

  // Update Vertrektijdenbord
  renderDepartureBoard();
}

function updateInspectorDrawer(train) {
  const drawer = document.getElementById('trainInspector');
  if (!drawer) return;

  if (!train) {
    drawer.classList.remove('open');
    return;
  }

  drawer.classList.add('open');
  document.getElementById('inspTrainId').textContent = `${train.typeName} #${train.id}`;
  document.getElementById('inspSpeed').textContent = `${Math.round(train.speed)} km/u`;
  document.getElementById('inspTargetSpeed').textContent = `${Math.round(train.targetSpeed)} km/u`;
  document.getElementById('inspStatus').textContent = train.stateName;
  document.getElementById('inspRoute').textContent = `${train.curStationName} ➔ ${train.nextStationName}`;
  document.getElementById('inspPassengers').textContent = train.passengers;
  document.getElementById('inspDelay').textContent = train.delay > 0 ? `+${train.delay}s` : 'Op tijd';

  const btnBrake = document.getElementById('btnEmergencyBrake');
  if (btnBrake) {
    btnBrake.textContent = train.state === 3 ? '🚨 Noodrem Opheffen' : '⚠️ Noodrem Activeren';
    btnBrake.className = train.state === 3 ? 'btn btn-success' : 'btn btn-danger';
  }
}

let lastBoardUpdate = 0;
function renderDepartureBoard() {
  const now = performance.now();
  if (now - lastBoardUpdate < 1000) return; // Max 1x per seconde
  lastBoardUpdate = now;

  const boardBody = document.getElementById('departureTableBody');
  if (!boardBody || !state.bridge.isLoaded) return;

  const count = state.bridge.getTrainCount();
  let rowsHtml = '';
  for (let i = 0; i < count; i++) {
    const t = state.bridge.getTrain(i);
    if (!t) continue;

    const delayBadge = t.delay > 0 ? `<span class="badge badge-warning">+${Math.round(t.delay / 60)} min</span>` : '<span class="badge badge-success">Op tijd</span>';
    const spoor = (t.trackId % 8) + 1;

    rowsHtml += `
      <tr class="${state.selectedTrainId === t.id ? 'selected-row' : ''}" onclick="window.selectTrainById(${t.id})">
        <td><strong>${t.id}</strong></td>
        <td><span class="train-pill" style="border-left-color: ${t.typeColor}">${t.typeName}</span></td>
        <td>${t.nextStationName}</td>
        <td><strong>Spoor ${spoor}</strong></td>
        <td>${Math.round(t.speed)} km/u</td>
        <td>${delayBadge}</td>
      </tr>
    `;
  }
  boardBody.innerHTML = rowsHtml;
}

// -------------------------------------------------------------
// 6. Event Listeners & Interactie
// -------------------------------------------------------------
function setupInteraction() {
  const canvas = state.canvas;

  // Klik op Canvas om trein of wissel te selecteren
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    const scale = Math.min(width / 750, height / 640);
    const offsetX = (width - 700 * scale) / 2 + 30 * scale;
    const offsetY = (height - 600 * scale) / 2 + 20 * scale;

    const netX = (clickX - offsetX) / scale;
    const netY = (clickY - offsetY) / scale;

    // A. Controleer of een wissel is aangeklikt
    let switchClicked = false;
    state.bridge.switches.forEach((sw) => {
      const dist = Math.hypot(sw.x - netX, sw.y - netY);
      if (dist < 18) {
        state.bridge.toggleSwitch(sw.id);
        playStationChime();
        switchClicked = true;
      }
    });

    if (switchClicked) return;

    // B. Controleer of een trein is aangeklikt
    let trainFound = false;
    const count = state.bridge.getTrainCount();
    for (let i = 0; i < count; i++) {
      const t = state.bridge.getTrain(i);
      if (t) {
        const dist = Math.hypot(t.x - netX, t.y - netY);
        if (dist < 22) {
          state.selectedTrainId = t.id;
          trainFound = true;
          playStationChime();
          break;
        }
      }
    }

    if (!trainFound) {
      state.selectedTrainId = null;
      updateInspectorDrawer(null);
    }
  });

  // Global helper voor onclick in tabel
  window.selectTrainById = (id) => {
    state.selectedTrainId = id;
    playStationChime();
  };

  // Bedieningsknoppen
  document.getElementById('btnPause')?.addEventListener('click', () => {
    state.isPaused = !state.isPaused;
    document.getElementById('btnPause').textContent = state.isPaused ? '▶️ Hervatten' : '⏸️ Pauze';
  });

  document.getElementById('btnSpeed1')?.addEventListener('click', () => setSimSpeed(1.0));
  document.getElementById('btnSpeed2')?.addEventListener('click', () => setSimSpeed(2.0));
  document.getElementById('btnSpeed5')?.addEventListener('click', () => setSimSpeed(5.0));

  function setSimSpeed(s) {
    state.simSpeed = s;
    ['btnSpeed1', 'btnSpeed2', 'btnSpeed5'].forEach(id => document.getElementById(id)?.classList.remove('active'));
    if (s === 1.0) document.getElementById('btnSpeed1')?.classList.add('active');
    if (s === 2.0) document.getElementById('btnSpeed2')?.classList.add('active');
    if (s === 5.0) document.getElementById('btnSpeed5')?.classList.add('active');
  }

  document.getElementById('btnNightMode')?.addEventListener('click', () => {
    state.isNightMode = !state.isNightMode;
    document.body.classList.toggle('night-mode', state.isNightMode);
  });

  document.getElementById('btnSound')?.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    const btn = document.getElementById('btnSound');
    btn.textContent = state.soundEnabled ? '🔊 Geluid: Aan' : '🔇 Geluid: Uit';
    if (state.soundEnabled) playStationChime();
  });

  document.getElementById('btnHorn')?.addEventListener('click', () => {
    playTrainHorn();
  });

  document.getElementById('btnEmergencyBrake')?.addEventListener('click', () => {
    if (state.selectedTrainId === null) return;
    const count = state.bridge.getTrainCount();
    for (let i = 0; i < count; i++) {
      const t = state.bridge.getTrain(i);
      if (t && t.id === state.selectedTrainId) {
        const newBrake = t.state === 3 ? 0 : 1;
        state.bridge.setEmergencyBrake(t.id, newBrake);
        playTrainHorn();
        break;
      }
    }
  });

  // Trein toevoegen knoppen
  document.getElementById('btnAddVIRM')?.addEventListener('click', () => {
    state.bridge.addTrain(0, Math.floor(Math.random() * 8));
    playStationChime();
  });

  document.getElementById('btnAddSprinter')?.addEventListener('click', () => {
    state.bridge.addTrain(1, Math.floor(Math.random() * 8));
    playStationChime();
  });

  document.getElementById('btnAddEurostar')?.addEventListener('click', () => {
    state.bridge.addTrain(3, 1);
    playStationChime();
  });

  document.getElementById('btnAddCargo')?.addEventListener('click', () => {
    state.bridge.addTrain(2, 6);
    playStationChime();
  });

  window.addEventListener('resize', resizeCanvas);
}

// -------------------------------------------------------------
// 7. Initialisatie van de Applicatie
// -------------------------------------------------------------
async function initApp() {
  state.canvas = document.getElementById('railwayCanvas');
  state.ctx = state.canvas.getContext('2d');
  resizeCanvas();

  // 1. Initialiseer automatische versiedetectie
  initVersionDetection();

  // 2. Koppel event listeners
  setupInteraction();

  // 3. Laad WebAssembly simulatie module
  try {
    await state.bridge.loadWasm('./treinen.wasm');
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) loadingOverlay.style.display = 'none';

    // Start 60 FPS loop
    requestAnimationFrame(simulationLoop);
  } catch (err) {
    console.error('Fatale fout bij initialiseren:', err);
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
      loadingOverlay.innerHTML = `
        <div style="background: #ef4444; color: white; padding: 20px; border-radius: 8px; max-width: 400px; text-align: center;">
          <h3>Fout bij laden van WebAssembly</h3>
          <p>${err.message}</p>
          <button class="btn btn-primary" onclick="location.reload()">Opnieuw proberen</button>
        </div>
      `;
    }
  }
}

window.addEventListener('DOMContentLoaded', initApp);

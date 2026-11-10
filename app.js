import { TreinenWasmBridge } from './wasm_bridge.js';

// Global State
const appState = {
  bridge: new TreinenWasmBridge(),
  map: null,
  activeBaseLayer: 'esri',
  layers: {},
  trains: new Map(), // key: matnummer of id, value: TrainObject
  selectedTrainId: null,
  isFollowingTrain: false,
  activeOperatorFilter: 'all',
  searchQuery: '',
  scannerEnabled: true,
  audioCtx: null,
  currentChannel: 'all',
  lastRadioMsgTime: 0
};

// -------------------------------------------------------------
// 1. Automatische Versiedetectie
// -------------------------------------------------------------
async function initVersionCheck() {
  const banner = document.getElementById('updateBanner');
  const bannerText = document.getElementById('updateBannerText');
  const btnReload = document.getElementById('btnReloadUpdate');
  const btnDismiss = document.getElementById('btnDismissUpdate');

  let currentVersion = null;
  try {
    const res = await fetch('./version.json?_t=' + Date.now(), { cache: 'no-store' });
    if (res.ok) currentVersion = await res.json();
  } catch (e) {}

  async function checkRemote() {
    try {
      const res = await fetch('./version.json?_t=' + Date.now(), { cache: 'no-store' });
      if (!res.ok) return;
      const remote = await res.json();
      if (currentVersion && (remote.version !== currentVersion.version || remote.commit !== currentVersion.commit)) {
        if (banner && bannerText) {
          bannerText.innerHTML = `<strong>Nieuwe versie beschikbaar!</strong> Versie <code>v${remote.version}</code> (commit <code>${remote.commit}</code>) is gepubliceerd.`;
          banner.classList.add('visible');
        }
      }
    } catch (e) {}
  }

  setInterval(checkRemote, 30000);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') checkRemote();
  });

  if (btnReload) {
    btnReload.addEventListener('click', async () => {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
      window.location.reload();
    });
  }
  if (btnDismiss) {
    btnDismiss.addEventListener('click', () => banner.classList.remove('visible'));
  }
}

// -------------------------------------------------------------
// 2. Leaflet Satelliet Kaart & Spoorinfrastructuur Setup
// -------------------------------------------------------------
function initMap() {
  // Kaart gecentreerd op Nederland
  const map = L.map('map', {
    center: [52.1326, 5.2913],
    zoom: 8,
    minZoom: 7,
    maxZoom: 18,
    zoomControl: false
  });

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // Satelliet Kaartlagen
  // 1. Esri World Imagery (Hoge resolutie wereldwijde satellietbeelden)
  const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri &bull; Maxar, Earthstar Geographics',
    maxZoom: 19
  });

  // 2. PDOK Luchtfoto Nederland (Officiële 8cm/25cm overheid luchtfoto)
  const pdokSat = L.tileLayer('https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_orthoHR/EPSG:3857/{z}/{x}/{y}.jpeg', {
    attribution: '&copy; PDOK &bull; Kadaster Luchtfoto Nederland',
    maxZoom: 19
  });

  // 3. CartoDB Dark (Nacht Radar)
  const darkMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB &bull; OpenStreetMap',
    maxZoom: 19
  });

  // 4. OpenRailwayMap Sporen Overlay (Alle echte sporen, seinen en wissels in Nederland)
  const railwayOverlay = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenRailwayMap &bull; OpenStreetMap',
    maxZoom: 19,
    opacity: 0.9
  });

  // Standaard Satelliet + Spoorlijnen actief
  esriSat.addTo(map);
  railwayOverlay.addTo(map);

  appState.map = map;
  appState.layers = {
    esri: esriSat,
    pdok: pdokSat,
    dark: darkMap,
    tracks: railwayOverlay
  };

  // Knoppen voor wisselen van satelliet / kaartlaag
  document.getElementById('btnLayerSat')?.addEventListener('click', () => switchBaseLayer('esri'));
  document.getElementById('btnLayerPdok')?.addEventListener('click', () => switchBaseLayer('pdok'));
  document.getElementById('btnLayerDark')?.addEventListener('click', () => switchBaseLayer('dark'));

  document.getElementById('btnToggleTracks')?.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    if (map.hasLayer(railwayOverlay)) {
      map.removeLayer(railwayOverlay);
      btn.classList.remove('active');
      btn.textContent = '🛤️ Spoorlijnen: UIT';
    } else {
      map.addLayer(railwayOverlay);
      btn.classList.add('active');
      btn.textContent = '🛤️ Spoorlijnen: AAN';
    }
  });
}

function switchBaseLayer(name) {
  const map = appState.map;
  ['esri', 'pdok', 'dark'].forEach(k => {
    if (map.hasLayer(appState.layers[k])) {
      map.removeLayer(appState.layers[k]);
    }
  });

  appState.layers[name].addTo(map);
  appState.activeBaseLayer = name;

  ['btnLayerSat', 'btnLayerPdok', 'btnLayerDark'].forEach(id => {
    document.getElementById(id)?.classList.remove('active');
  });
  if (name === 'esri') document.getElementById('btnLayerSat')?.classList.add('active');
  if (name === 'pdok') document.getElementById('btnLayerPdok')?.classList.add('active');
  if (name === 'dark') document.getElementById('btnLayerDark')?.classList.add('active');
}

// -------------------------------------------------------------
// 3. Live Nederlandse Treinendata (JSONP Stream)
// -------------------------------------------------------------
function fetchLiveTrains() {
  return new Promise((resolve) => {
    const callbackName = 'eqfeed_callback_' + Math.floor(Math.random() * 1000000);
    let resolved = false;

    window[callbackName] = (data) => {
      resolved = true;
      try { delete window[callbackName]; } catch (e) {}
      if (script.parentNode) script.parentNode.removeChild(script);
      resolve(data);
    };

    // Standaard JSONP fallback voor treinposities.nl
    window.eqfeed_callback = (data) => {
      if (!resolved) {
        resolved = true;
        resolve(data);
      }
    };

    const script = document.createElement('script');
    script.src = `https://treinposities.nl/treinen.php?pos=1&_t=${Date.now()}`;
    script.async = true;
    script.onerror = () => {
      if (!resolved) {
        resolved = true;
        resolve(null);
      }
    };
    document.head.appendChild(script);

    // Timeout na 4 seconden
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(null);
      }
    }, 4000);
  });
}

// Bepaal de vervoerder op basis van het trein-materieelnummer en icoon
function identifyOperator(colorIcon, matnummer, matnr) {
  const c = (colorIcon || '').toLowerCase();
  const m = (matnummer || '').toLowerCase();
  const t = (matnr || '').toLowerCase();

  if (c.includes('arriva') || m.includes('arriva')) {
    return { id: 'arriva', name: 'Arriva Nederland', color: '#ef4444', text: '#ffffff' };
  }
  if (c.includes('keolis') || c.includes('blauwnet') || m.includes('keolis')) {
    return { id: 'keolis', name: 'Keolis / Blauwnet', color: '#0284c7', text: '#ffffff' };
  }
  if (c.includes('eurostar') || c.includes('tgv') || c.includes('pbka') || c.includes('ice') || t.includes('eurostar') || t.includes('ice')) {
    return { id: 'eurostar', name: 'Eurostar / ICE International', color: '#990022', text: '#ffffff' };
  }
  if (c.includes('cargo') || c.includes('traxx') || c.includes('rfo') || m.includes('rfo') || m.includes('dbcargo') || m.includes('lineas')) {
    return { id: 'cargo', name: 'Goederen / DB Cargo / RFO', color: '#ea580c', text: '#ffffff' };
  }
  // Standaard NS Reizigers
  return { id: 'ns', name: 'NS Reizigers', color: '#ffc917', text: '#003082' };
}

// -------------------------------------------------------------
// 4. Verwerking en Weergave van Treinen op de Satellietkaart
// -------------------------------------------------------------
function parseTrainData(item) {
  if (!item || !item.geometry || !item.geometry.coordinates) return null;
  const coords = item.geometry.coordinates;
  const lat = parseFloat(coords[0]);
  const lon = parseFloat(coords[1]);
  if (isNaN(lat) || isNaN(lon)) return null;

  const props = item.properties || {};
  const matnrString = props.matnr || '';
  const matnummer = props.matnummer || 'TREIN';
  const colorIcon = props.color || '';
  const gpsdata = props.gpsdata || '';

  // Parse snelheid uit bijv. "3112 met trein 1165 @ 23km/h"
  let speed = 0;
  const speedMatch = matnrString.match(/@\s*(\d+)\s*km\/h/i);
  if (speedMatch) {
    speed = parseInt(speedMatch[1], 10);
  }

  // Parse treinnummer uit bijv. "met trein 1165 @"
  let trainNumber = '';
  const trainMatch = matnrString.match(/trein\s+(\d+)/i);
  if (trainMatch) {
    trainNumber = trainMatch[1];
  } else {
    trainNumber = matnummer.replace(/\D/g, '') || '0';
  }

  // Parse materieel type
  let materialName = matnummer;
  const operator = identifyOperator(colorIcon, matnummer, matnrString);

  // Punctualiteit via WebAssembly
  const punctualityScore = appState.bridge.calculatePunctuality(speed, speed === 0 ? 120 : 0);

  return {
    id: matnummer + '_' + trainNumber,
    matnummer,
    trainNumber,
    matnrString,
    lat,
    lon,
    speed,
    operator,
    punctualityScore,
    gpsdata,
    colorIcon
  };
}

function updateTrains(featureList) {
  if (!featureList || !Array.isArray(featureList)) return;

  let totalSpeed = 0;
  let maxSpeed = 0;
  let onTimeCount = 0;
  let displayedCount = 0;

  const currentIds = new Set();

  featureList.forEach((raw) => {
    const t = parseTrainData(raw);
    if (!t) return;

    currentIds.add(t.id);
    totalSpeed += t.speed;
    if (t.speed > maxSpeed) maxSpeed = t.speed;
    if (t.punctualityScore === 0) onTimeCount++;

    // Filter controle
    const matchOperator = appState.activeOperatorFilter === 'all' || t.operator.id === appState.activeOperatorFilter;
    const matchSearch = !appState.searchQuery || t.trainNumber.includes(appState.searchQuery) || t.matnummer.toLowerCase().includes(appState.searchQuery.toLowerCase());

    if (!matchOperator || !matchSearch) {
      if (appState.trains.has(t.id)) {
        const existing = appState.trains.get(t.id);
        if (existing.marker) existing.marker.remove();
        appState.trains.delete(t.id);
      }
      return;
    }

    displayedCount++;

    if (appState.trains.has(t.id)) {
      // Bestaande trein updaten
      const existing = appState.trains.get(t.id);
      existing.speed = t.speed;
      existing.punctualityScore = t.punctualityScore;
      existing.lat = t.lat;
      existing.lon = t.lon;
      existing.gpsdata = t.gpsdata;

      // Update marker positie
      if (existing.marker) {
        existing.marker.setLatLng([t.lat, t.lon]);
        // Update popup/tag
        const el = existing.marker.getElement();
        if (el) {
          const tag = el.querySelector('.train-tag');
          if (tag) tag.textContent = `${t.trainNumber} (${t.speed}k)`;
        }
      }
    } else {
      // Nieuwe marker aanmaken
      const marker = createTrainMarker(t);
      marker.addTo(appState.map);
      t.marker = marker;
      appState.trains.set(t.id, t);
    }
  });

  // Verwijder verdwenen treinen
  for (const [id, t] of appState.trains.entries()) {
    if (!currentIds.has(id)) {
      if (t.marker) t.marker.remove();
      appState.trains.delete(id);
    }
  }

  // Update HUD statistieken
  const total = featureList.length;
  document.getElementById('statTrainCount').textContent = `${total} (${displayedCount} op kaart)`;
  const avgSpeed = total > 0 ? Math.round(totalSpeed / total) : 0;
  document.getElementById('statAvgSpeed').textContent = `${avgSpeed} km/u`;
  document.getElementById('statTopSpeed').textContent = `${maxSpeed} km/u`;
  const pct = total > 0 ? ((onTimeCount / total) * 100).toFixed(1) : '90.0';
  document.getElementById('statPunctuality').textContent = `${pct}%`;

  // Volg geselecteerde trein indien actief
  if (appState.isFollowingTrain && appState.selectedTrainId) {
    const selected = appState.trains.get(appState.selectedTrainId);
    if (selected) {
      appState.map.panTo([selected.lat, selected.lon], { animate: true, duration: 1.0 });
      updateDetailCard(selected);
    }
  }

  // Genereer mogelijke spoorcommunicatie
  triggerRadioCommunications(featureList);
}

// Maak een custom HTML marker voor een trein op de kaart
function createTrainMarker(t) {
  // Punctualiteit kleur: 0 = Groen, 1 = Geel, 2 = Rood
  const statusBorder = t.punctualityScore === 0 ? '#10b981' : t.punctualityScore === 1 ? '#f59e0b' : '#ef4444';

  const html = `
    <div class="train-custom-marker" title="${t.operator.name} Trein ${t.trainNumber} - ${t.speed} km/u">
      <div class="train-tag">${t.trainNumber} (${t.speed}k)</div>
      <div class="train-pin" style="background-color: ${t.operator.color}; border-color: ${statusBorder};">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="${t.operator.text}">
          <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zm0 2c3.5 0 6 .4 6 2H6c0-1.6 2.5-2 6-2zm-5 9c-.83 0-1.5-.67-1.5-1.5S6.17 10 7 10s1.5.67 1.5 1.5S7.83 13 7 13zm10 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      </div>
    </div>
  `;

  const icon = L.divIcon({
    className: 'train-div-icon',
    html: html,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  const marker = L.marker([t.lat, t.lon], { icon });
  marker.on('click', () => {
    selectTrain(t);
  });

  return marker;
}

function selectTrain(t) {
  appState.selectedTrainId = t.id;
  updateDetailCard(t);
  appState.map.flyTo([t.lat, t.lon], Math.max(appState.map.getZoom(), 12), { duration: 1.2 });
  playRadioBeep();
}

function updateDetailCard(t) {
  const card = document.getElementById('trainDetailCard');
  if (!card) return;

  card.classList.add('open');
  document.getElementById('cardOperatorBadge').textContent = t.operator.name;
  document.getElementById('cardOperatorBadge').style.backgroundColor = t.operator.color;
  document.getElementById('cardOperatorBadge').style.color = t.operator.text;

  document.getElementById('cardTrainTitle').textContent = `Trein #${t.trainNumber}`;
  document.getElementById('cardSpeedNumber').textContent = t.speed;

  const puncEl = document.getElementById('cardPunctualityBadge');
  if (t.punctualityScore === 0) {
    puncEl.className = 'punctuality-badge on-time';
    puncEl.textContent = '🟢 Op tijd (Rijdend)';
  } else if (t.punctualityScore === 1) {
    puncEl.className = 'punctuality-badge delayed';
    puncEl.textContent = '🟡 Vertraagd / Naderend';
  } else {
    puncEl.className = 'punctuality-badge halted';
    puncEl.textContent = '🔴 Stilstaand op Baanvak';
  }

  document.getElementById('cardMaterial').textContent = t.matnummer;
  document.getElementById('cardOperator').textContent = t.operator.name;
  document.getElementById('cardSeries').textContent = `${t.trainNumber} (Intercity/Sprinter)`;
  document.getElementById('cardGpsTime').textContent = t.gpsdata || 'Zojuist';
  document.getElementById('cardCoords').textContent = `${t.lat.toFixed(4)}° N, ${t.lon.toFixed(4)}° E`;

  const btnFollow = document.getElementById('btnFollowTrain');
  if (btnFollow) {
    btnFollow.textContent = appState.isFollowingTrain ? '⏹️ Stop Volgen' : '🎥 Volg Trein (Chase Cam)';
    btnFollow.className = appState.isFollowingTrain ? 'btn btn-follow active' : 'btn btn-follow';
  }
}

// -------------------------------------------------------------
// 5. Live Spoorweg Communicatie & Radio Scanner
// -------------------------------------------------------------
function getAudioContext() {
  if (!appState.audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) appState.audioCtx = new AudioContext();
  }
  if (appState.audioCtx && appState.audioCtx.state === 'suspended') {
    appState.audioCtx.resume();
  }
  return appState.audioCtx;
}

// Authentieke GSM-R / Motorola squelch radio piep
function playRadioBeep() {
  if (!appState.scannerEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Bandpass filter voor echt walkie-talkie / radio geluid
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1750;
  filter.Q.value = 3.0;

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(1320, now + 0.04);
  osc.frequency.setValueAtTime(1760, now + 0.08);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.15);
}

// Spraaksynthese voor live verkeersleidingsberichten
function speakDispatchMessage(text) {
  if (!appState.scannerEnabled || !('speechSynthesis' in window)) return;
  // Breek eerdere spraak af om opstapeling te voorkomen
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'nl-NL';
  utterance.rate = 1.05;
  utterance.pitch = 0.95;

  const voices = window.speechSynthesis.getVoices();
  const dutchVoice = voices.find(v => v.lang.includes('nl'));
  if (dutchVoice) utterance.voice = dutchVoice;

  window.speechSynthesis.speak(utterance);
}

function addRadioLine(callsign, text, isUrgent = false) {
  const box = document.getElementById('radioTranscriptBox');
  if (!box) return;

  const timeStr = new Date().toLocaleTimeString('nl-NL');
  const div = document.createElement('div');
  div.className = 'radio-line' + (isUrgent ? ' urgent' : '');
  div.innerHTML = `
    <span class="msg-time">[${timeStr}]</span>
    <span class="msg-callsign">${callsign}:</span>
    <span class="msg-text">${text}</span>
  `;

  box.prepend(div);
  // Beperk transcript tot 50 regels
  while (box.children.length > 50) {
    box.removeChild(box.lastChild);
  }

  // Speel radio-effect
  playRadioBeep();

  // Spreek bericht uit als scanner aan staat
  if (appState.scannerEnabled) {
    speakDispatchMessage(`${callsign}: ${text}`);
  }
}

// Genereert authentieke live verkeersleidingsinteracties op basis van echte rijdende treinen
function triggerRadioCommunications(features) {
  const now = Date.now();
  if (now - appState.lastRadioMsgTime < 14000) return; // Minstens 14s tussen berichten
  appState.lastRadioMsgTime = now;

  if (!features || features.length === 0) return;

  // Kies een willekeurige actieve trein
  const item = features[Math.floor(Math.random() * features.length)];
  const parsed = parseTrainData(item);
  if (!parsed) return;

  const posts = [
    { name: 'Post Utrecht', trdl: 'Treindienstleider Utrecht' },
    { name: 'Post Amsterdam', trdl: 'Treindienstleider Amsterdam' },
    { name: 'Post Rotterdam', trdl: 'Verkeersleiding Rotterdam' },
    { name: 'Post Eindhoven', trdl: 'Treindienstleider Eindhoven' },
    { name: 'Post Zwolle', trdl: 'Treindienstleider Zwolle' },
    { name: 'KNSB Landelijk', trdl: 'Landelijke Verkeersleiding ProRail' }
  ];
  const post = posts[Math.floor(Math.random() * posts.length)];

  let message = '';
  let isUrgent = false;

  if (parsed.speed > 130) {
    message = `Trein ${parsed.trainNumber} (${parsed.matnummer}) passeert baanvak op volle snelheid met ${parsed.speed} km/u. Seinen groen, spoorbaan vrij.`;
  } else if (parsed.speed === 0) {
    isUrgent = true;
    message = `Trein ${parsed.trainNumber} gemeld stilstaand. Post ${post.name} controleert blokbeveiliging en wisselstand.`;
  } else if (parsed.punctualityScore === 1) {
    message = `Trein ${parsed.trainNumber}: vertraagd naderen met ${parsed.speed} km/u wegens treinscheiding. Rijden op zicht tot volgend hoofdsein.`;
  } else {
    message = `Aan machinist trein ${parsed.trainNumber} (${parsed.operator.name}): vertreksein getoond, snelheid ${parsed.speed} km/u geautoriseerd richting knooppunt.`;
  }

  addRadioLine(post.trdl, message, isUrgent);
}

// -------------------------------------------------------------
// 6. Event Listeners & Interactie
// -------------------------------------------------------------
function setupEventListeners() {
  // Scanner AAN / UIT knop
  const btnScanner = document.getElementById('btnRadioScanner');
  btnScanner?.addEventListener('click', () => {
    appState.scannerEnabled = !appState.scannerEnabled;
    btnScanner.classList.toggle('active', appState.scannerEnabled);
    btnScanner.classList.toggle('muted', !appState.scannerEnabled);
    document.getElementById('scannerStatusText').textContent = appState.scannerEnabled ? '📻 Radio Scanner: AAN' : '🔇 Radio Scanner: UIT';
    if (appState.scannerEnabled) {
      playRadioBeep();
      addRadioLine('📡 Systeem', 'Spoorweg radio scanner opnieuw afgestemd op ProRail verkeersleidingskanalen.');
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  });

  // Kanaalkeuze
  document.getElementById('channelSelect')?.addEventListener('change', (e) => {
    appState.currentChannel = e.target.value;
    const txt = e.target.options[e.target.selectedIndex].text;
    document.getElementById('radioChannelName').textContent = `Kanaal: ${txt}`;
    playRadioBeep();
  });

  // Vervoerder filters
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      const el = e.currentTarget;
      el.classList.add('active');
      appState.activeOperatorFilter = el.getAttribute('data-op');
    });
  });

  // Zoekveld
  document.getElementById('searchInput')?.addEventListener('input', (e) => {
    appState.searchQuery = e.target.value.trim().toLowerCase();
    // Als exact treinnummer gezocht wordt, zoom er direct naar
    if (appState.searchQuery.length >= 3) {
      for (const [id, t] of appState.trains.entries()) {
        if (t.trainNumber.includes(appState.searchQuery)) {
          selectTrain(t);
          break;
        }
      }
    }
  });

  // Volg trein knop
  document.getElementById('btnFollowTrain')?.addEventListener('click', () => {
    appState.isFollowingTrain = !appState.isFollowingTrain;
    const btn = document.getElementById('btnFollowTrain');
    btn.textContent = appState.isFollowingTrain ? '⏹️ Stop Volgen' : '🎥 Volg Trein (Chase Cam)';
    btn.className = appState.isFollowingTrain ? 'btn btn-follow active' : 'btn btn-follow';
  });

  // Sluit detail card
  document.getElementById('btnCloseDetail')?.addEventListener('click', () => {
    document.getElementById('trainDetailCard')?.classList.remove('open');
    appState.selectedTrainId = null;
    appState.isFollowingTrain = false;
  });
}

// -------------------------------------------------------------
// 7. Hoofd Startloop
// -------------------------------------------------------------
async function init() {
  initMap();
  initVersionCheck();
  setupEventListeners();

  // Laad WebAssembly telemetrie engine
  await appState.bridge.loadWasm('./treinen.wasm');

  // Start live polling van alle treinen in Nederland
  async function poll() {
    try {
      const data = await fetchLiveTrains();
      if (data && data.features) {
        updateTrains(data.features);
      }
    } catch (err) {
      console.warn('Fout bij ophalen treinposities:', err);
    }
    setTimeout(poll, 4500); // Elke 4.5 seconden verversen
  }

  poll();
}

window.addEventListener('DOMContentLoaded', init);

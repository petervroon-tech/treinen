import { TreinenWasmBridge } from './wasm_bridge.js';

// Corridors / Lijnen definities van Nederland
const CORRIDORS = {
  'enschede-denhaag': {
    id: 'enschede-denhaag',
    name: 'Enschede ➔ Amersfoort ➔ Utrecht ➔ Den Haag Centraal',
    shortName: 'Oost-West Lijn (Enschede - Den Haag)',
    operator: 'NS Reizigers',
    seriesPattern: /^(17|70|16|14|24)\d{2}$/,
    stations: [
      { code: 'ES',   name: 'Enschede',            lat: 52.2225, lon: 6.8897, terminal: true,  sporen: '1-4' },
      { code: 'HGL',  name: 'Hengelo',             lat: 52.2625, lon: 6.7936, terminal: false, sporen: '1-3' },
      { code: 'AML',  name: 'Almelo',              lat: 52.3578, lon: 6.6542, terminal: false, sporen: '1-4' },
      { code: 'WDN',  name: 'Wierden',             lat: 52.3556, lon: 6.5889, terminal: false, sporen: '1-2' },
      { code: 'RSN',  name: 'Rijssen',             lat: 52.3117, lon: 6.5208, terminal: false, sporen: '1-2' },
      { code: 'HON',  name: 'Holten',              lat: 52.2794, lon: 6.4217, terminal: false, sporen: '1-2' },
      { code: 'DV',   name: 'Deventer',            lat: 52.2575, lon: 6.1606, terminal: false, sporen: '1-4' },
      { code: 'APD',  name: 'Apeldoorn',           lat: 52.2094, lon: 5.9614, terminal: false, sporen: '1-4' },
      { code: 'AMF',  name: 'Amersfoort Centraal', lat: 52.1539, lon: 5.3736, terminal: false, sporen: '1-7' },
      { code: 'UT',   name: 'Utrecht Centraal',    lat: 52.0894, lon: 5.1103, terminal: false, sporen: '1-21' },
      { code: 'GD',   name: 'Gouda',               lat: 52.0175, lon: 4.7061, terminal: false, sporen: '1-10' },
      { code: 'GVC',  name: 'Den Haag Centraal',   lat: 52.0808, lon: 4.3247, terminal: true,  sporen: '1-12' }
    ]
  },

  'enschede-zwolle': {
    id: 'enschede-zwolle',
    name: 'Enschede ➔ Hengelo ➔ Almelo ➔ Zwolle',
    shortName: 'Blauwnet Stoptrein & Sneltrein',
    operator: 'Keolis / Blauwnet',
    seriesPattern: /^(312|79)\d{2}$/,
    stations: [
      { code: 'ES',  name: 'Enschede',  lat: 52.2225, lon: 6.8897, terminal: true,  sporen: '1-4' },
      { code: 'HGL', name: 'Hengelo',   lat: 52.2625, lon: 6.7936, terminal: false, sporen: '1-3' },
      { code: 'AML', name: 'Almelo',    lat: 52.3578, lon: 6.6542, terminal: false, sporen: '1-4' },
      { code: 'WDN', name: 'Wierden',   lat: 52.3556, lon: 6.5889, terminal: false, sporen: '1-2' },
      { code: 'NVD', name: 'Nijverdal', lat: 52.3606, lon: 6.4589, terminal: false, sporen: '1-2' },
      { code: 'RAT', name: 'Raalte',    lat: 52.3842, lon: 6.2794, terminal: false, sporen: '1-2' },
      { code: 'HN',  name: 'Heino',     lat: 52.4367, lon: 6.2306, terminal: false, sporen: '1-2' },
      { code: 'ZL',  name: 'Zwolle',    lat: 52.5050, lon: 6.0917, terminal: true,  sporen: '1-16' }
    ]
  },

  'amsterdam-maastricht': {
    id: 'amsterdam-maastricht',
    name: 'Amsterdam Centraal ➔ Utrecht ➔ Eindhoven ➔ Maastricht',
    shortName: 'Noord-Zuid As (Ams - Mt)',
    operator: 'NS Reizigers',
    seriesPattern: /^(8|39|29|35)\d{2}$/,
    stations: [
      { code: 'ASD', name: 'Amsterdam Centraal', lat: 52.3792, lon: 4.9003, terminal: true,  sporen: '1-15' },
      { code: 'UT',  name: 'Utrecht Centraal',   lat: 52.0894, lon: 5.1103, terminal: false, sporen: '1-21' },
      { code: 'HT',  name: "'s-Hertogenbosch",   lat: 51.6906, lon: 5.2936, terminal: false, sporen: '1-7'  },
      { code: 'EHV', name: 'Eindhoven Centraal', lat: 51.4433, lon: 5.4814, terminal: false, sporen: '1-8'  },
      { code: 'WT',  name: 'Weert',              lat: 51.2489, lon: 5.7064, terminal: false, sporen: '1-3'  },
      { code: 'RM',  name: 'Roermond',           lat: 51.1931, lon: 5.9928, terminal: false, sporen: '1-3'  },
      { code: 'STD', name: 'Sittard',            lat: 50.9986, lon: 5.8589, terminal: false, sporen: '1-3'  },
      { code: 'MT',  name: 'Maastricht',         lat: 50.8500, lon: 5.7056, terminal: true,  sporen: '1-6'  }
    ]
  },

  'rotterdam-amsterdam': {
    id: 'rotterdam-amsterdam',
    name: 'Rotterdam Centraal ➔ Den Haag ➔ Schiphol ➔ Amsterdam',
    shortName: 'Oude Lijn (Rtd - Asd)',
    operator: 'NS Reizigers',
    seriesPattern: /^(22|24|11|14)\d{2}$/,
    stations: [
      { code: 'RTD', name: 'Rotterdam Centraal', lat: 51.9250, lon: 4.4700, terminal: true,  sporen: '1-16' },
      { code: 'DT',  name: 'Delft',              lat: 52.0069, lon: 4.3564, terminal: false, sporen: '1-4'  },
      { code: 'GVM', name: 'Den Haag HS',        lat: 52.0706, lon: 4.3228, terminal: false, sporen: '1-6'  },
      { code: 'LEDN',name: 'Leiden Centraal',    lat: 52.1661, lon: 4.4819, terminal: false, sporen: '1-9'  },
      { code: 'SHL', name: 'Schiphol Airport',   lat: 52.3108, lon: 4.7628, terminal: false, sporen: '1-6'  },
      { code: 'ASD', name: 'Amsterdam Centraal', lat: 52.3792, lon: 4.9003, terminal: true,  sporen: '1-15' }
    ]
  },

  'groningen-utrecht': {
    id: 'groningen-utrecht',
    name: 'Groningen / Leeuwarden ➔ Zwolle ➔ Amersfoort ➔ Utrecht',
    shortName: 'Noordelijke Lijn (Gn - Ut)',
    operator: 'NS Reizigers',
    seriesPattern: /^(5|7|18)\d{2}$/,
    stations: [
      { code: 'GN',  name: 'Groningen',          lat: 53.2106, lon: 6.5647, terminal: true,  sporen: '1-9'  },
      { code: 'ASN', name: 'Assen',              lat: 52.9922, lon: 6.5683, terminal: false, sporen: '1-3'  },
      { code: 'MP',  name: 'Meppel',             lat: 52.6917, lon: 6.1986, terminal: false, sporen: '1-3'  },
      { code: 'ZL',  name: 'Zwolle',             lat: 52.5050, lon: 6.0917, terminal: false, sporen: '1-16' },
      { code: 'AMF', name: 'Amersfoort Centraal', lat: 52.1539, lon: 5.3736, terminal: false, sporen: '1-7'  },
      { code: 'UT',  name: 'Utrecht Centraal',   lat: 52.0894, lon: 5.1103, terminal: true,  sporen: '1-21' }
    ]
  }
};

// Global State
const appState = {
  bridge: new TreinenWasmBridge(),
  map: null,
  activeCorridorKey: 'enschede-denhaag',
  baseLayer: 'esri',
  layers: {},
  routePolyline: null,
  stationMarkers: [],
  trainMarkers: new Map(),
  soundEnabled: true,
  audioCtx: null,
  allLiveFeatures: [],
  selectedTrainId: null
};

// -------------------------------------------------------------
// 1. Authentieke Akoestische NS Stationsgong (Geen computerstem!)
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

// Speelt de originele drietonige NS Stationsgong (F4 -> A4 -> C5 met akoestische belboventonen)
function playAuthenticNSChime() {
  if (!appState.soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // F4 (349.23 Hz), A4 (440.00 Hz), C5 (523.25 Hz)
  const notes = [
    { freq: 349.23, time: 0.00 },
    { freq: 440.00, time: 0.28 },
    { freq: 523.25, time: 0.56 }
  ];

  notes.forEach(({ freq, time }) => {
    // Grondtoon
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now + time);

    gain1.gain.setValueAtTime(0.001, now + time);
    gain1.gain.exponentialRampToValueAtTime(0.22, now + time + 0.03);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + time + 0.85);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    // Harmonische bel boventoon (2x frequentie)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now + time);

    gain2.gain.setValueAtTime(0.001, now + time);
    gain2.gain.exponentialRampToValueAtTime(0.08, now + time + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + time + 0.45);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(now + time);
    osc2.start(now + time);
    osc1.stop(now + time + 0.9);
    osc2.stop(now + time + 0.5);
  });
}

// -------------------------------------------------------------
// 2. Leaflet Satellietkaart Initialisatie
// -------------------------------------------------------------
function initMap() {
  const map = L.map('map', {
    center: [52.20, 5.70],
    zoom: 9,
    zoomControl: false
  });

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // Satellietlagen
  const esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri &bull; Maxar',
    maxZoom: 19
  });

  const pdok = L.tileLayer('https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_orthoHR/EPSG:3857/{z}/{x}/{y}.jpeg', {
    attribution: '&copy; PDOK Luchtfoto Nederland',
    maxZoom: 19
  });

  const dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB &bull; OSM',
    maxZoom: 19
  });

  esri.addTo(map);
  appState.map = map;
  appState.layers = { esri, pdok, dark };

  // Wisselen van kaarttype
  document.getElementById('btnSatEsri')?.addEventListener('click', () => switchLayer('esri'));
  document.getElementById('btnSatPdok')?.addEventListener('click', () => switchLayer('pdok'));
  document.getElementById('btnMapDark')?.addEventListener('click', () => switchLayer('dark'));
}

function switchLayer(name) {
  const map = appState.map;
  ['esri', 'pdok', 'dark'].forEach(k => {
    if (map.hasLayer(appState.layers[k])) map.removeLayer(appState.layers[k]);
  });
  appState.layers[name].addTo(map);
  appState.baseLayer = name;

  ['btnSatEsri', 'btnSatPdok', 'btnMapDark'].forEach(id => {
    document.getElementById(id)?.classList.remove('active');
  });
  if (name === 'esri') document.getElementById('btnSatEsri')?.classList.add('active');
  if (name === 'pdok') document.getElementById('btnSatPdok')?.classList.add('active');
  if (name === 'dark') document.getElementById('btnMapDark')?.classList.add('active');
}

// -------------------------------------------------------------
// 3. Teken Corridor op Satellietkaart (Rustig & Schoon)
// -------------------------------------------------------------
function renderCorridorOnMap(corridor) {
  const map = appState.map;

  // Verwijder oude routelijn en stations
  if (appState.routePolyline) {
    appState.routePolyline.remove();
  }
  appState.stationMarkers.forEach(m => m.remove());
  appState.stationMarkers = [];

  if (!corridor) {
    // 'all' modus: toon heel Nederland
    map.flyTo([52.1326, 5.2913], 8, { duration: 1.0 });
    return;
  }

  // Teken de spoorroute als een duidelijke gouden/witte lijn op de satelliet
  const latlngs = corridor.stations.map(s => [s.lat, s.lon]);
  appState.routePolyline = L.polyline(latlngs, {
    color: '#ffc917',
    weight: 4.5,
    opacity: 0.95,
    dashArray: '8, 4',
    lineJoin: 'round'
  }).addTo(map);

  // Teken duidelijke stationbollen
  corridor.stations.forEach((st, i) => {
    const isTerm = st.terminal;
    const marker = L.circleMarker([st.lat, st.lon], {
      radius: isTerm ? 8 : 5,
      fillColor: isTerm ? '#ffffff' : '#ffc917',
      color: '#003082',
      weight: 2.5,
      fillOpacity: 1.0
    }).addTo(map);

    marker.bindTooltip(`<strong>${st.name}</strong><br><small>Spoor ${st.sporen}</small>`, {
      permanent: isTerm,
      direction: 'top',
      offset: [0, -6],
      className: 'station-map-tooltip'
    });

    appState.stationMarkers.push(marker);
  });

  // Zoom de kaart direct naar deze lijn
  const bounds = L.latLngBounds(latlngs);
  map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13, animate: true, duration: 1.2 });
}

// -------------------------------------------------------------
// 4. Live Treinen Ophalen & Filteren per Corridor
// -------------------------------------------------------------
function fetchLiveTrains() {
  return new Promise((resolve) => {
    let resolved = false;

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

    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(null);
      }
    }, 4500);
  });
}

function parseTrain(raw) {
  if (!raw || !raw.geometry || !raw.geometry.coordinates) return null;
  const coords = raw.geometry.coordinates;
  const lat = parseFloat(coords[0]);
  const lon = parseFloat(coords[1]);
  if (isNaN(lat) || isNaN(lon)) return null;

  const props = raw.properties || {};
  const matnrString = props.matnr || '';
  const matnummer = props.matnummer || '';

  let speed = 0;
  const spdMatch = matnrString.match(/@\s*(\d+)\s*km\/h/i);
  if (spdMatch) speed = parseInt(spdMatch[1], 10);

  let trainNum = '';
  const trMatch = matnrString.match(/trein\s+(\d+)/i);
  if (trMatch) trainNum = trMatch[1];
  else trainNum = matnummer.replace(/\D/g, '') || '0';

  // Punctualiteit via WASM
  const puncScore = appState.bridge.calculatePunctuality(speed, speed === 0 ? 120 : 0);

  return {
    id: `${matnummer}_${trainNum}`,
    trainNum,
    matnummer,
    matnrString,
    lat,
    lon,
    speed,
    puncScore,
    gpsdata: props.gpsdata || 'Zojuist'
  };
}

// Bepaal afstand tussen twee coördinaten in km
function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Bepaal of een trein zich op het traject van de corridor bevindt
function matchTrainToCorridor(train, corridor) {
  if (!corridor) return true;

  // A. Match op treinserie
  if (corridor.seriesPattern && corridor.seriesPattern.test(train.trainNum)) {
    return true;
  }

  // B. Match op geografische nabijheid van een van de spoorsegmenten
  for (let i = 0; i < corridor.stations.length - 1; i++) {
    const s1 = corridor.stations[i];
    const s2 = corridor.stations[i + 1];

    const d1 = distanceKm(train.lat, train.lon, s1.lat, s1.lon);
    const d2 = distanceKm(train.lat, train.lon, s2.lat, s2.lon);
    const segLen = distanceKm(s1.lat, s1.lon, s2.lat, s2.lon);

    // Driehoeksongelijkheid: als d1 + d2 dichtbij de segmentlengte ligt (< 6 km speling)
    if (d1 + d2 <= segLen + 6.0 && d1 <= segLen + 4.0 && d2 <= segLen + 4.0) {
      return { segmentIndex: i, fromStation: s1, toStation: s2, distFromS1: d1 };
    }
  }

  return false;
}

// -------------------------------------------------------------
// 5. Update het Overzichtelijke Lijnoverzicht (Lijnstrip)
// -------------------------------------------------------------
function updateLineOverview() {
  const corridorKey = appState.activeCorridorKey;
  const corridor = CORRIDORS[corridorKey];

  const titleEl = document.getElementById('corridorTitle');
  const metaEl = document.getElementById('corridorRouteMeta');
  const countEl = document.getElementById('corridorLiveCount');
  const diagramEl = document.getElementById('lineDiagram');

  if (!corridor) {
    if (titleEl) titleEl.textContent = 'Landelijke Satelliet Radar (Heel Nederland)';
    if (metaEl) metaEl.textContent = 'Toont alle actuele treinen op alle spoorlijnen';
    if (diagramEl) {
      diagramEl.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-sub);">
          <p>Kies een specifieke spoorlijn hierboven (bijv. <strong>Enschede tot eindpunt</strong>) om het station-voor-station lijnoverzicht te bekijken.</p>
        </div>
      `;
    }
    renderMapTrains(appState.allLiveFeatures.map(parseTrain).filter(Boolean));
    return;
  }

  titleEl.textContent = `Lijn: ${corridor.name}`;
  metaEl.textContent = `Vervoerder: ${corridor.operator} &bull; ${corridor.stations.length} Stations`;

  // Filter treinen die op deze corridor rijden
  const matchedTrains = [];
  const segmentTrainsMap = new Map(); // key: segmentIndex, value: [trains]

  appState.allLiveFeatures.forEach(raw => {
    const t = parseTrain(raw);
    if (!t) return;

    const match = matchTrainToCorridor(t, corridor);
    if (match) {
      const segIdx = typeof match === 'object' ? match.segmentIndex : findNearestSegment(t, corridor);
      t.segmentIndex = segIdx;
      matchedTrains.push(t);

      if (!segmentTrainsMap.has(segIdx)) segmentTrainsMap.set(segIdx, []);
      segmentTrainsMap.get(segIdx).push(t);
    }
  });

  countEl.innerHTML = `Actieve treinen op dit traject: <strong>${matchedTrains.length}</strong>`;

  // Bouw het heldere stationsdiagram
  let html = '';
  corridor.stations.forEach((st, idx) => {
    const isTerminal = st.terminal || idx === 0 || idx === corridor.stations.length - 1;

    html += `
      <div class="station-node ${isTerminal ? 'terminal' : ''}">
        <div class="station-track-col">
          <div class="station-bullet"></div>
          ${idx < corridor.stations.length - 1 ? '<div class="track-line"></div>' : ''}
        </div>
        <div class="station-details">
          <div class="station-name">${st.name}</div>
          <div class="station-sub">Spoor ${st.sporen} &bull; ${st.code}</div>
        </div>
      </div>
    `;

    // Toon de treinen die tussen dit station en het volgende station rijden
    if (idx < corridor.stations.length - 1) {
      const trainsOnSegment = segmentTrainsMap.get(idx) || [];
      if (trainsOnSegment.length > 0) {
        html += `<div class="trains-between-segment">`;
        trainsOnSegment.forEach(t => {
          const puncClass = t.puncScore === 0 ? 'on-time' : t.puncScore === 1 ? 'delayed' : 'halted';
          const puncText = t.puncScore === 0 ? 'Op tijd' : t.puncScore === 1 ? '+2 min' : 'Vertraagd';

          html += `
            <div class="train-corridor-card ${puncClass}" onclick="window.selectTrain('${t.id}')">
              <div class="t-info">
                <span style="font-size: 1.1rem;">🚆</span>
                <div>
                  <div class="t-number">Trein ${t.trainNum}</div>
                  <div class="t-mat">${t.matnummer}</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="t-speed-badge">${t.speed} km/u</span>
                <span class="t-punc-badge ${puncClass}">${puncText}</span>
              </div>
            </div>
          `;
        });
        html += `</div>`;
      }
    }
  });

  diagramEl.innerHTML = html;

  // Teken uitsluitend deze treinen op de satellietkaart (geen chaos!)
  renderMapTrains(matchedTrains);
}

function findNearestSegment(train, corridor) {
  let bestIdx = 0;
  let bestDist = Infinity;
  for (let i = 0; i < corridor.stations.length - 1; i++) {
    const s1 = corridor.stations[i];
    const s2 = corridor.stations[i + 1];
    const midLat = (s1.lat + s2.lat) / 2;
    const midLon = (s1.lon + s2.lon) / 2;
    const d = distanceKm(train.lat, train.lon, midLat, midLon);
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }
  return bestIdx;
}

// -------------------------------------------------------------
// 6. Teken Alleen Relevante Treinen op de Satellietkaart
// -------------------------------------------------------------
function renderMapTrains(trainList) {
  const map = appState.map;
  const currentIds = new Set();

  trainList.forEach(t => {
    currentIds.add(t.id);
    const statusBorder = t.puncScore === 0 ? '#10b981' : t.puncScore === 1 ? '#f59e0b' : '#ef4444';

    if (appState.trainMarkers.has(t.id)) {
      // Bestaande marker verplaatsen
      const m = appState.trainMarkers.get(t.id);
      m.setLatLng([t.lat, t.lon]);
      const el = m.getElement();
      if (el) {
        const tag = el.querySelector('.clean-train-tag');
        if (tag) tag.textContent = `${t.trainNum} (${t.speed}k)`;
      }
    } else {
      // Nieuwe schone marker
      const html = `
        <div class="clean-train-marker" title="Trein ${t.trainNum} (${t.speed} km/u)">
          <div class="clean-train-tag">${t.trainNum} (${t.speed}k)</div>
          <div class="clean-train-pin" style="background: #003082; border-color: ${statusBorder};">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffc917">
              <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zm0 2c3.5 0 6 .4 6 2H6c0-1.6 2.5-2 6-2zm-5 9c-.83 0-1.5-.67-1.5-1.5S6.17 10 7 10s1.5.67 1.5 1.5S7.83 13 7 13zm10 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'clean-div-icon',
        html,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([t.lat, t.lon], { icon }).addTo(map);
      marker.on('click', () => window.selectTrain(t.id));
      appState.trainMarkers.set(t.id, marker);
    }
  });

  // Verwijder markers die niet meer op deze lijn rijden
  for (const [id, m] of appState.trainMarkers.entries()) {
    if (!currentIds.has(id)) {
      m.remove();
      appState.trainMarkers.delete(id);
    }
  }
}

// Selecteer een trein en zoom in op de satelliet
window.selectTrain = (trainId) => {
  appState.selectedTrainId = trainId;
  const train = appState.allLiveFeatures.map(parseTrain).find(t => t && t.id === trainId);
  if (!train) return;

  // Speel subtiele NS chime
  playAuthenticNSChime();

  // Update inspectiebox
  const box = document.getElementById('inspectorBox');
  if (box) {
    box.style.display = 'block';
    document.getElementById('inspTitle').textContent = `Trein #${train.trainNum} (${train.matnummer})`;
    document.getElementById('inspSpeed').textContent = `${train.speed} km/u`;
    document.getElementById('inspMat').textContent = train.matnummer;
    document.getElementById('inspPunc').textContent = train.puncScore === 0 ? 'Op tijd' : '+2 min vertraagd';
    document.getElementById('inspPunc').className = `status-pill ${train.puncScore === 0 ? 'green' : 'yellow'}`;
    document.getElementById('inspGps').textContent = train.gpsdata;
  }

  // Vlieg rustig naar de satellietlocatie
  appState.map.flyTo([train.lat, train.lon], 14, { duration: 1.2 });
};

// -------------------------------------------------------------
// 7. Event Handlers & Navigatie
// -------------------------------------------------------------
function setupNavigation() {
  // Lijnkeuze navigatie
  document.querySelectorAll('.line-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.line-nav-btn').forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');

      const lineKey = target.getAttribute('data-line');
      appState.activeCorridorKey = lineKey;

      const corridor = CORRIDORS[lineKey];
      renderCorridorOnMap(corridor);
      updateLineOverview();

      // Speel de authentieke NS stationsgong bij het wisselen van lijn
      playAuthenticNSChime();
    });
  });

  // NS Gong knop
  document.getElementById('btnPlayChime')?.addEventListener('click', () => {
    playAuthenticNSChime();
  });

  // Geluid aan/uit
  document.getElementById('btnAudioToggle')?.addEventListener('click', () => {
    appState.soundEnabled = !appState.soundEnabled;
    const btn = document.getElementById('btnAudioToggle');
    btn.classList.toggle('active', appState.soundEnabled);
    document.getElementById('audioStatusText').textContent = appState.soundEnabled ? '🔊 Geluid: Aan' : '🔇 Geluid: Uit';
    if (appState.soundEnabled) playAuthenticNSChime();
  });

  // Zoekveld
  document.getElementById('trainSearchInput')?.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    if (q.length >= 3) {
      const match = appState.allLiveFeatures.map(parseTrain).find(t => t && t.trainNum.includes(q));
      if (match) {
        window.selectTrain(match.id);
      }
    }
  });
}

// -------------------------------------------------------------
// 8. Start Applicatie
// -------------------------------------------------------------
async function init() {
  initMap();
  setupNavigation();

  // Stel standaard de gevraagde lijn in: Enschede tot eindpunt!
  const defaultCorridor = CORRIDORS['enschede-denhaag'];
  renderCorridorOnMap(defaultCorridor);

  // Laad WebAssembly
  await appState.bridge.loadWasm('./treinen.wasm');

  // Live polling loop (elke 4.5 seconden)
  async function poll() {
    try {
      const data = await fetchLiveTrains();
      if (data && data.features) {
        appState.allLiveFeatures = data.features;
        updateLineOverview();
      }
    } catch (e) {
      console.warn('Poll waarschuwing:', e);
    }
    setTimeout(poll, 4500);
  }

  poll();
}

window.addEventListener('DOMContentLoaded', init);

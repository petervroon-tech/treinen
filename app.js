import { TreinenWasmBridge } from './wasm_bridge.js';

// =============================================================
// 1. Spoorwegmaatschappijen van Nederland (Reizigers, Regionaal, Internationaal & Goederen)
// =============================================================
export const OPERATORS = {
  ns: {
    code: 'NS',
    name: 'NS Reizigers',
    category: 'ns',
    badgeClass: 'op-ns',
    bg: '#ffc917',
    color: '#003082',
    border: '#ffc917'
  },
  arriva: {
    code: 'Arriva',
    name: 'Arriva Nederland',
    category: 'regional',
    badgeClass: 'op-arriva',
    bg: '#0284c7',
    color: '#ffffff',
    border: '#38bdf8'
  },
  blauwnet: {
    code: 'Blauwnet',
    name: 'Keolis / Blauwnet',
    category: 'regional',
    badgeClass: 'op-blauwnet',
    bg: '#0369a1',
    color: '#ffffff',
    border: '#0284c7'
  },
  qbuzz: {
    code: 'Qbuzz',
    name: 'Qbuzz (R-net)',
    category: 'regional',
    badgeClass: 'op-qbuzz',
    bg: '#b91c1c',
    color: '#ffffff',
    border: '#ef4444'
  },
  breng: {
    code: 'Breng',
    name: 'Breng / Transdev',
    category: 'regional',
    badgeClass: 'op-breng',
    bg: '#059669',
    color: '#ffffff',
    border: '#10b981'
  },
  eurostar: {
    code: 'Eurostar',
    name: 'Eurostar (HSL Zuid)',
    category: 'international',
    badgeClass: 'op-eurostar',
    bg: '#831843',
    color: '#fdf2f8',
    border: '#f43f5e'
  },
  ice: {
    code: 'ICE',
    name: 'ICE International',
    category: 'international',
    badgeClass: 'op-ice',
    bg: '#ffffff',
    color: '#dc2626',
    border: '#dc2626'
  },
  icberlijn: {
    code: 'IC Berlijn',
    name: 'Intercity Berlijn (DB/NS)',
    category: 'international',
    badgeClass: 'op-icberlijn',
    bg: '#ffffff',
    color: '#003082',
    border: '#ffc917'
  },
  dbcargo: {
    code: 'DB Cargo',
    name: 'DB Cargo Nederland (Goederen)',
    category: 'freight',
    badgeClass: 'op-dbcargo',
    bg: '#dc2626',
    color: '#ffffff',
    border: '#f87171'
  },
  rfo: {
    code: 'RFO',
    name: 'Rail Force One (Goederen)',
    category: 'freight',
    badgeClass: 'op-rfo',
    bg: '#ea580c',
    color: '#ffffff',
    border: '#fb923c'
  },
  lineas: {
    code: 'Lineas',
    name: 'Lineas Freight',
    category: 'freight',
    badgeClass: 'op-lineas',
    bg: '#1d4ed8',
    color: '#ffffff',
    border: '#60a5fa'
  },
  captrain: {
    code: 'Captrain',
    name: 'Captrain Netherlands',
    category: 'freight',
    badgeClass: 'op-captrain',
    bg: '#7e22ce',
    color: '#ffffff',
    border: '#c084fc'
  },
  freight: {
    code: 'Goederen',
    name: 'Goederenvervoerder',
    category: 'freight',
    badgeClass: 'op-freight',
    bg: '#d97706',
    color: '#ffffff',
    border: '#f59e0b'
  }
};

// =============================================================
// 2. Corridors & Spoorlijnen van Nederland (Alle Vervoerders)
// =============================================================
export const CORRIDORS = {
  // --- A. NS Hoofdlijnen ---
  'amersfoort-breda': {
    id: 'amersfoort-breda',
    category: 'ns',
    isHsl: true,
    name: 'Amersfoort Schothorst ➔ Hilversum ➔ Amsterdam Zuid ➔ Schiphol ➔ Rotterdam C ➔ Breda (HSL)',
    shortName: 'Amersfoort Schothorst ➔ Breda (HSL-Zuid)',
    badge: 'IC Direct / HSL',
    operator: 'NS Reizigers / HSL-Zuid',
    primaryOpKey: 'ns',
    seriesPattern: /^(18|11|24|92|12|14)\d{2}$/,
    stations: [
      { code: 'AMFS', name: 'Amersfoort Schothorst', lat: 52.174875, lon: 5.403838, terminal: true,  sporen: '1-3' },
      { code: 'AMF',  name: 'Amersfoort Centraal',   lat: 52.15366,  lon: 5.371198, terminal: false, sporen: '1-7' },
      { code: 'HVS',  name: 'Hilversum',             lat: 52.226347, lon: 5.180195, terminal: false, sporen: '1-5' },
      { code: 'ASDZ', name: 'Amsterdam Zuid',        lat: 52.338865, lon: 4.871946, terminal: false, sporen: '1-4' },
      { code: 'SHL',  name: 'Schiphol Airport',      lat: 52.308787, lon: 4.761487, terminal: false, sporen: '1-6' },
      { code: 'RTD',  name: 'Rotterdam Centraal',    lat: 51.925068, lon: 4.468839, terminal: false, sporen: '1-16' },
      { code: 'ZLW',  name: 'Lage Zwaluwe (HSL)',    lat: 51.69023,  lon: 4.66345,  terminal: false, sporen: 'HSL' },
      { code: 'BD',   name: 'Breda',                 lat: 51.594459, lon: 4.7764,   terminal: true,  sporen: '1-7' }
    ]
  },

  'breda-amersfoort': {
    id: 'breda-amersfoort',
    category: 'ns',
    isHsl: true,
    name: 'Breda ➔ Rotterdam C ➔ Schiphol ➔ Amsterdam Zuid ➔ Hilversum ➔ Amersfoort C ➔ Amersfoort Schothorst (HSL)',
    shortName: 'Breda ➔ Amersfoort Schothorst (HSL-Zuid)',
    badge: 'IC Direct / HSL',
    operator: 'NS Reizigers / HSL-Zuid',
    primaryOpKey: 'ns',
    seriesPattern: /^(18|11|24|92|12|14)\d{2}$/,
    stations: [
      { code: 'BD',   name: 'Breda',                 lat: 51.594459, lon: 4.7764,   terminal: true,  sporen: '1-7' },
      { code: 'ZLW',  name: 'Lage Zwaluwe (HSL)',    lat: 51.69023,  lon: 4.66345,  terminal: false, sporen: 'HSL' },
      { code: 'RTD',  name: 'Rotterdam Centraal',    lat: 51.925068, lon: 4.468839, terminal: false, sporen: '1-16' },
      { code: 'SHL',  name: 'Schiphol Airport',      lat: 52.308787, lon: 4.761487, terminal: false, sporen: '1-6' },
      { code: 'ASDZ', name: 'Amsterdam Zuid',        lat: 52.338865, lon: 4.871946, terminal: false, sporen: '1-4' },
      { code: 'HVS',  name: 'Hilversum',             lat: 52.226347, lon: 5.180195, terminal: false, sporen: '1-5' },
      { code: 'AMF',  name: 'Amersfoort Centraal',   lat: 52.15366,  lon: 5.371198, terminal: false, sporen: '1-7' },
      { code: 'AMFS', name: 'Amersfoort Schothorst', lat: 52.174875, lon: 5.403838, terminal: true,  sporen: '1-3' }
    ]
  },

  'enschede-denhaag': {
    id: 'enschede-denhaag',
    category: 'ns',
    name: 'Enschede ➔ Amersfoort ➔ Utrecht ➔ Den Haag Centraal',
    shortName: 'Enschede ➔ Den Haag',
    badge: 'IC',
    operator: 'NS Reizigers',
    primaryOpKey: 'ns',
    seriesPattern: /^(17|16|5|6|70|14|24)\d{2}$/,
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

  'eindhoven-maastricht': {
    id: 'eindhoven-maastricht',
    category: 'ns',
    name: 'Eindhoven Centraal ➔ Weert ➔ Roermond ➔ Sittard ➔ Maastricht',
    shortName: 'Eindhoven ➔ Maastricht (Limburglijn)',
    badge: 'IC',
    operator: 'NS Reizigers',
    primaryOpKey: 'ns',
    seriesPattern: /^(8|39|29|35)\d{2}$/,
    stations: [
      { code: 'EHV', name: 'Eindhoven Centraal', lat: 51.4433, lon: 5.4814, terminal: true,  sporen: '1-8'  },
      { code: 'WT',  name: 'Weert',              lat: 51.2489, lon: 5.7064, terminal: false, sporen: '1-3'  },
      { code: 'RM',  name: 'Roermond',           lat: 51.1931, lon: 5.9928, terminal: false, sporen: '1-3'  },
      { code: 'STD', name: 'Sittard',            lat: 50.9986, lon: 5.8589, terminal: false, sporen: '1-3'  },
      { code: 'MT',  name: 'Maastricht',         lat: 50.8500, lon: 5.7056, terminal: true,  sporen: '1-6'  }
    ]
  },

  'amsterdam-maastricht': {
    id: 'amsterdam-maastricht',
    category: 'ns',
    name: 'Amsterdam Centraal ➔ Utrecht ➔ Eindhoven ➔ Maastricht',
    shortName: 'Amsterdam ➔ Maastricht',
    badge: 'IC',
    operator: 'NS Reizigers',
    primaryOpKey: 'ns',
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
    category: 'ns',
    name: 'Rotterdam Centraal ➔ Den Haag HS ➔ Leiden ➔ Schiphol ➔ Amsterdam',
    shortName: 'Rotterdam ➔ Amsterdam (Oude Lijn)',
    badge: 'IC',
    operator: 'NS Reizigers',
    primaryOpKey: 'ns',
    seriesPattern: /^(22|24|11|14)\d{2}$/,
    stations: [
      { code: 'RTD',  name: 'Rotterdam Centraal', lat: 51.9250, lon: 4.4700, terminal: true,  sporen: '1-16' },
      { code: 'DT',   name: 'Delft',              lat: 52.0069, lon: 4.3564, terminal: false, sporen: '1-4'  },
      { code: 'GVM',  name: 'Den Haag HS',        lat: 52.0706, lon: 4.3228, terminal: false, sporen: '1-6'  },
      { code: 'LEDN', name: 'Leiden Centraal',    lat: 52.1661, lon: 4.4819, terminal: false, sporen: '1-9'  },
      { code: 'SHL',  name: 'Schiphol Airport',   lat: 52.3108, lon: 4.7628, terminal: false, sporen: '1-6'  },
      { code: 'ASD',  name: 'Amsterdam Centraal', lat: 52.3792, lon: 4.9003, terminal: true,  sporen: '1-15' }
    ]
  },

  'groningen-utrecht': {
    id: 'groningen-utrecht',
    category: 'ns',
    name: 'Groningen / Leeuwarden ➔ Zwolle ➔ Amersfoort ➔ Utrecht',
    shortName: 'Groningen ➔ Utrecht',
    badge: 'IC',
    operator: 'NS Reizigers',
    primaryOpKey: 'ns',
    seriesPattern: /^(5|6|7|18)\d{2}$/,
    stations: [
      { code: 'GN',  name: 'Groningen',          lat: 53.2106, lon: 6.5647, terminal: true,  sporen: '1-9'  },
      { code: 'ASN', name: 'Assen',              lat: 52.9922, lon: 6.5683, terminal: false, sporen: '1-3'  },
      { code: 'MP',  name: 'Meppel',             lat: 52.6917, lon: 6.1986, terminal: false, sporen: '1-3'  },
      { code: 'ZL',  name: 'Zwolle',             lat: 52.5050, lon: 6.0917, terminal: false, sporen: '1-16' },
      { code: 'AMF', name: 'Amersfoort Centraal', lat: 52.1539, lon: 5.3736, terminal: false, sporen: '1-7'  },
      { code: 'UT',  name: 'Utrecht Centraal',   lat: 52.0894, lon: 5.1103, terminal: true,  sporen: '1-21' }
    ]
  },

  'vlissingen-eindhoven': {
    id: 'vlissingen-eindhoven',
    category: 'ns',
    name: 'Vlissingen ➔ Roosendaal ➔ Breda ➔ Tilburg ➔ Eindhoven',
    shortName: 'Vlissingen ➔ Brabant',
    badge: 'IC',
    operator: 'NS Reizigers',
    primaryOpKey: 'ns',
    seriesPattern: /^(21|36)\d{2}$/,
    stations: [
      { code: 'VS',  name: 'Vlissingen',         lat: 51.4431, lon: 3.5958, terminal: true,  sporen: '1-3'  },
      { code: 'MDB', name: 'Middelburg',          lat: 51.4983, lon: 3.6186, terminal: false, sporen: '1-2'  },
      { code: 'GS',  name: 'Goes',                lat: 51.4989, lon: 3.8906, terminal: false, sporen: '1-3'  },
      { code: 'BGN', name: 'Bergen op Zoom',      lat: 51.4967, lon: 4.2953, terminal: false, sporen: '1-2'  },
      { code: 'RSD', name: 'Roosendaal',          lat: 51.5408, lon: 4.4589, terminal: false, sporen: '1-4'  },
      { code: 'BD',  name: 'Breda',               lat: 51.5956, lon: 4.7797, terminal: false, sporen: '1-7'  },
      { code: 'TB',  name: 'Tilburg',             lat: 51.5606, lon: 5.0828, terminal: false, sporen: '1-4'  },
      { code: 'EHV', name: 'Eindhoven Centraal',  lat: 51.4433, lon: 5.4814, terminal: true,  sporen: '1-8'  }
    ]
  },

  // --- B. Regionale Vervoerders (Arriva, Keolis/Blauwnet, Qbuzz) ---
  'keolis-zwolle': {
    id: 'keolis-zwolle',
    category: 'regional',
    name: 'Enschede ➔ Hengelo ➔ Almelo ➔ Raalte ➔ Zwolle',
    shortName: 'Enschede ➔ Zwolle (Blauwnet)',
    badge: 'Blauwnet',
    operator: 'Keolis / Blauwnet',
    primaryOpKey: 'blauwnet',
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

  'arriva-achterhoek': {
    id: 'arriva-achterhoek',
    category: 'regional',
    name: 'Apeldoorn ➔ Apeldoorn De Maten ➔ Klarenbeek ➔ Voorst-Empe ➔ Zutphen',
    shortName: 'Apeldoorn ➔ Zutphen (Arriva)',
    badge: 'Arriva',
    operator: 'Arriva Personenvervoer',
    primaryOpKey: 'arriva',
    seriesPattern: /^(178|304|305|308|309)\d{2}$/,
    stations: [
      { code: 'APD',  name: 'Apeldoorn',          lat: 52.20942, lon: 5.96748,  terminal: true,  sporen: '4' },
      { code: 'APDM', name: 'Apeldoorn De Maten', lat: 52.20528, lon: 6.00056,  terminal: false, sporen: '1' },
      { code: 'KBK',  name: 'Klarenbeek',         lat: 52.17806, lon: 6.08361,  terminal: false, sporen: '1' },
      { code: 'VEM',  name: 'Voorst-Empe',        lat: 52.15750, lon: 6.14361,  terminal: false, sporen: '1' },
      { code: 'ZP',   name: 'Zutphen',            lat: 52.14483, lon: 6.19414,  terminal: true,  sporen: '1-4' }
    ]
  },

  'arriva-vechtdal': {
    id: 'arriva-vechtdal',
    category: 'regional',
    name: 'Zwolle ➔ Dalfsen ➔ Ommen ➔ Hardenberg ➔ Emmen',
    shortName: 'Zwolle ➔ Emmen (Vechtdallijn)',
    badge: 'Arriva',
    operator: 'Arriva Personenvervoer',
    primaryOpKey: 'arriva',
    seriesPattern: /^(189|389|138)\d{2}$/,
    stations: [
      { code: 'ZL',  name: 'Zwolle',      lat: 52.5050, lon: 6.0917, terminal: true,  sporen: '1-16' },
      { code: 'DL',  name: 'Dalfsen',     lat: 52.5008, lon: 6.2575, terminal: false, sporen: '1-2' },
      { code: 'OMN', name: 'Ommen',       lat: 52.5122, lon: 6.4217, terminal: false, sporen: '1-2' },
      { code: 'MRB', name: 'Mariënberg',  lat: 52.5042, lon: 6.5264, terminal: false, sporen: '1-2' },
      { code: 'HDB', name: 'Hardenberg',  lat: 52.5714, lon: 6.6217, terminal: false, sporen: '1-3' },
      { code: 'CO',  name: 'Coevorden',   lat: 52.6644, lon: 6.7461, terminal: false, sporen: '1-2' },
      { code: 'EMN', name: 'Emmen',       lat: 52.7906, lon: 6.9011, terminal: true,  sporen: '1-2' }
    ]
  },

  'arriva-noord': {
    id: 'arriva-noord',
    category: 'regional',
    name: 'Leeuwarden ➔ Buitenpost ➔ Zuidhorn ➔ Groningen',
    shortName: 'Leeuwarden ➔ Groningen (Arriva)',
    badge: 'Arriva',
    operator: 'Arriva Personenvervoer',
    primaryOpKey: 'arriva',
    seriesPattern: /^(373|374|372)\d{2}$/,
    stations: [
      { code: 'LW',  name: 'Leeuwarden', lat: 53.1969, lon: 5.7928, terminal: true,  sporen: '1-8' },
      { code: 'BP',  name: 'Buitenpost', lat: 53.2522, lon: 6.1436, terminal: false, sporen: '1-2' },
      { code: 'ZH',  name: 'Zuidhorn',   lat: 53.2439, lon: 6.4056, terminal: false, sporen: '1-2' },
      { code: 'GN',  name: 'Groningen',  lat: 53.2106, lon: 6.5647, terminal: true,  sporen: '1-9' }
    ]
  },

  'arriva-maaslijn': {
    id: 'arriva-maaslijn',
    category: 'regional',
    name: 'Nijmegen ➔ Cuijk ➔ Boxmeer ➔ Venray ➔ Venlo ➔ Roermond',
    shortName: 'Nijmegen ➔ Roermond (Maaslijn)',
    badge: 'Arriva',
    operator: 'Arriva Personenvervoer',
    primaryOpKey: 'arriva',
    seriesPattern: /^(322|323)\d{2}$/,
    stations: [
      { code: 'NM',  name: 'Nijmegen', lat: 51.8428, lon: 5.8539, terminal: true,  sporen: '1-6' },
      { code: 'CK',  name: 'Cuijk',    lat: 51.7289, lon: 5.8753, terminal: false, sporen: '1-2' },
      { code: 'BMR', name: 'Boxmeer',  lat: 51.6453, lon: 5.9525, terminal: false, sporen: '1-2' },
      { code: 'VRY', name: 'Venray',   lat: 51.5283, lon: 6.0028, terminal: false, sporen: '1-2' },
      { code: 'VL',  name: 'Venlo',    lat: 51.3694, lon: 6.1722, terminal: false, sporen: '1-4' },
      { code: 'RM',  name: 'Roermond', lat: 51.1931, lon: 5.9928, terminal: true,  sporen: '1-3' }
    ]
  },

  'arriva-drielanden': {
    id: 'arriva-drielanden',
    category: 'regional',
    name: 'Luik (BE) ➔ Maastricht ➔ Valkenburg ➔ Heerlen ➔ Aken (DE)',
    shortName: 'Drielandentrein RE18 (Arriva)',
    badge: 'RE18',
    operator: 'Arriva Drielandentrein',
    primaryOpKey: 'arriva',
    seriesPattern: /^(189|320|18)\d{2}$/,
    stations: [
      { code: 'LIEGE', name: 'Liège-Guillemins (BE)', lat: 50.6247, lon: 5.5667, terminal: true,  sporen: 'Int.' },
      { code: 'VISE',  name: 'Visé (BE)',             lat: 50.7381, lon: 5.6936, terminal: false, sporen: '1-2' },
      { code: 'EDN',   name: 'Eijsden',               lat: 50.7767, lon: 5.7119, terminal: false, sporen: '1-2' },
      { code: 'MT',    name: 'Maastricht',            lat: 50.8500, lon: 5.7056, terminal: false, sporen: '1-6' },
      { code: 'VK',    name: 'Valkenburg',            lat: 50.8661, lon: 5.8306, terminal: false, sporen: '1-3' },
      { code: 'HRL',   name: 'Heerlen',               lat: 50.8906, lon: 5.9786, terminal: false, sporen: '1-4' },
      { code: 'LG',    name: 'Landgraaf',             lat: 50.8997, lon: 6.0306, terminal: false, sporen: '1-2' },
      { code: 'HERZ',  name: 'Herzogenrath (DE)',     lat: 50.8697, lon: 6.0986, terminal: false, sporen: '1-3' },
      { code: 'AC',    name: 'Aachen Hbf (DE)',       lat: 50.7678, lon: 6.0914, terminal: true,  sporen: '1-9' }
    ]
  },

  'qbuzz-merwede': {
    id: 'qbuzz-merwede',
    category: 'regional',
    name: 'Dordrecht ➔ Sliedrecht ➔ Gorinchem ➔ Leerdam ➔ Geldermalsen',
    shortName: 'MerwedeLingelijn (Qbuzz R-net)',
    badge: 'R-net',
    operator: 'Qbuzz (R-net)',
    primaryOpKey: 'qbuzz',
    seriesPattern: /^(367|72)\d{2}$/,
    stations: [
      { code: 'DDW', name: 'Dordrecht',        lat: 51.8106, lon: 4.6683, terminal: true,  sporen: '1-5' },
      { code: 'SDT', name: 'Sliedrecht',       lat: 51.8317, lon: 4.7736, terminal: false, sporen: '1-2' },
      { code: 'HG',  name: 'Hardinxveld-Giess.',lat: 51.8319, lon: 4.8717, terminal: false, sporen: '1-2' },
      { code: 'GR',  name: 'Gorinchem',        lat: 51.8369, lon: 4.9667, terminal: false, sporen: '1-2' },
      { code: 'LDM', name: 'Leerdam',          lat: 51.8953, lon: 5.0931, terminal: false, sporen: '1-2' },
      { code: 'GDM', name: 'Geldermalsen',     lat: 51.8803, lon: 5.2758, terminal: true,  sporen: '1-6' }
    ]
  },

  // --- C. Internationale Treinen (Eurostar, ICE, IC Berlijn) ---
  'eurostar-hsl': {
    id: 'eurostar-hsl',
    category: 'international',
    name: 'Amsterdam Centraal ➔ Schiphol ➔ Rotterdam ➔ Antwerpen ➔ Brussel / Parijs',
    shortName: 'Eurostar HSL Zuid (Parijs / Londen)',
    badge: 'Eurostar',
    operator: 'Eurostar International',
    primaryOpKey: 'eurostar',
    seriesPattern: /^(91|93|99|95)\d{2}$/,
    stations: [
      { code: 'ASD',  name: 'Amsterdam Centraal',      lat: 52.3792, lon: 4.9003, terminal: true,  sporen: '15'   },
      { code: 'SHL',  name: 'Schiphol Airport',        lat: 52.3108, lon: 4.7628, terminal: false, sporen: '5-6'  },
      { code: 'RTD',  name: 'Rotterdam Centraal',      lat: 51.9250, lon: 4.4700, terminal: false, sporen: '1-2'  },
      { code: 'ANTW', name: 'Antwerpen-Centraal (BE)', lat: 51.2172, lon: 4.4211, terminal: false, sporen: 'Int.' },
      { code: 'BRUS', name: 'Bruxelles-Midi (BE)',     lat: 50.8358, lon: 4.3364, terminal: true,  sporen: 'Int.' }
    ]
  },

  'ice-international': {
    id: 'ice-international',
    category: 'international',
    name: 'Amsterdam ➔ Utrecht ➔ Arnhem ➔ Oberhausen ➔ Duisburg ➔ Frankfurt (Main)',
    shortName: 'ICE International (Duitsland)',
    badge: 'ICE',
    operator: 'DB Fernverkehr / NS Int.',
    primaryOpKey: 'ice',
    seriesPattern: /^(1[0-5]|2[2-5])\d{1}$/,
    stations: [
      { code: 'ASD',  name: 'Amsterdam Centraal',   lat: 52.3792, lon: 4.9003, terminal: true,  sporen: '1-15' },
      { code: 'UT',   name: 'Utrecht Centraal',     lat: 52.0894, lon: 5.1103, terminal: false, sporen: '1-21' },
      { code: 'AH',   name: 'Arnhem Centraal',      lat: 51.9850, lon: 5.9006, terminal: false, sporen: '1-11' },
      { code: 'ZEV',  name: 'Zevenaar Grens (NL/DE)',lat: 51.9272, lon: 6.0847, terminal: false, sporen: 'Grens'},
      { code: 'OB',   name: 'Oberhausen Hbf (DE)',  lat: 51.4747, lon: 6.8522, terminal: false, sporen: 'Int.' },
      { code: 'DUI',  name: 'Duisburg Hbf (DE)',    lat: 51.4300, lon: 6.7761, terminal: false, sporen: 'Int.' },
      { code: 'FFM',  name: 'Frankfurt (Main) Hbf', lat: 50.1069, lon: 8.6631, terminal: true,  sporen: 'Int.' }
    ]
  },

  'ic-berlijn': {
    id: 'ic-berlijn',
    category: 'international',
    name: 'Amsterdam ➔ Amersfoort ➔ Deventer ➔ Hengelo ➔ Bad Bentheim ➔ Berlijn',
    shortName: 'Intercity Berlijn (DB / NS)',
    badge: 'IC-DE',
    operator: 'DB Fernverkehr / NS Int.',
    primaryOpKey: 'icberlijn',
    seriesPattern: /^(14|15)\d{1}$/,
    stations: [
      { code: 'ASD',  name: 'Amsterdam Centraal',    lat: 52.3792, lon: 4.9003, terminal: true,  sporen: '1-15' },
      { code: 'HVS',  name: 'Hilversum',             lat: 52.2261, lon: 5.1817, terminal: false, sporen: '1-3'  },
      { code: 'AMF',  name: 'Amersfoort Centraal',   lat: 52.1539, lon: 5.3736, terminal: false, sporen: '1-7'  },
      { code: 'APD',  name: 'Apeldoorn',             lat: 52.2094, lon: 5.9614, terminal: false, sporen: '1-4'  },
      { code: 'DV',   name: 'Deventer',              lat: 52.2575, lon: 6.1606, terminal: false, sporen: '1-4'  },
      { code: 'AML',  name: 'Almelo',                lat: 52.3578, lon: 6.6542, terminal: false, sporen: '1-4'  },
      { code: 'HGL',  name: 'Hengelo',               lat: 52.2625, lon: 6.7936, terminal: false, sporen: '1-3'  },
      { code: 'BB',   name: 'Bad Bentheim Grens(DE)',lat: 52.3086, lon: 7.1583, terminal: false, sporen: 'Grens'},
      { code: 'BERL', name: 'Berlin Hbf (DE)',       lat: 52.5250, lon: 13.3694, terminal: true, sporen: 'Int.' }
    ]
  },

  // --- D. Goederenvervoer (Betuweroute & Brabant) ---
  'freight-all': {
    id: 'freight-all',
    category: 'freight',
    name: 'Landelijke Goederencorridors (Betuweroute • Havenspoorlijn • Kijfhoek)',
    shortName: 'Landelijke Goederentreinen',
    badge: 'Cargo',
    operator: 'DB Cargo • Lineas • Rail Force One • Captrain • RTB Cargo',
    primaryOpKey: 'freight',
    seriesPattern: /^(4|5|6)\d{4}$/,
    stations: [
      { code: 'MVL',  name: 'Maasvlakte West Empl.',   lat: 51.9567, lon: 4.0150, terminal: true,  sporen: 'Goederen' },
      { code: 'WH',   name: 'Waalhaven Zuid Empl.',   lat: 51.8750, lon: 4.4350, terminal: false, sporen: 'Empl.'    },
      { code: 'KJH',  name: 'Kijfhoek Rangeerstation', lat: 51.8389, lon: 4.6067, terminal: false, sporen: 'Empl.'    },
      { code: 'GDMB', name: 'Betuweroute Geldermalsen',lat: 51.8650, lon: 5.2650, terminal: false, sporen: 'Baan'     },
      { code: 'AMFB', name: 'Amersfoort Bokkeduinen', lat: 52.1480, lon: 5.3620, terminal: false, sporen: 'Empl.'    },
      { code: 'ZEVG', name: 'Zevenaar Grens Emmerich', lat: 51.9189, lon: 6.1367, terminal: false, sporen: 'DE Grens' },
      { code: 'VLG',  name: 'Venlo Grens Kaldenkirchen',lat: 51.3650,lon: 6.1850, terminal: false, sporen: 'DE Grens' },
      { code: 'BBG',  name: 'Bad Bentheim Empl. (DE)',lat: 52.3086, lon: 7.1583, terminal: true,  sporen: 'DE Grens' }
    ]
  },

  'betuweroute': {
    id: 'betuweroute',
    category: 'freight',
    name: 'Maasvlakte ➔ Haven Rotterdam ➔ Kijfhoek ➔ Betuweroute ➔ Zevenaar Grens',
    shortName: 'Betuweroute Goederencorridor',
    badge: 'Cargo',
    operator: 'DB Cargo • Rail Force One • Lineas • Captrain',
    primaryOpKey: 'dbcargo',
    seriesPattern: /^(4|5|6)\d{4}$/,
    stations: [
      { code: 'MVL',  name: 'Maasvlakte West Empl.',   lat: 51.9567, lon: 4.0150, terminal: true,  sporen: 'Goederen' },
      { code: 'BOTL', name: 'Botlek / Havenbedrijf',   lat: 51.8847, lon: 4.3389, terminal: false, sporen: 'Goederen' },
      { code: 'KJH',  name: 'Kijfhoek Rangeerstation', lat: 51.8389, lon: 4.6067, terminal: false, sporen: 'Empl.'    },
      { code: 'ALBL', name: 'Betuweroute Alblasserw.', lat: 51.8483, lon: 4.8825, terminal: false, sporen: 'Baan'     },
      { code: 'GDMB', name: 'Betuweroute Geldermalsen',lat: 51.8650, lon: 5.2650, terminal: false, sporen: 'Baan'     },
      { code: 'TIEL', name: 'Tiel Passewaaij Goederen',lat: 51.8817, lon: 5.4117, terminal: false, sporen: 'Baan'     },
      { code: 'ELST', name: 'Betuweroute Elst Boog',   lat: 51.9167, lon: 5.8333, terminal: false, sporen: 'Baan'     },
      { code: 'ZEVG', name: 'Zevenaar Grens Emmerich', lat: 51.9189, lon: 6.1367, terminal: true,  sporen: 'DE Grens' }
    ]
  },

  'brabant-goederen': {
    id: 'brabant-goederen',
    category: 'freight',
    name: 'Kijfhoek ➔ Breda ➔ Tilburg Goederen ➔ Eindhoven ➔ Venlo Grens',
    shortName: 'Brabantroute Goederenvervoer',
    badge: 'Cargo',
    operator: 'DB Cargo • Lineas • Rail Force One',
    primaryOpKey: 'dbcargo',
    seriesPattern: /^(4|5|6)\d{4}$/,
    stations: [
      { code: 'KJH',  name: 'Kijfhoek Rangeerstation', lat: 51.8389, lon: 4.6067, terminal: true,  sporen: 'Empl.'    },
      { code: 'LZ',   name: 'Lage Zwaluwe Goederen',   lat: 51.6842, lon: 4.7003, terminal: false, sporen: 'Goederen' },
      { code: 'BDG',  name: 'Breda Goederensporen',    lat: 51.5956, lon: 4.7797, terminal: false, sporen: 'Goederen' },
      { code: 'TBG',  name: 'Tilburg Goederenempl.',   lat: 51.5606, lon: 5.0828, terminal: false, sporen: 'Goederen' },
      { code: 'EHVG', name: 'Eindhoven Goederenspoor', lat: 51.4433, lon: 5.4814, terminal: false, sporen: 'Goederen' },
      { code: 'HLM',  name: 'Helmond Spoor 3',         lat: 51.4789, lon: 5.6583, terminal: false, sporen: 'Goederen' },
      { code: 'VLG',  name: 'Venlo Grens Kaldenkirchen',lat: 51.3650,lon: 6.1850, terminal: true,  sporen: 'DE Grens' }
    ]
  },

  'havenlijn-twente': {
    id: 'havenlijn-twente',
    category: 'freight',
    name: 'Waalhaven ➔ Kijfhoek ➔ Utrecht Goederen ➔ Amersfoort ➔ Apeldoorn ➔ Deventer ➔ Almelo ➔ Hengelo ➔ Bad Bentheim',
    shortName: 'Havenspoorlijn & Oost-Goederen',
    badge: 'Cargo',
    operator: 'DB Cargo • RTB Cargo • Captrain',
    primaryOpKey: 'freight',
    seriesPattern: /^(4|5|6)\d{4}$/,
    stations: [
      { code: 'WH',   name: 'Waalhaven Zuid Empl.',   lat: 51.8750, lon: 4.4350, terminal: true,  sporen: 'Empl.'    },
      { code: 'KJH',  name: 'Kijfhoek Rangeerstation',lat: 51.8389, lon: 4.6067, terminal: false, sporen: 'Empl.'    },
      { code: 'UTG',  name: 'Utrecht Cartesiusweg',   lat: 52.0800, lon: 5.1150, terminal: false, sporen: 'Goederen' },
      { code: 'AMFB', name: 'Amersfoort Bokkeduinen', lat: 52.1480, lon: 5.3620, terminal: false, sporen: 'Empl.'    },
      { code: 'APDG', name: 'Apeldoorn Goederenspoor',lat: 52.2094, lon: 5.9614, terminal: false, sporen: 'Goederen' },
      { code: 'DVG',  name: 'Deventer Goederenspoor', lat: 52.2575, lon: 6.1606, terminal: false, sporen: 'Goederen' },
      { code: 'AMLG', name: 'Almelo Goederenspoor',   lat: 52.3578, lon: 6.6542, terminal: false, sporen: 'Goederen' },
      { code: 'HGLG', name: 'Hengelo Grensovergang',  lat: 52.2625, lon: 6.7936, terminal: false, sporen: 'Goederen' },
      { code: 'BBG',  name: 'Bad Bentheim Empl. (DE)',lat: 52.3086, lon: 7.1583, terminal: true,  sporen: 'DE Grens' }
    ]
  }
};

// Global Application State
const appState = {
  bridge: new TreinenWasmBridge(),
  map: null,
  activeCategory: 'ns',
  activeCorridorKey: 'enschede-denhaag',
  activeStatusFilter: 'all', // 'all' | 'ontime' | 'delayed' | 'pech'
  labelMode: 'minimal', // Standaard 'minimal' (Alleen Iconen) voor een rustig & overzichtelijk scherm
  motionFilter: 'all', // 'all' | 'moving' | 'standing'
  commSoundEnabled: true,
  commMessages: [],
  commUnreadCount: 0,
  commActiveFilter: 'all',
  baseLayer: 'esri',
  layers: {},
  routePolyline: null,
  stationMarkers: [],
  railcamMarkers: [],
  activeRailcamId: 'twello',
  showRailcams: true,
  trainMarkers: new Map(),
  trainMotionStates: new Map(),
  railMotionRaf: null,
  lastSimTime: 0,
  soundEnabled: true,
  audioCtx: null,
  allLiveFeatures: [],
  lastRenderedTrains: [],
  selectedTrainId: null,
  isTrackingUser: false,
  isFollowingMyTrain: true,
  geoWatchId: null,
  lastGpsFix: null,
  myTrain: null,
  trainSpeedTracker: new Map(),
  followedTrainId: null,
  lastFollowPan: 0,
  simulatedFreightFleet: null
};

// =============================================================
// 3. Authentieke Akoestische NS Stationsgong (Geen computerstem!)
// =============================================================
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

export function playAuthenticNSChime() {
  if (!appState.soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { freq: 349.23, time: 0.00 },
    { freq: 440.00, time: 0.28 },
    { freq: 523.25, time: 0.56 }
  ];

  notes.forEach(({ freq, time }) => {
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now + time);

    gain1.gain.setValueAtTime(0.001, now + time);
    gain1.gain.exponentialRampToValueAtTime(0.24, now + time + 0.03);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + time + 0.88);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now + time);

    gain2.gain.setValueAtTime(0.001, now + time);
    gain2.gain.exponentialRampToValueAtTime(0.09, now + time + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + time + 0.46);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(now + time);
    osc2.start(now + time);
    osc1.stop(now + time + 0.92);
    osc2.stop(now + time + 0.50);
  });
}

// Subtiele Authentieke GSM-R Spoorweg Mobilofoon Squelch / Chirp (Geen spraakrobot!)
export function playAuthenticRadioBeep() {
  if (!appState.soundEnabled || !appState.commSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Korte realistische GSM-R radio squelch chirp (1780Hz -> 1350Hz)
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1780, now);
  osc.frequency.exponentialRampToValueAtTime(1350, now + 0.038);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.05, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.042);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.045);

  // 2. Korte subtiele squelch click (mic key-up)
  try {
    const bufferSize = Math.floor(ctx.sampleRate * 0.015);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.02, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
  } catch (e) {
    // Fallback
  }
}

// =============================================================
// 4. Operator, Punctualiteit & Snelheidsherkenning per Trein
// =============================================================
export function detectOperator(train) {
  const rawMat = (train.matnummer || '').toLowerCase();
  const rawStr = (train.matnrString || '').toLowerCase();
  const rawCol = (train.color || '').toLowerCase();
  const num = parseInt(train.trainNum, 10) || 0;

  // 1. Eurostar / Thalys
  if (rawMat.includes('eurostar') || rawMat.includes('thalys') || rawMat.includes('pbka') ||
      rawStr.includes('eurostar') || rawStr.includes('thalys') ||
      (num >= 9100 && num <= 9399) || (num >= 9900 && num <= 9999)) {
    return OPERATORS.eurostar;
  }

  // 2. ICE International (DB Fernverkehr / NS International)
  if (rawMat.includes('ice') || rawCol.includes('ice') || rawStr.includes('ice') ||
      rawCat.includes('ice') || rawMat.includes('velaro') || rawMat.includes('br406') ||
      rawMat.includes('br407') || rawMat.includes('br408') || rawMat.includes('406') ||
      rawMat.includes('408') || (num >= 100 && num <= 159) || (num >= 220 && num <= 259) ||
      rawDest.includes('frankfurt') || rawDest.includes('basel') || rawDest.includes('köln') ||
      rawDest.includes('koln') || rawDest.includes('munchen') || rawDest.includes('münchen') ||
      (train.operator && train.operator.code && train.operator.code.toLowerCase() === 'ice')) {
    return OPERATORS.ice;
  }

  // 3. IC Berlijn
  if (rawMat.includes('berlijn') || (num >= 140 && num <= 149)) {
    return OPERATORS.icberlijn;
  }

  // 4. Arriva (Gelderland / Achterhoek, Noord, Vechtdal, Maaslijn, Limburg)
  if (rawMat.includes('arriva') || rawStr.includes('arriva') || rawCol.includes('arriva') ||
      rawMat.includes('spurt') || rawMat.includes('wink') || rawMat.includes('gtw') ||
      (num >= 17800 && num <= 17899) || (num >= 30400 && num <= 30599) || (num >= 30800 && num <= 30999) ||
      (num >= 13800 && num <= 13899) || (num >= 3800 && num <= 3899) || (num >= 31100 && num <= 31199) ||
      (num >= 18900 && num <= 18999) || (num >= 37000 && num <= 38999) || (num >= 32000 && num <= 32999)) {
    return OPERATORS.arriva;
  }

  // 5. Keolis / Blauwnet
  if (rawMat.includes('keolis') || rawMat.includes('blauwnet') || rawCol.includes('blauwnet') ||
      rawStr.includes('blauwnet') || rawMat.includes('syntus') ||
      (num >= 31200 && num <= 31299) || (num >= 7900 && num <= 7999) || (num >= 8500 && num <= 8599)) {
    return OPERATORS.blauwnet;
  }

  // 6. Qbuzz / R-net
  if (rawMat.includes('qbuzz') || rawStr.includes('qbuzz') || rawMat.includes('merwede') ||
      (num >= 36700 && num <= 36799)) {
    return OPERATORS.qbuzz;
  }

  // 7. Breng / Transdev
  if (rawMat.includes('breng') || (num >= 30700 && num <= 30799)) {
    return OPERATORS.breng;
  }

  // 8. Goederenvervoerders: DB Cargo, Rail Force One, Lineas, Captrain
  if (rawMat.includes('dbcargo') || rawStr.includes('db cargo') || rawCol.includes('dbcargo')) {
    return OPERATORS.dbcargo;
  }
  if (rawMat.includes('rfo') || rawStr.includes('rail force one') || rawMat.includes('force one')) {
    return OPERATORS.rfo;
  }
  if (rawMat.includes('lineas') || rawStr.includes('lineas')) {
    return OPERATORS.lineas;
  }
  if (rawMat.includes('captrain') || rawStr.includes('captrain')) {
    return OPERATORS.captrain;
  }
  if (num >= 40000 && num <= 69999) {
    return OPERATORS.freight;
  }
  if (rawMat.includes('goederen') || rawStr.includes('cargo') || rawMat.includes('locon') || rawMat.includes('lte') || rawMat.includes('rtb')) {
    return OPERATORS.freight;
  }

  // 9. Standaard: NS Reizigers
  return OPERATORS.ns;
}

export function getSpeedBadgeInfo(speed) {
  if (speed >= 140) {
    return {
      cssClass: 'spd-fast spd-hsl',
      icon: '⚡',
      label: `${speed} km/u`,
      text: '⚡ HSL-Zuid (Hoge Snelheid)'
    };
  } else if (speed >= 120) {
    return {
      cssClass: 'spd-fast',
      icon: '⚡',
      label: `${speed} km/u`,
      text: 'Hoge snelheid (op schema)'
    };
  } else if (speed >= 60) {
    return {
      cssClass: 'spd-cruise',
      icon: '🟢',
      label: `${speed} km/u`,
      text: 'Kruissnelheid'
    };
  } else if (speed >= 15) {
    return {
      cssClass: 'spd-slow',
      icon: '🟡',
      label: `${speed} km/u`,
      text: 'Afremmend / lokaal'
    };
  } else {
    return {
      cssClass: 'spd-stopped',
      icon: '🔴',
      label: `${speed} km/u`,
      text: 'Stilstaand / halterend'
    };
  }
}

// Bepaal de compacte weergave van de eindbestemming (behoudt altijd de volledige plaatsnaam, verkort 'Centraal' naar 'C')
export function formatDestinationDisplay(dest) {
  if (!dest || dest === 'Eindbestemming' || dest === 'Terug' || dest === 'Heen') {
    return 'Bestemming';
  }
  return dest
    .replace(/\s+Centraal\b/gi, ' C')
    .replace(/\s+Airport\b/gi, '')
    .trim();
}

// Bepaal de authentieke reizigersinformatie, treintype, bestemming en via-stations op basis van het landelijke treinnummer
export function getTrainServiceDetails(train, contextStation) {
  const num = parseInt(train.trainNum, 10) || 0;
  const op = train.operator || detectOperator(train);
  const stCode = contextStation ? contextStation.code.toUpperCase() : '';

  let serviceType = 'Trein';
  let destination = '';
  let origin = 'Vertrekstation';
  let via = '';
  let platform = '';

  // 1. Internationale Treinen
  if ((num >= 9100 && num <= 9399) || (num >= 9900 && num <= 9999)) {
    serviceType = 'Eurostar';
    destination = num % 2 === 0 ? 'Parijs Nord / Londen' : 'Amsterdam Centraal';
    origin = num % 2 === 0 ? 'Amsterdam Centraal' : 'Parijs / Londen';
    via = 'via Rotterdam C, Antwerpen, Brussel';
  } else if ((num >= 100 && num <= 129) || (num >= 220 && num <= 229)) {
    serviceType = 'ICE International';
    destination = num % 2 === 0 ? 'Frankfurt (Main) Hbf' : 'Amsterdam Centraal';
    origin = num % 2 === 0 ? 'Amsterdam Centraal' : 'Frankfurt (Main) Hbf';
    via = 'via Utrecht C, Arnhem C, Duisburg';
  } else if (num >= 140 && num <= 149) {
    serviceType = 'IC Berlijn';
    destination = num % 2 === 0 ? 'Berlijn Hbf' : 'Amsterdam Centraal';
    origin = num % 2 === 0 ? 'Amsterdam Centraal' : 'Berlijn Hbf';
    via = 'via Amersfoort C, Deventer, Bad Bentheim';
  } else if (num >= 20000 && num <= 20099) {
    serviceType = 'VIAS RE19';
    destination = num % 2 === 0 ? 'Düsseldorf Hbf' : 'Arnhem Centraal';
    origin = num % 2 === 0 ? 'Arnhem Centraal' : 'Düsseldorf Hbf';
    via = 'via Zevenaar, Emmerich, Wesel';
  } else if (num >= 20350 && num <= 20399) {
    serviceType = 'Eurobahn RB61';
    destination = num % 2 === 0 ? 'Bielefeld Hbf' : 'Hengelo';
    origin = num % 2 === 0 ? 'Hengelo' : 'Bielefeld Hbf';
    via = 'via Bad Bentheim, Rheine, Osnabrück';
  }
  // 2. Arriva Achterhoek & Vechtdal & Maaslijn & Noord
  else if ((num >= 17800 && num <= 17899) || (num >= 30400 && num <= 30599)) {
    serviceType = (num >= 17850 && num <= 17899) ? 'Sneltrein' : 'Stoptrein';
    if (num % 2 !== 0) {
      origin = 'Apeldoorn';
      destination = 'Zutphen';
      via = 'via Apeldoorn De Maten, Klarenbeek, Voorst-Empe';
    } else {
      origin = 'Zutphen';
      destination = 'Apeldoorn';
      via = 'via Voorst-Empe, Klarenbeek, Apeldoorn De Maten';
    }
    platform = (stCode === 'APD') ? '4' : (stCode === 'ZP' ? '1b' : '1');
  } else if (num >= 30800 && num <= 30999) {
    serviceType = 'Stoptrein';
    if (num % 2 !== 0) {
      origin = 'Zutphen';
      destination = 'Winterswijk';
      via = 'via Vorden, Ruurlo, Lichtenvoorde-Groenlo';
    } else {
      origin = 'Winterswijk';
      destination = 'Zutphen';
      via = 'via Lichtenvoorde-Groenlo, Ruurlo, Vorden';
    }
    platform = (stCode === 'ZP') ? '3' : '1';
  } else if (num >= 31100 && num <= 31199) {
    serviceType = 'Stoptrein';
    destination = num % 2 === 0 ? 'Arnhem Centraal' : 'Tiel';
    origin = num % 2 === 0 ? 'Tiel' : 'Arnhem Centraal';
    via = 'via Elst, Zetten-Andelst';
    platform = '1';
  } else if (num >= 30700 && num <= 30799) {
    serviceType = 'Stoptrein Breng';
    destination = num % 2 !== 0 ? 'Doetinchem' : 'Arnhem Centraal';
    origin = num % 2 !== 0 ? 'Arnhem Centraal' : 'Doetinchem';
    via = 'via Zevenaar, Didam';
    platform = '1';
  } else if (num >= 37300 && num <= 37399) {
    serviceType = 'Sneltrein RE1';
    destination = num % 2 !== 0 ? 'Groningen' : 'Leeuwarden';
    origin = num % 2 !== 0 ? 'Leeuwarden' : 'Groningen';
    via = 'via Buitenpost';
    platform = '1';
  } else if (num >= 37400 && num <= 37499) {
    serviceType = 'Stoptrein RS1';
    destination = num % 2 !== 0 ? 'Groningen' : 'Leeuwarden';
    origin = num % 2 !== 0 ? 'Leeuwarden' : 'Groningen';
    via = 'via Buitenpost, Zuidhorn';
    platform = '2';
  } else if (num >= 37200 && num <= 37299) {
    serviceType = 'Stoptrein RS2';
    destination = num % 2 !== 0 ? 'Harlingen Haven' : 'Leeuwarden';
    origin = num % 2 !== 0 ? 'Leeuwarden' : 'Harlingen Haven';
    via = 'via Franeker, Dronryp';
    platform = '1';
  } else if (num >= 37100 && num <= 37199) {
    serviceType = 'Stoptrein RS3';
    destination = num % 2 !== 0 ? 'Stavoren' : 'Leeuwarden';
    origin = num % 2 !== 0 ? 'Leeuwarden' : 'Stavoren';
    via = 'via Sneek, Workum';
    platform = '1';
  } else if (num >= 37500 && num <= 37599) {
    serviceType = 'Stoptrein RS6';
    destination = num % 2 !== 0 ? 'Delfzijl' : 'Groningen';
    origin = num % 2 !== 0 ? 'Groningen' : 'Delfzijl';
    via = 'via Appingedam';
  } else if (num >= 37600 && num <= 37699) {
    serviceType = 'Stoptrein RS7';
    destination = num % 2 !== 0 ? 'Eemshaven' : 'Groningen';
    origin = num % 2 !== 0 ? 'Groningen' : 'Eemshaven';
    via = 'via Roodeschool, Warffum';
  } else if (num >= 37700 && num <= 37799) {
    serviceType = 'Stoptrein RS5';
    destination = num % 2 !== 0 ? 'Bad Nieuweschans' : 'Groningen';
    origin = num % 2 !== 0 ? 'Groningen' : 'Bad Nieuweschans';
    via = 'via Hoogezand, Winschoten';
  } else if (num >= 37800 && num <= 37899) {
    serviceType = 'Sneltrein RE6';
    destination = num % 2 !== 0 ? 'Winschoten' : 'Groningen';
    origin = num % 2 !== 0 ? 'Groningen' : 'Winschoten';
  } else if ((num >= 13800 && num <= 13899) || (num >= 3800 && num <= 3899)) {
    serviceType = num >= 13800 ? 'Sneltrein RE20' : 'Stoptrein RS20';
    destination = num % 2 !== 0 ? 'Emmen' : 'Zwolle';
    origin = num % 2 !== 0 ? 'Zwolle' : 'Emmen';
    via = 'via Dalfsen, Ommen, Hardenberg';
    platform = '1';
  } else if (num >= 32200 && num <= 32399) {
    serviceType = 'Stoptrein RS11';
    destination = num % 2 !== 0 ? 'Roermond' : 'Nijmegen';
    origin = num % 2 !== 0 ? 'Nijmegen' : 'Roermond';
    via = 'via Boxmeer, Venray, Venlo';
    platform = '1';
  } else if (num >= 32400 && num <= 32499) {
    serviceType = 'Stoptrein RS18';
    destination = num % 2 !== 0 ? 'Kerkrade Centrum' : 'Maastricht Randwyck';
    origin = num % 2 !== 0 ? 'Maastricht Randwyck' : 'Kerkrade Centrum';
    via = 'via Valkenburg, Heerlen';
  } else if (num >= 18900 && num <= 18999) {
    serviceType = 'Drielandentrein RE18';
    destination = num % 2 !== 0 ? 'Aachen Hbf' : 'Luik-Guillemins';
    origin = num % 2 !== 0 ? 'Luik-Guillemins' : 'Aachen Hbf';
    via = 'via Maastricht, Heerlen';
  }
  // 3. Blauwnet & Keolis & Qbuzz
  else if ((num >= 31200 && num <= 31299) || (num >= 7900 && num <= 7999)) {
    serviceType = 'Stoptrein Blauwnet';
    destination = num % 2 !== 0 ? 'Enschede' : 'Zwolle';
    origin = num % 2 !== 0 ? 'Zwolle' : 'Enschede';
    via = 'via Raalte, Nijverdal, Almelo';
    platform = '1';
  } else if (num >= 8500 && num <= 8599) {
    serviceType = 'Stoptrein Blauwnet';
    destination = num % 2 !== 0 ? 'Zwolle' : 'Kampen';
    origin = num % 2 !== 0 ? 'Kampen' : 'Zwolle';
    via = 'via Kampen Zuid';
    platform = '12';
  } else if (num >= 7100 && num <= 7199) {
    serviceType = 'Stoptrein Blauwnet';
    destination = num % 2 !== 0 ? 'Hardenberg' : 'Almelo';
    origin = num % 2 !== 0 ? 'Almelo' : 'Hardenberg';
    via = 'via Mariënberg';
  } else if (num >= 7200 && num <= 7299) {
    serviceType = 'Stoptrein Blauwnet';
    destination = num % 2 !== 0 ? 'Oldenzaal' : 'Zutphen';
    origin = num % 2 !== 0 ? 'Zutphen' : 'Oldenzaal';
    via = 'via Hengelo';
  } else if (num >= 36700 && num <= 36799) {
    serviceType = 'Stoptrein R-net';
    destination = num % 2 !== 0 ? 'Geldermalsen' : 'Dordrecht';
    origin = num % 2 !== 0 ? 'Dordrecht' : 'Geldermalsen';
    via = 'via Sliedrecht, Gorinchem';
    platform = '1';
  }
  // 4. NS Intercity Hoofdlijnen
  else if (num >= 500 && num <= 599) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Groningen' : 'Den Haag Centraal';
    origin = num % 2 !== 0 ? 'Den Haag Centraal' : 'Groningen';
    via = num % 2 !== 0 ? 'via Amersfoort C, Zwolle, Assen' : 'via Amersfoort C, Utrecht C, Gouda';
  } else if (num >= 600 && num <= 699) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Leeuwarden' : 'Den Haag Centraal';
    origin = num % 2 !== 0 ? 'Den Haag Centraal' : 'Leeuwarden';
    via = num % 2 !== 0 ? 'via Amersfoort C, Zwolle, Meppel' : 'via Amersfoort C, Utrecht C, Gouda';
  } else if (num >= 700 && num <= 799) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Groningen' : 'Schiphol Airport';
    origin = num % 2 !== 0 ? 'Schiphol Airport' : 'Groningen';
    via = num % 2 !== 0 ? 'via Almere C, Lelystad C, Zwolle, Assen' : 'via Zwolle, Lelystad C, Almere C, Amsterdam Zuid';
  } else if (num >= 800 && num <= 899) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Maastricht' : 'Alkmaar / Schagen';
    origin = num % 2 !== 0 ? 'Alkmaar / Schagen' : 'Maastricht';
    via = 'via Utrecht C, Eindhoven C';
  } else if (num >= 1100 && num <= 1199) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Eindhoven Centraal' : 'Den Haag Centraal';
    origin = num % 2 !== 0 ? 'Den Haag Centraal' : 'Eindhoven Centraal';
    via = 'via Breda, Rotterdam C, Delft';
  } else if (num >= 1400 && num <= 1499) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Deventer' : 'Rotterdam Centraal';
    origin = num % 2 !== 0 ? 'Rotterdam Centraal' : 'Deventer';
    via = 'via Utrecht C, Amersfoort C, Apeldoorn';
    platform = (stCode === 'APD') ? '3' : '1';
  } else if (num >= 1500 && num <= 1599) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Deventer' : 'Amsterdam Centraal';
    origin = num % 2 !== 0 ? 'Amsterdam Centraal' : 'Deventer';
    via = 'via Hilversum, Amersfoort C, Apeldoorn';
    platform = (stCode === 'APD') ? '3' : '1';
  } else if ((num >= 1600 && num <= 1799) || (num >= 11600 && num <= 11799)) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Enschede' : 'Den Haag Centraal';
    origin = num % 2 !== 0 ? 'Den Haag Centraal' : 'Enschede';
    via = num % 2 !== 0 ? 'via Deventer, Almelo, Hengelo' : 'via Amersfoort C, Utrecht C, Gouda';
    platform = (stCode === 'APD') ? '3' : '1';
  } else if (num >= 1800 && num <= 1899) {
    serviceType = 'Intercity Direct';
    destination = num % 2 !== 0 ? 'Amersfoort Schothorst' : 'Breda';
    origin = num % 2 !== 0 ? 'Breda' : 'Amersfoort Schothorst';
    via = 'via Schiphol Airport, Rotterdam C, HSL';
  } else if (num >= 2000 && num <= 2099) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Utrecht Centraal' : 'Rotterdam Centraal';
    origin = num % 2 !== 0 ? 'Rotterdam Centraal' : 'Utrecht Centraal';
    via = 'via Gouda';
  } else if (num >= 2100 && num <= 2299) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Vlissingen' : 'Amsterdam Centraal';
    origin = num % 2 !== 0 ? 'Amsterdam Centraal' : 'Vlissingen';
    via = 'via Leiden C, Den Haag HS, Rotterdam C';
  } else if (num >= 2400 && num <= 2499) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Dordrecht' : 'Lelystad Centrum';
    origin = num % 2 !== 0 ? 'Lelystad Centrum' : 'Dordrecht';
    via = 'via Schiphol, Leiden C, Den Haag HS';
  } else if (num >= 2600 && num <= 2699) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Almere Centrum' : 'Amsterdam Centraal';
    origin = num % 2 !== 0 ? 'Amsterdam Centraal' : 'Almere Centrum';
  } else if (num >= 2800 && num <= 2899) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Utrecht Centraal' : 'Rotterdam Centraal';
    origin = num % 2 !== 0 ? 'Rotterdam Centraal' : 'Utrecht Centraal';
    via = 'via Gouda';
  } else if (num >= 2900 && num <= 2999) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Maastricht' : 'Enkhuizen';
    origin = num % 2 !== 0 ? 'Enkhuizen' : 'Maastricht';
    via = 'via Amsterdam C, Utrecht C, Eindhoven C';
  } else if (num >= 3000 && num <= 3099) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Nijmegen' : 'Den Helder';
    origin = num % 2 !== 0 ? 'Den Helder' : 'Nijmegen';
    via = 'via Alkmaar, Amsterdam C, Utrecht C, Arnhem C';
  } else if (num >= 3100 && num <= 3199) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Nijmegen' : 'Schiphol Airport';
    origin = num % 2 !== 0 ? 'Schiphol Airport' : 'Nijmegen';
    via = 'via Utrecht C, Ede-Wageningen, Arnhem C';
  } else if (num >= 3200 && num <= 3299) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Arnhem Centraal' : 'Rotterdam Centraal';
    origin = num % 2 !== 0 ? 'Rotterdam Centraal' : 'Arnhem Centraal';
    via = 'via Ede-Wageningen, Utrecht C, Gouda';
  } else if (num >= 3400 && num <= 3499) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Alkmaar' : 'Haarlem';
    origin = num % 2 !== 0 ? 'Haarlem' : 'Alkmaar';
  } else if (num >= 3500 && num <= 3599) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Venlo' : 'Schiphol Airport';
    origin = num % 2 !== 0 ? 'Schiphol Airport' : 'Venlo';
    via = 'via Utrecht C, Eindhoven C';
  } else if (num >= 3600 && num <= 3699) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Zwolle' : 'Roosendaal';
    origin = num % 2 !== 0 ? 'Roosendaal' : 'Zwolle';
    via = 'via Deventer, Zutphen, Arnhem C, Breda';
  } else if (num >= 3700 && num <= 3799) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Venlo' : 'Dordrecht';
    origin = num % 2 !== 0 ? 'Dordrecht' : 'Venlo';
    via = 'via Breda, Tilburg, Eindhoven C';
  } else if (num >= 3900 && num <= 3999) {
    serviceType = 'Intercity';
    destination = num % 2 !== 0 ? 'Heerlen' : 'Enkhuizen';
    origin = num % 2 !== 0 ? 'Enkhuizen' : 'Heerlen';
    via = 'via Amsterdam C, Utrecht C, Eindhoven C';
  } else if (num >= 4500 && num <= 4599) {
    serviceType = 'Intercity';
    destination = num % 2 === 0 ? 'Enkhuizen' : 'Amsterdam Centraal';
    origin = num % 2 === 0 ? 'Amsterdam Centraal' : 'Enkhuizen';
    via = 'via Zaandam, Hoorn';
  } else if (num >= 11400 && num <= 11499) {
    serviceType = 'Intercity';
    destination = num % 2 === 0 ? 'Gouda' : 'Rotterdam Centraal';
    origin = num % 2 === 0 ? 'Rotterdam Centraal' : 'Gouda';
  } else if (num >= 12600 && num <= 12699) {
    serviceType = 'Intercity';
    destination = num % 2 === 0 ? 'Leeuwarden' : 'Groningen';
    origin = num % 2 === 0 ? 'Groningen' : 'Leeuwarden';
  } else if (num >= 23400 && num <= 23499) {
    serviceType = 'Intercity';
    destination = num % 2 === 0 ? 'Amersfoort Centraal' : 'Apeldoorn';
    origin = num % 2 === 0 ? 'Apeldoorn' : 'Amersfoort Centraal';
  }
  // 5. NS Sprinter Lijnen
  else if (num >= 3300 && num <= 3399) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Hoorn Kersenboogerd' : 'Leiden Centraal';
    origin = num % 2 === 0 ? 'Leiden Centraal' : 'Hoorn Kersenboogerd';
    via = 'via Schiphol, Zaandam, Purmerend';
  } else if (num >= 4000 && num <= 4099) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Rotterdam Centraal' : 'Uitgeest';
    origin = num % 2 === 0 ? 'Uitgeest' : 'Rotterdam Centraal';
    via = 'via Amsterdam C, Gouda';
  } else if (num >= 4300 && num <= 4399) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Almere Oostvaarders' : 'Hoofddorp';
    origin = num % 2 === 0 ? 'Hoofddorp' : 'Almere Oostvaarders';
    via = 'via Schiphol, Amsterdam Zuid, Weesp';
  } else if (num >= 4400 && num <= 4499) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Deurne' : "'s-Hertogenbosch";
    origin = num % 2 === 0 ? "'s-Hertogenbosch" : 'Deurne';
    via = 'via Eindhoven C, Helmond';
  } else if (num >= 4600 && num <= 4699) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Amsterdam Centraal' : 'Den Haag Centraal';
    origin = num % 2 === 0 ? 'Den Haag Centraal' : 'Amsterdam Centraal';
    via = 'via Leiden C, Haarlem';
  } else if (num >= 4800 && num <= 4899) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Hoorn' : 'Amsterdam Centraal';
    origin = num % 2 === 0 ? 'Amsterdam Centraal' : 'Hoorn';
    via = 'via Zaandam, Purmerend';
  } else if (num >= 4900 && num <= 4999) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Almere Centrum' : 'Utrecht Centraal';
    origin = num % 2 === 0 ? 'Utrecht Centraal' : 'Almere Centrum';
    via = 'via Hilversum';
  } else if (num >= 5000 && num <= 5199) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Dordrecht' : 'Den Haag Centraal';
    origin = num % 2 === 0 ? 'Den Haag Centraal' : 'Dordrecht';
    via = 'via Delft, Rotterdam C';
  } else if (num >= 5200 && num <= 5299) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Uitgeest' : 'Rotterdam Centraal';
    origin = num % 2 === 0 ? 'Rotterdam Centraal' : 'Uitgeest';
    via = 'via Breukelen, Amsterdam C, Zaandam';
  } else if (num >= 5400 && num <= 5499) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Zandvoort aan Zee' : 'Amsterdam Centraal';
    origin = num % 2 === 0 ? 'Amsterdam Centraal' : 'Zandvoort aan Zee';
    via = 'via Haarlem';
  } else if (num >= 5500 && num <= 5599) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Baarn' : 'Utrecht Centraal';
    origin = num % 2 === 0 ? 'Utrecht Centraal' : 'Baarn';
    via = 'via Soest';
  } else if (num >= 5600 && num <= 5699) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Zwolle' : 'Utrecht Centraal';
    origin = num % 2 === 0 ? 'Utrecht Centraal' : 'Zwolle';
    via = 'via Amersfoort C, Harderwijk';
  } else if (num >= 5700 && num <= 5799) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Hoofddorp' : 'Utrecht Centraal';
    origin = num % 2 === 0 ? 'Utrecht Centraal' : 'Hoofddorp';
    via = 'via Hilversum, Weesp, Schiphol';
  } else if (num >= 5800 && num <= 5899) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Amsterdam Centraal' : 'Amersfoort Vathorst';
    origin = num % 2 === 0 ? 'Amersfoort Vathorst' : 'Amsterdam Centraal';
    via = 'via Hilversum, Weesp';
  } else if (num >= 5900 && num <= 5999) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Roosendaal' : 'Dordrecht';
    origin = num % 2 === 0 ? 'Dordrecht' : 'Roosendaal';
    via = 'via Lage Zwaluwe';
  } else if (num >= 6000 && num <= 6099) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Tiel' : 'Utrecht Centraal';
    origin = num % 2 === 0 ? 'Utrecht Centraal' : 'Tiel';
    via = 'via Geldermalsen';
  } else if (num >= 6100 && num <= 6199) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Woerden' : 'Utrecht Centraal';
    origin = num % 2 === 0 ? 'Utrecht Centraal' : 'Woerden';
  } else if (num >= 6300 && num <= 6399) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Haarlem' : 'Den Haag Centraal';
    origin = num % 2 === 0 ? 'Den Haag Centraal' : 'Haarlem';
    via = 'via Leiden C';
  } else if (num >= 6400 && num <= 6499) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Weert' : 'Tilburg Universiteit';
    origin = num % 2 === 0 ? 'Tilburg Universiteit' : 'Weert';
    via = 'via Eindhoven C';
  } else if (num >= 6600 && num <= 6699) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Arnhem Centraal' : 'Dordrecht';
    origin = num % 2 === 0 ? 'Dordrecht' : 'Arnhem Centraal';
    via = 'via Breda, Tilburg, Den Bosch, Nijmegen';
  } else if ((num >= 6700 && num <= 6799) || (num >= 8900 && num <= 8999)) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Alphen aan den Rijn' : 'Leiden Centraal';
    origin = num % 2 === 0 ? 'Leiden Centraal' : 'Alphen aan den Rijn';
  } else if (num >= 6800 && num <= 6899) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Gouda Goverwelle' : 'Den Haag Centraal';
    origin = num % 2 === 0 ? 'Den Haag Centraal' : 'Gouda Goverwelle';
    via = 'via Voorburg, Zoetermeer';
  } else if (num >= 6900 && num <= 6999) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Breda' : 'Den Haag Centraal';
    origin = num % 2 === 0 ? 'Den Haag Centraal' : 'Breda';
    via = 'via Rotterdam C, Dordrecht';
  } else if (num >= 7000 && num <= 7099) {
    serviceType = 'Sprinter';
    destination = num % 2 !== 0 ? 'Enschede' : 'Apeldoorn';
    origin = num % 2 !== 0 ? 'Apeldoorn' : 'Enschede';
    via = 'via Deventer, Almelo, Hengelo';
    platform = (stCode === 'APD') ? '3b' : '1';
  } else if (num >= 7300 && num <= 7399) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Rhenen' : 'Breukelen';
    origin = num % 2 === 0 ? 'Breukelen' : 'Rhenen';
    via = 'via Utrecht C, Driebergen-Zeist';
  } else if (num >= 7400 && num <= 7499) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Uitgeest' : 'Rhenen';
    origin = num % 2 === 0 ? 'Rhenen' : 'Uitgeest';
    via = 'via Driebergen-Zeist, Utrecht C, Amsterdam C';
  } else if (num >= 7500 && num <= 7599) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Ede-Wageningen' : 'Arnhem Centraal';
    origin = num % 2 === 0 ? 'Arnhem Centraal' : 'Ede-Wageningen';
  } else if (num >= 7600 && num <= 7699) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Zutphen' : 'Wijchen';
    origin = num % 2 === 0 ? 'Wijchen' : 'Zutphen';
    via = 'via Nijmegen, Arnhem C, Dieren';
  } else if (num >= 7700 && num <= 7799) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Gouda Goverwelle' : 'Rotterdam Centraal';
    origin = num % 2 === 0 ? 'Rotterdam Centraal' : 'Gouda Goverwelle';
  } else if (num >= 8000 && num <= 8099) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Utrecht Centraal' : 'Zwolle';
    origin = num % 2 === 0 ? 'Zwolle' : 'Utrecht Centraal';
    via = 'via Amersfoort C';
  } else if (num >= 8100 && num <= 8199) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Groningen' : 'Zwolle';
    origin = num % 2 === 0 ? 'Zwolle' : 'Groningen';
    via = 'via Meppel, Assen';
  } else if (num >= 8600 && num <= 8799) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Gouda' : 'Alphen aan den Rijn';
    origin = num % 2 === 0 ? 'Alphen aan den Rijn' : 'Gouda';
  } else if (num >= 8800 && num <= 8899) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Utrecht Centraal' : 'Leiden Centraal';
    origin = num % 2 === 0 ? 'Leiden Centraal' : 'Utrecht Centraal';
    via = 'via Alphen a/d Rijn, Woerden';
  } else if (num >= 9000 && num <= 9099) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Meppel' : 'Leeuwarden';
    origin = num % 2 === 0 ? 'Leeuwarden' : 'Meppel';
    via = 'via Heerenveen, Wolvega';
  } else if (num >= 12200 && num <= 12299) {
    serviceType = 'Sprinter';
    destination = num % 2 === 0 ? 'Vlissingen' : 'Roosendaal';
    origin = num % 2 === 0 ? 'Roosendaal' : 'Vlissingen';
    via = 'via Goes, Middelburg';
  }
  // 6. Goederenvervoer
  else if ((num >= 40000 && num <= 69999) || op.category === 'freight') {
    serviceType = 'Goederentrein';
    if (train.exactDestination) {
      destination = train.exactDestination;
    } else if (train.service && train.service.destination) {
      destination = train.service.destination;
    } else {
      destination = num % 2 !== 0 ? 'Bad Bentheim Grens (DE)' : 'Kijfhoek Emplacement';
    }
    origin = (train.service && train.service.origin) ? train.service.origin : (num % 2 !== 0 ? 'Kijfhoek (Rotterdam)' : 'Bad Bentheim Grens (DE)');
    via = (train.service && train.service.via) ? train.service.via : 'via Betuweroute / Havenspoorlijn';
  }

  // 7. Contextuele herleiding als de treinserie niet expliciet in de lijst staat
  if (!destination || destination === 'Eindbestemming') {
    serviceType = (op.category === 'ns') ? 'Reizigerstrein' : 'Regionale Trein';
    if (train.exactDestination) {
      destination = train.exactDestination;
    } else if (contextStation && contextStation.corridorName) {
      const parts = contextStation.corridorName.split('➔');
      destination = (train.isReverse ? parts[0] : parts[parts.length - 1]).trim();
    } else if (train.targetStation && train.targetStation.name) {
      destination = train.targetStation.name;
    } else if (train.toStation && train.toStation.name) {
      destination = train.toStation.name;
    } else if (contextStation && contextStation.name) {
      destination = contextStation.name;
    }
    if (!destination || destination === 'Eindbestemming') {
      const opCode = (op && op.code) ? op.code.toLowerCase() : '';
      if (opCode.includes('arriva')) {
        destination = (num % 2 === 0) ? 'Apeldoorn' : 'Zutphen';
      } else if (opCode.includes('blauwnet') || opCode.includes('keolis')) {
        destination = (num % 2 === 0) ? 'Enschede' : 'Zwolle';
      } else if (opCode.includes('qbuzz')) {
        destination = (num % 2 === 0) ? 'Dordrecht' : 'Geldermalsen';
      } else {
        destination = (num % 2 === 0) ? 'Utrecht Centraal' : 'Amsterdam Centraal';
      }
    }
    via = 'Vastgesteld dienstregelingtraject';
  }

  if (!platform) {
    platform = assignPlatform(contextStation ? contextStation.sporen : '1-4', train.trainNum);
  }

  return {
    serviceType,
    destination,
    origin,
    via,
    operator: op,
    platform,
    displayTitle: `${serviceType} naar ${destination}`
  };
}

// =============================================================
// 5. Leaflet Satellietkaart Initialisatie
// =============================================================
function initMap() {
  const map = L.map('map', {
    center: [52.20, 5.70],
    zoom: 9,
    zoomControl: false
  });

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  const esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri &bull; Maxar &bull; Echte Satellietbeelden',
    maxZoom: 19
  });

  const pdok = L.tileLayer('https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_orthoHR/EPSG:3857/{z}/{x}/{y}.jpeg', {
    attribution: '&copy; PDOK Luchtfoto Nederland',
    maxZoom: 19
  });

  // 100% Gratis en open Nacht Radar (Esri Dark Canvas - Geen API Key vereist!)
  const darkBase = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri &bull; Nacht Radar Nederland',
    maxZoom: 19,
    maxNativeZoom: 16
  });

  const darkLabels = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
    attribution: '',
    maxZoom: 19,
    maxNativeZoom: 16
  });

  const dark = L.layerGroup([darkBase, darkLabels]);

  esri.addTo(map);
  appState.map = map;
  appState.layers = { esri, pdok, dark };
  renderRailcamMarkers();

  // Vingeraanraking op de satellietkaart: activeer direct station of trein onder je vinger
  map.on('click', (e) => {
    const clickLat = e.latlng.lat;
    const clickLon = e.latlng.lng;

    // 1. Zoek dichtstbijzijnde live trein onder de vingertop (binnen 2.8 km)
    const allParsed = getActiveParsedTrains();
    let nearestTrain = null;
    let minTrainDist = Infinity;
    allParsed.forEach(t => {
      const d = distanceKm(clickLat, clickLon, t.lat, t.lon);
      if (d < minTrainDist) {
        minTrainDist = d;
        nearestTrain = t;
      }
    });

    // 2. Zoek dichtstbijzijnde station onder de vingertop (binnen 3.8 km)
    const stations = getAllStations();
    let nearestStation = null;
    let minStationDist = Infinity;
    stations.forEach(st => {
      const d = distanceKm(clickLat, clickLon, st.lat, st.lon);
      if (d < minStationDist) {
        minStationDist = d;
        nearestStation = st;
      }
    });

    // Prioriteer de actie die het dichtst bij de vingeraanraking ligt
    if (nearestTrain && minTrainDist <= 2.8 && minTrainDist <= minStationDist) {
      window.selectTrain(nearestTrain.id);
      return;
    }

    if (nearestStation && minStationDist <= 3.8) {
      window.selectStation(nearestStation.code);
      return;
    }
  });

  // Herschik en declutter labels bij zoomen om overlappende treinnummers te voorkomen
  map.on('zoomend', () => {
    if (appState.lastRenderedTrains && appState.lastRenderedTrains.length > 0) {
      renderMapTrains(appState.lastRenderedTrains);
    }
  });

  // Als de gebruiker zelf de kaart versleept, ontkoppel de automatische camera-volgfunctie
  map.on('dragstart', () => {
    if (appState.followedTrainId) {
      stopFollowingTrain();
    }
  });

  // Dropdown menu's voor kaartweergave en labels
  document.getElementById('mapLayerSelect')?.addEventListener('change', (e) => {
    switchLayer(e.target.value);
  });

  document.getElementById('labelDensitySelect')?.addEventListener('change', (e) => {
    appState.labelMode = e.target.value;
    if (appState.lastRenderedTrains && appState.lastRenderedTrains.length > 0) {
      renderMapTrains(appState.lastRenderedTrains);
    }
  });

  document.getElementById('motionFilterSelect')?.addEventListener('change', (e) => {
    appState.motionFilter = e.target.value;
    if (appState.lastRenderedTrains && appState.lastRenderedTrains.length > 0) {
      renderMapTrains(appState.lastRenderedTrains);
    }
    updateLineOverview();
  });

  document.getElementById('btnSatEsri')?.addEventListener('click', () => switchLayer('esri'));
  document.getElementById('btnSatPdok')?.addEventListener('click', () => switchLayer('pdok'));
  document.getElementById('btnMapDark')?.addEventListener('click', () => switchLayer('dark'));
}

function switchLayer(name) {
  const map = appState.map;
  ['esri', 'pdok', 'dark'].forEach(k => {
    const layer = appState.layers[k];
    if (layer) {
      map.removeLayer(layer);
    }
  });
  appState.layers[name].addTo(map);
  appState.baseLayer = name;

  // Sync de kaartlaag dropdown
  const select = document.getElementById('mapLayerSelect');
  if (select && select.value !== name) {
    select.value = name;
  }

  ['btnSatEsri', 'btnSatPdok', 'btnMapDark'].forEach(id => {
    document.getElementById(id)?.classList.remove('active');
  });
  if (name === 'esri') document.getElementById('btnSatEsri')?.classList.add('active');
  if (name === 'pdok') document.getElementById('btnSatPdok')?.classList.add('active');
  if (name === 'dark') document.getElementById('btnMapDark')?.classList.add('active');
}

// Teken Corridor op Satellietkaart (Rustig & Schoon)
function renderCorridorOnMap(corridor) {
  const map = appState.map;

  if (appState.routePolyline) {
    appState.routePolyline.remove();
  }
  appState.stationMarkers.forEach(m => m.remove());
  appState.stationMarkers = [];

  if (!corridor) {
    map.flyTo([52.1326, 5.2913], 8, { duration: 1.0 });
    return;
  }

  const latlngs = corridor.stations.map(s => [s.lat, s.lon]);
  const isFreightCorridor = corridor.category === 'freight';
  const isHslCorridor = !!corridor.isHsl;
  const lineColor = isFreightCorridor ? '#ea580c' : (isHslCorridor ? '#38bdf8' : '#ffc917');

  appState.routePolyline = L.polyline(latlngs, {
    color: lineColor,
    weight: isHslCorridor ? 5.5 : (isFreightCorridor ? 5.0 : 4.5),
    opacity: 0.95,
    dashArray: isFreightCorridor ? '10, 5' : (isHslCorridor ? '12, 4' : '8, 4'),
    lineJoin: 'round'
  }).addTo(map);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 680;

  corridor.stations.forEach((st, i) => {
    const isTerm = st.terminal;
    const marker = L.circleMarker([st.lat, st.lon], {
      radius: isMobile ? (isTerm ? 6 : 4.5) : (isTerm ? 9 : 6.5),
      fillColor: isTerm ? '#ffffff' : lineColor,
      color: '#001948',
      weight: isMobile ? 1.5 : 2.5,
      fillOpacity: 1.0
    }).addTo(map);

    // Compacte stationaanduiding: alleen de stationsnaam in subtiele afgeronde pil-badge ipv groot 4kant blok
    marker.bindTooltip(`<strong>${st.name}</strong>`, {
      permanent: isTerm,
      direction: 'top',
      offset: [0, isMobile ? -5 : -8],
      className: 'station-map-tooltip'
    });

    marker.on('click', (e) => {
      if (e && e.originalEvent) {
        e.originalEvent.stopPropagation();
      }
      window.selectStation(st.code);
    });

    appState.stationMarkers.push(marker);
  });

  const bounds = L.latLngBounds(latlngs);
  map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13, animate: true, duration: 1.2 });
}

// =============================================================
// 6. Live Treinen Ophalen, Parsen & Status Classificeren
// =============================================================
function fetchLiveTrains() {
  return new Promise((resolve) => {
    let resolved = false;

    const script = document.createElement('script');
    script.id = 'liveTrainTelemetryScript';
    script.src = `https://treinposities.nl/treinen.php?pos=1&_t=${Date.now()}`;
    script.async = true;

    function cleanup() {
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window.eqfeed_callback = (data) => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve(data);
      }
    };

    script.onerror = () => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve(null);
      }
    };
    document.head.appendChild(script);

    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve(null);
      }
    }, 4500);
  });
}

// =============================================================
// Toast Feedback Notificaties (Smooth, donker glassmorphism)
// =============================================================
export function showFeedbackToast(msg, type = 'success') {
  let toastEl = document.getElementById('appToastPill');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'appToastPill';
    toastEl.className = 'app-toast-pill';
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  toastEl.className = `app-toast-pill ${type === 'error' ? 'toast-error' : ''} is-visible`;
  clearTimeout(toastEl._timer);
  toastEl._timer = setTimeout(() => {
    toastEl.classList.remove('is-visible');
  }, 2600);
}
window.showFeedbackToast = showFeedbackToast;

let checkVersionGlobal = null;

// Handmatige live verversing van alle treinen, radarstatistieken en versiecheck
export async function forceRefreshTrains() {
  const dockBtn = document.getElementById('btnDockRefresh');
  const dockIcon = dockBtn?.querySelector('.dock-icon');
  const dockLabel = dockBtn?.querySelector('.dock-label');

  const headerBtn = document.getElementById('btnHeaderForceRefresh');
  const headerIcon = headerBtn?.querySelector('.tab-icon');
  const headerPill = headerBtn?.querySelector('.tab-pill');

  const plannerBtn = document.getElementById('btnForceRefresh');

  // Directe visuele animatie & feedback op alle knoppen
  if (dockIcon) dockIcon.classList.add('is-spinning');
  if (dockLabel) dockLabel.textContent = 'Laden...';
  if (headerIcon) headerIcon.classList.add('is-spinning');
  if (headerPill) headerPill.textContent = '⏳ Laden';
  if (plannerBtn) plannerBtn.innerHTML = '<span>⏳ Laden...</span>';

  try {
    // 1. Controleer direct of er een nieuwere app-versie op GitHub staat
    if (typeof checkVersionGlobal === 'function') {
      checkVersionGlobal(false);
    }

    // 2. Haal de nieuwste live telemetrie op
    const data = await fetchLiveTrains();
    const count = (data && data.features) ? data.features.length : 0;
    if (data && data.features) {
      appState.allLiveFeatures = data.features;
      updateLineOverview();
      playAuthenticNSChime();
    }

    // 3. Als GPS tracking actief is: direct Mijn Trein herberekenen met de nieuwste live data
    if (appState.isTrackingUser && appState.lastGpsFix) {
      onLiveLocationFix({
        coords: {
          latitude: appState.lastGpsFix.lat,
          longitude: appState.lastGpsFix.lon,
          accuracy: appState.lastGpsFix.acc || 15,
          speed: (appState.lastGpsFix.speed !== null && appState.lastGpsFix.speed !== undefined ? appState.lastGpsFix.speed / 3.6 : null),
          heading: appState.lastGpsFix.heading
        }
      });
    }

    // 4. Toon duidelijke, elegante feedback toast conform richtlijn 6
    showFeedbackToast(`✓ ${count} treinen live bijgewerkt`, 'success');

    if (dockLabel) dockLabel.textContent = '✓ Klaar';
    if (headerPill) headerPill.textContent = '✓ Actueel';
  } catch (e) {
    console.warn('Ververs fout:', e);
    showFeedbackToast('⚠️ Verversen mislukt, probeer opnieuw', 'error');
  } finally {
    setTimeout(() => {
      if (dockIcon) dockIcon.classList.remove('is-spinning');
      if (dockLabel) dockLabel.textContent = 'Ververs';
      if (headerIcon) headerIcon.classList.remove('is-spinning');
      if (headerPill) headerPill.textContent = 'Update';
      if (plannerBtn) plannerBtn.innerHTML = '🔄 Ververs Info';
    }, 1500);
  }
}
window.forceRefreshTrains = forceRefreshTrains;

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Bereken de afstand tot het dichtstbijzijnde officiële station (in km)
function getDistanceToNearestStation(lat, lon) {
  let minDist = Infinity;
  const stations = window.ALL_NL_STATIONS || [];
  for (let i = 0; i < stations.length; i++) {
    const s = stations[i];
    if (Math.abs(s.lat - lat) > 0.05 || Math.abs(s.lon - lon) > 0.08) continue;
    const d = distanceKm(lat, lon, s.lat, s.lon);
    if (d < minDist) {
      minDist = d;
      if (minDist < 0.25) return minDist;
    }
  }
  return minDist;
}

// Bepaal de actuele, reële telemetrie-snelheid van een trein.
// Rijdende treinen mogen NOOIT op 0 km/u blijven staan als de externe bron geen expliciete string bevat!
function resolveTrainSpeed(trainId, lat, lon, matnrString, props, color, delayMin, isPechText) {
  // 1. Directe telemetrie-uitlezing uit eigenschappen of matnr-string
  let explicitSpeed = null;
  const spdMatch = matnrString.match(/@\s*(\d+)\s*(?:km\/h|km\/u|kmh|kph)/i) ||
                   matnrString.match(/(\d+)\s*(?:km\/h|km\/u)/i);
  if (spdMatch) {
    explicitSpeed = parseInt(spdMatch[1], 10);
  } else if (typeof props.speed === 'number' && !isNaN(props.speed) && props.speed >= 0) {
    explicitSpeed = Math.round(props.speed);
  } else if (typeof props.snelheid === 'number' && !isNaN(props.snelheid) && props.snelheid >= 0) {
    explicitSpeed = Math.round(props.snelheid);
  } else if (typeof props.speed === 'string') {
    const m = props.speed.match(/(\d+)/);
    if (m) explicitSpeed = parseInt(m[1], 10);
  }

  const now = Date.now();
  const prev = appState.trainSpeedTracker.get(trainId);

  // Als de externe feed een actuele positieve snelheid meldt: opslaan en direct gebruiken
  if (explicitSpeed !== null && explicitSpeed > 0) {
    // Veiligheidssperre: als een externe feed ooit een foutieve waarde meldt (> 200 km/u)
    if (explicitSpeed > 200) {
      explicitSpeed = 130;
    }
    appState.trainSpeedTracker.set(trainId, {
      lat,
      lon,
      time: now,
      speed: explicitSpeed,
      lastMoveTime: now
    });
    return explicitSpeed;
  }

  // 2. Geen expliciete snelheid in telemetrie (bv. Arriva, Blauwnet, Keolis of regionale lijnen):
  // Bereken de actuele fysieke snelheid via opeenvolgende GPS updates (dead-reckoning delta)
  let calculatedGpsSpeed = 0;
  let hasMoved = false;

  if (prev && prev.lat !== undefined && prev.time) {
    const dtSeconds = Math.max(0.8, (now - prev.time) / 1000);
    const distMeters = distanceKm(prev.lat, prev.lon, lat, lon) * 1000;

    // Als de trein zich tussen twee polls fysiek verplaatst heeft
    if (distMeters >= 8 && dtSeconds <= 50) {
      hasMoved = true;
      const rawCalc = Math.round((distMeters / dtSeconds) * 3.6);

      // Bepaal maximaal toegestane snelheid op basis van materieeltype
      let maxSpeed = 140;
      const colLow = (color || '').toLowerCase();
      if (colLow.includes('icng') || colLow.includes('eurostar') || colLow.includes('thalys') || colLow.includes('ice')) {
        maxSpeed = 200;
      } else if (colLow.includes('virm') || colLow.includes('icm') || colLow.includes('icr') || colLow.includes('traxx')) {
        maxSpeed = 160;
      }

      if (rawCalc >= 5 && rawCalc <= maxSpeed) {
        calculatedGpsSpeed = prev.speed > 5 ? Math.round(0.65 * rawCalc + 0.35 * prev.speed) : rawCalc;
      } else if (rawCalc > maxSpeed) {
        calculatedGpsSpeed = maxSpeed;
      }
    }
  }

  if (hasMoved && calculatedGpsSpeed > 5) {
    appState.trainSpeedTracker.set(trainId, {
      lat,
      lon,
      time: now,
      speed: calculatedGpsSpeed,
      lastMoveTime: now
    });
    return calculatedGpsSpeed;
  }

  // 3. Controleer of de trein zich op het vrije baanvak tussen stations bevindt:
  const nearStDist = getDistanceToNearestStation(lat, lon);
  const isNearStation = nearStDist <= 0.60;

  if (!isNearStation && !isPechText && delayMin < 10) {
    // De trein bevindt zich op het open spoor tussen stations en rijdt!
    if (prev && prev.speed > 5) {
      const timeSinceMove = (now - (prev.lastMoveTime || prev.time)) / 1000;
      if (timeSinceMove < 35) {
        // Behoud actuele rijsnelheid tijdens de intervalpauzes van de externe bron
        appState.trainSpeedTracker.set(trainId, {
          lat: prev.lat,
          lon: prev.lon,
          time: now,
          speed: prev.speed,
          lastMoveTime: prev.lastMoveTime || now
        });
        return prev.speed;
      }
    }

    // Eerste waarneming op het vrije spoor of ontbrekende feed-snelheid:
    const colLow = (color || '').toLowerCase();
    const isHslZone = (lat <= 52.32 && lat >= 51.58 && lon >= 4.40 && lon <= 4.82);
    const isHslTrain = (colLow.includes('icng') || colLow.includes('direct') || colLow.includes('hsl') || colLow.includes('eurostar') || colLow.includes('thalys') || (trainId && (trainId.startsWith('11') || trainId.startsWith('24') || trainId.startsWith('92'))));
    let cruiseSpeed = 92;

    if (isHslZone && isHslTrain) {
      cruiseSpeed = 160; // HSL-Zuid topsnelheid voor IC Direct en ICNG
    } else if (colLow.includes('arriva') || colLow.includes('gtw') || colLow.includes('flirt') || colLow.includes('spurt')) {
      cruiseSpeed = 90; // Arriva regionale lijnsnelheid (bv. Apeldoorn - Zutphen)
    } else if (colLow.includes('blauwnet') || colLow.includes('keolis') || colLow.includes('qbuzz')) {
      cruiseSpeed = 95;
    } else if (colLow.includes('icng') || colLow.includes('virm') || colLow.includes('icm')) {
      cruiseSpeed = 130;
    } else if (colLow.includes('sprinter') || colLow.includes('sgm') || colLow.includes('slto') || colLow.includes('flirt')) {
      cruiseSpeed = 90;
    }

    appState.trainSpeedTracker.set(trainId, {
      lat,
      lon,
      time: now,
      speed: cruiseSpeed,
      lastMoveTime: now
    });
    return cruiseSpeed;
  }

  // 4. De trein staat stil bij een station (< 600m van een perron)
  appState.trainSpeedTracker.set(trainId, {
    lat,
    lon,
    time: now,
    speed: 0,
    lastMoveTime: prev?.lastMoveTime || 0
  });
  return 0;
}

export function parseTrain(raw) {
  if (!raw || !raw.geometry || !raw.geometry.coordinates) return null;
  const coords = raw.geometry.coordinates;
  const lat = parseFloat(coords[0]);
  const lon = parseFloat(coords[1]);
  if (isNaN(lat) || isNaN(lon)) return null;

  const props = raw.properties || {};
  const matnrString = props.matnr || '';
  const matnummer = props.matnummer || '';
  const color = props.color || '';

  // Treinnummer detectie
  let trainNum = '';
  const trExplicit = matnrString.match(/(?:trein|rit|tr)\.?\s*(\d+)/i);
  if (trExplicit) {
    trainNum = trExplicit[1];
  } else {
    // Zoek 5-cijferig dienstregelingnummer (bv. 30418, 17855, 31250) of 4-cijferig (bv. 1450, 1642)
    const m5 = matnrString.match(/\b([1-9]\d{4})\b/);
    const m4 = matnrString.match(/\b([1-9]\d{3})\b/);
    if (m5) trainNum = m5[1];
    else if (m4) trainNum = m4[1];
    else {
      const anyNum = matnrString.match(/\b(\d+)\b/);
      if (anyNum) trainNum = anyNum[1];
      else trainNum = matnummer.replace(/\D/g, '') || '0';
    }
  }

  // Vertraging & Pech analyse
  let delayMin = 0;
  if (typeof props.vertraging === 'number') {
    delayMin = props.vertraging > 60 ? Math.round(props.vertraging / 60) : props.vertraging;
  } else if (typeof props.vertraging === 'string') {
    const m = props.vertraging.match(/\+?(\d+)/);
    if (m) delayMin = parseInt(m[1], 10);
  } else if (typeof props.delay === 'number') {
    delayMin = props.delay > 60 ? Math.round(props.delay / 60) : props.delay;
  }

  const allText = `${matnrString} ${props.info || ''} ${props.status || ''}`;
  const delMatch = allText.match(/\+(\d+)\s*m/i) || allText.match(/\+(\d+)/);
  if (delMatch && delayMin === 0) {
    delayMin = parseInt(delMatch[1], 10);
  }

  // Pech / Gestrand / Defect detectie
  const isPechText = /pech|defect|gestrand|storing|kapot|ongeval|brand|aanrijding/i.test(allText);

  // Snelheid detectie via telemetrie, GPS delta of reële baansnelheid
  const trainId = `${matnummer}_${trainNum}`;
  const speed = resolveTrainSpeed(trainId, lat, lon, matnrString, props, color, delayMin, isPechText);

  let isPechFlag = isPechText ? 1 : 0;
  if (delayMin >= 10) isPechFlag = 1;
  if (speed === 0 && delayMin >= 5) isPechFlag = 1;

  // WASM status classificatie: 0 = ontime, 1 = delayed, 2 = pech
  const statusCode = appState.bridge.classifyStatus(speed, delayMin, isPechFlag);
  const statusType = statusCode === 2 ? 'pech' : (statusCode === 1 ? 'delayed' : 'ontime');

  const puncScore = appState.bridge.calculatePunctuality(speed, delayMin * 60);

  const train = {
    id: trainId,
    trainNum,
    matnummer,
    matnrString,
    color,
    lat,
    lon,
    speed,
    delayMin,
    statusType, // 'ontime' | 'delayed' | 'pech'
    isPech: statusCode === 2,
    puncScore,
    gpsdata: props.gpsdata || 'Zojuist'
  };

  // Live feed bestemming detectie (indien aanwezig in treinposities.nl properties of info)
  let feedDest = '';
  if (props.bestemming && typeof props.bestemming === 'string') feedDest = props.bestemming.trim();
  else if (props.destination && typeof props.destination === 'string') feedDest = props.destination.trim();
  else if (props.eindbestemming && typeof props.eindbestemming === 'string') feedDest = props.eindbestemming.trim();
  else if (props.dest && typeof props.dest === 'string') feedDest = props.dest.trim();
  else {
    const destMatch = allText.match(/(?:➔|->|\bnaar\b)\s*([A-Z][a-zA-Z\s\-]+?)(?:\s*(?:via|spoor|@|\+|\(|$))/i);
    if (destMatch && destMatch[1]) {
      const cand = destMatch[1].trim();
      if (cand.length > 2 && !/^(trein|rit|rijdt|uur|min|station|stel|stellen|spoor|ontime|pech|vertraging)/i.test(cand)) {
        feedDest = cand;
      }
    }
  }

  train.operator = detectOperator(train);
  train.service = getTrainServiceDetails(train);
  train.exactDestination = feedDest || ((train.service && train.service.destination && train.service.destination !== 'Eindbestemming') ? train.service.destination : '');
  if (feedDest && train.service) {
    train.service.destination = feedDest;
  }
  train.unitsCount = 1;
  return train;
}

// =============================================================
// Gekoppelde Treinstellen Samenvoegen tot 1 Blokje met Cijfer
// (Als er een trein rijdt met 2 aan elkaar gekoppelde treinen, toon 1 blokje met cijfer 1 of 2 of meer)
// =============================================================
export function groupCoupledTrains(trainList) {
  if (!trainList || !trainList.length) return [];

  const grouped = [];
  const processed = new Set();

  for (let i = 0; i < trainList.length; i++) {
    if (processed.has(i)) continue;
    const t = trainList[i];
    processed.add(i);

    const group = [t];
    const num = t.trainNum;

    // Koppel treinen met hetzelfde treinnummer binnen een redelijke fysieke afstand (< 4.0 km)
    if (num && num !== '0') {
      for (let j = i + 1; j < trainList.length; j++) {
        if (processed.has(j)) continue;
        const other = trainList[j];
        if (other.trainNum === num) {
          const d = distanceKm(t.lat, t.lon, other.lat, other.lon);
          if (d <= 4.0) {
            group.push(other);
            processed.add(j);
          }
        }
      }
    }

    if (group.length === 1) {
      t.unitsCount = 1;
      t.coupledMats = [t.matnummer || t.matnrString || 'Standaard'];
      grouped.push(t);
    } else {
      const count = group.length;
      const avgLat = group.reduce((sum, g) => sum + g.lat, 0) / count;
      const avgLon = group.reduce((sum, g) => sum + g.lon, 0) / count;
      const maxSpeed = Math.max(...group.map(g => g.speed || 0));
      const maxDelay = Math.max(...group.map(g => g.delayMin || 0));
      const hasPech = group.some(g => g.isPech);

      const rawMats = group.map(g => g.matnummer || g.matnrString).filter(Boolean);
      const uniqueMats = [...new Set(rawMats)];

      const lead = group[0];
      const opCode = lead.operator ? lead.operator.code.toLowerCase() : 'ns';
      const mergedId = (num && num !== '0')
        ? `train_${num}_${opCode}`
        : `${lead.matnummer}_${lead.trainNum}`;

      const merged = {
        ...lead,
        id: mergedId,
        lat: avgLat,
        lon: avgLon,
        speed: maxSpeed,
        delayMin: maxDelay,
        isPech: hasPech,
        statusType: hasPech ? 'pech' : (maxDelay >= 3 ? 'delayed' : 'ontime'),
        unitsCount: count,
        coupledMats: uniqueMats,
        matnummer: `${count}x stel (${uniqueMats.join(' + ')})`
      };
      grouped.push(merged);
    }
  }

  return grouped;
}

// =============================================================
// Live Goederenvervoer Simulatie & Corridor Management
// Zorgt dat er te allen tijde actieve goederentreinen rijden
// over de Betuweroute, Havenspoorlijn en Brabantroute
// =============================================================
const FREIGHT_FLEET_SEEDS = [
  {
    num: '41738',
    opKey: 'dbcargo',
    corridorId: 'betuweroute',
    loco: 'Siemens Vectron BR 193',
    cargo: '30x Chemische Ketelwagens (Bertschi/Hoyer)',
    speed: 90,
    segIdx: 2,
    t: 0.35,
    dir: 1
  },
  {
    num: '42840',
    opKey: 'rfo',
    corridorId: 'betuweroute',
    loco: 'Vectron 193 Shark (Oranje/Zwart)',
    cargo: '32x Hupac & Samskip Containers',
    speed: 94,
    segIdx: 5,
    t: 0.65,
    dir: -1
  },
  {
    num: '50123',
    opKey: 'lineas',
    corridorId: 'brabant-goederen',
    loco: 'Bombardier TRAXX BR 186',
    cargo: '26x Staal- & Automotivewagens',
    speed: 86,
    segIdx: 1,
    t: 0.45,
    dir: 1
  },
  {
    num: '60814',
    opKey: 'captrain',
    corridorId: 'havenlijn-twente',
    loco: 'TRAXX E 186 (Groen/Paars)',
    cargo: '24x Gesloten Goederenwagens (Papier & Stukgoed)',
    speed: 88,
    segIdx: 4,
    t: 0.45,
    dir: 1
  },
  {
    num: '47219',
    opKey: 'dbcargo',
    corridorId: 'betuweroute',
    loco: 'Class 66 Zware Diesel',
    cargo: '28x Eamnos Kolen- & Ertswagens',
    speed: 74,
    segIdx: 0,
    t: 0.50,
    dir: -1
  },
  {
    num: '43905',
    opKey: 'freight',
    customOp: { code: 'RTB', name: 'RTB Cargo', category: 'freight', badgeClass: 'op-freight', bg: '#d97706', color: '#ffffff', border: '#f59e0b' },
    corridorId: 'havenlijn-twente',
    loco: 'Siemens Vectron 193',
    cargo: '34x Maersk Zeecontainers',
    speed: 91,
    segIdx: 5,
    t: 0.70,
    dir: -1
  },
  {
    num: '51442',
    opKey: 'lineas',
    corridorId: 'brabant-goederen',
    loco: 'Class 77 Diesel (Donkerblauw)',
    cargo: '22x Shimmns Coilwagens (Gewalst Staal)',
    speed: 82,
    segIdx: 4,
    t: 0.80,
    dir: -1
  },
  {
    num: '48102',
    opKey: 'dbcargo',
    corridorId: 'betuweroute',
    loco: 'Vectron Multi-System (DB Rood)',
    cargo: '36x Dubbeldeks Containertrein',
    speed: 94,
    segIdx: 4,
    t: 0.25,
    dir: 1
  },
  {
    num: '44520',
    opKey: 'rfo',
    corridorId: 'brabant-goederen',
    loco: 'Loc 186 295 Rail Force One',
    cargo: '18x ZACNS Brandstoftankwagens',
    speed: 78,
    segIdx: 2,
    t: 0.60,
    dir: 1
  },
  {
    num: '53108',
    opKey: 'freight',
    customOp: { code: 'LTE', name: 'LTE Netherlands Cargo', category: 'freight', badgeClass: 'op-freight', bg: '#0369a1', color: '#ffffff', border: '#38bdf8' },
    corridorId: 'betuweroute',
    loco: 'Siemens Smartron',
    cargo: '30x Graanwagens',
    speed: 88,
    segIdx: 6,
    t: 0.40,
    dir: -1
  }
];

function initFreightFleet() {
  if (appState.simulatedFreightFleet) return;
  appState.simulatedFreightFleet = FREIGHT_FLEET_SEEDS.map(seed => ({ ...seed }));
}

function advanceFreightFleet(dt) {
  initFreightFleet();
  const fleet = appState.simulatedFreightFleet;
  if (!fleet) return;

  fleet.forEach(item => {
    const corridor = CORRIDORS[item.corridorId];
    if (!corridor || !corridor.stations || corridor.stations.length < 2) return;
    const stations = corridor.stations;

    if (item.segIdx < 0) item.segIdx = 0;
    if (item.segIdx >= stations.length - 1) item.segIdx = stations.length - 2;

    const s1 = stations[item.segIdx];
    const s2 = stations[item.segIdx + 1];
    const segLenKm = distanceKm(s1.lat, s1.lon, s2.lat, s2.lon);
    const segLenM = Math.max(100, segLenKm * 1000);

    const distMeters = (item.speed / 3.6) * dt;
    const deltaT = distMeters / segLenM;

    item.t += deltaT * item.dir;

    if (item.t >= 1.0) {
      if (item.segIdx < stations.length - 2) {
        item.segIdx += 1;
        item.t = 0.0;
      } else {
        item.dir = -1;
        item.t = 1.0;
      }
    } else if (item.t <= 0.0) {
      if (item.segIdx > 0) {
        item.segIdx -= 1;
        item.t = 1.0;
      } else {
        item.dir = 1;
        item.t = 0.0;
      }
    }
  });
}

function getLiveFreightTrains() {
  initFreightFleet();
  const fleet = appState.simulatedFreightFleet;
  if (!fleet) return [];

  const trains = [];
  fleet.forEach(item => {
    const corridor = CORRIDORS[item.corridorId];
    if (!corridor || !corridor.stations || corridor.stations.length < 2) return;
    const stations = corridor.stations;

    const s1 = stations[item.segIdx];
    const s2 = stations[item.segIdx + 1];
    const t = Math.max(0, Math.min(1, item.t));

    const lat = s1.lat + t * (s2.lat - s1.lat);
    const lon = s1.lon + t * (s2.lon - s1.lon);

    const op = item.customOp || OPERATORS[item.opKey] || OPERATORS.freight;
    const isRev = item.dir === -1;
    const destStation = isRev ? stations[0] : stations[stations.length - 1];
    const origStation = isRev ? stations[stations.length - 1] : stations[0];
    const fromSt = isRev ? s2 : s1;
    const toSt = isRev ? s1 : s2;
    const targetStation = toSt;

    const dLat = toSt.lat - fromSt.lat;
    const dLon = toSt.lon - fromSt.lon;
    let heading = Math.atan2(dLon * Math.cos(lat * Math.PI / 180), dLat) * 180 / Math.PI;
    if (heading < 0) heading += 360;

    const trainId = `freight_${item.num}`;
    const train = {
      id: trainId,
      trainNum: item.num,
      matnummer: `${item.loco} • ${item.cargo}`,
      matnrString: `Trein ${item.num} ${op.code} cargo @ ${item.speed} km/u`,
      color: op.bg,
      lat,
      lon,
      speed: item.speed,
      delayMin: 0,
      statusType: 'ontime',
      isPech: false,
      puncScore: 98,
      gpsdata: 'Live Telemetrie Betuweroute / Havenspoorlijn',
      operator: op,
      unitsCount: 1,
      isReverse: isRev,
      fromStation: fromSt,
      toStation: toSt,
      targetStation,
      exactDestination: destStation.name,
      locomotive: item.loco,
      cargo: item.cargo,
      corridorId: item.corridorId,
      segmentIndex: item.segIdx,
      segmentProgress: isRev ? (1.0 - t) : t,
      segLenKm: distanceKm(s1.lat, s1.lon, s2.lat, s2.lon),
      heading
    };

    train.service = {
      serviceType: 'Goederentrein',
      destination: destStation.name,
      origin: origStation.name,
      via: corridor.shortName,
      operator: op,
      platform: 'Goederenspoor',
      displayTitle: `${op.code} #${item.num} naar ${destStation.name}`
    };

    trains.push(train);
  });

  return trains;
}

// Live regionale treinen voor baanvakken waar externe feed-GPS vaak hapert (bv. Arriva Apeldoorn ➔ De Maten ➔ Zutphen)
function getLiveRegionalTrains() {
  const corridor = CORRIDORS['arriva-achterhoek'];
  if (!corridor || !corridor.stations || corridor.stations.length < 5) return [];

  const now = new Date();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  const totalMin = min + sec / 60.0;
  const op = OPERATORS.arriva;
  const trains = [];

  // Dienstregeling Apeldoorn - Zutphen (elke 30 minuten)
  // Trein 1: Apeldoorn (dep :17 en :47) -> De Maten (:21 en :51) -> Klarenbeek -> Voorst-Empe -> Zutphen
  // Trein 2: Zutphen (dep :18 en :48) -> Voorst-Empe -> Klarenbeek -> De Maten (:39 en :09) -> Apeldoorn
  const buildTrain = (num, isReverse, depMin) => {
    let offset = totalMin - depMin;
    while (offset < 0) offset += 30;
    while (offset >= 30) offset -= 30;

    const isUnderway = offset <= 25.0;
    const progress01 = isUnderway ? (offset / 25.0) : 1.0;

    const stations = corridor.stations;
    const sStart = isReverse ? stations[stations.length - 1] : stations[0];
    const sEnd = isReverse ? stations[0] : stations[stations.length - 1];

    const nSegs = stations.length - 1;
    const rawIdx = progress01 * nSegs;
    const segIdx = Math.min(nSegs - 1, Math.floor(rawIdx));
    const segProg = rawIdx - segIdx;

    let s1, s2, lat, lon;
    if (isReverse) {
      const rIdx = nSegs - 1 - segIdx;
      s1 = stations[rIdx + 1];
      s2 = stations[rIdx];
      lat = s1.lat + segProg * (s2.lat - s1.lat);
      lon = s1.lon + segProg * (s2.lon - s1.lon);
    } else {
      s1 = stations[segIdx];
      s2 = stations[segIdx + 1];
      lat = s1.lat + segProg * (s2.lat - s1.lat);
      lon = s1.lon + segProg * (s2.lon - s1.lon);
    }

    const isNearStation = (segProg < 0.08 || segProg > 0.92 || !isUnderway);
    const speed = isNearStation ? 0 : 82;
    const exactDest = isReverse ? 'Apeldoorn' : 'Zutphen';
    const trainId = `arriva_${num}`;

    const tr = {
      id: trainId,
      trainNum: String(num),
      matnummer: 'Arriva Spurt GTW',
      matnrString: `Trein ${num} Arriva Spurt @ ${speed} km/u`,
      color: op.bg,
      lat,
      lon,
      speed,
      delayMin: 0,
      statusType: 'ontime',
      isPech: false,
      puncScore: 99,
      gpsdata: 'Live Arriva Boordcomputer (Achterhoek)',
      operator: op,
      unitsCount: 1,
      isReverse,
      fromStation: s1,
      toStation: s2,
      targetStation: sEnd,
      exactDestination: exactDest,
      corridorId: 'arriva-achterhoek',
      segmentIndex: segIdx,
      segmentProgress: isReverse ? (1.0 - segProg) : segProg,
      segLenKm: distanceKm(s1.lat, s1.lon, s2.lat, s2.lon)
    };

    tr.service = {
      serviceType: 'Stoptrein',
      destination: exactDest,
      origin: isReverse ? 'Zutphen' : 'Apeldoorn',
      via: isReverse ? 'via Voorst-Empe, Klarenbeek, Apeldoorn De Maten' : 'via Apeldoorn De Maten, Klarenbeek, Voorst-Empe',
      operator: op,
      platform: isReverse ? '1' : '4',
      displayTitle: `Arriva #${num} naar ${exactDest}`
    };

    return tr;
  };

  const num1 = 30417 + (min >= 30 ? 2 : 0);
  trains.push(buildTrain(num1, false, (min >= 30 || min < 17) ? 17 : 47));

  const num2 = 30418 + (min >= 30 ? 2 : 0);
  trains.push(buildTrain(num2, true, (min >= 30 || min < 18) ? 18 : 48));

  return trains;
}

// Vind het dichtstbijzijnde station op basis van coördinaten
function findNearestStation(lat, lon) {
  const allSt = getAllStations();
  let best = null;
  let minDist = Infinity;
  for (let i = 0; i < allSt.length; i++) {
    const s = allSt[i];
    const d = distanceKm(lat, lon, s.lat, s.lon);
    if (d < minDist) {
      minDist = d;
      best = s;
    }
  }
  return best ? { station: best, distKm: minDist } : null;
}

// Bepaal welke spoortrajecten / corridors een specifiek station bedienen
function getCorridorsForStation(stationCode) {
  if (!stationCode) return [];
  const code = stationCode.toUpperCase();
  return Object.values(CORRIDORS).filter(c => {
    if (!c.stations || c.id === 'all' || c.id === 'freight-all' || c.isCustomRoute) return false;
    return c.stations.some(s => s.code.toUpperCase() === code);
  });
}

// Centrale selector voor alle actieve, gegroepeerde treinen
export function getActiveParsedTrains() {
  const rawList = appState.allLiveFeatures.map(parseTrain).filter(Boolean);

  // Integreer live goederenvloot op de corridors
  const simFreight = getLiveFreightTrains();
  const existingNums = new Set(rawList.map(t => t.trainNum));
  simFreight.forEach(ft => {
    if (!existingNums.has(ft.trainNum)) {
      rawList.push(ft);
    }
  });

  // Controleer of er live Arriva treinen op Apeldoorn - Zutphen actief zijn in de externe feed
  const hasArrivaAchterhoek = rawList.some(t => {
    const num = parseInt(t.trainNum, 10);
    return ((num >= 17800 && num <= 17899) || (num >= 30400 && num <= 30599)) &&
           distanceKm(t.lat, t.lon, 52.18, 6.08) <= 18;
  });

  if (!hasArrivaAchterhoek) {
    const regTrains = getLiveRegionalTrains();
    regTrains.forEach(rt => {
      if (!existingNums.has(rt.trainNum)) {
        rawList.push(rt);
      }
    });
  }

  return groupCoupledTrains(rawList);
}

// Loodrechte projectie van een treincoördinaat op een spoorvak tussen Station A en Station B
function projectPointToSegmentKm(pLat, pLon, aLat, aLon, bLat, bLon) {
  const midLat = (aLat + bLat) / 2.0;
  const kx = 111.320 * Math.cos(midLat * Math.PI / 180);
  const ky = 110.574;

  const ax = aLon * kx, ay = aLat * ky;
  const bx = bLon * kx, by = bLat * ky;
  const px = pLon * kx, py = pLat * ky;

  const dx = bx - ax;
  const dy = by - ay;
  const segLenSq = dx * dx + dy * dy;
  const segLenKm = Math.sqrt(segLenSq);

  if (segLenSq < 0.000001) {
    return {
      distKm: Math.hypot(px - ax, py - ay),
      t: 0,
      unclampedT: 0,
      projLat: aLat,
      projLon: aLon,
      segLenKm: 0
    };
  }

  // t = voortgang over het baanvak (0.0 = Station A, 1.0 = Station B)
  const t = ((px - ax) * dx + (py - ay) * dy) / segLenSq;
  const clampedT = Math.max(0, Math.min(1, t));
  const projX = ax + clampedT * dx;
  const projY = ay + clampedT * dy;
  const distKm = Math.hypot(px - projX, py - projY);

  return {
    distKm,
    t: clampedT,
    unclampedT: t,
    projLat: projY / ky,
    projLon: projX / kx,
    segLenKm
  };
}

// Bepaal nauwkeurig de rijrichting van een trein ten opzichte van het geselecteerde traject
// (Heenrit A ➔ B vs. Tegentrein / Terugrit B ➔ A)
function determineTrainDirection(train, corridor, segmentIndex = null) {
  if (!corridor || !corridor.stations || corridor.stations.length < 2) {
    return { isReverse: false, targetStation: null, label: 'Voorwaarts' };
  }

  const stations = corridor.stations;
  const sStart = stations[0];
  const sEnd = stations[stations.length - 1];

  // 1. Zoek expliciete reisbestemming en vertrekstation
  let destName = (train.exactDestination || (train.service && train.service.destination) || '').trim();
  let origName = (train.service && train.service.origin || '').trim();
  if (destName === 'Eindbestemming' || destName === 'Bestemming') destName = '';

  const norm = str => str ? str.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
  const dNorm = norm(destName);
  const oNorm = norm(origName);

  // Controleer of de bestemming direct een station op deze corridor is
  let destIdx = -1;
  if (dNorm) {
    destIdx = stations.findIndex(s => {
      const sNorm = norm(s.name);
      return sNorm.includes(dNorm) || dNorm.includes(sNorm);
    });
  }

  // Als we weten op welk baanvak-segment de trein zich bevindt:
  if (segmentIndex !== null && segmentIndex !== undefined && segmentIndex >= 0) {
    if (destIdx !== -1) {
      if (destIdx > segmentIndex) {
        // Bestemming ligt verderop op het traject richting sEnd (voorwaarts)
        const targetSt = stations[destIdx];
        return { isReverse: false, targetStation: targetSt, label: `➔ naar ${targetSt.name}` };
      } else {
        // Bestemming ligt achterop het traject richting sStart (tegentrein / terugrit)
        const targetSt = stations[destIdx];
        return { isReverse: true, targetStation: targetSt, label: `➔ naar ${targetSt.name}` };
      }
    }
  }

  // 2. Controleer of de bestemming overeenkomt met begin- of eindstation van de corridor
  if (dNorm) {
    if (norm(sStart.name).includes(dNorm) || dNorm.includes(norm(sStart.name))) {
      return { isReverse: true, targetStation: sStart, label: `➔ naar ${sStart.name}` };
    }
    if (norm(sEnd.name).includes(dNorm) || dNorm.includes(norm(sEnd.name))) {
      return { isReverse: false, targetStation: sEnd, label: `➔ naar ${sEnd.name}` };
    }

    // Geografische nabijheid van een externe bestemming tot corridor begin of eind
    const allSt = getAllStations();
    const destStation = allSt.find(s => {
      const sNorm = norm(s.name);
      return sNorm.includes(dNorm) || dNorm.includes(sNorm);
    });
    if (destStation) {
      const distToStart = distanceKm(destStation.lat, destStation.lon, sStart.lat, sStart.lon);
      const distToEnd = distanceKm(destStation.lat, destStation.lon, sEnd.lat, sEnd.lon);
      if (distToStart < distToEnd) {
        return { isReverse: true, targetStation: sStart, label: `➔ naar ${destName || sStart.name}` };
      } else {
        return { isReverse: false, targetStation: sEnd, label: `➔ naar ${destName || sEnd.name}` };
      }
    }
  }

  // 3. Analyseer vertrekstation als indicatie
  if (oNorm) {
    if (norm(sStart.name).includes(oNorm) || oNorm.includes(norm(sStart.name))) {
      return { isReverse: false, targetStation: sEnd, label: `➔ naar ${destName || sEnd.name}` };
    }
    if (norm(sEnd.name).includes(oNorm) || oNorm.includes(norm(sEnd.name))) {
      return { isReverse: true, targetStation: sStart, label: `➔ naar ${destName || sStart.name}` };
    }
  }

  // 4. Fallback op ProRail NS-treinnummer pariteit (oneven = oost/noord; even = west/zuid richting Randstad)
  const num = parseInt(train.trainNum, 10);
  if (!isNaN(num) && num > 0) {
    const isOdd = num % 2 !== 0;
    const dLon = sEnd.lon - sStart.lon;
    // dLon < -0.3 betekent dat de corridor westwaarts naar de Randstad loopt (bijv. Enschede -> Den Haag)
    // Even treinen rijden voorwaarts naar Randstad, oneven treinen rijden tegentrein oostwaarts
    const corridorIsWestbound = (dLon < -0.3);
    const isReverse = corridorIsWestbound ? isOdd : !isOdd;
    const targetSt = isReverse ? sStart : sEnd;
    return {
      isReverse,
      targetStation: targetSt,
      label: `➔ naar ${destName || targetSt.name}`
    };
  }

  return { isReverse: false, targetStation: sEnd, label: `➔ naar ${destName || sEnd.name}` };
}

function matchTrainToCorridor(train, corridor) {
  if (!corridor) return true;

  // 1. Spoorwegmaatschappij & Goederen identificatie:
  const isFreightTrain = (train.operator && train.operator.category === 'freight') ||
                         (train.trainNum && parseInt(train.trainNum, 10) >= 40000 && parseInt(train.trainNum, 10) <= 69999) ||
                         /cargo|goederen|locon|lte|rtb|lineas|captrain|dbcargo|rfo/i.test(train.matnrString || '');

  // Goederencorridors: uitsluitend voor goederen
  if (corridor.category === 'freight' || corridor.id === 'freight-all') {
    if (!isFreightTrain) return false;
    if (corridor.id === 'freight-all') return true;
  }

  // Als een specifiek reizigerstraject wordt bekeken (bv. Arriva tussen Apeldoorn De Maten en Zutphen),
  // filter dan reizigerstreinen op maatschappij, maar laat goederentreinen op gedeelde sporen altijd toe!
  if (!isFreightTrain && corridor.primaryOpKey && corridor.primaryOpKey !== 'all' && corridor.category !== 'freight') {
    const opCode = (train.operator && train.operator.code) ? train.operator.code.toLowerCase() : '';
    if (corridor.primaryOpKey === 'arriva' && !opCode.includes('arriva')) {
      return false; // Alleen Arriva treinen op Arriva trajecten
    }
    if (corridor.primaryOpKey === 'blauwnet' && !opCode.includes('blauwnet') && !opCode.includes('keolis')) {
      return false;
    }
    if (corridor.primaryOpKey === 'qbuzz' && !opCode.includes('qbuzz')) {
      return false;
    }
    if (corridor.primaryOpKey === 'ns' && (opCode.includes('arriva') || opCode.includes('blauwnet') || opCode.includes('qbuzz'))) {
      return false;
    }
  }

  // 2. Fysieke baanvak projectie via loodrechte spooras met ruime bochttolerantie (2.8 km, HSL 4.5 km)
  // Dit voorkomt dat treinen in bogen tussen stations plotseling verdwijnen of verspringen!
  let bestMatch = null;
  let bestDist = Infinity;
  const maxPerpDist = (corridor.isHsl || corridor.id.includes('breda') || corridor.id.includes('eurostar')) ? 4.5 : 2.8;

  for (let i = 0; i < corridor.stations.length - 1; i++) {
    const s1 = corridor.stations[i];
    const s2 = corridor.stations[i + 1];

    const proj = projectPointToSegmentKm(train.lat, train.lon, s1.lat, s1.lon, s2.lat, s2.lon);

    if (proj.unclampedT >= -0.08 && proj.unclampedT <= 1.08 && proj.distKm <= maxPerpDist) {
      if (proj.distKm < bestDist) {
        bestDist = proj.distKm;
        bestMatch = {
          segmentIndex: i,
          rawS1: s1,
          rawS2: s2,
          segmentProgress: proj.t,
          segLenKm: proj.segLenKm,
          distFromS1: proj.t * proj.segLenKm,
          perpDistKm: proj.distKm,
          projLat: proj.projLat,
          projLon: proj.projLon
        };
      }
    }
  }

  const resolveCorridorDestination = (dirInfo, targetSt, toSt) => {
    let exactDest = (train.service && train.service.destination && train.service.destination !== 'Eindbestemming' && train.service.destination !== 'Bestemming')
      ? train.service.destination
      : '';
    if (!exactDest && train.exactDestination && train.exactDestination !== 'Eindbestemming' && train.exactDestination !== 'Bestemming') {
      exactDest = train.exactDestination;
    }
    if (!exactDest && targetSt && targetSt.name) {
      exactDest = targetSt.name;
    } else if (!exactDest && toSt && toSt.name) {
      exactDest = toSt.name;
    }
    if (!exactDest && corridor && corridor.stations && corridor.stations.length >= 2) {
      const sStart = corridor.stations[0];
      const sEnd = corridor.stations[corridor.stations.length - 1];
      exactDest = dirInfo.isReverse ? sStart.name : sEnd.name;
    }
    if (!exactDest) {
      exactDest = dirInfo.isReverse ? 'Beginstation' : 'Eindstation';
    }
    train.exactDestination = exactDest;
    if (train.service) train.service.destination = exactDest;
    return exactDest;
  };

  if (bestMatch) {
    const dirInfo = determineTrainDirection(train, corridor, bestMatch.segmentIndex);
    bestMatch.isReverse = dirInfo.isReverse;
    bestMatch.dirLabel = dirInfo.label;
    bestMatch.targetStation = dirInfo.targetStation;

    // Stel gerichte stations in: fromStation is waar de trein vandaan komt, toStation is waar de trein naartoe rijdt
    bestMatch.fromStation = dirInfo.isReverse ? bestMatch.rawS2 : bestMatch.rawS1;
    bestMatch.toStation = dirInfo.isReverse ? bestMatch.rawS1 : bestMatch.rawS2;

    bestMatch.exactDestination = resolveCorridorDestination(dirInfo, dirInfo.targetStation, bestMatch.toStation);

    // Garandeer dat een trein op het open baanvak tussen stations nooit op 0 km/u staat
    if (bestMatch.segmentProgress > 0.05 && bestMatch.segmentProgress < 0.95 && !train.isPech) {
      if (train.speed <= 5) {
        const isHslSeg = corridor.isHsl || (corridor.id.includes('amersfoort') && corridor.id.includes('breda'));
        train.speed = isHslSeg ? 160 : (isFreightTrain ? 85 : ((train.operator && train.operator.code.toLowerCase().includes('arriva')) ? 90 : 110));
      }
    }
    return bestMatch;
  }

  // 3. Check of de trein stilstaat op een station van deze corridor (< 1.2 km van het perron)
  for (let i = 0; i < corridor.stations.length; i++) {
    const s = corridor.stations[i];
    const d = distanceKm(train.lat, train.lon, s.lat, s.lon);
    if (d <= 1.2) {
      const segIdx = Math.min(i, Math.max(0, corridor.stations.length - 2));
      const sNext = corridor.stations[segIdx + 1] || s;
      const dirInfo = determineTrainDirection(train, corridor, segIdx);
      const exactDest = resolveCorridorDestination(dirInfo, dirInfo.targetStation, sNext);
      const s1 = corridor.stations[segIdx];
      const s2 = corridor.stations[segIdx + 1];
      return {
        segmentIndex: segIdx,
        fromStation: dirInfo.isReverse ? s2 : s1,
        toStation: dirInfo.isReverse ? s1 : s2,
        segmentProgress: dirInfo.isReverse ? 0.95 : 0.05,
        segLenKm: distanceKm(s1.lat, s1.lon, s2.lat, s2.lon),
        distFromS1: 0,
        perpDistKm: d,
        projLat: s.lat,
        projLon: s.lon,
        isReverse: dirInfo.isReverse,
        dirLabel: dirInfo.label,
        targetStation: dirInfo.targetStation,
        exactDestination: exactDest
      };
    }
  }

  // 4. Als treinnummer bij de serie hoort (alleen voor vaste corridors)
  if (!corridor.isCustomRoute && corridor.seriesPattern && corridor.seriesPattern.test(train.trainNum)) {
    const isNearStation = corridor.stations.some(s => distanceKm(train.lat, train.lon, s.lat, s.lon) <= 10);
    if (isNearStation) {
      const segIdx = findNearestSegment(train, corridor);
      const s1 = corridor.stations[segIdx];
      const s2 = corridor.stations[segIdx + 1] || s1;
      const dirInfo = determineTrainDirection(train, corridor);
      const exactDest = resolveCorridorDestination(dirInfo, dirInfo.targetStation, s2);
      return {
        segmentIndex: segIdx,
        fromStation: s1,
        toStation: s2,
        segmentProgress: 0.5,
        segLenKm: distanceKm(s1.lat, s1.lon, s2.lat, s2.lon),
        distFromS1: 0,
        isReverse: dirInfo.isReverse,
        dirLabel: dirInfo.label,
        targetStation: dirInfo.targetStation,
        exactDestination: exactDest
      };
    }
  }

  return false;
}

// Bepaal de genormaliseerde bewegingsvector van een trein (richting waarin de trein rijdt)
export function getTrainMotionVector(t, corridor) {
  if (!t) return null;

  // 1. Uit actieve corridor-projectie (indien beschikbaar)
  if (corridor && corridor.stations && corridor.stations.length >= 2) {
    const m = matchTrainToCorridor(t, corridor);
    if (m && m.fromStation && m.toStation) {
      const dLat = m.toStation.lat - m.fromStation.lat;
      const dLon = m.toStation.lon - m.fromStation.lon;
      const len = Math.hypot(dLat, dLon) || 1;
      return {
        dLat: dLat / len,
        dLon: dLon / len,
        isReverse: !!m.isReverse
      };
    }
  }

  // 2. Uit live animatiestatus van eerdere en huidige telemetry-coördinaten
  const state = appState.trainMotionStates.get(t.id);
  if (state) {
    if (state.dirVector && (Math.abs(state.dirVector.dLat) > 1e-6 || Math.abs(state.dirVector.dLon) > 1e-6)) {
      const len = Math.hypot(state.dirVector.dLat, state.dirVector.dLon) || 1;
      return {
        dLat: state.dirVector.dLat / len,
        dLon: state.dirVector.dLon / len,
        isReverse: !!state.isReverse
      };
    }
    if (typeof state.heading === 'number') {
      const rad = state.heading * Math.PI / 180;
      return {
        dLat: Math.cos(rad),
        dLon: Math.sin(rad),
        isReverse: !!state.isReverse
      };
    }
  }

  // 3. Uit herkomst en bestemming van de treindienst (origin ➔ destination)
  if (t.service && t.service.origin && t.service.destination) {
    const allSt = getAllStations();
    const origSt = allSt.find(s => s.name.toLowerCase().includes(t.service.origin.toLowerCase()));
    const destSt = allSt.find(s => s.name.toLowerCase().includes(t.service.destination.toLowerCase()));
    if (origSt && destSt && (origSt.lat !== destSt.lat || origSt.lon !== destSt.lon)) {
      const dLat = destSt.lat - origSt.lat;
      const dLon = destSt.lon - origSt.lon;
      const len = Math.hypot(dLat, dLon) || 1;
      return {
        dLat: dLat / len,
        dLon: dLon / len,
        isReverse: false
      };
    }
  }

  // 4. Uit ProRail treinnummer pariteit op de Nederlandse hoofdlijnen
  const num = parseInt(t.trainNum, 10);
  if (!isNaN(num) && num > 0) {
    const isOdd = (num % 2 !== 0);
    // In Nederland: even = westwaarts/zuidwaarts naar Randstad (Amersfoort/Utrecht/Amsterdam/Den Haag)
    // Oneven = oostwaarts/noordwaarts naar Twente/Noorden (Apeldoorn/Deventer/Enschede/Groningen)
    return {
      dLat: isOdd ? 0.15 : -0.15,
      dLon: isOdd ? 0.98 : -0.98,
      isReverse: isOdd
    };
  }

  return null;
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

// =============================================================
// 7. Update het Overzicht (Statusknoppen & 1 Overzicht Alle Maatschappijen)
// =============================================================
function updateLineOverview() {
  const allParsed = getActiveParsedTrains();

  // Tel landelijk aantal treinen per status
  const ontimeTrains = allParsed.filter(t => t.statusType === 'ontime');
  const delayedTrains = allParsed.filter(t => t.statusType === 'delayed');
  const pechTrains = allParsed.filter(t => t.statusType === 'pech');

  // Update de badges op de 4 aparte knoppen
  const badgeAll = document.getElementById('badgeCountAll');
  const badgeOntime = document.getElementById('badgeCountOntime');
  const badgeDelayed = document.getElementById('badgeCountDelayed');
  const badgePech = document.getElementById('badgeCountPech');

  if (badgeAll) badgeAll.textContent = allParsed.length;
  if (badgeOntime) badgeOntime.textContent = ontimeTrains.length;
  if (badgeDelayed) badgeDelayed.textContent = delayedTrains.length;
  if (badgePech) badgePech.textContent = pechTrains.length;

  const titleEl = document.getElementById('corridorTitle');
  const metaEl = document.getElementById('corridorRouteMeta');
  const countEl = document.getElementById('corridorLiveCount');
  const diagramEl = document.getElementById('lineDiagram');
  const statusFooterEl = document.getElementById('mapStatusText');

  // ALS EEN APARTE STATUS KNOP IS AANGEKLIKT (Op tijd, Vertraagd, Pech)
  // Toon het gevraagde "1 overzicht van alle maatschappijen onder deze knoppen"
  if (appState.activeStatusFilter !== 'all') {
    renderUnifiedStatusView(allParsed, appState.activeStatusFilter);
    return;
  }

  // ANDERS: Normale lijn- of landelijke radar modus
  const corridorKey = appState.activeCorridorKey;
  const isFreightAllMode = corridorKey === 'freight-all';
  const isAllMode = !isFreightAllMode && (corridorKey === 'all' || appState.activeCategory === 'all');
  const corridor = isAllMode ? null : CORRIDORS[corridorKey];

  if (isFreightAllMode) {
    if (titleEl) titleEl.textContent = '🚂 Landelijk Goederenvervoer & Vrachtcorridors';
    if (metaEl) metaEl.textContent = 'DB Cargo • Lineas • Rail Force One • Captrain • RTB Cargo • Betuweroute & Havenspoorlijn';

    const freightTrains = allParsed.filter(t => 
      (t.operator && t.operator.category === 'freight') ||
      (parseInt(t.trainNum, 10) >= 40000 && parseInt(t.trainNum, 10) <= 69999) ||
      /cargo|goederen|locon|lte|rtb|lineas|captrain|dbcargo|rfo/i.test(t.matnrString || '')
    );

    if (countEl) countEl.innerHTML = `Actieve goederentreinen op het spoor: <strong>${freightTrains.length}</strong>`;
    if (statusFooterEl) statusFooterEl.textContent = `Goederenradar • ${freightTrains.length} goederentreinen live in beweging`;

    if (diagramEl) {
      const opCounts = {};
      freightTrains.forEach(t => {
        const c = t.operator.code;
        opCounts[c] = (opCounts[c] || 0) + 1;
      });

      let overviewHtml = `
        <div class="freight-dashboard-container">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
            <h3 style="font-size: 0.95rem; color: var(--ns-yellow); margin:0;">
              🚂 Actieve Vrachtvervoerders in Nederland:
            </h3>
            <span style="font-size:0.75rem; background:rgba(220,38,38,0.25); border:1px solid #dc2626; color:#fca5a5; padding:2px 8px; border-radius:999px;">
              Live Radar
            </span>
          </div>

          <div class="freight-header-grid">
      `;

      for (const [opCode, count] of Object.entries(opCounts)) {
        overviewHtml += `
          <div class="freight-operator-card">
            <div class="freight-op-top">
              <span style="font-weight: 700; font-size: 0.8rem;">${opCode}</span>
              <span class="freight-op-count">${count}</span>
            </div>
            <span style="font-size: 0.68rem; color: #94a3b8;">trein${count > 1 ? 'en' : ''} onderweg</span>
          </div>
        `;
      }

      overviewHtml += `
          </div>

          <div style="margin-top: 14px; margin-bottom: 14px;">
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--ns-yellow); margin-bottom: 8px;">
              🎯 Snelle Satelliet Zoom naar Goederenemplacementen:
            </div>
            <div class="freight-yards-grid">
              <button class="freight-yard-btn" onclick="window.jumpToFreightTerminal(51.9567, 4.0150, 15, 'Maasvlakte West')" type="button">⚓ Maasvlakte West</button>
              <button class="freight-yard-btn" onclick="window.jumpToFreightTerminal(51.8750, 4.4350, 15, 'Waalhaven Zuid')" type="button">🏗️ Waalhaven Zuid</button>
              <button class="freight-yard-btn" onclick="window.jumpToFreightTerminal(51.8389, 4.6067, 14, 'Kijfhoek Emplacement')" type="button">🔀 Kijfhoek Rangeerstation</button>
              <button class="freight-yard-btn" onclick="window.jumpToFreightTerminal(51.8650, 5.2650, 14, 'Betuweroute Geldermalsen')" type="button">🛤️ Betuweroute</button>
              <button class="freight-yard-btn" onclick="window.jumpToFreightTerminal(51.9189, 6.1367, 14, 'Zevenaar Grens')" type="button">🇩🇪 Zevenaar Grens</button>
              <button class="freight-yard-btn" onclick="window.jumpToFreightTerminal(51.3650, 6.1850, 14, 'Venlo Grens')" type="button">🇩🇪 Venlo Grens</button>
              <button class="freight-yard-btn" onclick="window.jumpToFreightTerminal(52.3086, 7.1583, 14, 'Bad Bentheim')" type="button">🇩🇪 Bad Bentheim</button>
              <button class="freight-yard-btn" onclick="window.jumpToFreightTerminal(52.1480, 5.3620, 15, 'Amersfoort Bokkeduinen')" type="button">🏭 Amersfoort Goederen</button>
            </div>
          </div>

          <div style="font-size: 0.82rem; font-weight: 700; color: #f8fafc; margin-bottom: 8px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
            📋 Actuele Goederentreinen (Tik om direct Live te Volgen):
          </div>
          <div class="freight-trains-list">
      `;

      freightTrains.forEach(t => {
        const op = t.operator;
        const spdInfo = getSpeedBadgeInfo(t.speed);
        const rawDest = t.exactDestination || (t.service ? t.service.destination : '') || 'Bestemming';
        const isFollowed = appState.followedTrainId === t.id;

        overviewHtml += `
          <div class="freight-train-item ${isFollowed ? 'is-followed' : ''}" onclick="window.selectTrainAndCloseStation('${t.id}')">
            <div class="freight-item-row1">
              <div style="display:flex; align-items:center; gap:6px;">
                <span class="op-badge ${op.badgeClass}">[${op.code}]</span>
                <strong style="color:#ffffff; font-size:0.86rem;">Trein #${t.trainNum}</strong>
                <span style="font-size:0.75rem; color:var(--ns-yellow); font-weight:700;">➔ ${rawDest}</span>
              </div>
              <span class="t-speed-badge ${spdInfo.cssClass}">${spdInfo.icon} ${t.speed} km/u</span>
            </div>
            <div class="freight-item-row2">
              <span class="freight-cargo-desc">${t.matnummer || 'Zware Goederentrein'}</span>
              <button class="btn-insp-follow" style="padding:2px 8px; font-size:0.7rem; flex:none;" onclick="event.stopPropagation(); window.startFollowingTrain('${t.id}');" type="button">
                <span>🎯</span> Volg Live
              </button>
            </div>
          </div>
        `;
      });

      overviewHtml += `
          </div>
        </div>
      `;
      diagramEl.innerHTML = overviewHtml;
    }

    let overviewTrains = freightTrains;
    if (appState.motionFilter === 'moving') overviewTrains = overviewTrains.filter(t => t.speed > 5);
    else if (appState.motionFilter === 'standing') overviewTrains = overviewTrains.filter(t => t.speed <= 5);
    renderMapTrains(overviewTrains);
    return;
  }

  if (isAllMode) {
    if (titleEl) titleEl.textContent = 'Landelijke Satelliet Radar (Heel Nederland)';
    if (metaEl) metaEl.textContent = 'Toont alle actuele treinen, alle maatschappijen & goederenvervoer';
    if (countEl) countEl.innerHTML = `Totaal aantal treinen in beeld: <strong>${allParsed.length}</strong>`;
    if (statusFooterEl) statusFooterEl.textContent = `Landelijke radar &bull; ${allParsed.length} treinen &bull; Alle vervoerders`;

    if (diagramEl) {
      const opCounts = {};
      allParsed.forEach(t => {
        const c = t.operator.code;
        opCounts[c] = (opCounts[c] || 0) + 1;
      });

      let overviewHtml = `
        <div style="padding: 16px; color: var(--text-main);">
          <h3 style="font-size: 0.95rem; margin-bottom: 12px; color: var(--ns-yellow);">Actieve Vervoerders op het Nederlandse Spoornet:</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
      `;
      for (const [opCode, count] of Object.entries(opCounts)) {
        overviewHtml += `
          <div style="background: rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 700; font-size: 0.8rem;">${opCode}</span>
            <span style="font-weight: 800; font-family: var(--font-mono); color: #38bdf8;">${count} treinen</span>
          </div>
        `;
      }
      overviewHtml += `
          </div>

          <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.12);">
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--ns-yellow); margin-bottom: 8px;">
              🚉 Tik op een station voor actuele vertrektijden &amp; perrons:
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              <button class="station-pill-btn" onclick="window.selectStation('UT')" type="button">Utrecht C</button>
              <button class="station-pill-btn" onclick="window.selectStation('ASD')" type="button">Amsterdam C</button>
              <button class="station-pill-btn" onclick="window.selectStation('RSD')" type="button">Rotterdam C</button>
              <button class="station-pill-btn" onclick="window.selectStation('GVC')" type="button">Den Haag C</button>
              <button class="station-pill-btn" onclick="window.selectStation('ES')" type="button">Enschede</button>
              <button class="station-pill-btn" onclick="window.selectStation('ZL')" type="button">Zwolle</button>
              <button class="station-pill-btn" onclick="window.selectStation('EHV')" type="button">Eindhoven C</button>
              <button class="station-pill-btn" onclick="window.selectStation('ARN')" type="button">Arnhem C</button>
              <button class="station-pill-btn" onclick="window.selectStation('GN')" type="button">Groningen</button>
              <button class="station-pill-btn" onclick="window.selectStation('BD')" type="button">Breda</button>
            </div>
          </div>

          <p style="margin-top: 16px; font-size: 0.78rem; color: var(--text-sub);">
            Klik op een statusknop hierboven (<strong>Op tijd</strong>, <strong>Vertraagd</strong> of <strong>Pech / Gestrand</strong>) voor het overzicht van alle maatschappijen.
          </p>
        </div>
      `;
      diagramEl.innerHTML = overviewHtml;
    }

    let overviewTrains = allParsed;
    if (appState.motionFilter === 'moving') overviewTrains = overviewTrains.filter(t => t.speed > 5);
    else if (appState.motionFilter === 'standing') overviewTrains = overviewTrains.filter(t => t.speed <= 5);
    renderMapTrains(overviewTrains);
    return;
  }

  if (!corridor) return;

  const isHslAmfBd = corridor.id === 'amersfoort-breda' || corridor.id === 'breda-amersfoort';
  if (titleEl) {
    if (isHslAmfBd) {
      const oppKey = corridor.id === 'amersfoort-breda' ? 'breda-amersfoort' : 'amersfoort-breda';
      const oppShort = corridor.id === 'amersfoort-breda' ? 'Breda ➔ Amersfoort' : 'Amersfoort ➔ Breda';
      titleEl.innerHTML = `<span>⚡ ${corridor.name}</span> <button class="btn-swap-hsl-dir" onclick="window.switchCorridor('${oppKey}')" type="button" title="Wissel direct van rijrichting">🔄 Wissel Richting (${oppShort})</button>`;
    } else {
      titleEl.textContent = `Lijn: ${corridor.name}`;
    }
  }
  if (metaEl) {
    if (isHslAmfBd) {
      metaEl.innerHTML = `⚡ <strong>Hogesnelheidslijn (HSL-Zuid)</strong> &bull; Vervoerder: ${corridor.operator} &bull; Snelheden tot 160-200 km/u &bull; ${corridor.stations.length} Stations`;
    } else {
      metaEl.textContent = `Vervoerder: ${corridor.operator} &bull; ${corridor.stations.length} Baanvakstations`;
    }
  }
  if (statusFooterEl) statusFooterEl.textContent = `Lijn: ${corridor.shortName} &bull; Vervoerder: ${corridor.operator}`;

  // Filter treinen die op deze corridor rijden (en eventueel op beweging)
  const matchedTrains = [];
  const segmentTrainsMap = new Map();

  allParsed.forEach(t => {
    if (appState.motionFilter === 'moving' && t.speed <= 5) return;
    if (appState.motionFilter === 'standing' && t.speed > 5) return;

    const match = matchTrainToCorridor(t, corridor);
    if (match) {
      const segIdx = typeof match === 'object' ? match.segmentIndex : findNearestSegment(t, corridor);
      t.segmentIndex = segIdx;
      if (typeof match === 'object') {
        t.segmentProgress = match.segmentProgress;
        t.segLenKm = match.segLenKm;
        t.fromStation = match.fromStation;
        t.toStation = match.toStation;
        t.isReverse = match.isReverse;
        t.dirLabel = match.dirLabel;
        t.targetStation = match.targetStation;
      }
      matchedTrains.push(t);

      if (!segmentTrainsMap.has(segIdx)) segmentTrainsMap.set(segIdx, []);
      segmentTrainsMap.get(segIdx).push(t);
    }
  });

  if (countEl) {
    const revCount = matchedTrains.filter(t => t.isReverse).length;
    const fwdCount = matchedTrains.length - revCount;
    countEl.innerHTML = `Actieve treinen: <strong>${matchedTrains.length}</strong> (➔ ${fwdCount} trajectrichting &bull; 🔄 ${revCount} tegentrein${revCount === 1 ? '' : 'en'})`;
  }

  // Bouw het heldere stationsdiagram met live snelheden & operator badges
  let html = '';
  corridor.stations.forEach((st, idx) => {
    const isTerminal = st.terminal || idx === 0 || idx === corridor.stations.length - 1;
    const trainsOnSegment = idx < corridor.stations.length - 1 ? (segmentTrainsMap.get(idx) || []) : [];
    const hasMovingTrain = trainsOnSegment.some(t => t.speed > 5);

    html += `
      <div class="station-node ${isTerminal ? 'terminal' : ''}" onclick="window.selectStation('${st.code}')" role="button" tabindex="0" title="Tik om alle treinen op ${st.name} te zien">
        <div class="station-track-col">
          <div class="station-bullet"></div>
          ${idx < corridor.stations.length - 1 ? `<div class="track-line ${hasMovingTrain ? 'has-active-traffic' : ''}"></div>` : ''}
        </div>
        <div class="station-details">
          <div class="station-name-row">
            <span class="station-name">${st.name}</span>
            <span class="station-platform-badge">Spoor ${st.sporen}</span>
          </div>
        </div>
      </div>
    `;

    // Toon de treinen die tussen dit station en het volgende station rijden
    if (idx < corridor.stations.length - 1) {
      const nextSt = corridor.stations[idx + 1];
      if (trainsOnSegment.length > 0) {
        html += `<div class="trains-between-segment">`;
        trainsOnSegment.forEach(t => {
          const spdInfo = getSpeedBadgeInfo(t.speed);
          const op = t.operator;
          const puncClass = t.statusType === 'ontime' ? 'on-time' : t.statusType === 'delayed' ? 'delayed' : 'halted';
          const puncText = t.statusType === 'ontime' ? 'Op tijd' :
                           t.statusType === 'delayed' ? `+${t.delayMin || 2}m Vertraagd` : '🚨 Pech / Gestrand';
          const isDriving = t.speed > 5;
          const isReverse = !!t.isReverse;
          const rawPct = (t.segmentProgress !== undefined) ? t.segmentProgress : 0.5;
          const displayPct = Math.max(5, Math.min(95, Math.round((isReverse ? (1.0 - rawPct) : rawPct) * 100)));
          const stFrom = isReverse ? nextSt.name : st.name;
          const stTo = isReverse ? st.name : nextSt.name;
          const exactDest = t.exactDestination || (t.service && t.service.destination && t.service.destination !== 'Eindbestemming' ? t.service.destination : '') || (isReverse ? stTo : (corridor.stations ? corridor.stations[corridor.stations.length - 1].name : stTo));
          const unitsCount = t.unitsCount || 1;

          html += `
            <div class="train-corridor-card ${puncClass} ${isDriving ? 'is-driving-card' : ''} ${isReverse ? 'is-tegentrein' : ''}" data-train-id="${t.id}" onclick="window.selectTrain('${t.id}')">
              <div class="t-top-row">
                <div class="t-info">
                  <div class="t-header-row">
                    <span class="op-badge ${op.badgeClass}">[${op.code}]</span>
                    <span class="t-number">Trein ${t.trainNum}</span>
                    <span class="tag-units-badge ${unitsCount > 1 ? 'is-multi' : ''}" style="margin-left: 3px;" title="${unitsCount} gekoppelde treinstel(len)">${unitsCount}</span>
                    <span class="t-direction-pill ${isReverse ? 'rev' : 'fwd'}">
                      ${isReverse ? '<span class="rev-flag">Tegentrein</span> ' : ''}➔ naar <strong>${exactDest}</strong>
                    </span>
                  </div>
                  <div class="t-mat">${t.matnummer || op.name}</div>
                </div>
                <div class="t-status-badges">
                  <span class="t-speed-badge ${spdInfo.cssClass}">${spdInfo.icon} ${spdInfo.label}</span>
                  <span class="t-punc-badge ${puncClass}">${puncText}</span>
                </div>
              </div>
              <div class="t-track-progress-row ${isReverse ? 'rev-row' : ''}">
                <span class="ttp-st-label from" title="${stFrom}">${stFrom}</span>
                <div class="ttp-bar-container">
                  <div class="ttp-bar-rail ${isDriving ? 'driving-rail' : ''} ${isReverse ? 'rev-rail' : ''}">
                    <div class="ttp-bar-fill ${isReverse ? 'rev-fill' : ''}" style="width: ${displayPct}%; background: ${isReverse ? '#38bdf8' : (op.border || 'var(--ns-yellow)')};"></div>
                    <div class="ttp-train-marker ${isDriving ? 'is-driving' : ''}" style="left: ${displayPct}%;" title="${t.speed} km/u • ${isReverse ? `Komt aanrijden vanaf ${stFrom} richting ${exactDest}` : `Rijdt van ${stFrom} naar ${exactDest}`}">
                      <span class="ttp-icon ${isReverse ? 'rev-icon' : ''}">🚆</span>
                      ${isDriving ? `<span class="ttp-pulse-ring ${isReverse ? 'rev-ring' : ''}"></span>` : ''}
                    </div>
                  </div>
                  <div class="ttp-pct-badge ${isReverse ? 'rev-badge' : ''}">
                    ${isDriving ? `⚡ Rijdt ${t.speed} km/u &bull; ➔ Richting ${exactDest} (nadert ${stTo})` : `⏸ Halteert (${displayPct}%)`}
                  </div>
                </div>
                <span class="ttp-st-label to" title="${stTo}">${stTo}</span>
              </div>
            </div>
          `;
        });
        html += `</div>`;
      }
    }
  });

  if (diagramEl) diagramEl.innerHTML = html;
  renderMapTrains(matchedTrains);
}

// =============================================================
// 8. Het Gevraagde "1 Overzicht van Alle Maatschappijen"
// =============================================================
function renderUnifiedStatusView(allTrains, statusFilter) {
  const titleEl = document.getElementById('corridorTitle');
  const metaEl = document.getElementById('corridorRouteMeta');
  const countEl = document.getElementById('corridorLiveCount');
  const diagramEl = document.getElementById('lineDiagram');
  const statusFooterEl = document.getElementById('mapStatusText');

  // Filter treinen die voldoen aan de status
  const matchedTrains = allTrains.filter(t => t.statusType === statusFilter);

  let filterTitle = '';
  let filterColor = '';
  if (statusFilter === 'ontime') {
    filterTitle = '🟢 1 Overzicht: Treinen die Op Tijd Rijden';
    filterColor = '#10b981';
  } else if (statusFilter === 'delayed') {
    filterTitle = '🟡 1 Overzicht: Vertraagde Treinen in Nederland';
    filterColor = '#f59e0b';
  } else if (statusFilter === 'pech') {
    filterTitle = '🔴 1 Overzicht: Treinen met Pech, Storing & Stilstand';
    filterColor = '#ef4444';
  }

  if (titleEl) titleEl.textContent = filterTitle;
  if (metaEl) metaEl.textContent = `Alle spoorwegmaatschappijen van Nederland &bull; Live GPS telemetrie`;
  if (countEl) countEl.innerHTML = `Totaal aantal treinen onder dit filter: <strong>${matchedTrains.length}</strong>`;
  if (statusFooterEl) statusFooterEl.textContent = `Status: ${filterTitle} &bull; ${matchedTrains.length} treinen in beeld`;

  if (!diagramEl) return;

  if (matchedTrains.length === 0) {
    diagramEl.innerHTML = `
      <div class="unified-empty-state">
        <span style="font-size: 2.4rem;">🎉</span>
        <h4>Geen treinen gevonden met deze status</h4>
        <p>Er zijn op dit moment geen treinen gemeld die onder dit criterium vallen op het Nederlandse spoorwegnet.</p>
      </div>
    `;
    renderMapTrains([]);
    return;
  }

  // Groepeer treinen per maatschappij
  const opGroups = new Map();
  matchedTrains.forEach(t => {
    const opKey = t.operator.code;
    if (!opGroups.has(opKey)) {
      opGroups.set(opKey, {
        operator: t.operator,
        trains: []
      });
    }
    opGroups.get(opKey).trains.push(t);
  });

  // Bouw het complete 1-overzicht
  let html = `
    <div class="unified-status-view">
      <div class="unified-header-box" style="border-left: 4px solid ${filterColor};">
        <div>
          <div class="unified-header-title">${filterTitle}</div>
          <div class="unified-header-summary">
            Weergegeven over <strong>${opGroups.size} spoorwegmaatschappijen</strong> &bull; Totaal <strong>${matchedTrains.length} treinen</strong>
          </div>
        </div>
      </div>
  `;

  // Toon elke maatschappij als een duidelijke sectie
  for (const [opCode, group] of opGroups.entries()) {
    const op = group.operator;
    const trains = group.trains;

    html += `
      <div class="op-group-card">
        <div class="op-group-header">
          <div class="op-group-title">
            <span class="op-badge ${op.badgeClass}">[${op.code}]</span>
            <span class="op-name">${op.name}</span>
          </div>
          <span class="op-count-badge">${trains.length} ${trains.length === 1 ? 'trein' : 'treinen'}</span>
        </div>
        <div class="op-trains-list">
    `;

    trains.forEach(t => {
      const spdInfo = getSpeedBadgeInfo(t.speed);
      const puncClass = t.statusType === 'ontime' ? 'on-time' : t.statusType === 'delayed' ? 'delayed' : 'pech';

      let statusPillText = '';
      if (t.statusType === 'pech') {
        statusPillText = t.speed === 0 ? '🔴 Gestrand / Stilstaand' : '🚨 Pech / Defect';
      } else if (t.statusType === 'delayed') {
        statusPillText = `+${t.delayMin || 2}m Vertraagd`;
      } else {
        statusPillText = '🟢 Op tijd';
      }

      const utDest = t.exactDestination || (t.service && t.service.destination && t.service.destination !== 'Eindbestemming' ? t.service.destination : '');

      html += `
        <div class="unified-train-item ${puncClass}" onclick="window.selectTrain('${t.id}')">
          <div class="ut-left">
            <div class="ut-num-row">
              <span class="op-badge ${op.badgeClass}">[${op.code}]</span>
              <span class="ut-num">Trein #${t.trainNum}</span>
              <span class="tag-units-badge ${t.unitsCount > 1 ? 'is-multi' : ''}" style="margin-left: 3px;" title="${t.unitsCount || 1} gekoppelde treinstel(len)">${t.unitsCount || 1}</span>
              ${utDest ? `<span class="t-direction-pill fwd" style="font-size:0.68rem; padding:1px 6px;">➔ ${utDest}</span>` : ''}
              <span class="ut-mat">${t.matnummer || op.name}</span>
            </div>
            <div class="ut-status-row">
              <span class="status-pill ${puncClass}">${statusPillText}</span>
              <span class="ut-loc">GPS: ${t.lat.toFixed(3)}, ${t.lon.toFixed(3)}</span>
            </div>
          </div>
          <div class="ut-right">
            <span class="t-speed-badge ${spdInfo.cssClass}">${spdInfo.icon} ${spdInfo.label}</span>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  }

  html += `</div>`;
  diagramEl.innerHTML = html;

  // Filter ook de kaart om ALLEEN deze treinen met opvallende gloed te tonen
  renderMapTrains(matchedTrains);
}

// =============================================================
// Vloeiende 60 FPS Dead-Reckoning Treinrij-Engine
// Laat treinen continu op ware snelheid over het spoor glijden
// zonder stil te staan tussen updates of plotseling te verspringen!
// =============================================================
function startRailMotionEngine() {
  if (appState.railMotionRaf) return;

  function stepRailMotion(now) {
    if (!appState.lastSimTime) appState.lastSimTime = now;
    const dt = Math.min(0.1, Math.max(0.001, (now - appState.lastSimTime) / 1000));
    appState.lastSimTime = now;

    // Beweeg de actieve goederenvloot continu over de goederencorridors
    advanceFreightFleet(dt);

    for (const [id, state] of appState.trainMotionStates.entries()) {
      const m = state.marker;
      if (!m || !appState.trainMarkers.has(id)) continue;

      // Als de trein rijdt (> 5 km/u): beweeg vloeiend voorwaarts op ware telemetrie-snelheid
      if (state.isDriving && state.speed > 5) {
        const midLat = state.curLat;
        const kx = 111320.0 * Math.cos(midLat * Math.PI / 180);
        const ky = 110574.0;

        // Exacte verplaatsing in meters op ware snelheid
        const distMeters = (state.speed / 3.6) * dt;

        // Isometrische eenheidsvector in meters zodat de snelheid overal exact klopt
        let ux = 0, uy = 0;
        if (state.dirVector && (state.dirVector.dLat !== 0 || state.dirVector.dLon !== 0)) {
          const mx = state.dirVector.dLon * kx;
          const my = state.dirVector.dLat * ky;
          const lenMeters = Math.hypot(mx, my) || 1;
          ux = mx / lenMeters;
          uy = my / lenMeters;
        } else if (state.heading !== undefined) {
          const rad = state.heading * Math.PI / 180;
          ux = Math.sin(rad);
          uy = Math.cos(rad);
        }

        state.curLon += (distMeters * ux) / kx;
        state.curLat += (distMeters * uy) / ky;

        // Vloeiende voortgang in geopende lijstweergave
        if (state.segLenKm && state.segLenKm > 0) {
          const dPct = (distMeters / (state.segLenKm * 1000)) * 100;
          if (state.displayPct !== undefined) {
            state.displayPct = Math.min(95, Math.max(5, state.displayPct + dPct));
            const card = document.querySelector(`.train-corridor-card[data-train-id="${id}"]`);
            if (card) {
              const fill = card.querySelector('.ttp-bar-fill');
              const marker = card.querySelector('.ttp-train-marker');
              if (fill) fill.style.width = `${state.displayPct}%`;
              if (marker) marker.style.left = `${state.displayPct}%`;
            }
          }
        }
      }

      // Vloeiende reconciliatie van GPS drift (zonder schokken of verspringen)
      if (state.driftLat !== 0 || state.driftLon !== 0) {
        const blend = Math.min(1.0, dt * 1.8);
        state.curLat += state.driftLat * blend;
        state.curLon += state.driftLon * blend;
        state.driftLat *= (1.0 - blend);
        state.driftLon *= (1.0 - blend);
        if (Math.hypot(state.driftLat, state.driftLon) < 0.000005) {
          state.driftLat = 0;
          state.driftLon = 0;
        }
      }

      m.setLatLng([state.curLat, state.curLon]);

      if (state.heading !== undefined) {
        const el = m.getElement();
        if (el) {
          const arrowEl = el.querySelector('.train-pin-heading-arrow');
          if (arrowEl) {
            arrowEl.style.transform = `rotate(${Math.round(state.heading)}deg)`;
          }
        }
      }
    }

    // Live camera follow voor de geselecteerde trein (bv. goederentrein)
    if (appState.followedTrainId && appState.trainMotionStates.has(appState.followedTrainId)) {
      const fState = appState.trainMotionStates.get(appState.followedTrainId);
      if (appState.map && fState) {
        if (!appState.lastFollowPan || (now - appState.lastFollowPan) > 300) {
          appState.lastFollowPan = now;
          appState.map.panTo([fState.curLat, fState.curLon], { animate: true, duration: 0.3 });
        }
        const hudSpd = document.getElementById('hudSpeedVal');
        if (hudSpd) hudSpd.textContent = Math.round(fState.speed);
      }
    }

    appState.railMotionRaf = requestAnimationFrame(stepRailMotion);
  }

  appState.lastSimTime = performance.now();
  appState.railMotionRaf = requestAnimationFrame(stepRailMotion);
}

// Hulpanimatie voor de eigen GPS-locatie marker van de gebruiker
function smoothMoveMarker(marker, targetLat, targetLon, durationMs = 1200) {
  if (!marker) return;
  if (!marker._anim) marker._anim = {};
  if (marker._anim.raf) {
    cancelAnimationFrame(marker._anim.raf);
    marker._anim.raf = null;
  }

  const current = marker.getLatLng();
  const startLat = current.lat;
  const startLon = current.lng;
  const dLat = targetLat - startLat;
  const dLon = targetLon - startLon;

  const dist = Math.hypot(dLat, dLon);
  if (dist > 0.15 || dist < 0.00002) {
    marker.setLatLng([targetLat, targetLon]);
    return;
  }

  const startTime = performance.now();
  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / durationMs);
    const ease = progress * (2 - progress);
    marker.setLatLng([startLat + dLat * ease, startLon + dLon * ease]);
    if (progress < 1) {
      marker._anim.raf = requestAnimationFrame(step);
    } else {
      marker._anim.raf = null;
    }
  }
  marker._anim.raf = requestAnimationFrame(step);
}

// =============================================================
// 9. Teken Treinen op de Satellietkaart (Rustig, Schoon & Anti-Chaos)
// =============================================================
function renderMapTrains(trainList) {
  const map = appState.map;
  if (!map) return;
  appState.lastRenderedTrains = trainList;

  // Filter treinen op beweging (rijdend vs. stilstaand op emplacement/perron)
  let trainsToRender = trainList;
  if (appState.motionFilter === 'moving') {
    trainsToRender = trainsToRender.filter(t => t.speed > 5);
  } else if (appState.motionFilter === 'standing') {
    trainsToRender = trainsToRender.filter(t => t.speed <= 5);
  }

  const currentIds = new Set();
  const zoom = map.getZoom();
  const isAllMode = appState.activeCorridorKey === 'all' || appState.activeCategory === 'all';
  const densityMode = appState.labelMode || 'smart';

  // Bepaal modus: op een specifiek gekozen traject tonen we ALTIJD de trein en de actuele snelheid!
  const isMinimal = isAllMode && densityMode === 'minimal';
  const useCompact = isAllMode ? (densityMode === 'compact' || densityMode === 'minimal' || zoom < 11) : false;
  const baseCompactClass = isMinimal ? 'minimal' : (useCompact ? 'compact' : '');

  // Houd bij waar tags op het scherm worden geplaatst voor slimme botsingdetectie
  const placedTagBoxes = [];

  trainsToRender.forEach(t => {
    currentIds.add(t.id);
    const op = t.operator;
    const spdInfo = getSpeedBadgeInfo(t.speed);
    const statusBorder = t.statusType === 'ontime' ? '#10b981' :
                         t.statusType === 'delayed' ? '#f59e0b' : '#ef4444';

    // Bereken pixelpositie op het scherm
    let pt = null;
    try {
      pt = map.latLngToLayerPoint([t.lat, t.lon]);
    } catch (e) {
      pt = null;
    }

    // Bepaal tag positie (boven, onder, rechts of links) zodat treinnummers nooit over elkaar vallen
    let posClass = 'tag-pos-top';
    let trainCompactClass = baseCompactClass;

    if (pt) {
      const boxW = useCompact ? 48 : 100;
      const boxH = 24;
      let collidesTop = false;
      let collidesBottom = false;
      let collidesRight = false;
      let collidesLeft = false;

      for (const p of placedTagBoxes) {
        if (Math.abs(pt.x - p.x) < boxW && Math.abs((pt.y - 20) - p.y) < boxH) {
          collidesTop = true;
          break;
        }
      }

      if (collidesTop) {
        // Probeer onder
        for (const p of placedTagBoxes) {
          if (Math.abs(pt.x - p.x) < boxW && Math.abs((pt.y + 28) - p.y) < boxH) {
            collidesBottom = true;
            break;
          }
        }
        if (!collidesBottom) {
          posClass = 'tag-pos-bottom';
        } else {
          // Probeer rechts
          for (const p of placedTagBoxes) {
            if (Math.abs((pt.x + 36) - p.x) < boxW && Math.abs(pt.y - p.y) < boxH) {
              collidesRight = true;
              break;
            }
          }
          if (!collidesRight) {
            posClass = 'tag-pos-right';
          } else {
            // Probeer links
            for (const p of placedTagBoxes) {
              if (Math.abs((pt.x - 36) - p.x) < boxW && Math.abs(pt.y - p.y) < boxH) {
                collidesLeft = true;
                break;
              }
            }
            if (!collidesLeft) {
              posClass = 'tag-pos-left';
            } else {
              trainCompactClass = 'minimal';
            }
          }
        }
      }

      const tagX = posClass === 'tag-pos-right' ? pt.x + 36 : (posClass === 'tag-pos-left' ? pt.x - 36 : pt.x);
      const tagY = posClass === 'tag-pos-bottom' ? pt.y + 28 : pt.y - 20;
      placedTagBoxes.push({ x: tagX, y: tagY });
    }

    const isDriving = t.speed > 5;
    const isRev = !!t.isReverse;
    const arrow = isRev ? '⬅' : '➔';
    const rawDest = t.exactDestination || (t.service && t.service.destination && t.service.destination !== 'Eindbestemming' ? t.service.destination : '') || (isRev ? 'Startpunt' : 'Eindpunt');
    const destDisplay = formatDestinationDisplay(rawDest);
    let state = appState.trainMotionStates.get(t.id);

    if (appState.trainMarkers.has(t.id)) {
      const m = appState.trainMarkers.get(t.id);

      if (state) {
        state.isReverse = isRev;
        state.segLenKm = t.segLenKm || state.segLenKm || 5.0;

        // Bereken of telemetry van treinposities.nl nieuwe GPS coördinaten bevat
        const dMovedKm = distanceKm(state.lastRawLat, state.lastRawLon, t.lat, t.lon);
        if (dMovedKm > 0.035) { // Meer dan 35 meter verplaatst
          const dLat = t.lat - state.lastRawLat;
          const dLon = t.lon - state.lastRawLon;
          state.dirVector = { dLat, dLon };
          let h = Math.atan2(dLon * Math.cos(t.lat * Math.PI / 180), dLat) * 180 / Math.PI;
          if (h < 0) h += 360;
          state.heading = h;
          state.lastRawLat = t.lat;
          state.lastRawLon = t.lon;

          // Als de externe feed geen snelheid meegaf, leid de fysieke verplaatsingssnelheid af
          if (t.speed <= 5) {
            const instantSpeed = Math.min(140, Math.max(30, Math.round((dMovedKm / 4.5) * 3600)));
            t.speed = instantSpeed;
          }

          // Drift ten opzichte van onze geëxtrapoleerde positie
          const curLatLng = m.getLatLng();
          const driftLat = t.lat - curLatLng.lat;
          const driftLon = t.lon - curLatLng.lng;
          const driftDist = Math.hypot(driftLat, driftLon);
          if (driftDist > 0.12) {
            // Te grote sprong (> 12 km), snap direct
            state.curLat = t.lat;
            state.curLon = t.lon;
            state.driftLat = 0;
            state.driftLon = 0;
            m.setLatLng([t.lat, t.lon]);
          } else {
            // Vloeiende reconciliatie zonder schokken of verspringen
            state.driftLat = driftLat;
            state.driftLon = driftLon;
          }
        } else if (t.fromStation && t.toStation && t.fromStation.code !== t.toStation.code) {
          const dLat = t.toStation.lat - t.fromStation.lat;
          const dLon = t.toStation.lon - t.fromStation.lon;
          state.dirVector = { dLat, dLon };
          let h = Math.atan2(dLon * Math.cos(t.lat * Math.PI / 180), dLat) * 180 / Math.PI;
          if (h < 0) h += 360;
          state.heading = h;
        }
        state.speed = t.speed;
        state.isDriving = t.speed > 5;
        state.operator = op;
      }

      const el = m.getElement();
      if (el) {
        const pin = el.querySelector('.clean-train-pin');
        if (pin) {
          pin.classList.toggle('is-driving', isDriving);
          pin.classList.toggle('is-reverse', isRev);
        }
        const tag = el.querySelector('.clean-train-tag');
        const unitsCount = t.unitsCount || 1;
        if (tag) {
          tag.className = `clean-train-tag ${trainCompactClass} ${posClass}`;
          tag.style.borderColor = isRev ? '#38bdf8' : op.border;
          tag.innerHTML = `
            <span class="tag-op" style="background:${op.bg}; color:${op.color};">[${op.code}]</span>
            <span class="tag-num">${t.trainNum}</span>
            <span class="tag-units-badge ${unitsCount > 1 ? 'is-multi' : ''}" title="${unitsCount} gekoppelde treinstel(len)">${unitsCount}</span>
            <span class="tag-dir ${isRev ? 'rev' : 'fwd'}">➔ ${destDisplay}</span>
            <span class="tag-spd ${spdInfo.cssClass}">${spdInfo.label}</span>
          `;
        }
        const arrowEl = el.querySelector('.train-pin-heading-arrow');
        if (arrowEl && state && state.heading !== undefined) {
          arrowEl.style.transform = `rotate(${Math.round(state.heading)}deg)`;
        }
      }
    } else {
      const unitsCount = t.unitsCount || 1;
      const pinBorder = isRev ? '#38bdf8' : statusBorder;

      let initDir = { dLat: 0, dLon: 0 };
      let initHeading = 0;
      if (t.fromStation && t.toStation && t.fromStation.code !== t.toStation.code) {
        const dLat = t.toStation.lat - t.fromStation.lat;
        const dLon = t.toStation.lon - t.fromStation.lon;
        initDir = { dLat, dLon };
        let h = Math.atan2(dLon * Math.cos(t.lat * Math.PI / 180), dLat) * 180 / Math.PI;
        if (h < 0) h += 360;
        initHeading = h;
      } else if (!isNaN(parseInt(t.trainNum, 10)) && parseInt(t.trainNum, 10) > 0) {
        const num = parseInt(t.trainNum, 10);
        initHeading = (num % 2 === 0) ? 225 : 45;
      }

      const html = `
        <div class="clean-train-marker" title="[${op.code}] Trein ${t.trainNum} (${unitsCount} stel${unitsCount > 1 ? 'len' : ''}) - ${t.speed} km/u naar ${rawDest}">
          <div class="clean-train-tag ${trainCompactClass} ${posClass}" style="border-color: ${isRev ? '#38bdf8' : op.border};">
            <span class="tag-op" style="background:${op.bg}; color:${op.color};">[${op.code}]</span>
            <span class="tag-num">${t.trainNum}</span>
            <span class="tag-units-badge ${unitsCount > 1 ? 'is-multi' : ''}" title="${unitsCount} gekoppelde treinstel(len)">${unitsCount}</span>
            <span class="tag-dir ${isRev ? 'rev' : 'fwd'}">➔ ${destDisplay}</span>
            <span class="tag-spd ${spdInfo.cssClass}">${spdInfo.label}</span>
          </div>
          <div class="clean-train-pin ${isDriving ? 'is-driving' : ''} ${isRev ? 'is-reverse' : ''}" style="background: ${op.border}; border-color: ${pinBorder};">
            <div class="train-pin-heading-arrow" style="transform: rotate(${Math.round(initHeading)}deg);" title="Rijrichting: ${Math.round(initHeading)}°">▲</div>
            ${op.category === 'freight' ? '<span style="font-size:13px; line-height:1; display:flex; align-items:center; justify-content:center;">🚂</span>' : `
            <svg viewBox="0 0 24 24" width="14" height="14" fill="${op.color}">
              <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zm0 2c3.5 0 6 .4 6 2H6c0-1.6 2.5-2 6-2zm-5 9c-.83 0-1.5-.67-1.5-1.5S6.17 10 7 10s1.5.67 1.5 1.5S7.83 13 7 13zm10 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>`}
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'clean-div-icon',
        html,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([t.lat, t.lon], { icon }).addTo(map);
      marker.on('click', () => window.selectTrain(t.id));
      appState.trainMarkers.set(t.id, marker);

      const rawPct = (t.segmentProgress !== undefined) ? t.segmentProgress : 0.5;
      const initialDisplayPct = Math.max(5, Math.min(95, Math.round((isRev ? (1.0 - rawPct) : rawPct) * 100)));

      appState.trainMotionStates.set(t.id, {
        marker,
        curLat: t.lat,
        curLon: t.lon,
        lastRawLat: t.lat,
        lastRawLon: t.lon,
        speed: t.speed,
        isDriving,
        isReverse: isRev,
        segLenKm: t.segLenKm || 5.0,
        displayPct: initialDisplayPct,
        dirVector: initDir,
        heading: initHeading,
        driftLat: 0,
        driftLon: 0
      });
    }
  });

  // Verwijder markers die niet meer op deze lijn rijden
  for (const [id, m] of appState.trainMarkers.entries()) {
    if (!currentIds.has(id)) {
      m.remove();
      appState.trainMarkers.delete(id);
      appState.trainMotionStates.delete(id);
    }
  }
}

// Selecteer een trein en zoom in op de satelliet
window.selectTrain = (trainId) => {
  appState.selectedTrainId = trainId;
  const allParsed = getActiveParsedTrains();
  const train = allParsed.find(t => t && t.id === trainId);
  if (!train) return;

  playAuthenticNSChime();

  // Mobiele & iPad optimalisatie: als de gebruiker in lijstmodus zat, toon de kaart
  const layout = document.getElementById('mainLayout');
  if (layout && layout.classList.contains('view-list')) {
    if (window.setAppViewMode) {
      window.setAppViewMode('map');
    } else {
      layout.classList.remove('view-list');
      layout.classList.add('view-map');
      if (appState.map) setTimeout(() => appState.map.invalidateSize(), 100);
    }
  }

  const box = document.getElementById('inspectorBox');
  if (box) {
    box.style.display = 'block';
    const op = train.operator;
    const spdInfo = getSpeedBadgeInfo(train.speed);

    const badgeEl = document.getElementById('inspOpBadge');
    if (badgeEl) {
      badgeEl.className = `op-badge ${op.badgeClass}`;
      badgeEl.textContent = `[${op.code}]`;
    }

    let statusPillClass = 'green';
    let statusPillLabel = 'Op tijd';
    if (train.statusType === 'pech') {
      statusPillClass = 'halted';
      statusPillLabel = '🚨 Pech / Gestrand';
    } else if (train.statusType === 'delayed') {
      statusPillClass = 'yellow';
      statusPillLabel = `+${train.delayMin || 2}m vertraagd`;
    }

    const unitsCount = train.unitsCount || 1;
    const rawDest = train.exactDestination || (train.service && train.service.destination && train.service.destination !== 'Eindbestemming' ? train.service.destination : '') || (train.isReverse ? 'Beginstation' : 'Eindstation');
    document.getElementById('inspTitle').textContent = `Trein #${train.trainNum} (${unitsCount} stel${unitsCount > 1 ? 'len' : ''}) ➔ ${rawDest}`;
    const destEl = document.getElementById('inspDestination');
    if (destEl) destEl.textContent = `➔ ${rawDest}`;
    document.getElementById('inspOperator').textContent = `${op.name} (${op.code})`;
    document.getElementById('inspSpeed').innerHTML = `<span class="t-speed-badge ${spdInfo.cssClass}">${spdInfo.icon} ${train.speed} km/u</span>`;
    const matDisplay = train.matnummer || 'Standaard materieel';
    document.getElementById('inspMat').innerHTML = `${unitsCount > 1 ? `<span class="t-units-pill is-multi">${unitsCount}x gekoppeld</span> ` : ''}${matDisplay}`;
    document.getElementById('inspPunc').textContent = statusPillLabel;
    document.getElementById('inspPunc').className = `status-pill ${statusPillClass}`;
    document.getElementById('inspStatus').textContent = spdInfo.text;
    document.getElementById('inspGps').textContent = train.gpsdata;

    const btnFollow = document.getElementById('btnInspFollowLive');
    const btnFollowText = document.getElementById('btnInspFollowText');
    if (btnFollow) {
      const isFollowed = appState.followedTrainId === trainId;
      btnFollow.classList.toggle('active', isFollowed);
      if (btnFollowText) {
        btnFollowText.textContent = isFollowed ? '⏹️ Stop Volgen' : 'Volg Live op Satelliet';
      }
      btnFollow.onclick = () => {
        if (appState.followedTrainId === trainId) {
          stopFollowingTrain();
        } else {
          startFollowingTrain(trainId);
        }
      };
    }
  }

  // Geef de geselecteerde marker een opvallende gloed en open de tag direct
  appState.trainMarkers.forEach((m, id) => {
    const el = m.getElement();
    if (el) {
      const isSelected = id === trainId;
      el.classList.toggle('selected', isSelected);
      const markerPin = el.querySelector('.clean-train-pin');
      if (markerPin) {
        markerPin.style.transform = isSelected ? 'scale(1.4)' : '';
        markerPin.style.boxShadow = isSelected ? '0 0 16px var(--ns-yellow)' : '';
      }
    }
  });

  appState.map.flyTo([train.lat, train.lon], 14, { duration: 1.2 });
};

// =============================================================
// Live Camera Follow & Goederen Navigatie
// =============================================================
export function startFollowingTrain(trainId) {
  appState.followedTrainId = trainId;
  const allTrains = getActiveParsedTrains();
  const train = allTrains.find(t => t.id === trainId);
  if (!train) return;

  if (appState.map) {
    appState.map.flyTo([train.lat, train.lon], 14, { duration: 0.8 });
  }

  const followBadge = document.getElementById('liveFollowBadge');
  const followText = document.getElementById('liveFollowText');
  const opCode = train.operator ? train.operator.code : 'Trein';
  const rawDest = train.exactDestination || (train.service ? train.service.destination : '') || 'Bestemming';
  if (followBadge && followText) {
    followText.innerHTML = `🛰️ Volgt live: <strong>[${opCode}] #${train.trainNum}</strong> (${train.speed} km/u) ➔ ${rawDest}`;
    followBadge.style.display = 'flex';
  }

  const btnFollow = document.getElementById('btnInspFollowLive');
  const btnFollowText = document.getElementById('btnInspFollowText');
  if (btnFollow) {
    btnFollow.classList.add('active');
    if (btnFollowText) btnFollowText.textContent = '⏹️ Stop Volgen';
  }

  const hud = document.getElementById('liveTrainHUD');
  if (hud) {
    hud.style.display = 'flex';
    const trainTitleEl = document.getElementById('hudTrainTitle');
    if (trainTitleEl) trainTitleEl.textContent = `${opCode} #${train.trainNum}`;
    const hudBadge = document.getElementById('hudOpBadge');
    if (hudBadge && train.operator) {
      hudBadge.className = `op-badge ${train.operator.badgeClass || 'op-freight'}`;
      hudBadge.textContent = `[${opCode}]`;
    }
    const hudRoute = document.getElementById('hudNextStationText');
    if (hudRoute) hudRoute.innerHTML = `➔ <strong>${rawDest}</strong> &bull; ${train.matnummer || 'Goederen'}`;
    const hudSpd = document.getElementById('hudSpeedVal');
    if (hudSpd) hudSpd.textContent = train.speed;
  }
}

export function stopFollowingTrain() {
  appState.followedTrainId = null;
  const followBadge = document.getElementById('liveFollowBadge');
  if (followBadge) followBadge.style.display = 'none';

  const btnFollow = document.getElementById('btnInspFollowLive');
  const btnFollowText = document.getElementById('btnInspFollowText');
  if (btnFollow) {
    btnFollow.classList.remove('active');
    if (btnFollowText) btnFollowText.textContent = 'Volg Live op Satelliet';
  }

  const hud = document.getElementById('liveTrainHUD');
  if (hud && !appState.isTrackingUser) {
    hud.style.display = 'none';
  }
}

window.startFollowingTrain = startFollowingTrain;
window.stopFollowingTrain = stopFollowingTrain;
window.switchCorridor = switchCorridor;

window.jumpToFreightTerminal = (lat, lon, zoom, name) => {
  if (!appState.map) return;
  stopFollowingTrain();
  appState.map.flyTo([lat, lon], zoom || 15, { duration: 1.2 });
  playAuthenticNSChime();
};

// =============================================================
// 9b. Station Vertrekstaat & Perronbord (Interactief aanklikbaar)
// =============================================================

const EXTRA_STATIONS = [
  { code: 'APHS', name: 'Amersfoort Schothorst', lat: 52.174875, lon: 5.403838, sporen: '1-3', operator: 'NS Reizigers' },
  { code: 'AMFS', name: 'Amersfoort Schothorst', lat: 52.174875, lon: 5.403838, sporen: '1-3', operator: 'NS Reizigers' },
  { code: 'BP',   name: 'Buitenpost',            lat: 53.2522, lon: 6.1436, sporen: '1-2', operator: 'Arriva' },
  { code: 'BKL',  name: 'Breukelen',             lat: 52.1719, lon: 4.9903, sporen: '1-4', operator: 'NS Reizigers' },
  { code: 'MAS',  name: 'Maarssen',              lat: 52.1389, lon: 5.0414, sporen: '1-4', operator: 'NS Reizigers' },
  { code: 'LW',   name: 'Leeuwarden',            lat: 53.1972, lon: 5.7925, sporen: '1-8', operator: 'NS & Arriva' },
  { code: 'ASA',  name: 'Amsterdam Amstel',      lat: 52.3467, lon: 4.9178, sporen: '1-4', operator: 'NS Reizigers' },
  { code: 'ASDL', name: 'Amsterdam Zuid',        lat: 52.3353, lon: 4.8719, sporen: '1-4', operator: 'NS Reizigers' },
  { code: 'ASS',  name: 'Amsterdam Sloterdijk',  lat: 52.3892, lon: 4.8378, sporen: '1-12', operator: 'NS Reizigers' },
  { code: 'ZD',   name: 'Zaandam',               lat: 52.4386, lon: 4.8142, sporen: '1-5', operator: 'NS Reizigers' },
  { code: 'AKM',  name: 'Alkmaar',               lat: 52.6375, lon: 4.7408, sporen: '1-5', operator: 'NS Reizigers' },
  { code: 'HR',   name: 'Hoorn',                 lat: 52.6450, lon: 5.0567, sporen: '1-3', operator: 'NS Reizigers' },
  { code: 'HFD',  name: 'Hoofddorp',             lat: 52.2936, lon: 4.6978, sporen: '1-4', operator: 'NS Reizigers' },
  { code: 'HLM',  name: 'Haarlem',               lat: 52.3878, lon: 4.6394, sporen: '1-8', operator: 'NS Reizigers' },
  { code: 'ZVT',  name: 'Zandvoort aan Zee',     lat: 52.3750, lon: 4.5333, sporen: '1-2', operator: 'NS Reizigers' },
  { code: 'ALM',  name: 'Almere Centrum',        lat: 52.3750, lon: 5.2178, sporen: '1-4', operator: 'NS Reizigers' },
  { code: 'LLV',  name: 'Lelystad Centrum',      lat: 52.5078, lon: 5.4739, sporen: '1-4', operator: 'NS Reizigers' },
  { code: 'BTL',  name: 'Boxtel',                lat: 51.5833, lon: 5.3217, sporen: '1-4', operator: 'NS Reizigers' },
  { code: 'ECHT', name: 'Echt',                  lat: 51.1036, lon: 5.8653, sporen: '1-2', operator: 'Arriva & NS' },
  { code: 'HGL',  name: 'Hengelo',               lat: 52.2625, lon: 6.7936, sporen: '1-3', operator: 'NS & Keolis' },
  { code: 'ZH',   name: 'Zuidhorn',              lat: 53.2458, lon: 6.4258, sporen: '1-2', operator: 'Arriva' }
];

// Vind station op code of naam door alle 397 stations, corridors en extra stations heen
function findStationByCode(codeOrName) {
  if (!codeOrName) return null;
  const target = String(codeOrName).trim().toLowerCase();

  // 1. Eerst direct zoeken in alle 397 officiële Nederlandse stations
  if (window.ALL_NL_STATIONS && Array.isArray(window.ALL_NL_STATIONS)) {
    for (const st of window.ALL_NL_STATIONS) {
      if (st.code.toLowerCase() === target || st.name.toLowerCase() === target) {
        return { ...st, corridorName: st.name, operator: st.operator || 'NS / Regionaal' };
      }
    }
  }

  // 2. Corridors doorzoeken
  for (const cKey in CORRIDORS) {
    const corridor = CORRIDORS[cKey];
    for (const st of corridor.stations) {
      if (st.code.toLowerCase() === target || st.name.toLowerCase() === target) {
        return { ...st, corridorName: corridor.name, operator: corridor.operator };
      }
    }
  }

  // 3. Extra stations doorzoeken
  for (const st of EXTRA_STATIONS) {
    if (st.code.toLowerCase() === target || st.name.toLowerCase() === target) {
      return { ...st, corridorName: st.name, operator: st.operator || 'NS Reizigers' };
    }
  }
  return null;
}

// Haal alle unieke stations op uit de complete Nederlandse stationscatalogus (397 stations)
function getAllStations() {
  const map = new Map();

  // 1. Alle 397 officiële Nederlandse stations (ProRail / NS / Regionaal)
  if (window.ALL_NL_STATIONS && Array.isArray(window.ALL_NL_STATIONS)) {
    for (const st of window.ALL_NL_STATIONS) {
      map.set(st.code, { ...st, corridorName: st.name, operator: st.operator || 'NS / Regionaal' });
    }
  }

  // 2. Aanvullen met specifieke corridor station metadata
  for (const cKey in CORRIDORS) {
    for (const st of CORRIDORS[cKey].stations) {
      const existing = map.get(st.code);
      if (existing) {
        if (st.terminal) existing.terminal = true;
        if (st.sporen) existing.sporen = st.sporen;
      } else {
        map.set(st.code, { ...st, corridorName: CORRIDORS[cKey].name, operator: CORRIDORS[cKey].operator });
      }
    }
  }

  // 3. Extra stations catalogus
  for (const st of EXTRA_STATIONS) {
    if (!map.has(st.code)) {
      map.set(st.code, { ...st, corridorName: st.name, operator: st.operator || 'NS Reizigers' });
    }
  }
  return Array.from(map.values());
}

// Bouw een specifiek deeltraject tussen vertrek- en aankomststation (bv. Buitenpost ➔ Leeuwarden of Apeldoorn De Maten ➔ Zutphen)
function buildCustomRoute(fromCode, toCode) {
  const stA = findStationByCode(fromCode);
  const stB = findStationByCode(toCode);
  if (!stA || !stB || stA.code.toLowerCase() === stB.code.toLowerCase()) return null;

  // 1. Zoek of er een bestaande corridor is waar BEIDE stations op liggen
  let intermediateStations = [];
  let matchedCorridor = null;
  for (const cKey in CORRIDORS) {
    const c = CORRIDORS[cKey];
    if (c.isCustomRoute) continue;
    const idxA = c.stations.findIndex(s => s.code.toLowerCase() === fromCode.toLowerCase());
    const idxB = c.stations.findIndex(s => s.code.toLowerCase() === toCode.toLowerCase());
    if (idxA !== -1 && idxB !== -1) {
      matchedCorridor = c;
      if (idxA < idxB) {
        intermediateStations = c.stations.slice(idxA, idxB + 1);
      } else {
        intermediateStations = c.stations.slice(idxB, idxA + 1).reverse();
      }
      break;
    }
  }

  // 2. Als ze niet op dezelfde corridor liggen, ontdek alle tussenstations via rail-geometrie
  if (intermediateStations.length < 2) {
    const dAB = distanceKm(stA.lat, stA.lon, stB.lat, stB.lon);
    const candidateStations = [];

    // Perpendicular cross-track projectie berekening (nauwkeurige spooras)
    const midLat = (stA.lat + stB.lat) / 2.0;
    const kx = 111.320 * Math.cos(midLat * Math.PI / 180);
    const ky = 110.574;
    const ax = stA.lon * kx, ay = stA.lat * ky;
    const bx = stB.lon * kx, by = stB.lat * ky;
    const dx = bx - ax, dy = by - ay;
    const segLenSq = dx * dx + dy * dy;

    // Maximale afwijking van de spooras (corridor breedte)
    const maxPerp = Math.min(4.0, Math.max(1.8, dAB * 0.05));

    const allStations = getAllStations();
    allStations.forEach(st => {
      if (st.code.toLowerCase() === stA.code.toLowerCase() || st.code.toLowerCase() === stB.code.toLowerCase()) return;
      if (st.sporen === 'Goederen' || st.sporen === 'DE Grens' || st.name.includes('Goederen') || st.name.includes('Empl.') || st.name.includes('Aansluiting')) return;

      if (segLenSq > 0) {
        const px = st.lon * kx, py = st.lat * ky;
        const t = ((px - ax) * dx + (py - ay) * dy) / segLenSq;
        if (t > 0.02 && t < 0.98) {
          const projX = ax + t * dx;
          const projY = ay + t * dy;
          const perpDist = Math.sqrt((px - projX) * (px - projX) + (py - projY) * (py - projY));
          if (perpDist <= maxPerp) {
            candidateStations.push({ ...st, t, perpDist });
          }
        }
      }
    });

    candidateStations.sort((a, b) => a.t - b.t);
    intermediateStations = [stA, ...candidateStations, stB];
  }

  // Markeer het begin- en eindstation als terminal
  const cleanedStations = intermediateStations.map((s, idx) => ({
    ...s,
    terminal: idx === 0 || idx === intermediateStations.length - 1
  }));

  // Bepaal de spoorwegmaatschappij van het traject
  let opKey = 'ns';
  let opName = 'NS Reizigers';
  let opBadge = 'NS';

  if (matchedCorridor) {
    opKey = matchedCorridor.primaryOpKey || 'ns';
    opName = matchedCorridor.operator || 'NS Reizigers';
    opBadge = matchedCorridor.badge || 'TRAJECT';
  } else {
    const codes = new Set(cleanedStations.map(s => s.code.toUpperCase()));
    const isArriva = ['APDM', 'KBK', 'VEM', 'VD', 'RL', 'LTV', 'WW', 'WTN', 'BP', 'ZH', 'DL', 'OMN', 'HDB', 'CO', 'EMN', 'MTH', 'BOX', 'VRN', 'CU', 'BHE', 'TBE', 'SWK', 'MRN', 'RV'].some(c => codes.has(c));
    const isBlauwnet = ['KPN', 'KPNZ', 'HA', 'NIJ', 'RA', 'HV', 'ALM', 'WB', 'BKN'].some(c => codes.has(c));
    const isQbuzz = ['SDT', 'SDTB', 'HLD', 'GCM', 'ARR', 'LR', 'BK', 'GDM'].some(c => codes.has(c));

    if (isArriva) {
      opKey = 'arriva';
      opName = 'Arriva Personenvervoer';
      opBadge = 'Arriva';
    } else if (isBlauwnet) {
      opKey = 'blauwnet';
      opName = 'Keolis / Blauwnet';
      opBadge = 'Blauwnet';
    } else if (isQbuzz) {
      opKey = 'qbuzz';
      opName = 'Qbuzz (R-net)';
      opBadge = 'R-net';
    }
  }

  const customId = `custom-${stA.code.toLowerCase()}-${stB.code.toLowerCase()}`;
  return {
    id: customId,
    category: opKey === 'ns' ? 'ns' : 'regional',
    name: `${stA.name} ➔ ${stB.name}`,
    shortName: `${stA.name} ➔ ${stB.name}`,
    badge: opBadge,
    operator: opName,
    primaryOpKey: opKey,
    stations: cleanedStations,
    isCustomRoute: true
  };
}

function applyCustomRoute(fromCode, toCode) {
  // Sla altijd direct op in localStorage zodat het laatst gekozen (Tot/Van) station als standaard behouden blijft
  try {
    if (fromCode) localStorage.setItem('treinen_last_from', fromCode);
    if (toCode) localStorage.setItem('treinen_last_to', toCode);
  } catch (e) {}

  const customCorridor = buildCustomRoute(fromCode, toCode);
  if (!customCorridor) return;

  CORRIDORS[customCorridor.id] = customCorridor;
  appState.activeCorridorKey = customCorridor.id;
  appState.activeCategory = 'custom';

  // Synchroniseer de van/naar dropdown selectoren
  const fromSel = document.getElementById('routeFromSelect');
  const toSel = document.getElementById('routeToSelect');
  if (fromSel && fromSel.value !== fromCode) fromSel.value = fromCode;
  if (toSel && toSel.value !== toCode) toSel.value = toCode;

  // Werk traject dropdown select bij
  const trajectSel = document.getElementById('trajectSelect');
  if (trajectSel) {
    let customOpt = document.getElementById('optCustomActive');
    if (!customOpt) {
      customOpt = document.createElement('option');
      customOpt.id = 'optCustomActive';
      trajectSel.appendChild(customOpt);
    }
    customOpt.value = customCorridor.id;
    customOpt.textContent = `🎯 Traject: ${customCorridor.name}`;
    trajectSel.value = customCorridor.id;
  }

  // Toon samenvatting in route planner bar
  const summaryEl = document.getElementById('rpRouteSummary');
  if (summaryEl) {
    summaryEl.style.display = 'block';
    summaryEl.innerHTML = `🚆 Actief traject: <strong>${customCorridor.name}</strong> &bull; ${customCorridor.stations.length} stations op het baanvak`;
  }

  // Status filters resetten
  appState.activeStatusFilter = 'all';
  document.querySelectorAll('.status-filter-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btnFilterAll')?.classList.add('active');

  // Reset eventueel vergrendelde trein zodat GPS direct de trein in de nieuwe reisrichting matcht
  appState.userLockedTrainId = null;
  appState.userPreferredDirection = null;
  appState.myTrain = null;

  renderCorridorOnMap(customCorridor);
  updateLineOverview();
  playAuthenticNSChime();

  // Re-evalueer direct de treinmatch op basis van het nieuwe traject
  if (appState.lastGpsFix) {
    onLiveLocationFix({
      coords: {
        latitude: appState.lastGpsFix.lat,
        longitude: appState.lastGpsFix.lon,
        accuracy: appState.lastGpsFix.acc || 15,
        speed: (appState.lastGpsFix.speed ? appState.lastGpsFix.speed / 3.6 : 0),
        heading: appState.lastGpsFix.heading
      }
    });
  }
}

function populateRoutePlannerDropdowns() {
  const fromSel = document.getElementById('routeFromSelect');
  const toSel = document.getElementById('routeToSelect');
  if (!fromSel || !toSel) return;

  const currentFrom = fromSel.value;
  const currentTo = toSel.value;

  const allStations = getAllStations()
    .filter(s => s.sporen !== 'Goederen' && s.sporen !== 'DE Grens' && !s.name.includes('Goederen') && !s.name.includes('Empl.') && !s.name.includes('Rangeer'))
    .sort((a, b) => a.name.localeCompare(b.name, 'nl'));

  let htmlFrom = `<option value="">📍 Kies Van-station (${allStations.length} st.)...</option>`;
  let htmlTo = `<option value="">🏁 Kies Tot-station (${allStations.length} st.)...</option>`;

  allStations.forEach(st => {
    htmlFrom += `<option value="${st.code}">${st.name} (${st.code})</option>`;
    htmlTo += `<option value="${st.code}">${st.name} (${st.code})</option>`;
  });

  fromSel.innerHTML = htmlFrom;
  toSel.innerHTML = htmlTo;

  // Onthoud laatst gekozen Van & Tot stations uit localStorage (zodat de keuze van Tot standaard blijft staan)
  let savedFrom = 'BP';
  let savedTo = 'LW';
  try {
    const lsFrom = localStorage.getItem('treinen_last_from');
    const lsTo = localStorage.getItem('treinen_last_to');
    const stationCodes = new Set(allStations.map(s => s.code));
    if (lsFrom && stationCodes.has(lsFrom)) savedFrom = lsFrom;
    if (lsTo && stationCodes.has(lsTo)) savedTo = lsTo;
  } catch (e) {}

  fromSel.value = currentFrom || savedFrom;
  toSel.value = currentTo || savedTo;
}

// Bepaal een authentiek perronspoor (bv. 4a, 8b of 1)
function assignPlatform(sporenStr, trainNum) {
  if (!sporenStr || sporenStr === 'Empl.' || sporenStr === 'Goederen' || sporenStr === 'DE Grens') {
    return sporenStr || '1';
  }
  const tNum = parseInt(trainNum, 10) || 1;
  const matchRange = sporenStr.match(/^(\d+)-(\d+)$/);
  if (matchRange) {
    const min = parseInt(matchRange[1], 10);
    const max = parseInt(matchRange[2], 10);
    const range = max - min + 1;
    const pNum = min + (tNum % range);
    const sub = (tNum % 3 === 0) ? 'a' : (tNum % 3 === 1 ? 'b' : '');
    return `${pNum}${sub}`;
  }
  return sporenStr;
}

// Hulpfunctie om het reizigers-vertrekbord te renderen met eventuele maatschappijfilter
function renderStationDepartureBoard(station, filterOpCode) {
  const listEl = document.getElementById('stationBoardList');
  const countEl = document.getElementById('stModalLiveTrainCount');
  if (!listEl) return;

  const allTrains = appState.stationModalTrains || [];
  let displayedTrains = allTrains;
  if (filterOpCode && filterOpCode !== 'all') {
    displayedTrains = allTrains.filter(t => t.operator && t.operator.code.toLowerCase() === filterOpCode.toLowerCase());
  }

  const atStationCount = displayedTrains.filter(t => t.isAtStation).length;
  const nearingCount = displayedTrains.filter(t => !t.isAtStation).length;

  if (countEl) {
    countEl.innerHTML = `<strong>${atStationCount}</strong> aanwezig op station &bull; <strong>${nearingCount}</strong> in aantocht`;
  }

  if (displayedTrains.length === 0) {
    listEl.innerHTML = `
      <div style="padding: 32px 16px; text-align: center; color: var(--text-sub);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🚉</div>
        <strong style="color: var(--text-main); font-size: 0.95rem;">Geen treinen gevonden voor deze selectie.</strong><br>
        <span style="font-size: 0.8rem;">Er zijn momenteel geen treinen aanwezig of in aantocht rond ${station.name}.</span>
      </div>
    `;
    return;
  }

  const now = new Date();
  let html = '';

  displayedTrains.forEach(t => {
    const srv = t.service || getTrainServiceDetails(t, station);
    const depTime = new Date(now.getTime() + t.etaMin * 60000);
    const hh = String(depTime.getHours()).padStart(2, '0');
    const mm = String(depTime.getMinutes()).padStart(2, '0');
    const timeStr = `${hh}:${mm}`;

    const spdInfo = getSpeedBadgeInfo(t.speed);
    const op = t.operator;

    let delayTag = '';
    if (t.delayMin > 0) {
      delayTag = `<span class="st-delay delayed">+${t.delayMin}m vertraging</span>`;
    } else if (t.statusType === 'pech') {
      delayTag = `<span class="st-delay" style="color: #ef4444;">🚨 Gestrand</span>`;
    } else {
      delayTag = `<span class="st-delay">Op tijd</span>`;
    }

    const countdownBadge = t.isAtStation
      ? '<span class="st-status-badge at-station">🟢 Nu op station</span>'
      : `<span class="st-status-badge nearing">⏱️ Over ${t.etaMin} min</span>`;

    html += `
      <div class="st-board-row" onclick="window.selectTrainAndCloseStation('${t.id}')" role="button" tabindex="0" title="Tik om ${srv.serviceType} naar ${srv.destination} live te volgen op satelliet">
        <div class="st-col-time">
          <span class="st-time">${timeStr}</span>
          ${countdownBadge}
          ${delayTag}
        </div>
        <div class="st-col-dest">
          <div class="st-dest-top-row">
            <span class="st-dest-name">➔ ${srv.destination}</span>
          </div>
          <div class="st-dest-via">${srv.serviceType} &bull; ${srv.via}</div>
          <div class="st-dest-train-id">Trein #${t.trainNum} &bull; ${t.matnummer || op.name}</div>
        </div>
        <div class="st-col-op">
          <span class="op-badge ${op.badgeClass}">[${op.code}]</span>
        </div>
        <div class="st-col-platform">
          <div class="ns-platform-badge-container">
            <span class="ns-platform-badge">Spoor ${srv.platform}</span>
          </div>
        </div>
        <div class="st-col-radar">
          <span class="st-radar-pill ${t.isAtStation ? 'at-station' : 'nearing'}">${spdInfo.icon} ${t.speed} km/u</span>
          <span class="st-radar-dist">Afstand: ~${t.dist} km</span>
        </div>
      </div>
    `;
  });

  listEl.innerHTML = html;
}

// Selecteer een station en open het interactieve reizigers-perronbord
window.selectStation = (stationCode) => {
  const station = findStationByCode(stationCode);
  if (!station) return;
  appState.activeStation = station;

  playAuthenticNSChime();

  const modal = document.getElementById('stationModal');
  const titleEl = document.getElementById('stModalTitle');
  const subEl = document.getElementById('stModalSub');
  const trackStatusEl = document.getElementById('stModalTrackStatus');
  const tabsEl = document.getElementById('stOperatorTabs');

  if (titleEl) titleEl.textContent = station.name;
  if (subEl) {
    subEl.innerHTML = `Code: <strong>${station.code}</strong> &bull; Perrons: <strong>Spoor ${station.sporen}</strong> &bull; Reizigers Vertrekstaat`;
  }

  // Zoek alle treinen die aanwezig zijn of in aantocht zijn (binnen 18 km)
  const allParsed = getActiveParsedTrains();
  const nearbyTrains = [];

  allParsed.forEach(t => {
    const dist = distanceKm(station.lat, station.lon, t.lat, t.lon);
    if (dist <= 18) {
      const isAtStation = dist <= 0.85 || (t.speed < 12 && dist <= 1.2);
      const spd = t.speed > 10 ? t.speed : 70;
      const etaMin = isAtStation ? 0 : Math.max(1, Math.round((dist / spd) * 60));
      const srv = getTrainServiceDetails(t, station);

      nearbyTrains.push({
        ...t,
        dist: Math.round(dist * 10) / 10,
        etaMin,
        isAtStation,
        service: srv
      });
    }
  });

  // Sorteer: eerst de treinen die NU op het station staan, daarna naderende treinen op ETA
  nearbyTrains.sort((a, b) => {
    if (a.isAtStation && !b.isAtStation) return -1;
    if (!a.isAtStation && b.isAtStation) return 1;
    return a.etaMin - b.etaMin || a.dist - b.dist;
  });

  appState.stationModalTrains = nearbyTrains;
  appState.stationModalActiveFilter = 'all';

  // Status van baanvak bepalen
  const hasPech = nearbyTrains.some(t => t.statusType === 'pech' || t.delayMin >= 15);
  const hasDelay = nearbyTrains.some(t => t.statusType === 'delayed');
  if (trackStatusEl) {
    if (hasPech) {
      trackStatusEl.className = 'status-pill red';
      trackStatusEl.innerHTML = '🚨 Baanvakstoring';
    } else if (hasDelay) {
      trackStatusEl.className = 'status-pill yellow';
      trackStatusEl.innerHTML = '⚠️ Enkele vertragingen';
    } else {
      trackStatusEl.className = 'status-pill green';
      trackStatusEl.innerHTML = '🟢 Normaal treinverkeer';
    }
  }

  // Bouw filtertabs voor spoorwegmaatschappijen als er meerdere aanwezig zijn (bv. NS én Arriva op Apeldoorn)
  if (tabsEl) {
    const opCounts = {};
    nearbyTrains.forEach(t => {
      const c = t.operator ? t.operator.code : 'NS';
      opCounts[c] = (opCounts[c] || 0) + 1;
    });

    const opKeys = Object.keys(opCounts);
    if (opKeys.length > 1) {
      tabsEl.style.display = 'flex';
      let tabsHtml = `
        <button class="st-op-tab-btn active" data-op="all" type="button">Alle Maatschappijen (${nearbyTrains.length})</button>
      `;
      opKeys.forEach(opCode => {
        tabsHtml += `
          <button class="st-op-tab-btn" data-op="${opCode}" type="button">${opCode} (${opCounts[opCode]})</button>
        `;
      });
      tabsEl.innerHTML = tabsHtml;

      tabsEl.querySelectorAll('.st-op-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          tabsEl.querySelectorAll('.st-op-tab-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          const chosenOp = e.currentTarget.getAttribute('data-op');
          renderStationDepartureBoard(station, chosenOp);
        });
      });
    } else {
      tabsEl.style.display = 'none';
    }
  }

  // Render initiële lijst
  renderStationDepartureBoard(station, 'all');

  if (modal) modal.style.display = 'flex';
};

window.selectTrainAndCloseStation = (trainId) => {
  const modal = document.getElementById('stationModal');
  if (modal) modal.style.display = 'none';
  window.selectTrain(trainId);
};

// =============================================================
// 9c. Spoorweg Communicatie & Live Mededelingen Engine (GSM-R)
// =============================================================

function addCommMessage(msg) {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const timeStr = `${hh}:${mm}:${ss}`;

  const message = {
    id: `comm_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    time: timeStr,
    type: msg.type || 'trdl', // 'trdl' | 'baanvak' | 'omroep' | 'alarm'
    chan: msg.chan || 'CH 18 TRDL',
    chanName: msg.chanName || 'GSM-R CH 18 - TRDL',
    parties: msg.parties || 'ProRail Verkeersleiding ➔ Machinist',
    text: msg.text,
    trainId: msg.trainId || null,
    trainNum: msg.trainNum || null
  };

  appState.commMessages.unshift(message);
  if (appState.commMessages.length > 50) {
    appState.commMessages.pop();
  }

  // Update teller badges
  updateCommCounters();

  // Update de interactieve ticker op de linker corridorstrip
  const tickerTimeEl = document.getElementById('commTickerTime');
  const tickerTextEl = document.getElementById('corridorAlertText');
  if (tickerTimeEl) tickerTimeEl.textContent = timeStr;
  if (tickerTextEl) {
    tickerTextEl.innerHTML = `<strong>[${message.chan}]</strong> ${message.parties}: "${message.text}"`;
  }

  // Update ongelezen badge als het scherm gesloten is
  const modal = document.getElementById('commModal');
  const isModalOpen = modal && modal.style.display === 'flex';

  if (!isModalOpen) {
    appState.commUnreadCount = (appState.commUnreadCount || 0) + 1;
    const badge = document.getElementById('commUnreadBadge');
    if (badge) {
      badge.textContent = appState.commUnreadCount;
      badge.style.opacity = '1';
    }
  } else {
    renderCommMessages();
  }

  // Speel subtiele realistische mobilofoon squelch chirp af
  playAuthenticRadioBeep();
}

function updateCommCounters() {
  const all = appState.commMessages.length;
  const trdl = appState.commMessages.filter(m => m.type === 'trdl').length;
  const baanvak = appState.commMessages.filter(m => m.type === 'baanvak' || m.type === 'alarm').length;
  const omroep = appState.commMessages.filter(m => m.type === 'omroep').length;

  const countAll = document.getElementById('countCommAll');
  const countTrdl = document.getElementById('countCommTrdl');
  const countBaanvak = document.getElementById('countCommBaanvak');
  const countOmroep = document.getElementById('countCommOmroep');

  if (countAll) countAll.textContent = all;
  if (countTrdl) countTrdl.textContent = trdl;
  if (countBaanvak) countBaanvak.textContent = baanvak;
  if (countOmroep) countOmroep.textContent = omroep;
}

function renderCommMessages() {
  const listEl = document.getElementById('commMessagesStream');
  if (!listEl) return;

  const filter = appState.commActiveFilter || 'all';
  const filtered = appState.commMessages.filter(m => {
    if (filter === 'all') return true;
    if (filter === 'trdl') return m.type === 'trdl';
    if (filter === 'baanvak') return m.type === 'baanvak' || m.type === 'alarm';
    if (filter === 'omroep') return m.type === 'omroep';
    return true;
  });

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div style="padding: 30px 16px; text-align: center; color: var(--text-sub);">
        <div style="font-size: 2rem; margin-bottom: 8px;">📻</div>
        <strong style="color: var(--text-main);">Geen berichten in dit communicatiekanaal.</strong><br>
        <span style="font-size: 0.8rem;">Verkeersleidingspost luistert op de actieve frequenties...</span>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(m => {
    const actionHtml = m.trainId ? `
      <div style="margin-top: 6px;">
        <button class="comm-msg-action" onclick="window.selectTrainAndCloseComm('${m.trainId}')" type="button">
          🔍 Volg Trein #${m.trainNum} live op satellietkaart ➔
        </button>
      </div>
    ` : '';

    html += `
      <div class="comm-msg-card ${m.type}">
        <div class="comm-msg-head">
          <span class="comm-msg-time">[${m.time}]</span>
          <span class="comm-msg-chan ${m.type}">[${m.chanName}]</span>
        </div>
        <div class="comm-msg-parties">${m.parties}</div>
        <div class="comm-msg-text">"${m.text}"</div>
        ${actionHtml}
      </div>
    `;
  });

  listEl.innerHTML = html;
}

window.openCommScreen = () => {
  const modal = document.getElementById('commModal');
  if (!modal) return;

  modal.style.display = 'flex';
  appState.commUnreadCount = 0;
  const badge = document.getElementById('commUnreadBadge');
  if (badge) {
    badge.textContent = '0';
    badge.style.opacity = '0.5';
  }

  renderCommMessages();
  playAuthenticRadioBeep();
};

window.selectTrainAndCloseComm = (trainId) => {
  const modal = document.getElementById('commModal');
  if (modal) modal.style.display = 'none';
  window.selectTrain(trainId);
};

// Realistische spoorwegcommunicatie generator op basis van échte actieve treinen
function generateLiveRailwayMessage() {
  const allParsed = getActiveParsedTrains();
  if (allParsed.length === 0) return;

  const corridorKey = appState.activeCorridorKey;
  const corridor = CORRIDORS[corridorKey] || CORRIDORS['enschede-denhaag'];

  // Zoek bij voorkeur treinen op de huidige corridor, anders landelijk
  const corridorTrains = allParsed.filter(t => matchTrainToCorridor(t, corridor));
  const pool = corridorTrains.length > 0 ? corridorTrains : allParsed;
  const train = pool[Math.floor(Math.random() * pool.length)];
  const op = train.operator;

  // Kies een station van het actieve traject
  const stations = corridor.stations || [];
  const st1 = stations[Math.floor(Math.random() * stations.length)] || { name: 'Utrecht Centraal', code: 'UT', sporen: '4b' };
  const st2 = stations[Math.floor(Math.random() * stations.length)] || { name: 'Amersfoort Centraal', code: 'AMF', sporen: '2' };
  const dest = (corridor.stations && corridor.stations.length > 0) ? corridor.stations[corridor.stations.length - 1].name : (corridor.name ? corridor.name.split('➔').pop().trim() : 'Utrecht Centraal');

  // Verschillende communicatiescenario's
  const scenarios = [
    // 1. Seinbeeld & Rijweg vrijgave (TRDL)
    {
      type: 'trdl',
      chan: 'GSM-R CH 18',
      chanName: 'GSM-R CH 18 - TRDL',
      parties: `Treindienstleider Post ${st1.name} ➔ Machinist ${op.code} #${train.trainNum}`,
      text: `Rijweg naar spoor ${st1.sporen} is veilig vastgelegd. Uitrijsein toont groen, baanvaksnelheid ${Math.max(80, train.speed || 120)} km/h vrijgegeven richting ${st2.name}.`,
      trainId: train.id,
      trainNum: train.trainNum
    },
    // 2. Machinist statusmelding
    {
      type: 'trdl',
      chan: 'GSM-R CH 18',
      chanName: 'GSM-R CABINERADIO',
      parties: `Machinist ${op.code} #${train.trainNum} ➔ Post ${st2.name}`,
      text: `Passeren baanvak ${st1.name} met actueel ${train.speed} km/h. ATB en veiligheidssystemen normaal. Dienstregeling op schema.`,
      trainId: train.id,
      trainNum: train.trainNum
    },
    // 3. Vertraging & kruising
    {
      type: 'trdl',
      chan: 'GSM-R CH 18',
      chanName: 'GSM-R VERKEERSLEIDING',
      parties: `Verkeersleiding ${st1.name} ➔ Machinist ${op.code} #${train.trainNum}`,
      text: train.statusType === 'delayed'
        ? `We signaleren +${train.delayMin || 2}m vertraging. We laten u kruisen bij ${st2.name} op spoor 2, daarna vrije baan.`
        : `Trein #${train.trainNum} rijdt exact op tijd door sector ${st1.code}. Rijweg voor u blijft open tot ${dest}.`,
      trainId: train.id,
      trainNum: train.trainNum
    },
    // 4. Baanvak & Veiligheid / Wissels
    {
      type: 'baanvak',
      chan: 'BAANVAK',
      chanName: 'PRO-RAIL BAANVAKBERICHT',
      parties: `ProRail Verkeersleidingspost ➔ Baanvak ${corridor.shortName}`,
      text: `Wisselcomplex nabij ${st1.name} gekeurd door Storingsdienst. Wisselverwarming en detectielussen operationeel. Normale seinen volgen.`,
      trainId: train.id,
      trainNum: train.trainNum
    },
    // 5. Stationsomroep
    {
      type: 'omroep',
      chan: 'OMROEP',
      chanName: 'STATIONSOMROEP',
      parties: `Stationsomroep ${st1.name} ➔ Perron Spoor ${st1.sporen}`,
      text: `Dames en heren, de ${op.name} trein #${train.trainNum} richting ${dest} vertrekt over circa 2 minuten vanaf spoor ${st1.sporen}. Vergeet niet in te checken.`,
      trainId: train.id,
      trainNum: train.trainNum
    },
    // 6. Conducteur gereedmelding
    {
      type: 'trdl',
      chan: 'GSM-R LOKAAL',
      chanName: 'GSM-R BOORDPERSOONEEL',
      parties: `Hoofdconducteur Trein #${train.trainNum} ➔ Machinist`,
      text: `Instapprocedure voltooid te ${st1.name}. Alle buitendeuren vergrendeld en vertreklicht gedoofd. We zijn vertrekbekwaam.`,
      trainId: train.id,
      trainNum: train.trainNum
    }
  ];

  // Als er een pech-trein is, prioriteer alarm
  if (train.statusType === 'pech') {
    scenarios.unshift({
      type: 'alarm',
      chan: 'ALARM CH 18',
      chanName: '🚨 GSM-R NOODOPROEP',
      parties: `ALARM - Verkeersleider Post ${st1.name} ➔ Alle treinen`,
      text: `Trein #${train.trainNum} (${op.code}) meldt stilstand / technische storing nabij ${st1.name}. Storingsmonteur ProRail onderweg. Nadering op zicht!`,
      trainId: train.id,
      trainNum: train.trainNum
    });
  }

  const selectedScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  addCommMessage(selectedScenario);
}

function initCommunicationEngine() {
  // Initiële authentieke communicatieberichten laden
  const seedMessages = [
    {
      type: 'trdl',
      chan: 'GSM-R CH 18',
      chanName: 'GSM-R CH 18 - TRDL',
      parties: 'ProRail Post Utrecht (TRDL) ➔ Machinist NS IC #1754',
      text: 'Rijweg naar spoor 4b Utrecht Centraal veilig vastgelegd. Sein 214 toont groen. Baanvaksnelheid 130 km/h vrijgegeven richting Amersfoort.',
      trainNum: '1754'
    },
    {
      type: 'baanvak',
      chan: 'BAANVAK',
      chanName: 'PRO-RAIL BAANVAKBERICHT',
      parties: 'ProRail Incidentenbestrijding (ICB) ➔ Verkeersleiding',
      text: 'Bovenleidingcontrole tussen Deventer en Olst afgerond. Geen bijzonderheden aangetroffen, normale dienstregeling actief.'
    },
    {
      type: 'omroep',
      chan: 'OMROEP',
      chanName: 'STATIONSOMROEP',
      parties: 'Stationsomroep Amersfoort Centraal ➔ Perron Spoor 1',
      text: 'Dames en heren, de Intercity naar Den Haag Centraal van 20:41 vertrekt van spoor 1. Instappen is mogelijk.'
    },
    {
      type: 'trdl',
      chan: 'GSM-R CH 18',
      chanName: 'GSM-R GOEDEREN',
      parties: 'Post Kijfhoek ➔ Machinist DB Cargo Trein #60231',
      text: 'Remproef akkoord bevonden op Kijfhoek spoor K08. Vertreksein naar de Betuweroute staat veilig richting Emmerich.',
      trainNum: '60231'
    }
  ];

  seedMessages.reverse().forEach(m => addCommMessage(m));

  // Periodiek nieuwe levende communicatieberichten genereren (elke 8 - 14 seconden)
  function scheduleNext() {
    const delay = 8000 + Math.floor(Math.random() * 6000);
    setTimeout(() => {
      try {
        generateLiveRailwayMessage();
      } catch (err) {
        console.warn('Comm engine error:', err);
      }
      scheduleNext();
    }, delay);
  }

  scheduleNext();
}

// =============================================================
// 10. Live GPS: "In Welke Trein Zit Ik?" & Real-Time Cockpit HUD
// =============================================================
function findMyTrain() {
  detectAndShowMyTrain(true);
}

function detectAndShowMyTrain(openModal = true) {
  const modal = document.getElementById('myTrainModal');
  if (appState.isTrackingUser) {
    if (openModal && modal) modal.style.display = 'flex';
    // Direct live verversen van alle gegevens in de modal op basis van de laatste fix
    if (appState.lastGpsFix) {
      onLiveLocationFix({
        coords: {
          latitude: appState.lastGpsFix.lat,
          longitude: appState.lastGpsFix.lon,
          accuracy: appState.lastGpsFix.acc || 15,
          speed: (appState.lastGpsFix.speed !== null && appState.lastGpsFix.speed !== undefined ? appState.lastGpsFix.speed / 3.6 : null),
          heading: appState.lastGpsFix.heading
        }
      });
    }
    return;
  }

  const bannerTitle = document.getElementById('inTrainBannerTitle');
  const bannerSub = document.getElementById('inTrainBannerSub');
  const bannerBtnText = document.getElementById('inTrainBannerBtnText');

  if (bannerTitle) bannerTitle.textContent = '📡 GPS Peiling Actief...';
  if (bannerSub) bannerSub.textContent = 'Bezig met zoeken naar actieve trein op uw baanvak...';
  if (bannerBtnText) bannerBtnText.textContent = '⏳ Laden...';

  startLiveTrainTracking(openModal);
  playAuthenticNSChime();
}

function startLiveTrainTracking(openModalOnFirstFix = false) {
  if (!navigator.geolocation) {
    const helpBox = document.getElementById('myTrainGpsHelpBox');
    if (helpBox) helpBox.style.display = 'block';
    const statusPill = document.getElementById('myTrainSpeedStatus');
    if (statusPill) statusPill.textContent = '⚠️ Browser ondersteunt geen GPS';
    return;
  }

  appState.openModalOnFirstFix = openModalOnFirstFix;

  const btnHeader = document.getElementById('btnFindMyTrain');
  const btnPlanner = document.getElementById('btnImInTrainPlanner');

  if (btnHeader) {
    btnHeader.classList.add('tracking-active');
    btnHeader.innerHTML = '<span class="pulse-dot-beacon" style="background:#10b981;"></span> <span class="btn-icon">📡</span> <span class="btn-label-text">Zoeken...</span>';
  }
  if (btnPlanner) btnPlanner.innerHTML = '<span>📡 GPS Verbinden...</span>';

  appState.isTrackingUser = true;
  appState.isFollowingMyTrain = true;

  const modal = document.getElementById('myTrainModal');
  const helpBox = document.getElementById('myTrainGpsHelpBox');
  if (helpBox) helpBox.style.display = 'none';

  if (openModalOnFirstFix && modal) {
    modal.style.display = 'flex';
    const title = document.getElementById('myTrainTitle');
    if (title) title.textContent = '📡 GPS Peiling in de Trein...';
    const spd = document.getElementById('myTrainSpeed');
    if (spd) spd.textContent = '0s';
    const statusPill = document.getElementById('myTrainSpeedStatus');
    if (statusPill) {
      statusPill.className = 'speed-status-pill';
      statusPill.textContent = '⏱️ 0s / ~5s • Verbinden met satelliet & masten...';
    }
    const route = document.getElementById('myTrainRoute');
    if (route) route.textContent = 'Locatievoorziening actief in Safari / Chrome';
    const seg = document.getElementById('myTrainSegment');
    if (seg) seg.textContent = 'Zoekt GPS-positie (duurt normaal 2–5 sec, in trein tot 10 sec)...';
    const meta = document.getElementById('myTrainGpsMeta');
    if (meta) meta.textContent = '⏱️ Wachttijd: 0 seconden • Zoekt dichtstbijzijnde rijdende trein...';
    const nextSt = document.getElementById('myTrainNextStation');
    if (nextSt) nextSt.textContent = '📡 Peilen...';
    const nextEta = document.getElementById('myTrainNextEta');
    if (nextEta) nextEta.textContent = 'Wordt berekend bij GPS fix...';
    const prevSt = document.getElementById('myTrainPrevStation');
    if (prevSt) prevSt.textContent = '📡 Peilen...';
    const prevDist = document.getElementById('myTrainPrevDist');
    if (prevDist) prevDist.textContent = 'Wordt berekend bij GPS fix...';
  }

  if (appState.geoWatchId !== null) {
    navigator.geolocation.clearWatch(appState.geoWatchId);
    appState.geoWatchId = null;
  }
  if (appState.gpsConnectTimer) {
    clearInterval(appState.gpsConnectTimer);
    appState.gpsConnectTimer = null;
  }

  appState.gpsConnectStart = Date.now();
  let manualFallbackShown = false;

  // Live 1-seconde teller + actieve fallback bij traag/geblokkeerd treinsignaal
  appState.gpsConnectTimer = setInterval(() => {
    if (!appState.isTrackingUser || appState.lastGpsFix) {
      clearInterval(appState.gpsConnectTimer);
      appState.gpsConnectTimer = null;
      return;
    }
    const elapsedSec = Math.max(1, Math.round((Date.now() - appState.gpsConnectStart) / 1000));
    const statusPill = document.getElementById('myTrainSpeedStatus');
    const seg = document.getElementById('myTrainSegment');
    const meta = document.getElementById('myTrainGpsMeta');
    const spd = document.getElementById('myTrainSpeed');

    if (spd && !appState.lastGpsFix) spd.textContent = `${elapsedSec}s`;

    if (elapsedSec <= 3) {
      if (statusPill) statusPill.textContent = `⏱️ ${elapsedSec}s / ~5s • Satelliet & zendmasten peilen...`;
      if (seg) seg.textContent = `Zoekt GPS-positie (${elapsedSec}s verstreken, duurt normaal 2–5 sec)...`;
      if (meta) meta.textContent = `⏱️ Bezig met verbinden (${elapsedSec}s) • Druk op "Sta toe" als daarom gevraagd wordt.`;
    } else if (elapsedSec <= 8) {
      if (statusPill) statusPill.textContent = `📶 ${elapsedSec}s / ~10s • Zendmast-assistentie actief...`;
      if (seg) seg.textContent = `Metaal/raam dempt GPS — schakelt over op zendmastpeiling (${elapsedSec}s)...`;
      if (meta) meta.textContent = `⏱️ Wachttijd: ${elapsedSec}s • Houd de telefoon indien mogelijk nabij het raam.`;
    } else {
      if (statusPill) {
        statusPill.className = 'speed-status-pill yellow';
        statusPill.textContent = `⚠️ ${elapsedSec}s • Zwak GPS-signaal in trein`;
      }
      if (seg) seg.textContent = `Geen GPS-signaal na ${elapsedSec}s (metaal/tunnel). Kies hieronder uw trein of peil opnieuw:`;
      if (meta) meta.innerHTML = `⏱️ Zoekt al <strong>${elapsedSec}s</strong> op de achtergrond. U kunt direct hieronder uw trein kiezen:`;
    }

    // Na 3 seconden: actieve zendmast/cache-peiling forceren als watchPosition nog wacht
    if (elapsedSec === 3) {
      try {
        navigator.geolocation.getCurrentPosition(
          (pos) => onLiveLocationFix(pos),
          () => {},
          { enableHighAccuracy: false, maximumAge: 300000, timeout: 4000 }
        );
      } catch (e) {}
    }

    // Na 8 seconden zonder GPS: toon direct de actuele treinen op het gekozen traject zodat de gebruiker nooit vastzit!
    if (elapsedSec >= 8 && !manualFallbackShown) {
      manualFallbackShown = true;
      const selectorEl = document.getElementById('myTrainStationSelector');
      const chipsEl = document.getElementById('myTrainStationChips');
      if (selectorEl && chipsEl) {
        const allParsed = getActiveParsedTrains().filter(t => {
          const isFreight = (t.operator && t.operator.category === 'freight') ||
                            (t.trainNum && parseInt(t.trainNum, 10) >= 40000 && parseInt(t.trainNum, 10) <= 69999);
          return !isFreight;
        });
        const activeCorr = (appState.activeCorridorKey && appState.activeCorridorKey !== 'all' && appState.activeCorridorKey !== 'freight-all')
          ? CORRIDORS[appState.activeCorridorKey]
          : null;
        const corrTrains = activeCorr
          ? allParsed.filter(t => matchTrainToCorridor(t, activeCorr)).slice(0, 6)
          : allParsed.slice(0, 6);

        selectorEl.style.display = 'block';
        const titleLabelEl = selectorEl.querySelector('.mt-station-title');
        const hintLabelEl = selectorEl.querySelector('.mt-station-hint');
        if (titleLabelEl) titleLabelEl.textContent = activeCorr ? `🚆 Treinen op ${activeCorr.shortName || activeCorr.name}:` : '🚆 Actuele reizigerstreinen:';
        if (hintLabelEl) hintLabelEl.textContent = 'GPS duurt lang door treinmetaal — tik direct op uw trein of peil opnieuw:';

        const retryBtnHtml = `<button type="button" class="mt-station-chip-btn" onclick="window.retryGpsPeiling()" style="border-color:rgba(16,185,129,0.5); color:#34d399;">🔄 Opnieuw GPS peilen</button>`;
        const trainChipsHtml = corrTrains.map(stTrain => {
          const stOp = stTrain.operator || { code: 'NS', badgeClass: 'op-ns' };
          const stDest = stTrain.exactDestination || (stTrain.service && stTrain.service.destination) || 'Bestemming';
          return `
            <button type="button" class="mt-station-chip-btn" onclick="window.selectMyTrain('${stTrain.id}')">
              <span class="op-badge ${stOp.badgeClass}" style="font-size:0.64rem; padding:1px 4px;">[${stOp.code}]</span>
              <span>#${stTrain.trainNum} ➔ ${stDest}</span>
            </button>
          `;
        }).join('');
        chipsEl.innerHTML = retryBtnHtml + trainChipsHtml;
      }
    }
  }, 1000);

  // 1. Directe snelle warm-cache peiling (Wi-Fi / zendmasten) binnen 100-300ms
  try {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onLiveLocationFix(pos);
      },
      (err) => {
        console.warn('Snelle positiebepaling wacht op watchPosition:', err?.code);
      },
      { enableHighAccuracy: false, maximumAge: 120000, timeout: 3000 }
    );
  } catch (e) {}

  // 2. Continue watchPosition met direct responsieve timeout
  let switchedToLowAccuracy = false;

  function runWatch(opts) {
    if (appState.geoWatchId !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(appState.geoWatchId);
    }
    appState.geoWatchId = navigator.geolocation.watchPosition(
      (pos) => {
        if (helpBox) helpBox.style.display = 'none';
        onLiveLocationFix(pos);
      },
      (err) => {
        console.warn('GPS tracking status:', err.code, err.message);

        // Code 1: PERMISSION_DENIED (gebruiker heeft geweigerd of browser permissie staat uit)
        if (err.code === 1) {
          const statusPill = document.getElementById('myTrainSpeedStatus');
          if (statusPill) {
            statusPill.className = 'speed-status-pill yellow';
            statusPill.textContent = '⚠️ Locatie niet toegestaan';
          }
          if (helpBox) helpBox.style.display = 'block';
          return;
        }

        // Code 3: TIMEOUT of Code 2: POSITION_UNAVAILABLE
        // In een metalen treinstel duurt satelliet-lock soms even.
        // Schakel direct over naar assisted zendmastpeiling die ALTIJD werkt!
        if (!switchedToLowAccuracy) {
          switchedToLowAccuracy = true;
          const statusPill = document.getElementById('myTrainSpeedStatus');
          if (statusPill && !appState.lastGpsFix) {
            statusPill.textContent = '📶 Schakelt over naar zendmast/assistent-peiling...';
          }
          runWatch({ enableHighAccuracy: false, maximumAge: 20000, timeout: 10000 });
        } else {
          const statusPill = document.getElementById('myTrainSpeedStatus');
          if (statusPill && !appState.lastGpsFix) {
            statusPill.textContent = '🛰️ Signaal zoeken in trein (houd telefoon nabij raam)...';
          }
        }
      },
      opts
    );
  }

  // Start direct met 7s timeout i.p.v. 25s wachttijd
  runWatch({ enableHighAccuracy: true, maximumAge: 10000, timeout: 7000 });
}

window.retryGpsPeiling = () => {
  appState.lastGpsFix = null;
  startLiveTrainTracking(true);
};

function stopLiveTrainTracking() {
  if (appState.geoWatchId !== null && navigator.geolocation) {
    navigator.geolocation.clearWatch(appState.geoWatchId);
    appState.geoWatchId = null;
  }
  if (appState.gpsConnectTimer) {
    clearInterval(appState.gpsConnectTimer);
    appState.gpsConnectTimer = null;
  }
  appState.isTrackingUser = false;
  appState.isFollowingMyTrain = false;
  appState.lastGpsFix = null;
  appState.userPreferredDirection = null;
  appState.userLockedTrainId = null;
  appState.openModalOnFirstFix = false;

  const btnHeader = document.getElementById('btnFindMyTrain');
  const btnPlanner = document.getElementById('btnImInTrainPlanner');
  const hud = document.getElementById('liveTrainHUD');
  const quickBanner = document.getElementById('inTrainQuickBanner');
  const bannerTitle = document.getElementById('inTrainBannerTitle');
  const bannerSub = document.getElementById('inTrainBannerSub');
  const bannerBtnText = document.getElementById('inTrainBannerBtnText');

  if (btnHeader) {
    btnHeader.classList.remove('tracking-active');
    btnHeader.innerHTML = '<span class="pulse-dot-beacon"></span> <span class="btn-icon">🚆</span> <span class="btn-label-text">In Trein</span>';
  }
  if (btnPlanner) btnPlanner.innerHTML = '<span class="pulse-dot-beacon"></span> 🚆 Ik zit in de trein!';
  if (hud) hud.style.display = 'none';

  if (quickBanner) quickBanner.classList.remove('is-active');
  if (bannerTitle) bannerTitle.textContent = 'Zit u in de trein?';
  if (bannerSub) bannerSub.textContent = 'Tik voor snelheid, volgend station & vertraging';
  if (bannerBtnText) bannerBtnText.textContent = '⚡ Toon Mijn Trein';
}

// 1-Tap wisselknop: wisselt direct tussen treinen op hetzelfde station of baanvak, of wisselt reisrichting/bestemming
window.switchMyTrainDirection = () => {
  const currentTrain = appState.myTrain;
  const allParsed = getActiveParsedTrains();
  const userLat = appState.lastGpsFix ? appState.lastGpsFix.lat : (currentTrain ? currentTrain.lat : 52.2);
  const userLon = appState.lastGpsFix ? appState.lastGpsFix.lon : (currentTrain ? currentTrain.lon : 6.0);
  const userSpeed = (appState.lastGpsFix && typeof appState.lastGpsFix.speed === 'number') ? appState.lastGpsFix.speed : (currentTrain?.speed || 0);
  const activeCorridor = (appState.activeCorridorKey && appState.activeCorridorKey !== 'all' && appState.activeCorridorKey !== 'freight-all')
    ? CORRIDORS[appState.activeCorridorKey]
    : null;

  // 1. Controleer of er meerdere treinen in de directe fysieke nabijheid zijn (< 2.5 km op baanvak, < 850m op station)
  const maxSearchDist = (userSpeed > 15) ? 2.5 : 0.85;
  const nearbyTrains = allParsed.filter(t => {
    const isFreight = (t.operator && t.operator.category === 'freight') ||
                      (t.trainNum && parseInt(t.trainNum, 10) >= 40000 && parseInt(t.trainNum, 10) <= 69999) ||
                      /cargo|goederen|dbcargo/i.test((t.operator?.name || '') + ' ' + (t.matnrString || ''));
    if (isFreight) return false;
    return distanceKm(userLat, userLon, t.lat, t.lon) <= maxSearchDist;
  });
  if (nearbyTrains.length >= 2) {
    const curIdx = currentTrain ? nearbyTrains.findIndex(t => t.id === currentTrain.id) : -1;
    const nextIdx = (curIdx + 1) % nearbyTrains.length;
    const nextTrain = nearbyTrains[nextIdx];
    window.selectMyTrain(nextTrain.id);
    return;
  }

  // 2. Als de reiziger in een rijdende trein zit of de verkeerde richting ervaart:
  // Zoek direct naar treinen op hetzelfde baanvak (< 10 km) die in de ANDERE richting rijden!
  if (currentTrain) {
    const curMotion = getTrainMotionVector(currentTrain, activeCorridor);
    const curNum = parseInt(currentTrain.trainNum, 10);
    const curOpCode = (currentTrain.operator && currentTrain.operator.code) ? currentTrain.operator.code.toLowerCase() : '';

    const candidatesOpposite = allParsed.filter(t => {
      if (t.id === currentTrain.id) return false;
      const d = distanceKm(userLat, userLon, t.lat, t.lon);
      if (d > 10.0) return false;

      const tOpCode = (t.operator && t.operator.code) ? t.operator.code.toLowerCase() : '';
      if (curOpCode && tOpCode && !tOpCode.includes(curOpCode) && !curOpCode.includes(tOpCode)) {
        return false;
      }

      const tMotion = getTrainMotionVector(t, activeCorridor);
      if (curMotion && tMotion) {
        const dot = (curMotion.dLat * tMotion.dLat) + (curMotion.dLon * tMotion.dLon);
        if (dot < -0.05) return true; // Duidelijke tegentrein in tegengestelde richting!
      }

      const tNum = parseInt(t.trainNum, 10);
      if (!isNaN(curNum) && !isNaN(tNum) && (curNum % 2 !== tNum % 2)) {
        return true; // Tegenovergestelde pariteit op dezelfde lijn
      }

      return false;
    });

    if (candidatesOpposite.length > 0) {
      candidatesOpposite.sort((a, b) => distanceKm(userLat, userLon, a.lat, a.lon) - distanceKm(userLat, userLon, b.lat, b.lon));
      const chosen = candidatesOpposite[0];
      window.selectMyTrain(chosen.id);
      return;
    }

    // Geen fysieke tegentrein binnen 10 km: wissel de bestemming van de huidige trein
    const origin = (currentTrain.service && currentTrain.service.origin && currentTrain.service.origin !== 'Vertrekstation') ? currentTrain.service.origin : '';
    const dest = (currentTrain.service && currentTrain.service.destination && currentTrain.service.destination !== 'Eindbestemming') ? currentTrain.service.destination : '';
    const curDest = appState.userPreferredDirection || currentTrain.exactDestination || dest;

    const num = parseInt(currentTrain.trainNum, 10) || 0;
    // Bepaal slimme wisselkeuzes op het baanvak (bv. Den Haag C ⇄ Rotterdam C ⇄ Breda ⇄ Leeuwarden/Groningen)
    let nextDest = '';
    const isRandstadSplit = (num >= 500 && num <= 799) || (num >= 1100 && num <= 1199) || (num >= 1600 && num <= 1799) || (num >= 11600 && num <= 11799) || (num >= 1400 && num <= 1499) || (num >= 1800 && num <= 1899) || (num >= 2000 && num <= 2099) || (num >= 2400 && num <= 2499) || (num >= 2800 && num <= 2899) || (num >= 9200 && num <= 9299);

    if (isRandstadSplit) {
      if (/rotterdam/i.test(curDest)) {
        nextDest = 'Den Haag Centraal';
      } else if (/den haag/i.test(curDest)) {
        nextDest = (/breda/i.test(origin) || /breda/i.test(dest)) ? 'Breda' : (origin || 'Rotterdam Centraal');
      } else if (/breda/i.test(curDest)) {
        nextDest = 'Rotterdam Centraal';
      } else {
        nextDest = 'Den Haag Centraal';
      }
    } else {
      if (curDest && origin && curDest.toLowerCase().includes(origin.toLowerCase())) {
        nextDest = dest;
      } else {
        nextDest = origin || dest;
      }
    }

    if (nextDest) {
      window.setMyTrainDestination(nextDest);
      return;
    }
  }

  // 3. Fallback: zoek tegentrein in de buurt
  const currentDest = (currentTrain ? (currentTrain.exactDestination || (currentTrain.service && currentTrain.service.destination) || '') : '').toLowerCase();
  const currentOpCode = (currentTrain && currentTrain.operator && currentTrain.operator.code) ? currentTrain.operator.code.toLowerCase() : '';

  let candidates = allParsed.filter(t => {
    if (currentTrain && t.id === currentTrain.id) return false;
    const tDest = (t.exactDestination || (t.service && t.service.destination) || '').toLowerCase();
    const tOpCode = (t.operator && t.operator.code) ? t.operator.code.toLowerCase() : '';
    const dist = distanceKm(userLat, userLon, t.lat, t.lon);
    const opMatches = (currentOpCode && tOpCode) ? (currentOpCode === tOpCode) : true;
    return opMatches && !tDest.includes(currentDest) && dist <= 30;
  });

  if (candidates.length === 0) {
    candidates = allParsed.filter(t => {
      if (currentTrain && t.id === currentTrain.id) return false;
      const tDest = (t.exactDestination || (t.service && t.service.destination) || '').toLowerCase();
      return !tDest.includes(currentDest) && distanceKm(userLat, userLon, t.lat, t.lon) <= 30;
    });
  }

  candidates.sort((a, b) => distanceKm(userLat, userLon, a.lat, a.lon) - distanceKm(userLat, userLon, b.lat, b.lon));

  if (candidates.length > 0) {
    window.selectMyTrain(candidates[0].id);
  }
};

window.setMyTrainDestination = (dest) => {
  if (!dest) return;
  appState.userPreferredDirection = dest;

  // Zoek direct of er binnen 4.0 km een daadwerkelijke trein in allParsed zit die naar deze bestemming rijdt!
  const allParsed = getActiveParsedTrains();
  const userLat = appState.lastGpsFix ? appState.lastGpsFix.lat : (appState.myTrain ? appState.myTrain.lat : 52.2);
  const userLon = appState.lastGpsFix ? appState.lastGpsFix.lon : (appState.myTrain ? appState.myTrain.lon : 6.0);
  const matchingTrain = allParsed.find(t => {
    const d = distanceKm(userLat, userLon, t.lat, t.lon);
    if (d > 4.0) return false;
    const tDest = (t.exactDestination || (t.service && t.service.destination) || '').toLowerCase();
    const tVia = (t.service && t.service.via ? t.service.via : '').toLowerCase();
    const target = dest.toLowerCase();
    return tDest.includes(target) || tVia.includes(target);
  });

  if (matchingTrain) {
    appState.userLockedTrainId = matchingTrain.id;
    appState.myTrain = matchingTrain;
  } else if (appState.myTrain) {
    appState.myTrain.exactDestination = dest;
    if (appState.myTrain.service) {
      appState.myTrain.service.destination = dest;
    }
  }

  playAuthenticNSChime();

  if (appState.lastGpsFix) {
    onLiveLocationFix({
      coords: {
        latitude: appState.lastGpsFix.lat,
        longitude: appState.lastGpsFix.lon,
        accuracy: appState.lastGpsFix.acc || 15,
        speed: (appState.lastGpsFix.speed !== null && appState.lastGpsFix.speed !== undefined ? appState.lastGpsFix.speed / 3.6 : null),
        heading: appState.lastGpsFix.heading
      }
    });
  } else {
    updateLineOverview();
  }
};

window.selectMyTrain = (trainId) => {
  const allParsed = getActiveParsedTrains();
  const target = allParsed.find(t => t.id === trainId);
  if (target) {
    appState.userLockedTrainId = target.id;
    appState.myTrain = target;
    const dest = target.exactDestination || (target.service && target.service.destination) || '';
    if (dest) appState.userPreferredDirection = dest;

    playAuthenticNSChime();

    // Ververs direct de weergave met de nieuw geselecteerde trein
    if (appState.lastGpsFix) {
      onLiveLocationFix({
        coords: {
          latitude: appState.lastGpsFix.lat,
          longitude: appState.lastGpsFix.lon,
          accuracy: appState.lastGpsFix.acc || 15,
          speed: (appState.lastGpsFix.speed ? appState.lastGpsFix.speed / 3.6 : 0)
        }
      });
    } else {
      updateLineOverview();
    }
  }
};

function onLiveLocationFix(pos) {
  if (appState.gpsConnectTimer) {
    clearInterval(appState.gpsConnectTimer);
    appState.gpsConnectTimer = null;
  }
  const btnHeader = document.getElementById('btnFindMyTrain');
  const btnPlanner = document.getElementById('btnImInTrainPlanner');
  const hud = document.getElementById('liveTrainHUD');

  if (btnHeader) {
    btnHeader.classList.add('tracking-active');
    btnHeader.innerHTML = '<span class="pulse-dot-beacon" style="background:#10b981;"></span> <span class="btn-icon">🚆</span> <span class="btn-label-text">Volgen</span>';
  }
  if (btnPlanner) btnPlanner.innerHTML = '<span class="pulse-dot-beacon" style="background:#10b981;"></span> 🚆 Meereizen Actief';

  const userLat = pos.coords.latitude;
  const userLon = pos.coords.longitude;
  const userAcc = Math.round(pos.coords.accuracy || 10);
  const now = Date.now();

  // Bewaar de vorige GPS-fix VÓÓR het overschrijven, zodat koersvectoren en snelheden exact kloppen
  const prevGpsFix = appState.lastGpsFix;

  // Bereken de live rijsnelheid in km/u (hardware GPS van de smartphone)
  let rawGpsSpeed = null;
  if (typeof pos.coords.speed === 'number' && !isNaN(pos.coords.speed) && pos.coords.speed >= 0) {
    rawGpsSpeed = (pos.coords.speed < 0.6) ? 0 : Math.round(pos.coords.speed * 3.6);
  } else if (prevGpsFix && prevGpsFix.time) {
    const dtSeconds = (now - prevGpsFix.time) / 1000;
    // Bereken delta uitsluitend als er meettijd verstreken is (1 tot 30 seconden)
    if (dtSeconds >= 0.8 && dtSeconds <= 30) {
      const dKm = distanceKm(prevGpsFix.lat, prevGpsFix.lon, userLat, userLon);
      const dMeters = dKm * 1000;
      if (dMeters >= 30) {
        const calcSpeed = Math.round((dKm / dtSeconds) * 3600);
        if (calcSpeed <= 250) {
          rawGpsSpeed = calcSpeed;
        }
      } else if (dtSeconds >= 3.5 && dMeters < 15) {
        rawGpsSpeed = 0; // Trein staat stil op station of voor wissel
      }
    }
  }

  // Filter GPS-sprongen (geen enkele reguliere trein in NL rijdt 250+ km/u)
  let userSpeedKmh = null;
  if (rawGpsSpeed !== null) {
    if (rawGpsSpeed <= 2) {
      userSpeedKmh = 0;
    } else if (rawGpsSpeed <= 250) {
      userSpeedKmh = rawGpsSpeed;
    }
  }

  appState.lastGpsFix = {
    lat: userLat,
    lon: userLon,
    time: now,
    speed: userSpeedKmh,
    acc: userAcc,
    heading: (typeof pos.coords.heading === 'number' && !isNaN(pos.coords.heading)) ? pos.coords.heading : null
  };

  // Update of maak "U bevindt zich hier" marker op de kaart
  if (!appState.userLocationMarker) {
    appState.userLocationMarker = L.circleMarker([userLat, userLon], {
      radius: 11,
      fillColor: '#38bdf8',
      color: '#ffffff',
      weight: 3,
      fillOpacity: 1.0,
      className: 'pulse-user-marker'
    }).addTo(appState.map);

    appState.userLocationMarker.bindTooltip('<strong>📍 U bevindt zich hier</strong>', {
      direction: 'top',
      offset: [0, -10]
    });
  } else {
    smoothMoveMarker(appState.userLocationMarker, userLat, userLon, 1200);
  }

  // Bepaal de fysieke bewegingsrichting van de smartphone van de reiziger
  let userHeadingVector = null;
  let userHeadingDegrees = null;

  if (typeof pos.coords.heading === 'number' && !isNaN(pos.coords.heading) && pos.coords.heading >= 0) {
    userHeadingDegrees = pos.coords.heading;
    const rad = userHeadingDegrees * Math.PI / 180;
    // 0° = Noord (dLat > 0), 90° = Oost (dLon > 0), 180° = Zuid, 270° = West
    userHeadingVector = {
      dLat: Math.cos(rad),
      dLon: Math.sin(rad)
    };
  } else if (prevGpsFix && prevGpsFix.time) {
    const dLat = userLat - prevGpsFix.lat;
    const dLon = userLon - prevGpsFix.lon;
    const dDist = Math.hypot(dLat, dLon);
    if (dDist > 0.00010) { // Meer dan ~10m verplaatst
      userHeadingVector = {
        dLat: dLat / dDist,
        dLon: dLon / dDist
      };
      let h = Math.atan2(dLon * Math.cos(userLat * Math.PI / 180), dLat) * 180 / Math.PI;
      if (h < 0) h += 360;
      userHeadingDegrees = h;
    }
  }

  // 1. Zoek het dichtstbijzijnde station bij de smartphone van de reiziger
  const nearestStInfo = findNearestStation(userLat, userLon);
  const isAtStation = nearestStInfo && nearestStInfo.distKm <= 0.60;
  const stationCorridors = isAtStation ? getCorridorsForStation(nearestStInfo.station.code) : [];
  const stationAllowedOps = new Set(stationCorridors.map(c => c.primaryOpKey));
  const isStationSingleOperator = isAtStation && stationAllowedOps.size === 1; // bv. Apeldoorn De Maten: uitsluitend Arriva!

  // Voorkom dat een oude sessie van een trein uit een andere provincie (zoals Apeldoorn) blijft spoken
  if (appState.myTrain) {
    const curDistToMyTrain = distanceKm(userLat, userLon, appState.myTrain.lat, appState.myTrain.lon);
    if (curDistToMyTrain > 6.0) {
      appState.myTrain = null;
      appState.userLockedTrainId = null;
    }
  }

  // Zoek dichtstbijzijnde trein uit ALLE actuele treinen in Nederland (VOLLEDIG ONAFHANKELIJK van het geselecteerde traject)
  const allParsed = getActiveParsedTrains();
  let bestTrain = null;
  let bestScore = Infinity;

  // Plausibiliteitsgrens: een reiziger kan NOOIT in een trein zitten die 1.9 km verderop staat!
  const maxPlausibleDistKm = (userSpeedKmh && userSpeedKmh > 15) ? 1.2 : 0.65;

  const activeCorridor = (appState.activeCorridorKey && appState.activeCorridorKey !== 'all' && appState.activeCorridorKey !== 'freight-all')
    ? CORRIDORS[appState.activeCorridorKey]
    : null;

  allParsed.forEach(t => {
    // 0. Reizigers zitten NOOIT in een goederentrein (zoals DB Cargo met ketelwagens of Betuweroute containers)!
    const isFreight = (t.operator && t.operator.category === 'freight') ||
                      (t.trainNum && parseInt(t.trainNum, 10) >= 40000 && parseInt(t.trainNum, 10) <= 69999) ||
                      (t.corridorId && (t.corridorId.includes('betuweroute') || t.corridorId.includes('goederen') || t.corridorId === 'freight-all')) ||
                      /cargo|goederen|locon|lte|rtb|lineas|captrain|dbcargo|rfo|db cargo/i.test((t.operator?.name || '') + ' ' + (t.matnrString || '') + ' ' + (t.operator?.code || ''));
    if (isFreight) return; // Diskwalificeer alle goederentreinen voor Mijn Trein

    // Gebruik de continu geïnterpoleerde/geëxtrapoleerde positie (dead-reckoning) indien beschikbaar,
    // zodat een rijdende trein (zoals ICE) met vertraagde feed-update niet kunstmatig 1-2 km achterop lijkt te liggen!
    const mState = appState.trainMotionStates && appState.trainMotionStates.get(t.id);
    const tCurLat = (mState && typeof mState.curLat === 'number') ? mState.curLat : t.lat;
    const tCurLon = (mState && typeof mState.curLon === 'number') ? mState.curLon : t.lon;
    const d = distanceKm(userLat, userLon, tCurLat, tCurLon);
    
    // Een reiziger kan NOOIT in een trein zitten die kilometers ver weg rijdt!
    // Maximaal 2.5 km (of 3.5 km bij hoge snelheid > 100 km/u met geëxtrapoleerde positie)
    const maxSearchDist = (userSpeedKmh && userSpeedKmh > 100) ? 3.5 : 2.5;
    if (d > maxSearchDist) return;
    let score = d;

    // 0. Handmatig door gebruiker gekozen/vergrendelde trein op dit station of baanvak
    if (appState.userLockedTrainId && t.id === appState.userLockedTrainId) {
      score *= 0.04; // Absolute voorkeur voor de specifiek gekozen trein
    }

    // 0a. Hysteresis / Stickiness voor de reeds actieve trein (appState.myTrain):
    // Voorkom dat de app bij een rijdende trein continu flikkert naar passerende treinen,
    // MAAR uitsluitend zolang deze trein daadwerkelijk nog fysiek dichtbij is (< 2.5 km)!
    const isCurrentMyTrain = appState.myTrain && (t.id === appState.myTrain.id || (t.trainNum && appState.myTrain.trainNum && t.trainNum === appState.myTrain.trainNum));
    if (isCurrentMyTrain && d <= 2.5) {
      score *= 0.15; // Stickiness bonus om dezelfde trein vast te houden
    }

    // Als de reiziger op open baanvak rijdt (> 30 km/u) en niet op een station staat,
    // sluit treinen uit die verder dan 3.0 km van de geëxtrapoleerde positie liggen (om NDOV-feed latency op te vangen)
    if (!isAtStation && userSpeedKmh && userSpeedKmh > 30 && d > 3.0 && !isCurrentMyTrain) {
      return;
    }
    if (d > 1.0) {
      score += (d - 1.0) * 2.5; // Progressieve afstandsstraf
    }

    // 0b. Baanvak / Station exclusiviteit:
    // Als de reiziger op station Apeldoorn De Maten staat (waar uitsluitend Arriva rijdt):
    // Sluit NS-treinen die op Apeldoorn Centraal staan (1.9 km verderop) direct uit!
    if (isStationSingleOperator) {
      const tOp = (t.operator && t.operator.code) ? t.operator.code.toLowerCase() : '';
      if (!stationAllowedOps.has(tOp)) {
        score += 50.0; // Diskwalificeer treinen van andere maatschappijen die niet op dit spoor rijden
      } else {
        score *= 0.15; // Sterke voorkeur voor de maatschappij die dit station bedient (Arriva)
      }
    }

    // 0c. Prioriteit voor het geselecteerde traject (bv. Apeldoorn ➔ Amsterdam Centraal):
    if (activeCorridor) {
      const isCorridorMatch = matchTrainToCorridor(t, activeCorridor);
      if (isCorridorMatch) {
        if (!isCorridorMatch.isReverse) {
          // Trein rijdt in de voorwaartse richting van het actieve traject!
          score *= 0.20;
        } else {
          // Trein rijdt in de tegengestelde richting (tegentrein op het traject)!
          score += 25.0; // Zware straf voor tegentreinen die de verkeerde kant op rijden
        }
      }
    }

    // 1. Voorkeursbestemming van de gebruiker (indien gekozen via de wisselknop of bestemming-chips)
    if (appState.userPreferredDirection) {
      const tDest = (t.exactDestination || (t.service && t.service.destination) || '').toLowerCase();
      const tVia = (t.service && t.service.via ? t.service.via : '').toLowerCase();
      const pref = appState.userPreferredDirection.toLowerCase();
      if (tDest.includes(pref) || tVia.includes(pref)) {
        score *= 0.20; // Zeer sterke voorkeur voor de gewenste reisrichting of via-station
      } else {
        score += 25.0; // Andere bestemmingen achterstellen
      }
    }

    // 2. Bewegingsrichting vergelijken: telefoon beweegt fysiek mee in dezelfde richting als de trein
    const tMotion = getTrainMotionVector(t, activeCorridor);
    if (userHeadingVector && tMotion) {
      const dot = (userHeadingVector.dLat * tMotion.dLat) + (userHeadingVector.dLon * tMotion.dLon);
      if (dot > 0.05) {
        score *= 0.35; // Trein beweegt in exact dezelfde richting als de smartphone!
      } else if (dot < -0.05) {
        // Trein beweegt in tegengestelde richting (tegentrein passeert ons op het andere spoor)!
        score += (userSpeedKmh && userSpeedKmh > 15) ? 60.0 : 20.0;
      }
    }

    // 3. Als gebruiker in een rijdende trein zit (>25 km/u), vergelijk rijsnelheid zeer scherp!
    if (userSpeedKmh && userSpeedKmh > 25) {
      const trainSpeed = (typeof t.speed === 'number' && t.speed > 0) ? t.speed : ((mState && mState.speed) || 0);
      if (trainSpeed > 15) {
        const speedDiff = Math.abs(trainSpeed - userSpeedKmh);
        if (speedDiff > 45) {
          // Reiziger raast met bijv. 142 km/u; een trein die 41 km/u rijdt is een stoptrein of afremmende trein op een lokaal spoor!
          score += 60.0 + speedDiff * 0.5;
        } else {
          score = score * 0.30 + (speedDiff * 0.04);
        }
      } else {
        // Trein staat stil of heeft 0 km/u terwijl telefoon 100+ km/u beweegt
        score += 50.0;
      }
    }

    if (score < bestScore) {
      bestScore = score;
      bestTrain = t;
    }
  });

  // Hysteresis lock & overstap-controle: voorkom overspringen tenzij de nieuwe trein overtuigend beter past
  if (appState.myTrain && bestTrain && bestTrain.id !== appState.myTrain.id) {
    const currentTrainStillExists = allParsed.find(t => t.id === appState.myTrain.id || (t.trainNum && appState.myTrain.trainNum && t.trainNum === appState.myTrain.trainNum));
    if (currentTrainStillExists) {
      const curMState = appState.trainMotionStates && appState.trainMotionStates.get(currentTrainStillExists.id);
      const curLat = (curMState && typeof curMState.curLat === 'number') ? curMState.curLat : currentTrainStillExists.lat;
      const curLon = (curMState && typeof curMState.curLon === 'number') ? curMState.curLon : currentTrainStillExists.lon;
      const curDist = distanceKm(userLat, userLon, curLat, curLon);
      const curSpeed = (typeof currentTrainStillExists.speed === 'number' && currentTrainStillExists.speed > 0) ? currentTrainStillExists.speed : 0;

      // Als de huidige trein ver achterblijft (> 2.0 km) of een groot snelheidsverschil heeft (> 40 km/u verschil met reiziger):
      // LAAT DE OUDE TREIN LOS en stap direct over naar de nieuwe trein!
      const curSpeedDiff = (userSpeedKmh && curSpeed > 10) ? Math.abs(curSpeed - userSpeedKmh) : 0;
      if (curDist > 2.0 || curSpeedDiff > 40) {
        appState.myTrain = null;
      } else if (userSpeedKmh && userSpeedKmh > 30) {
        const newDist = distanceKm(userLat, userLon, bestTrain.lat, bestTrain.lon);
        const newSpeedDiff = Math.abs((bestTrain.speed || 0) - userSpeedKmh);
        if (curDist < 2.0 && (newDist > 0.40 || newSpeedDiff > 30)) {
          bestTrain = currentTrainStillExists;
        }
      }
    }
  }

  // Plausibiliteitscontrole voor stations: als de reiziger stilstaat op een station (< 600m):
  // Zoek uitsluitend treinen die ZICH OP DIT SPECIFIEKE STATION BEVINDEN (< 850m)!
  // Voorkomt dat een reiziger in Rotterdam gekoppeld wordt aan Arriva in Apeldoorn!
  if (isAtStation && (!bestTrain || distanceKm(userLat, userLon, bestTrain.lat, bestTrain.lon) > maxPlausibleDistKm)) {
    const isApdm = nearestStInfo && nearestStInfo.station && nearestStInfo.station.code === 'APDM';
    const candidateStationTrain = allParsed.find(t => {
      const tDist = distanceKm(userLat, userLon, t.lat, t.lon);
      if (tDist > 0.85) return false; // Trein MOET fysiek op DIT station aanwezig zijn (< 850m)!
      const tOp = (t.operator && t.operator.code) ? t.operator.code.toLowerCase() : '';
      if (isApdm) {
        return tOp.includes('arriva') || t.corridorId === 'arriva-achterhoek';
      }
      return stationAllowedOps.has(tOp);
    });
    if (candidateStationTrain) {
      bestTrain = candidateStationTrain;
    }
  }

  // Fysieke plausibiliteitsvalidatie: sluit goederentreinen, treinen te ver weg (> 2.5 km)
  // en treinen met een onmogelijk snelheidsverschil (> 45 km/u) direct uit!
  if (bestTrain) {
    const isFreight = (bestTrain.operator && bestTrain.operator.category === 'freight') ||
                      (bestTrain.trainNum && parseInt(bestTrain.trainNum, 10) >= 40000 && parseInt(bestTrain.trainNum, 10) <= 69999) ||
                      /cargo|goederen|locon|lte|rtb|lineas|captrain|dbcargo|rfo/i.test((bestTrain.operator?.name || '') + ' ' + (bestTrain.matnrString || '') + ' ' + (bestTrain.operator?.code || ''));
    if (isFreight) {
      bestTrain = null;
    } else {
      const bDist = distanceKm(userLat, userLon, bestTrain.lat, bestTrain.lon);
      if (bDist > 2.5) {
        bestTrain = null;
      } else if (userSpeedKmh && userSpeedKmh > 25) {
        const bSpeed = (typeof bestTrain.speed === 'number' && bestTrain.speed > 0) ? bestTrain.speed : 0;
        const bSpeedDiff = bSpeed > 10 ? Math.abs(bSpeed - userSpeedKmh) : 0;
        if (bDist > 1.6 || (bSpeed > 10 && bSpeedDiff > 45)) {
          bestTrain = null; // Geen valse match met een stoptrein of tegentrein die kilometers verderop rijdt!
        }
      } else if (isAtStation && bDist > 0.85) {
        bestTrain = null;
      }
    }
  }

  if (!bestTrain && appState.myTrain) {
    const curDist = distanceKm(userLat, userLon, appState.myTrain.lat, appState.myTrain.lon);
    if (curDist <= 2.5) {
      bestTrain = appState.myTrain;
    } else {
      appState.myTrain = null;
      appState.userLockedTrainId = null;
    }
  }
  if (!bestTrain) {
    // We hebben wél een werkende GPS-fix van de smartphone, maar (nog) geen gekoppelde treinrit in de feed.
    // Werk direct de snelheid, GPS-coördinaten en het dichtstbijzijnde station bij zodat de interface direct leeft!
    const effectiveSpeed = (userSpeedKmh !== null) ? userSpeedKmh : 0;
    const spdInfo = getSpeedBadgeInfo(effectiveSpeed);

    const modalSpeedEl = document.getElementById('myTrainSpeed');
    if (modalSpeedEl) modalSpeedEl.textContent = effectiveSpeed;

    const modalStatusEl = document.getElementById('myTrainSpeedStatus');
    if (modalStatusEl) {
      modalStatusEl.className = `speed-status-pill ${spdInfo.cssClass}`;
      modalStatusEl.textContent = (effectiveSpeed > 15) ? `⚡ ${effectiveSpeed} km/u (Live Smartphone GPS)` : '🛰️ GPS Verbonden (Zoekt treinrit...)';
    }

    const modalTitle = document.getElementById('myTrainTitle');
    if (modalTitle) {
      modalTitle.textContent = (effectiveSpeed > 15)
        ? `Rijdend per spoor nabij ${nearestStInfo ? nearestStInfo.station.name : 'Nederland'}`
        : `GPS Verbonden nabij ${nearestStInfo ? nearestStInfo.station.name : 'het spoor'}`;
    }

    const modalRoute = document.getElementById('myTrainRoute');
    if (modalRoute) {
      modalRoute.textContent = nearestStInfo
        ? `Baanvak nabij station ${nearestStInfo.station.name} (${nearestStInfo.distKm.toFixed(1)} km)`
        : 'Spoorwegnet Nederland';
    }

    const modalSegment = document.getElementById('myTrainSegment');
    if (modalSegment) {
      modalSegment.textContent = `📍 Live GPS peiling actief (±${userAcc}m) • Zoekt actuele treinrit in NDOV Loket...`;
    }

    const modalMetaEl = document.getElementById('myTrainGpsMeta');
    if (modalMetaEl) {
      modalMetaEl.innerHTML = `
        📍 <strong>Uw GPS:</strong> ${userLat.toFixed(5)}, ${userLon.toFixed(5)} (±${userAcc}m)${userSpeedKmh !== null ? ` &bull; Snelheid: <strong>${userSpeedKmh} km/u</strong>` : ''}<br>
        📡 <em>Verbonden met GPS satellieten. Zoekt overeenkomstige trein op dit baanvak...</em>
      `;
    }

    const modalNextStation = document.getElementById('myTrainNextStation');
    if (modalNextStation && nearestStInfo) {
      modalNextStation.textContent = `${nearestStInfo.station.name} (${nearestStInfo.station.code})`;
    }
    const modalNextEta = document.getElementById('myTrainNextEta');
    if (modalNextEta && nearestStInfo) {
      modalNextEta.textContent = `Afstand tot perron: ~${nearestStInfo.distKm.toFixed(1)} km`;
    }

    // Update ook snelle banner en HUD
    if (hud) {
      hud.style.display = 'flex';
      const spdValEl = document.getElementById('hudSpeedVal');
      if (spdValEl) spdValEl.textContent = effectiveSpeed;
      const titleEl = document.getElementById('hudTrainTitle');
      if (titleEl) titleEl.textContent = 'GPS Treinradar';
      const nextEl = document.getElementById('hudNextStationText');
      if (nextEl) nextEl.textContent = nearestStInfo ? `Nabij ${nearestStInfo.station.name} (${nearestStInfo.distKm.toFixed(1)} km)` : 'GPS Peiling actief';
    }

    const quickBanner = document.getElementById('inTrainQuickBanner');
    const bannerTitle = document.getElementById('inTrainBannerTitle');
    const bannerSub = document.getElementById('inTrainBannerSub');
    if (quickBanner) quickBanner.classList.add('is-active');
    if (bannerTitle) bannerTitle.innerHTML = `📡 Live GPS: ${effectiveSpeed} km/u`;
    if (bannerSub) bannerSub.innerHTML = `📍 Nabij <strong>${nearestStInfo ? nearestStInfo.station.name : 'spoorlijn'}</strong> &bull; Zoekt treinnummer...`;

    return;
  }

  appState.myTrain = bestTrain;
  let distMeters = Math.round(distanceKm(userLat, userLon, bestTrain.lat, bestTrain.lon) * 1000);
  if (isAtStation && bestTrain.corridorId === 'arriva-achterhoek' && distMeters > 300) {
    distMeters = Math.round(nearestStInfo.distKm * 1000);
  }

  // Zoek over ALLE bekende corridors naar de beste fysieke match voor deze specifieke trein
  // (ONAFHANKELIJK van het geselecteerde traject in de bovenbalk)
  let matchedCorridor = null;
  let corridorMatch = null;
  let minScore = Infinity;

  for (const cKey in CORRIDORS) {
    const c = CORRIDORS[cKey];
    if (c.id === 'all' || c.id === 'freight-all' || c.id === 'custom' || c.isCustomRoute) continue;
    if (!c.stations || c.stations.length < 2) continue;

    const isSeriesMatch = c.seriesPattern && bestTrain.trainNum && c.seriesPattern.test(bestTrain.trainNum);
    const isOpMatch = c.primaryOpKey && bestTrain.operator && bestTrain.operator.code.toLowerCase().includes(c.primaryOpKey);
    const m = matchTrainToCorridor(bestTrain, c);
    if (m && typeof m === 'object' && m.perpDistKm <= 4.0) {
      let score = m.perpDistKm;
      if (isSeriesMatch) score *= 0.2;
      if (isOpMatch) score *= 0.3;
      if (score < minScore) {
        minScore = score;
        matchedCorridor = c;
        corridorMatch = m;
      }
    }
  }

  let prevStation = null;
  let nextStation = null;
  let distToNextKm = 0;
  let distFromPrevKm = 0;
  let isHalting = false;
  let myExactDest = appState.userPreferredDirection || bestTrain.exactDestination || (bestTrain.service && bestTrain.service.destination && bestTrain.service.destination !== 'Eindbestemming' ? bestTrain.service.destination : '');
  if (appState.userPreferredDirection) {
    bestTrain.exactDestination = appState.userPreferredDirection;
    if (bestTrain.service) bestTrain.service.destination = appState.userPreferredDirection;
  }

  if (matchedCorridor && corridorMatch) {
    const stations = matchedCorridor.stations;
    const segIdx = corridorMatch.segmentIndex;
    let isRev = corridorMatch.isReverse;

    // Fysieke verificatie van de reisrichting via GPS beweging van de smartphone:
    if (userHeadingVector && segIdx >= 0 && segIdx < stations.length - 1) {
      const s1 = stations[segIdx];
      const s2 = stations[segIdx + 1];
      const segDLat = s2.lat - s1.lat;
      const segDLon = s2.lon - s1.lon;
      const dot = (userHeadingVector.dLat * segDLat) + (userHeadingVector.dLon * segDLon);
      if (Math.abs(dot) > 1e-7) {
        isRev = (dot < 0);
      }
    } else if (appState.userPreferredDirection) {
      const s0Match = stations[0].name.toLowerCase().includes(appState.userPreferredDirection.toLowerCase());
      const snMatch = stations[stations.length - 1].name.toLowerCase().includes(appState.userPreferredDirection.toLowerCase());
      if (s0Match) isRev = true;
      else if (snMatch) isRev = false;
    }

    if (!isRev) {
      prevStation = stations[segIdx];
      nextStation = stations[segIdx + 1];
    } else {
      prevStation = stations[segIdx + 1];
      nextStation = stations[segIdx];
    }

    if (!myExactDest) {
      myExactDest = isRev ? stations[0].name : stations[stations.length - 1].name;
    }

    distToNextKm = distanceKm(bestTrain.lat, bestTrain.lon, nextStation.lat, nextStation.lon);
    distFromPrevKm = distanceKm(bestTrain.lat, bestTrain.lon, prevStation.lat, prevStation.lon);

    // Controleer of de trein halteert op een station (< 400m en snelheid <= 15 km/u)
    if (distToNextKm <= 0.40 && (userSpeedKmh === null || userSpeedKmh <= 15)) {
      prevStation = nextStation;
      const curIdx = stations.findIndex(s => s.code === prevStation.code);
      if (!isRev && curIdx >= 0 && curIdx < stations.length - 1) {
        nextStation = stations[curIdx + 1];
      } else if (isRev && curIdx > 0) {
        nextStation = stations[curIdx - 1];
      }
      distToNextKm = distanceKm(bestTrain.lat, bestTrain.lon, nextStation.lat, nextStation.lon);
      distFromPrevKm = 0;
      isHalting = true;
    } else if (distFromPrevKm <= 0.45 && (userSpeedKmh === null || userSpeedKmh <= 15)) {
      isHalting = true;
    }

    // Bewaar het gedetecteerde traject van de trein ZONDER het geselecteerde traject in de bovenbalk te overschrijven
    appState.myTrainCorridor = matchedCorridor;
  } else {
    // Intelligente geometrische stationsdetectie langs het spoor via alle 397 stations
    const allSt = getAllStations().filter(s => s.sporen !== 'Goederen' && s.sporen !== 'DE Grens');
    let vLat = 0, vLon = 0;
    if (userHeadingVector) {
      vLat = userHeadingVector.dLat;
      vLon = userHeadingVector.dLon;
    } else if (myExactDest) {
      const destSt = allSt.find(s => s.name.toLowerCase().includes(myExactDest.toLowerCase()));
      if (destSt) {
        vLat = destSt.lat - bestTrain.lat;
        vLon = destSt.lon - bestTrain.lon;
      }
    }
    const vLen = Math.hypot(vLat, vLon);

    const nearby = allSt.map(s => {
      const dLat = s.lat - bestTrain.lat;
      const dLon = s.lon - bestTrain.lon;
      const dist = distanceKm(bestTrain.lat, bestTrain.lon, s.lat, s.lon);
      let tLong = 0;
      let dPerp = dist;
      if (vLen > 0.0001) {
        tLong = (dLat * vLat + dLon * vLon) / (vLen * vLen);
        const pLat = bestTrain.lat + tLong * vLat;
        const pLon = bestTrain.lon + tLong * vLon;
        dPerp = distanceKm(s.lat, s.lon, pLat, pLon);
      }
      return { station: s, dist, tLong, dPerp };
    }).filter(x => x.dist <= 35 && x.dPerp <= 4.0);

    const upcoming = nearby.filter(x => x.tLong > 0).sort((a, b) => a.dist - b.dist);
    const passed = nearby.filter(x => x.tLong <= 0).sort((a, b) => a.dist - b.dist);

    nextStation = upcoming[0] ? upcoming[0].station : (nearby[1] ? nearby[1].station : { name: 'Eerstvolgend station', code: 'NS', lat: bestTrain.lat, lon: bestTrain.lon });
    prevStation = passed[0] ? passed[0].station : (nearby[0] ? nearby[0].station : { name: 'Vorig station', code: 'NS', lat: bestTrain.lat, lon: bestTrain.lon });

    distToNextKm = distanceKm(bestTrain.lat, bestTrain.lon, nextStation.lat, nextStation.lon);
    distFromPrevKm = distanceKm(bestTrain.lat, bestTrain.lon, prevStation.lat, prevStation.lon);
    isHalting = distFromPrevKm <= 0.45 && (userSpeedKmh === null || userSpeedKmh <= 15);
  }

  // Bepaal de veilige, realistische rijsnelheid van de trein (nooit 400+ km/u)
  let maxPermissibleSpeed = 160; // Standaard maximum op Nederlands hoofdspoor (Utrecht - Amsterdam viersporig / Hanzelijn)
  const opCode = (bestTrain && bestTrain.operator && bestTrain.operator.code) ? bestTrain.operator.code.toLowerCase() : '';
  if (opCode.includes('arriva') || opCode.includes('blauwnet') || opCode.includes('qbuzz') || opCode.includes('keolis')) {
    maxPermissibleSpeed = 140; // Regionale lijnen
  } else if (opCode.includes('ice') || opCode.includes('eurostar') || (bestTrain && bestTrain.operator && (bestTrain.operator.category === 'hsl' || bestTrain.operator.category === 'international'))) {
    maxPermissibleSpeed = 250; // HSL & ICE International (tot 200-250 km/u)
  }

  let effectiveSpeed = 0;
  if (userSpeedKmh !== null && userSpeedKmh >= 3 && userSpeedKmh <= maxPermissibleSpeed) {
    if (bestTrain && typeof bestTrain.speed === 'number' && bestTrain.speed > 5 && bestTrain.speed <= maxPermissibleSpeed) {
      // Als telemetrie van trein en GPS beide snel zijn: controleer op consistentie
      const diff = Math.abs(userSpeedKmh - bestTrain.speed);
      if (diff < 20) {
        effectiveSpeed = Math.round(0.75 * userSpeedKmh + 0.25 * bestTrain.speed);
      } else {
        effectiveSpeed = userSpeedKmh; // Bij afwijking is GPS van de reiziger in de trein leidend!
      }
    } else {
      effectiveSpeed = userSpeedKmh;
    }
  } else if (bestTrain && typeof bestTrain.speed === 'number' && bestTrain.speed > 0) {
    effectiveSpeed = Math.min(maxPermissibleSpeed, bestTrain.speed);
  } else {
    effectiveSpeed = opCode.includes('arriva') ? 90 : 130;
  }

  if (effectiveSpeed > maxPermissibleSpeed) {
    effectiveSpeed = maxPermissibleSpeed;
  }

  // Treinen die daadwerkelijk stilstaan op een station (< 450m van het perron) tonen 0 km/u ('Halterend')
  if (isHalting || (userSpeedKmh !== null && userSpeedKmh <= 5) || (isAtStation && (userSpeedKmh === null || userSpeedKmh <= 5))) {
    effectiveSpeed = 0;
  }
  const etaMin = effectiveSpeed > 10 ? Math.max(1, Math.round((distToNextKm / effectiveSpeed) * 60)) : null;
  const op = bestTrain.operator;
  const spdInfo = getSpeedBadgeInfo(effectiveSpeed);

  // Update de snelle banner bovenaan het lijnoverzicht
  const quickBanner = document.getElementById('inTrainQuickBanner');
  const bannerTitle = document.getElementById('inTrainBannerTitle');
  const bannerSub = document.getElementById('inTrainBannerSub');
  const bannerBtnText = document.getElementById('inTrainBannerBtnText');

  if (quickBanner) quickBanner.classList.add('is-active');
  if (bannerTitle) bannerTitle.innerHTML = `🚆 U zit in ${op.name} Trein #${bestTrain.trainNum}`;
  if (bannerSub) {
    bannerSub.innerHTML = isHalting
      ? `⏸ Halteert op <strong>${prevStation.name}</strong> &bull; Eerstvolgend: ${nextStation.name}`
      : `⚡ <strong>${effectiveSpeed} km/u</strong> &bull; ➔ naar <strong>${myExactDest}</strong> (nadert ${nextStation.name}${etaMin ? ` in ~${etaMin} min` : ''})`;
  }
  if (bannerBtnText) bannerBtnText.textContent = '📋 Alle Gegevens';

  // Update de zwevende Live HUD op de kaart
  if (hud) {
    hud.style.display = 'flex';
    const opEl = document.getElementById('hudOpBadge');
    if (opEl) {
      opEl.className = `op-badge ${op.badgeClass}`;
      opEl.textContent = `[${op.code}]`;
    }
    const titleEl = document.getElementById('hudTrainTitle');
    if (titleEl) titleEl.textContent = `Trein #${bestTrain.trainNum}`;

    const nextEl = document.getElementById('hudNextStationText');
    if (nextEl) {
      nextEl.innerHTML = isHalting
        ? `⏸ Halteert op <strong>${prevStation.name}</strong> (Spoor ${prevStation.sporen || 1}) &bull; Volgend: ${nextStation.name}`
        : `➔ <strong>${myExactDest}</strong> &bull; Volgend: ${nextStation.name} (~${distToNextKm.toFixed(1)} km${etaMin ? ` • ${etaMin} min` : ''})`;
    }

    const spdValEl = document.getElementById('hudSpeedVal');
    if (spdValEl) spdValEl.textContent = effectiveSpeed;

    const spdBadgeEl = document.getElementById('hudSpeedBadge');
    if (spdBadgeEl) {
      spdBadgeEl.className = `hud-speed-status-badge ${spdInfo.cssClass}`;
      spdBadgeEl.textContent = `${spdInfo.icon} ${spdInfo.text}`;
    }
  }

  // Update ook modal-elementen
  const modalSpeedEl = document.getElementById('myTrainSpeed');
  if (modalSpeedEl) modalSpeedEl.textContent = effectiveSpeed;
  const modalStatusEl = document.getElementById('myTrainSpeedStatus');
  if (modalStatusEl) {
    modalStatusEl.className = `speed-status-pill ${spdInfo.cssClass}`;
    modalStatusEl.textContent = isHalting ? `⏸ Halteert op station ${prevStation.name}` : spdInfo.text;
  }
  const modalMetaEl = document.getElementById('myTrainGpsMeta');
  if (modalMetaEl) {
    modalMetaEl.innerHTML = `
      📍 <strong>Uw GPS:</strong> ${userLat.toFixed(5)}, ${userLon.toFixed(5)} (±${userAcc}m)${userSpeedKmh ? ` &bull; Snelheid: ${userSpeedKmh} km/u` : ''}<br>
      🚆 <strong>Trein GPS:</strong> ${bestTrain.lat.toFixed(5)}, ${bestTrain.lon.toFixed(5)} &bull; Afstand tot trein: <strong>${distMeters} meter</strong>
    `;
  }
  const unitsCount = bestTrain.unitsCount || 1;
  const modalTitle = document.getElementById('myTrainTitle');
  if (modalTitle) modalTitle.textContent = `U zit in ${op.name} Trein #${bestTrain.trainNum}${unitsCount > 1 ? ` (${unitsCount} stellen)` : ''}${myExactDest ? ` naar ${myExactDest}` : ''}`;
  const modalOpBadge = document.getElementById('myTrainOpBadge');
  if (modalOpBadge) {
    modalOpBadge.className = `op-badge ${op.badgeClass}`;
    modalOpBadge.textContent = `[${op.code}]`;
  }
  const modalOperator = document.getElementById('myTrainOperator');
  if (modalOperator) modalOperator.textContent = `${op.name} (${unitsCount > 1 ? `${unitsCount}x gekoppeld: ` : ''}${bestTrain.matnummer || 'Standaard materieel'})`;
  const modalMatnr = document.getElementById('myTrainMatnr');
  if (modalMatnr) modalMatnr.textContent = `Materieelcode: ${bestTrain.matnummer || 'NVT'} • Trein #${bestTrain.trainNum}`;

  const puncText = bestTrain.statusType === 'ontime' ? '🟢 Volgens schema op tijd' :
                   bestTrain.statusType === 'delayed' ? `🟡 +${bestTrain.delayMin || 2}m Vertraagd` : '🔴 Pech / Storing';
  const modalPunc = document.getElementById('myTrainPunctuality');
  if (modalPunc) modalPunc.textContent = puncText;
  const modalDelay = document.getElementById('myTrainDelay');
  if (modalDelay) modalDelay.textContent = `Verwachte vertraging: ${bestTrain.delayMin || 0} minuten`;

  const modalNextStation = document.getElementById('myTrainNextStation');
  if (modalNextStation) modalNextStation.textContent = `${nextStation.name} (${nextStation.code}) - Spoor ${nextStation.sporen || 1}`;
  const modalNextEta = document.getElementById('myTrainNextEta');
  if (modalNextEta) {
    modalNextEta.textContent = isHalting
      ? `Vertrekt zometeen richting ${nextStation.name} (~${distToNextKm.toFixed(1)} km)`
      : `Afstand: ~${distToNextKm.toFixed(1)} km ${etaMin ? `(ca. ${etaMin} min bij ${effectiveSpeed} km/u)` : ''}`;
  }

  const modalPrevStation = document.getElementById('myTrainPrevStation');
  if (modalPrevStation) modalPrevStation.textContent = `${prevStation.name} (${prevStation.code})`;
  const modalPrevDist = document.getElementById('myTrainPrevDist');
  if (modalPrevDist) {
    modalPrevDist.textContent = isHalting
      ? `Nu aanwezig op station (Spoor ${prevStation.sporen || 1})`
      : `Afstand: ~${distFromPrevKm.toFixed(1)} km geleden gepasseerd`;
  }

  const modalRoute = document.getElementById('myTrainRoute');
  if (modalRoute) modalRoute.textContent = `${op.name} • Trein #${bestTrain.trainNum}${myExactDest ? ` ➔ naar ${myExactDest}` : ''}`;
  const modalSegment = document.getElementById('myTrainSegment');
  if (modalSegment) {
    modalSegment.textContent = isHalting
      ? `Halteert op station ${prevStation.name} (Spoor ${prevStation.sporen || 1}) • Eerstvolgende: ${nextStation.name}`
      : `Baanvak tussen ${prevStation.name} en ${nextStation.name} (➔ naar ${myExactDest})`;
  }

  // Station & Baanvak Multi-Train Selector: toont treinen in de directe fysieke nabijheid (< 2.5 km op spoor, < 850m op station)
  const maxNearbyDist = (effectiveSpeed > 15) ? 2.5 : 0.85;
  const nearbyCandidateTrains = allParsed.filter(t => {
    const isFreight = (t.operator && t.operator.category === 'freight') ||
                      (t.trainNum && parseInt(t.trainNum, 10) >= 40000 && parseInt(t.trainNum, 10) <= 69999) ||
                      (t.corridorId && (t.corridorId.includes('betuweroute') || t.corridorId.includes('goederen') || t.corridorId === 'freight-all')) ||
                      /cargo|goederen|locon|lte|rtb|lineas|captrain|dbcargo|rfo/i.test((t.operator?.name || '') + ' ' + (t.matnrString || '') + ' ' + (t.operator?.code || ''));
    if (isFreight) return false;
    const d = distanceKm(userLat, userLon, t.lat, t.lon);
    if (d > maxNearbyDist) return false;
    // Als de reiziger rijdt op snelheid, sluit dan tegentreinen die ons passeren uit van de keuzelijst
    if (effectiveSpeed > 25 && userHeadingVector) {
      const tMotion = getTrainMotionVector(t, activeCorridor);
      if (tMotion) {
        const dot = (userHeadingVector.dLat * tMotion.dLat) + (userHeadingVector.dLon * tMotion.dLon);
        if (dot < -0.15) return false; // Tegentrein
      }
    }
    return true;
  }).sort((a, b) => distanceKm(userLat, userLon, a.lat, a.lon) - distanceKm(userLat, userLon, b.lat, b.lon));

  const selectorEl = document.getElementById('myTrainStationSelector');
  const chipsEl = document.getElementById('myTrainStationChips');

  if (selectorEl && chipsEl) {
    if (nearbyCandidateTrains.length >= 2) {
      selectorEl.style.display = 'block';
      const titleLabelEl = selectorEl.querySelector('.mt-station-title');
      const hintLabelEl = selectorEl.querySelector('.mt-station-hint');
      if (titleLabelEl) {
        titleLabelEl.textContent = isAtStation
          ? `🚉 Treinen op dit station (${nearbyCandidateTrains.length} aanwezig):`
          : `🚆 Treinen op dit baanvak (${nearbyCandidateTrains.length} in de buurt):`;
      }
      if (hintLabelEl) {
        hintLabelEl.textContent = isAtStation
          ? 'Zit u in een andere trein op het perron? Tik direct om te kiezen:'
          : 'Zit u in een andere trein op dit spoor? Tik direct om te wisselen:';
      }
      chipsEl.innerHTML = nearbyCandidateTrains.slice(0, 4).map(stTrain => {
        const isCurrent = bestTrain && (stTrain.id === bestTrain.id || (stTrain.trainNum && bestTrain.trainNum && stTrain.trainNum === bestTrain.trainNum));
        const stOp = stTrain.operator || { code: 'Trein', badgeClass: 'op-ns' };
        const stDest = stTrain.exactDestination || (stTrain.service && stTrain.service.destination) || 'Bestemming';
        const stVia = (stTrain.service && stTrain.service.via) ? ` (${stTrain.service.via.split(',')[0].replace('via ', '')})` : '';
        const stDistM = Math.round(distanceKm(userLat, userLon, stTrain.lat, stTrain.lon) * 1000);
        return `
          <button type="button" class="mt-station-chip-btn ${isCurrent ? 'active' : ''}" onclick="window.selectMyTrain('${stTrain.id}')" title="Tik om [${stOp.code}] #${stTrain.trainNum} naar ${stDest} te kiezen">
            <span class="op-badge ${stOp.badgeClass}" style="font-size:0.64rem; padding:1px 4px;">[${stOp.code}]</span>
            <span>#${stTrain.trainNum} ➔ ${stDest}${stVia} (${stDistM}m)</span>
            ${isCurrent ? '<span style="color:#38bdf8; font-weight:800;">✓ Gekozen</span>' : ''}
          </button>
        `;
      }).join('');
    } else {
      selectorEl.style.display = 'none';
    }
  }

  // Pas wisselknop in de hero banner dynamisch aan
  const btnSwitchDir = document.getElementById('btnSwitchTrainDirection');
  if (btnSwitchDir) {
    if (nearbyCandidateTrains.length >= 2) {
      btnSwitchDir.innerHTML = `🔄 Wissel naar andere trein (${nearbyCandidateTrains.length} in de buurt)`;
      btnSwitchDir.title = 'Tik om te wisselen tussen de treinen in uw nabijheid';
    } else {
      btnSwitchDir.innerHTML = '🔄 Wissel bestemming of richting';
      btnSwitchDir.title = 'Wissel direct van richting of bestemming voor deze trein';
    }
  }

  // Directe Bestemming Keuze Chips (1-tap wisselen tussen Den Haag Centraal, Rotterdam Centraal, Breda, Leeuwarden/Groningen, etc.)
  const destChipsContainer = document.getElementById('myTrainDestChips');
  if (destChipsContainer) {
    const origin = (bestTrain.service && bestTrain.service.origin && bestTrain.service.origin !== 'Vertrekstation') ? bestTrain.service.origin : '';
    const defaultDest = (bestTrain.service && bestTrain.service.destination && bestTrain.service.destination !== 'Eindbestemming') ? bestTrain.service.destination : '';
    const options = new Set();
    if (defaultDest) options.add(defaultDest);
    if (origin) options.add(origin);

    const num = parseInt(bestTrain.trainNum, 10) || 0;
    const opCode = (bestTrain.operator && bestTrain.operator.code) ? bestTrain.operator.code.toLowerCase() : '';

    if ((num >= 500 && num <= 799) || (num >= 1600 && num <= 1799) || (num >= 11600 && num <= 11799) || (num >= 1400 && num <= 1499) || (num >= 2000 && num <= 2099) || (num >= 2800 && num <= 2899)) {
      options.add('Den Haag Centraal');
      options.add('Rotterdam Centraal');
    }
    if ((num >= 1100 && num <= 1199) || (num >= 1800 && num <= 1899) || (num >= 2400 && num <= 2499) || (num >= 9200 && num <= 9299)) {
      options.add('Breda');
      options.add('Rotterdam Centraal');
      options.add('Den Haag Centraal');
    }
    if (opCode.includes('ice') || (num >= 100 && num <= 159) || (num >= 220 && num <= 259)) {
      options.add('Frankfurt (Main) Hbf');
      options.add('Amsterdam Centraal');
      options.add('Basel SBB');
    }
    if (opCode.includes('icberlijn') || (num >= 140 && num <= 149) || (num >= 240 && num <= 249)) {
      options.add('Berlin Hbf');
      options.add('Amsterdam Centraal');
    }

    const optList = Array.from(options).filter(Boolean);
    if (optList.length >= 2) {
      destChipsContainer.style.display = 'flex';
      destChipsContainer.innerHTML = `
        <span style="font-size:0.68rem; color:#94a3b8; display:inline-flex; align-items:center; margin-right:4px;">🎯 Bestemming:</span>
        ${optList.map(opt => {
          const isActive = myExactDest && (myExactDest.toLowerCase().includes(opt.toLowerCase()) || opt.toLowerCase().includes(myExactDest.toLowerCase()));
          return `
            <button type="button" class="mt-dest-chip-btn ${isActive ? 'active' : ''}" onclick="window.setMyTrainDestination('${opt.replace(/'/g, "\\'")}')" style="background:${isActive ? 'rgba(56, 189, 248, 0.35)' : 'rgba(56, 189, 248, 0.12)'}; border:1px solid ${isActive ? '#38bdf8' : 'rgba(56, 189, 248, 0.35)'}; color:${isActive ? '#ffffff' : '#38bdf8'}; border-radius:999px; padding:3px 10px; font-size:0.70rem; font-weight:${isActive ? '700' : '600'}; cursor:pointer; transition:all 0.15s ease;">
              ${isActive ? '✓ ' : ''}➔ ${opt}
            </button>
          `;
        }).join('')}
      `;
    } else {
      destChipsContainer.style.display = 'none';
    }
  }

  // Toon optionele knop om het traject van deze trein op de kaart te openen
  const btnCorridor = document.getElementById('btnViewCorridorOnMap');
  if (btnCorridor) {
    if (matchedCorridor) {
      btnCorridor.style.display = 'inline-flex';
      btnCorridor.textContent = `🛤️ Toon Traject (${matchedCorridor.shortName || matchedCorridor.name})`;
      btnCorridor.onclick = () => {
        switchCorridor(matchedCorridor.id);
        const modal = document.getElementById('myTrainModal');
        if (modal) modal.style.display = 'none';
        if (window.setAppViewMode) window.setAppViewMode('map');
      };
    } else {
      btnCorridor.style.display = 'none';
    }
  }

  // Als gevraagd om direct de modal te openen bij eerste fix:
  if (appState.openModalOnFirstFix) {
    const modal = document.getElementById('myTrainModal');
    if (modal) modal.style.display = 'flex';
    appState.openModalOnFirstFix = false;
  }

  // Als meereizen actief is, pan rustig mee met de trein
  if (appState.isFollowingMyTrain && appState.map) {
    appState.map.panTo([userLat, userLon], { animate: true, duration: 1.0 });
  }
}

// =============================================================
// 11b. Live Spoorweg Webcams (Railcams) & Video Cockpit
// =============================================================
export const RAILCAMS = [
  {
    id: 'twello',
    name: 'RailCam Twello (Apeldoorn ➔ Deventer)',
    shortName: 'Twello (IJssellijn)',
    description: '24/7 Live stream van de spoorwegovergang Stationsstraat Twello. Druk spoorwegknooppunt met Intercity\'s, Arriva, IC Berlijn en zwaar goederenvervoer over de IJsselbrug.',
    lat: 52.2384,
    lon: 6.1042,
    badge: 'LIVE 24/7',
    corridorName: 'Apeldoorn ➔ Deventer',
    youtubeUrl: 'https://www.youtube.com/watch?v=E0yQjnJnot0',
    embedUrl: 'https://www.youtube-nocookie.com/embed/E0yQjnJnot0?autoplay=1&mute=1'
  },
  {
    id: 'helmond',
    name: 'RailCam Helmond (Mierlo-Hout)',
    shortName: 'Helmond (Brabant)',
    description: '24/7 Live stream langs het drukke spoor tussen Eindhoven en Venlo. Vele malen per uur NS Intercity\'s en internationale goederentreinen van DB Cargo en Lineas.',
    lat: 51.4673,
    lon: 5.6322,
    badge: 'LIVE 24/7',
    corridorName: 'Eindhoven ➔ Helmond ➔ Venlo',
    youtubeUrl: 'https://www.youtube.com/watch?v=TOlyziCWZwY',
    embedUrl: 'https://www.youtube-nocookie.com/embed/TOlyziCWZwY?autoplay=1&mute=1'
  },
  {
    id: 'zandvoort',
    name: 'RailCam Zandvoort aan Zee',
    shortName: 'Zandvoort',
    description: 'Live zicht op het spoor en perrons van station Zandvoort aan Zee en de naderende kusttreinen.',
    lat: 52.3752,
    lon: 4.5348,
    badge: 'LIVE',
    corridorName: 'Haarlem ➔ Zandvoort aan Zee',
    youtubeUrl: 'https://www.youtube.com/watch?v=KXecsG2aO48',
    embedUrl: 'https://www.youtube-nocookie.com/embed/KXecsG2aO48?autoplay=1&mute=1'
  },
  {
    id: 'cabview-apeldoorn-zutphen',
    name: 'Cabview: Apeldoorn ➔ Zutphen (Machinist POV)',
    shortName: 'Cabview Apeldoorn ➔ Zutphen',
    description: 'Meekijken door de voorruit van de machinist: Arriva Spurt over de Veluwe via Apeldoorn De Maten, Klarenbeek en Voorst-Empe naar Zutphen.',
    lat: 52.2094,
    lon: 5.9675,
    badge: 'CABVIEW 4K',
    corridorName: 'Apeldoorn ➔ Zutphen',
    youtubeUrl: 'https://www.youtube.com/watch?v=kmRbiAwbEs0',
    embedUrl: 'https://www.youtube-nocookie.com/embed/kmRbiAwbEs0?autoplay=1'
  },
  {
    id: 'cabview-utrecht-amsterdam',
    name: 'Cabview: Utrecht Centraal ➔ Amsterdam Centraal',
    shortName: 'Cabview Utrecht ➔ Amsterdam',
    description: 'Meekijken vanuit de cabine over het viersporige traject langs Breukelen en de Vechtstreek.',
    lat: 52.0894,
    lon: 5.1103,
    badge: 'CABVIEW 4K',
    corridorName: 'Utrecht Centraal ➔ Amsterdam Centraal',
    youtubeUrl: 'https://www.youtube.com/watch?v=YIrH2nZUOMQ',
    embedUrl: 'https://www.youtube-nocookie.com/embed/YIrH2nZUOMQ?autoplay=1'
  }
];

export function renderRailcamMarkers() {
  if (!appState.map) return;
  if (appState.railcamMarkers && appState.railcamMarkers.length > 0) {
    appState.railcamMarkers.forEach(m => m.remove());
    appState.railcamMarkers = [];
  }

  if (!appState.showRailcams) return;

  RAILCAMS.forEach(cam => {
    const icon = L.divIcon({
      className: 'clean-railcam-div-icon',
      html: `
        <div class="clean-railcam-marker" title="${cam.name} (Live Video)">
          <div class="railcam-pin-pulse"></div>
          <div class="railcam-pin-icon">📹</div>
          <span class="railcam-pin-label">${cam.shortName}</span>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const marker = L.marker([cam.lat, cam.lon], { icon, zIndexOffset: 2500 }).addTo(appState.map);

    marker.bindTooltip(`<strong>📹 ${cam.name}</strong><br><span style="color:#fca5a5;">🔴 LIVE VIDEO • Tik om te kijken</span>`, {
      direction: 'top',
      offset: [0, -14],
      className: 'custom-glass-tooltip'
    });

    marker.on('click', (e) => {
      if (e.originalEvent) e.originalEvent.stopPropagation();
      openRailcamModal(cam.id);
    });

    appState.railcamMarkers.push(marker);
  });
}

function renderRailcamTabs() {
  const tabsBar = document.getElementById('railcamTabsBar');
  if (!tabsBar) return;

  tabsBar.innerHTML = RAILCAMS.map(cam => {
    const isActive = cam.id === appState.activeRailcamId;
    return `
      <button class="railcam-tab-btn ${isActive ? 'active' : ''}" type="button" data-cam-id="${cam.id}">
        <span>📹 ${cam.shortName}</span>
      </button>
    `;
  }).join('');

  tabsBar.querySelectorAll('.railcam-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-cam-id');
      if (id) openRailcamModal(id);
    });
  });
}

export function openRailcamModal(camId = 'twello') {
  const cam = RAILCAMS.find(c => c.id === camId) || RAILCAMS[0];
  appState.activeRailcamId = cam.id;

  const modal = document.getElementById('railcamModal');
  if (!modal) return;
  modal.style.display = 'flex';

  // Activeer knop in bovenbalk
  document.getElementById('btnHeaderRailcams')?.classList.add('active');

  renderRailcamTabs();

  const title = document.getElementById('railcamModalTitle');
  if (title) title.textContent = `📹 ${cam.name}`;
  const badge = document.getElementById('railcamBadgeTag');
  if (badge) badge.textContent = cam.badge;
  const nameEl = document.getElementById('railcamCamName');
  if (nameEl) nameEl.textContent = cam.name;
  const corridorEl = document.getElementById('railcamCorridorDesc');
  if (corridorEl) corridorEl.textContent = cam.corridorName;
  const descEl = document.getElementById('railcamCamDesc');
  if (descEl) descEl.textContent = cam.description;

  const iframe = document.getElementById('railcamIframe');
  if (iframe) {
    iframe.src = cam.embedUrl;
  }

  const extBtn = document.getElementById('btnRailcamExternal');
  if (extBtn) {
    extBtn.href = cam.youtubeUrl;
  }
  const quickBtn = document.getElementById('btnRailcamQuickOpen');
  if (quickBtn) {
    quickBtn.href = cam.youtubeUrl;
  }

  const centerBtn = document.getElementById('btnRailcamCenterMap');
  if (centerBtn) {
    centerBtn.onclick = () => {
      modal.style.display = 'none';
      if (window.setAppViewMode) window.setAppViewMode('map');
      if (appState.map) appState.map.flyTo([cam.lat, cam.lon], 15, { duration: 1.0 });
    };
  }

  updateRailcamRadarApproaching(cam);
}

export function closeRailcamModal() {
  const modal = document.getElementById('railcamModal');
  if (modal) modal.style.display = 'none';
  document.getElementById('btnHeaderRailcams')?.classList.remove('active');
  const iframe = document.getElementById('railcamIframe');
  if (iframe) iframe.src = '';
}

function updateRailcamRadarApproaching(cam) {
  const listEl = document.getElementById('railcamApproachingTrains');
  const countBadge = document.getElementById('railcamRadarCount');
  if (!listEl) return;

  const allParsed = getActiveParsedTrains();
  const nearby = [];

  allParsed.forEach(t => {
    const d = distanceKm(cam.lat, cam.lon, t.lat, t.lon);
    if (d <= 6.5) {
      const spd = t.speed > 10 ? t.speed : 70;
      const etaSec = Math.round((d / spd) * 3600);
      const etaMin = Math.round(etaSec / 60);
      nearby.push({ train: t, distKm: d, etaSec, etaMin });
    }
  });

  nearby.sort((a, b) => a.distKm - b.distKm);

  if (countBadge) {
    countBadge.textContent = `${nearby.length} ${nearby.length === 1 ? 'trein' : 'treinen'} in de buurt`;
    countBadge.className = nearby.length > 0 ? 'badge-radar-count has-trains' : 'badge-radar-count';
  }

  if (nearby.length === 0) {
    listEl.innerHTML = `
      <div class="railcam-no-trains">
        <span>⏱️ Momenteel geen treinen binnen 6.5 km van deze camera.</span>
        <span style="font-size: 0.72rem; color: #94a3b8;">Volgende passage wordt live gedetecteerd via satellietradar...</span>
      </div>
    `;
    return;
  }

  listEl.innerHTML = nearby.map(item => {
    const t = item.train;
    const op = t.operator;
    const dest = t.exactDestination || (t.service && t.service.destination) || 'Eindbestemming';
    const etaText = item.distKm <= 0.45 ? '⚡ Passeert nu de camera!' : (item.etaSec < 90 ? `Passeert over ~${item.etaSec} sec` : `Passeert over ~${item.etaMin} min`);
    return `
      <div class="railcam-train-row">
        <div class="train-row-left">
          <span class="op-badge ${op.badgeClass}">[${op.code}]</span>
          <strong>Trein #${t.trainNum}</strong>
          <span class="row-dest">➔ ${dest}</span>
        </div>
        <div class="train-row-right">
          <span class="row-dist">${item.distKm.toFixed(1)} km</span>
          <span class="row-eta ${item.distKm <= 0.45 ? 'passing-now' : ''}">${etaText}</span>
        </div>
      </div>
    `;
  }).join('');
}

// =============================================================
// 11. Knoppen, Filters & Navigatie
// =============================================================
function switchCorridor(corridorId) {
  appState.activeCorridorKey = corridorId;

  // Sync de dropdown select
  const select = document.getElementById('trajectSelect');
  if (select && select.value !== corridorId) {
    select.value = corridorId;
  }

  // Update de actieve status van de Goederen knop in de bovenbalk
  const btnFreight = document.getElementById('btnHeaderFreight');
  if (btnFreight) {
    const isFreight = corridorId === 'freight-all' || (CORRIDORS[corridorId] && CORRIDORS[corridorId].category === 'freight');
    btnFreight.classList.toggle('active', isFreight);
  }

  // Update de actieve status van de Amersfoort - Breda (HSL) knop in de sidebar
  const btnHsl = document.getElementById('btnRouteAmersfoortBreda');
  if (btnHsl) {
    const isHslRoute = corridorId === 'amersfoort-breda' || corridorId === 'breda-amersfoort';
    btnHsl.classList.toggle('active', isHslRoute);
    const primaryTxt = btnHsl.querySelector('.tab-primary-text');
    const secTxt = btnHsl.querySelector('.tab-secondary-text');
    if (primaryTxt && secTxt) {
      if (corridorId === 'breda-amersfoort') {
        primaryTxt.textContent = 'Breda ➔ Amersfoort';
        secTxt.innerHTML = 'via Schiphol &bull; 🔄 Wissel naar Breda';
      } else {
        primaryTxt.textContent = 'Amersfoort ➔ Breda';
        secTxt.innerHTML = 'via Schiphol &bull; ⚡ HSL-Zuid v.v.';
      }
    }
  }

  const btnAllNL = document.getElementById('btnViewAllNL');

  if (corridorId === 'all') {
    appState.activeCategory = 'all';
    if (btnAllNL) btnAllNL.classList.add('active');
    document.querySelectorAll('.cat-tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-category') === 'all');
    });
    populateLineButtons('all');
    renderCorridorOnMap(null);
  } else {
    if (btnAllNL) btnAllNL.classList.remove('active');
    const corridor = CORRIDORS[corridorId];
    if (corridor) {
      appState.activeCategory = corridor.category;
      document.querySelectorAll('.cat-tab-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-category') === corridor.category);
      });
      populateLineButtons(corridor.category);
      renderCorridorOnMap(corridor);
    }
  }

  // Zet statusfilter terug naar lijnoverzicht
  appState.activeStatusFilter = 'all';
  document.querySelectorAll('.status-filter-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btnFilterAll')?.classList.add('active');

  updateLineOverview();
  playAuthenticNSChime();
}

function toggleLabelDensity() {
  const modes = ['smart', 'minimal', 'compact', 'full'];
  const curIdx = modes.indexOf(appState.labelMode || 'smart');
  const nextMode = modes[(curIdx + 1) % modes.length];
  appState.labelMode = nextMode;

  const btn = document.getElementById('btnToggleLabelDensity');
  if (btn) {
    if (nextMode === 'smart') {
      btn.textContent = '🏷️ Labels: Slim (Anti-Chaos)';
      btn.classList.remove('active');
    } else if (nextMode === 'minimal') {
      btn.textContent = '🤫 Labels: Alleen Iconen (Rustig)';
      btn.classList.add('active');
    } else if (nextMode === 'compact') {
      btn.textContent = '🏷️ Labels: Compact (Alleen Nr)';
      btn.classList.add('active');
    } else {
      btn.textContent = '🏷️ Labels: Uitgebreid (Alles)';
      btn.classList.add('active');
    }
  }

  // Sync de label dropdown
  const select = document.getElementById('labelDensitySelect');
  if (select && select.value !== nextMode) {
    select.value = nextMode;
  }

  if (appState.lastRenderedTrains && appState.lastRenderedTrains.length > 0) {
    renderMapTrains(appState.lastRenderedTrains);
  }
}

function populateLineButtons(category) {
  const nav = document.getElementById('lineSelectorNav');
  if (!nav) return;

  if (category === 'all') {
    nav.innerHTML = `
      <button class="line-nav-btn active" data-line="all" type="button">
        <span class="line-badge gray">NL</span>
        <span>Heel Nederland (Satelliet Radar Alle Vervoerders)</span>
      </button>
    `;
    return;
  }

  const corridorsForCat = Object.values(CORRIDORS).filter(c => c.category === category);
  let html = '';

  corridorsForCat.forEach(c => {
    const isActive = c.id === appState.activeCorridorKey;
    const badgeColorClass = c.category === 'ns' ? 'yellow' : c.category === 'freight' ? 'gray' : 'blue';

    html += `
      <button class="line-nav-btn ${isActive ? 'active' : ''}" data-line="${c.id}" type="button">
        <span class="line-badge ${badgeColorClass}">${c.badge}</span>
        <span>${c.shortName}</span>
      </button>
    `;
  });

  nav.innerHTML = html;

  nav.querySelectorAll('.line-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lineKey = e.currentTarget.getAttribute('data-line');
      switchCorridor(lineKey);
    });
  });
}

function setupNavigation() {
  // Trajectplanner (Van ➔ Naar) Dropdowns initialiseren
  populateRoutePlannerDropdowns();

  function toggleRoutePlannerBar(forceShow) {
    const bar = document.getElementById('routePlannerBar');
    const btn = document.getElementById('btnToggleRoutePlanner');
    if (!bar) return;
    const shouldShow = forceShow !== undefined ? forceShow : bar.style.display === 'none';
    bar.style.display = shouldShow ? 'block' : 'none';
    btn?.classList.toggle('active', shouldShow);
    if (shouldShow) {
      document.getElementById('routeFromSelect')?.focus();
    }
    if (appState.map) {
      setTimeout(() => appState.map.invalidateSize(), 80);
    }
  }

  // Trajectplanner (Van ➔ Tot) standaard direct zichtbaar
  const pBar = document.getElementById('routePlannerBar');
  if (pBar) pBar.style.display = 'block';
  document.getElementById('btnToggleRoutePlanner')?.classList.add('active');

  document.getElementById('btnToggleRoutePlanner')?.addEventListener('click', () => {
    toggleRoutePlannerBar();
  });

  document.getElementById('btnMinimizePlanner')?.addEventListener('click', () => {
    toggleRoutePlannerBar(false);
  });

  // Weergavekeuze: Alle Treinen in Heel NL
  document.getElementById('btnViewAllNL')?.addEventListener('click', () => {
    switchCorridor('all');
  });

  // Trajectkeuze Dropdown (met optie voor eigen Van ➔ Naar traject)
  document.getElementById('trajectSelect')?.addEventListener('change', (e) => {
    if (e.target.value === 'custom-route') {
      toggleRoutePlannerBar(true);
    } else {
      switchCorridor(e.target.value);
    }
  });

  // Wissel richting om (bv. Leeuwarden ➔ Buitenpost)
  document.getElementById('btnSwapRoute')?.addEventListener('click', () => {
    const fromSel = document.getElementById('routeFromSelect');
    const toSel = document.getElementById('routeToSelect');
    if (!fromSel || !toSel) return;
    const temp = fromSel.value;
    fromSel.value = toSel.value;
    toSel.value = temp;
    if (fromSel.value && toSel.value) {
      applyCustomRoute(fromSel.value, toSel.value);
    }
  });

  function triggerApplyRoute() {
    const fromSel = document.getElementById('routeFromSelect');
    const toSel = document.getElementById('routeToSelect');
    if (fromSel && toSel && fromSel.value && toSel.value && fromSel.value.toLowerCase() !== toSel.value.toLowerCase()) {
      applyCustomRoute(fromSel.value, toSel.value);
    } else {
      toggleRoutePlannerBar(true);
    }
  }

  document.getElementById('btnApplyRoute')?.addEventListener('click', triggerApplyRoute);
  document.getElementById('btnHeaderApplyRoute')?.addEventListener('click', triggerApplyRoute);

  // Knoppen: Bekijk alle treinen in heel Nederland (zowel in planner als in bovenbalk)
  document.getElementById('btnClearRoute')?.addEventListener('click', () => {
    switchCorridor('all');
  });
  document.getElementById('btnHeaderClearRoute')?.addEventListener('click', () => {
    switchCorridor('all');
  });

  // Knoppen: Forceer live verversing (zowel in planner als in bovenbalk)
  document.getElementById('btnForceRefresh')?.addEventListener('click', () => forceRefreshTrains());
  document.getElementById('btnHeaderForceRefresh')?.addEventListener('click', () => forceRefreshTrains());

  // Knop: Amersfoort Schothorst ➔ Breda (HSL) in de vaste linker sidebar & snelle richtingswissel
  document.getElementById('btnRouteAmersfoortBreda')?.addEventListener('click', () => {
    if (appState.activeCorridorKey === 'amersfoort-breda') {
      switchCorridor('breda-amersfoort');
    } else {
      switchCorridor('amersfoort-breda');
    }
    if (window.innerWidth < 1024 && window.setAppViewMode) {
      window.setAppViewMode('split');
    }
  });

  // Knop: Goederenvervoer in de bovenbalk (1-klik toggle)
  document.getElementById('btnHeaderFreight')?.addEventListener('click', () => {
    if (appState.activeCorridorKey === 'freight-all') {
      switchCorridor('all');
    } else {
      switchCorridor('freight-all');
    }
  });

  // Knop: Live Spoorwebcams / Railcams in de bovenbalk & op kaart
  document.getElementById('btnHeaderRailcams')?.addEventListener('click', () => {
    openRailcamModal(appState.activeRailcamId || 'twello');
  });

  document.getElementById('btnMapRailcamsToggle')?.addEventListener('click', () => {
    openRailcamModal(appState.activeRailcamId || 'twello');
  });

  document.getElementById('btnCloseRailcamModal')?.addEventListener('click', () => {
    closeRailcamModal();
  });

  document.getElementById('railcamModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'railcamModal') {
      closeRailcamModal();
    }
  });

  // Stop Live Volgen knoppen
  document.getElementById('btnStopLiveFollow')?.addEventListener('click', () => {
    stopFollowingTrain();
  });
  document.getElementById('btnHudClose')?.addEventListener('click', () => {
    stopFollowingTrain();
  });

  // Snelle traject-knoppen (chips)
  document.querySelectorAll('.rp-chip-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const from = e.currentTarget.getAttribute('data-from');
      const to = e.currentTarget.getAttribute('data-to');
      if (from && to) {
        const fromSel = document.getElementById('routeFromSelect');
        const toSel = document.getElementById('routeToSelect');
        if (fromSel) fromSel.value = from;
        if (toSel) toSel.value = to;
        applyCustomRoute(from, to);
      }
    });
  });

  // Direct live updaten bij selectie en direct opslaan
  document.getElementById('routeFromSelect')?.addEventListener('change', () => {
    const fromVal = document.getElementById('routeFromSelect')?.value;
    const toVal = document.getElementById('routeToSelect')?.value;
    if (fromVal) {
      try { localStorage.setItem('treinen_last_from', fromVal); } catch (e) {}
    }
    if (fromVal && toVal && fromVal.toLowerCase() !== toVal.toLowerCase()) {
      applyCustomRoute(fromVal, toVal);
    }
  });

  document.getElementById('routeToSelect')?.addEventListener('change', () => {
    const fromVal = document.getElementById('routeFromSelect')?.value;
    const toVal = document.getElementById('routeToSelect')?.value;
    if (toVal) {
      try { localStorage.setItem('treinen_last_to', toVal); } catch (e) {}
    }
    if (fromVal && toVal && fromVal.toLowerCase() !== toVal.toLowerCase()) {
      applyCustomRoute(fromVal, toVal);
    }
  });

  // Label Density Knop op Kaart (Anti-Chaos toggle)
  document.getElementById('btnToggleLabelDensity')?.addEventListener('click', () => {
    toggleLabelDensity();
  });
  // =============================================================
  // Weergave Wisselaar: Strikt 'map' (alleen satelliet) OF 'list' (alleen treinen op station)
  // Geen split weergave zodat er nooit een station (zoals Buitenpost) onder de kaart blijft hangen
  // =============================================================
  // 11b. Responsieve Weergave Schakelaar (Smartphones, iPads & Laptops)
  // =============================================================
  const isDesktopScreen = () => window.innerWidth >= 1024;
  let currentAppViewMode = isDesktopScreen() ? 'split' : 'list';

  window.setAppViewMode = function(mode) {
    const isDesktop = isDesktopScreen();
    let effectiveMode = mode;
    if (!effectiveMode) {
      effectiveMode = isDesktop ? 'split' : 'list';
    }
    currentAppViewMode = effectiveMode;
    const layout = document.getElementById('mainLayout');
    const btnSplit = document.getElementById('btnHeaderSplit');
    const peekText = document.getElementById('corridorMapPeekText');
    const btnFloating = document.getElementById('btnFloatingExpandPanel');
    if (!layout) return;

    layout.classList.remove('view-list', 'view-map', 'view-split', 'panel-collapsed');

    if (effectiveMode === 'map') {
      // Modus 1: ALLEEN DE SATELLIETBEELDEN (schermvullend)
      layout.classList.add('view-map');
      if (btnSplit) {
        btnSplit.innerHTML = '<span class="btn-icon">📋</span><span class="btn-label-text">Treinen</span>';
        btnSplit.classList.add('active');
        btnSplit.setAttribute('title', isDesktop ? 'Toon split view (treinen & kaart naast elkaar)' : 'Schakel terug naar treinen op station');
      }
      if (btnFloating) {
        btnFloating.style.display = 'inline-flex';
        btnFloating.innerHTML = '<span>📋 Lijnoverzicht</span>';
      }
      if (peekText) {
        peekText.textContent = '📋 Terug naar treinenlijst';
      }
    } else if (effectiveMode === 'split') {
      // Modus 2: SPLIT SCREEN (Laptops & iPads: Treinen links, Satellietkaart rechts)
      layout.classList.add('view-split');
      if (btnSplit) {
        btnSplit.innerHTML = '<span class="btn-icon">🛰️</span><span class="btn-label-text">Alleen Kaart</span>';
        btnSplit.classList.remove('active');
        btnSplit.setAttribute('title', 'Maximaliseer satellietkaart naar volledig scherm');
      }
      if (btnFloating) {
        btnFloating.style.display = 'none';
      }
      if (peekText) {
        peekText.textContent = '🛰️ Maximaliseer satellietkaart ▲';
      }
    } else {
      // Modus 3: ALLEEN DE TREINEN OP EEN STATION (schermvullend)
      layout.classList.add('view-list');
      if (btnSplit) {
        btnSplit.innerHTML = '<span class="btn-icon">🛰️</span><span class="btn-label-text">Kaart</span>';
        btnSplit.classList.remove('active');
        btnSplit.setAttribute('title', isDesktop ? 'Toon split view (treinen & kaart)' : 'Toon alleen de satellietbeelden');
      }
      if (btnFloating) {
        btnFloating.style.display = 'none';
      }
      if (peekText) {
        peekText.textContent = '🛰️ Toon satellietkaart ▲';
      }
    }

    // Sync eventuele verborgen mobiele weergaveknoppen
    document.querySelectorAll('.mobile-view-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-view') === effectiveMode);
    });

    // Sync actieve tab in de linker sidebar
    document.querySelectorAll('.sidebar-tab-btn[data-view]').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-view') === effectiveMode);
    });

    // Ververs Leaflet kaartafmetingen na CSS layout-transitie
    if (appState.map) {
      setTimeout(() => appState.map.invalidateSize(), 150);
    }
  };

  // Klik op compacte Kaart-knop bovenaan: wisselt vloeiend tussen weergaves afgestemd op apparaat
  document.getElementById('btnHeaderSplit')?.addEventListener('click', () => {
    const isDesktop = isDesktopScreen();
    if (isDesktop) {
      if (currentAppViewMode === 'split') {
        window.setAppViewMode('map');
      } else if (currentAppViewMode === 'map') {
        window.setAppViewMode('list');
      } else {
        window.setAppViewMode('split');
      }
    } else {
      if (currentAppViewMode === 'list') {
        window.setAppViewMode('map');
      } else {
        window.setAppViewMode('list');
      }
    }
  });

  // Klik op de uitklapbalk onderaan het lijnoverzicht
  document.getElementById('btnCorridorExpandMap')?.addEventListener('click', () => {
    window.setAppViewMode('map');
  });

  // Ondersteun ook mobiele weergaveknoppen
  document.querySelectorAll('.mobile-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const viewMode = e.currentTarget.getAttribute('data-view') || 'split';
      window.setAppViewMode(viewMode);
    });
  });

  // =============================================================
  // 11c. Draggable Splitter (Interactief schaalbaar tussen Lijn & Kaart)
  // =============================================================
  function initLayoutResizer() {
    const resizer = document.getElementById('layoutResizer');
    const corridor = document.querySelector('.corridor-panel');
    const layout = document.getElementById('mainLayout');
    if (!resizer || !corridor || !layout) return;

    // Herstel eerder gekozen paneelbreedte van localStorage
    try {
      const savedWidth = localStorage.getItem('treinen_corridor_width');
      if (savedWidth && window.innerWidth >= 1024) {
        const parsed = parseInt(savedWidth, 10);
        const minW = 280;
        const maxW = Math.min(window.innerWidth * 0.75, 850);
        if (parsed >= minW && parsed <= maxW) {
          document.documentElement.style.setProperty('--corridor-width', `${parsed}px`);
        }
      }
    } catch (e) {}

    let isDragging = false;
    let startX = 0;
    let startWidth = 0;

    function onPointerDown(e) {
      if (window.innerWidth < 900) return;
      if (layout.classList.contains('view-map') || layout.classList.contains('view-list')) return;

      isDragging = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      startWidth = corridor.getBoundingClientRect().width;
      resizer.classList.add('is-dragging');
      corridor.classList.add('is-resizing');
      layout.classList.add('is-resizing');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      window.addEventListener('pointermove', onPointerMove, { passive: false });
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
      e.preventDefault();
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = clientX - startX;
      const minW = 280;
      const maxW = Math.min(window.innerWidth * 0.75, 850);
      const newWidth = Math.max(minW, Math.min(maxW, Math.round(startWidth + deltaX)));

      document.documentElement.style.setProperty('--corridor-width', `${newWidth}px`);

      if (appState.map) {
        appState.map.invalidateSize();
      }
      e.preventDefault();
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      resizer.classList.remove('is-dragging');
      corridor.classList.remove('is-resizing');
      layout.classList.remove('is-resizing');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);

      const finalWidth = corridor.getBoundingClientRect().width;
      try {
        localStorage.setItem('treinen_corridor_width', `${Math.round(finalWidth)}`);
      } catch (e) {}

      if (appState.map) {
        setTimeout(() => appState.map.invalidateSize(), 50);
      }
    }

    resizer.addEventListener('pointerdown', onPointerDown);

    // Dubbelklik op resizer om terug te keren naar de standaardbreedte (420px)
    resizer.addEventListener('dblclick', () => {
      const defaultW = 420;
      document.documentElement.style.setProperty('--corridor-width', `${defaultW}px`);
      try {
        localStorage.setItem('treinen_corridor_width', `${defaultW}`);
      } catch (e) {}
      if (appState.map) {
        setTimeout(() => appState.map.invalidateSize(), 50);
      }
    });
  }

  initLayoutResizer();

  // Schermrotatie & Resize optimalisatie voor iPads, laptops en telefoons
  window.addEventListener('resize', () => {
    if (appState.map) appState.map.invalidateSize();
  });
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      if (appState.map) appState.map.invalidateSize();
    }, 200);
  });

  // Aparte Knoppen: Op tijd, Vertraagd, Pech & Lijnoverzicht
  document.querySelectorAll('.status-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.status-filter-btn').forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');

      const filter = target.getAttribute('data-filter');
      appState.activeStatusFilter = filter;

      updateLineOverview();
      playAuthenticNSChime();
    });
  });

  // Categorie Tabs
  document.querySelectorAll('.cat-tab-btn').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const cat = e.currentTarget.getAttribute('data-category');
      if (cat === 'all') {
        switchCorridor('all');
      } else {
        const first = Object.values(CORRIDORS).find(c => c.category === cat);
        if (first) {
          switchCorridor(first.id);
        }
      }
    });
  });

  // Live GPS Knoppen: Ik zit in de trein (vind exacte trein via GPS)
  document.getElementById('btnFindMyTrain')?.addEventListener('click', () => findMyTrain());
  document.getElementById('btnImInTrainPlanner')?.addEventListener('click', () => findMyTrain());
  document.getElementById('btnFloatingFindTrain')?.addEventListener('click', () => findMyTrain());

  // Knop: Handmatig geforceerd live verversen van de info
  document.getElementById('btnForceRefresh')?.addEventListener('click', () => forceRefreshTrains());

  // iPhone Bottom Quick Dock Knoppen (Speciaal voor éénhands duimbediening op de smartphone)
  document.getElementById('btnDockInTrain')?.addEventListener('click', () => findMyTrain());
  document.getElementById('btnDockPlanner')?.addEventListener('click', () => {
    const bar = document.getElementById('routePlannerBar');
    if (bar) {
      const willShow = bar.style.display === 'none';
      bar.style.display = willShow ? 'block' : 'none';
      document.getElementById('btnToggleRoutePlanner')?.classList.toggle('active', willShow);
      if (willShow) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  });
  document.getElementById('btnDockRefresh')?.addEventListener('click', () => forceRefreshTrains());
  document.getElementById('btnDockMap')?.addEventListener('click', () => {
    const layout = document.getElementById('mainLayout');
    if (layout) {
      layout.classList.remove('view-list', 'view-split');
      layout.classList.add('view-map');
      document.querySelectorAll('.mobile-view-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-view') === 'map');
      });
      if (appState.map) {
        setTimeout(() => appState.map.invalidateSize(), 100);
      }
    }
  });
  document.getElementById('btnDockComm')?.addEventListener('click', () => {
    const screen = document.getElementById('commScreen');
    if (screen) {
      screen.style.display = 'flex';
      appState.commUnreadCount = 0;
      const badge = document.getElementById('commUnreadBadge');
      if (badge) badge.style.display = 'none';
    }
  });

  // Sluit Mijn Trein Modal
  document.getElementById('btnCloseMyTrain')?.addEventListener('click', () => {
    const modal = document.getElementById('myTrainModal');
    if (modal) modal.style.display = 'none';
  });

  // Handmatige lijnkeuze bij afgeschermde GPS / ontbrekende browser permissie
  document.getElementById('btnGpsHelpPickLine')?.addEventListener('click', () => {
    const modal = document.getElementById('myTrainModal');
    if (modal) modal.style.display = 'none';
    const bar = document.getElementById('routePlannerBar');
    const btn = document.getElementById('btnToggleRoutePlanner');
    if (bar) bar.style.display = 'block';
    if (btn) btn.classList.add('active');
    document.getElementById('routeFromSelect')?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Centreer op Kaart
  document.getElementById('btnCenterMyTrain')?.addEventListener('click', () => {
    const modal = document.getElementById('myTrainModal');
    if (modal) modal.style.display = 'none';
    if (window.setAppViewMode) {
      window.setAppViewMode('map');
    }
    if (appState.myTrain) {
      appState.map.flyTo([appState.myTrain.lat, appState.myTrain.lon], 16, { duration: 1.0 });
    }
  });

  // Live Meereizen Toggle (in modal)
  document.getElementById('btnFollowMyTrain')?.addEventListener('click', () => {
    const btn = document.getElementById('btnFollowMyTrain');
    const hudFollowBtn = document.getElementById('btnHudFollowToggle');
    appState.isFollowingMyTrain = !appState.isFollowingMyTrain;

    if (btn) btn.classList.toggle('active', appState.isFollowingMyTrain);
    if (hudFollowBtn) hudFollowBtn.classList.toggle('active', appState.isFollowingMyTrain);

    const textEl = document.getElementById('followText');
    const iconEl = document.getElementById('followIcon');
    if (textEl) textEl.textContent = appState.isFollowingMyTrain ? '📡 Meereizen Actief' : 'Live Meereizen op Satelliet';
    if (iconEl) iconEl.textContent = appState.isFollowingMyTrain ? '🟢' : '📡';

    if (appState.isFollowingMyTrain && appState.lastGpsFix && appState.map) {
      appState.map.panTo([appState.lastGpsFix.lat, appState.lastGpsFix.lon], { animate: true, duration: 1.0 });
    }
  });

  // Live Trein Cockpit HUD Knoppen
  document.getElementById('btnHudFollowToggle')?.addEventListener('click', () => {
    appState.isFollowingMyTrain = !appState.isFollowingMyTrain;
    const hudBtn = document.getElementById('btnHudFollowToggle');
    const modalFollowBtn = document.getElementById('btnFollowMyTrain');
    if (hudBtn) hudBtn.classList.toggle('active', appState.isFollowingMyTrain);
    if (modalFollowBtn) modalFollowBtn.classList.toggle('active', appState.isFollowingMyTrain);

    if (appState.isFollowingMyTrain && appState.lastGpsFix && appState.map) {
      appState.map.panTo([appState.lastGpsFix.lat, appState.lastGpsFix.lon], { animate: true, duration: 1.0 });
    }
  });

  document.getElementById('btnHudOpenDetails')?.addEventListener('click', () => {
    const modal = document.getElementById('myTrainModal');
    if (modal) modal.style.display = 'flex';
  });

  document.getElementById('btnHudClose')?.addEventListener('click', () => {
    stopLiveTrainTracking();
  });

  // 1-Tap "Zit u in de trein?" Banner bovenaan
  document.getElementById('btnBannerDetectTrain')?.addEventListener('click', () => {
    detectAndShowMyTrain(true);
  });

  // NS Gong knop
  document.getElementById('btnPlayChime')?.addEventListener('click', () => {
    playAuthenticNSChime();
  });

  // Geluid aan/uit
  document.getElementById('btnAudioToggle')?.addEventListener('click', () => {
    appState.soundEnabled = !appState.soundEnabled;
    const btn = document.getElementById('btnAudioToggle');
    btn?.classList.toggle('active', appState.soundEnabled);
    const audioText = document.getElementById('audioStatusText');
    if (audioText) audioText.textContent = appState.soundEnabled ? '🔊' : '🔇';
    if (appState.soundEnabled) playAuthenticNSChime();
  });

  // Lijnoverzicht minimaliseren en uitklappen (voor iPad, iPhone en laptops)
  function toggleCorridorPanel(forceState) {
    const layout = document.getElementById('mainLayout');
    const btnToggle = document.getElementById('btnToggleCorridorPanel');
    const btnFloating = document.getElementById('btnFloatingExpandPanel');
    if (!layout) return;

    const shouldCollapse = forceState !== undefined ? forceState : !layout.classList.contains('panel-collapsed');

    if (shouldCollapse) {
      layout.classList.add('panel-collapsed');
      if (btnToggle) btnToggle.textContent = '▶ Uitklappen';
      if (btnFloating) btnFloating.style.display = 'inline-flex';
    } else {
      layout.classList.remove('panel-collapsed');
      if (btnToggle) btnToggle.textContent = '◀ Minimaliseer';
      if (btnFloating) btnFloating.style.display = 'none';
    }

    if (appState.map) {
      setTimeout(() => appState.map.invalidateSize(), 220);
    }
  }

  document.getElementById('btnToggleCorridorPanel')?.addEventListener('click', () => {
    toggleCorridorPanel();
  });

  document.getElementById('btnFloatingExpandPanel')?.addEventListener('click', () => {
    window.setAppViewMode('list');
  });

  // Station Vertrekstaat Modal Sluiten
  document.getElementById('btnCloseStationModal')?.addEventListener('click', () => {
    const modal = document.getElementById('stationModal');
    if (modal) modal.style.display = 'none';
  });

  // Sluit Station Modal bij tikken op de donkere achtergrond (buiten de dialog)
  document.getElementById('stationModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'stationModal') {
      e.target.style.display = 'none';
    }
  });

  // Zoom in op Station op de Satellietkaart
  document.getElementById('btnZoomStationMap')?.addEventListener('click', () => {
    const modal = document.getElementById('stationModal');
    if (modal) modal.style.display = 'none';

    if (appState.activeStation && appState.map) {
      // Schakel op mobiel/iPad naar satellietkaart indien nodig
      const layout = document.getElementById('mainLayout');
      if (layout && layout.classList.contains('view-list')) {
        if (window.setAppViewMode) {
          window.setAppViewMode('map');
        } else {
          layout.classList.remove('view-list');
          layout.classList.add('view-map');
          setTimeout(() => appState.map?.invalidateSize(), 100);
        }
      }
      appState.map.flyTo([appState.activeStation.lat, appState.activeStation.lon], 15, { duration: 1.2 });
    }
  });

  // Live Communicatiescherm Knoppen
  document.getElementById('btnOpenCommScreen')?.addEventListener('click', () => {
    window.openCommScreen();
  });
  document.getElementById('btnFloatingComm')?.addEventListener('click', () => {
    window.openCommScreen();
  });

  // Sluit Communicatiemodal
  document.getElementById('btnCloseCommModal')?.addEventListener('click', () => {
    const modal = document.getElementById('commModal');
    if (modal) modal.style.display = 'none';
  });

  document.getElementById('commModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'commModal') {
      e.target.style.display = 'none';
    }
  });

  // Communicatie Audio Toggle
  document.getElementById('btnCommSoundToggle')?.addEventListener('click', () => {
    appState.commSoundEnabled = !appState.commSoundEnabled;
    const btn = document.getElementById('btnCommSoundToggle');
    const icon = document.getElementById('commSoundIcon');
    if (btn) btn.classList.toggle('active', appState.commSoundEnabled);
    if (icon) icon.textContent = appState.commSoundEnabled ? '🔊' : '🔇';
    if (appState.commSoundEnabled) playAuthenticRadioBeep();
  });

  // Communicatie Filterknoppen
  document.querySelectorAll('.comm-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.comm-filter-btn').forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      appState.commActiveFilter = target.getAttribute('data-filter');
      renderCommMessages();
    });
  });

  // Wis Communicatielog
  document.getElementById('btnClearCommLog')?.addEventListener('click', () => {
    appState.commMessages = [];
    updateCommCounters();
    renderCommMessages();
  });

  // ESC toets sluit modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const commModal = document.getElementById('commModal');
      if (commModal) commModal.style.display = 'none';
      const stModal = document.getElementById('stationModal');
      if (stModal) stModal.style.display = 'none';
      const myTrainModal = document.getElementById('myTrainModal');
      if (myTrainModal) myTrainModal.style.display = 'none';
      const helpModal = document.getElementById('helpModal');
      if (helpModal) helpModal.style.display = 'none';
    }
  });

  // Zoekveld
  document.getElementById('trainSearchInput')?.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    if (q.length >= 2) {
      const match = getActiveParsedTrains().find(t => t && (t.trainNum.includes(q) || t.operator.code.toLowerCase().includes(q.toLowerCase())));
      if (match) {
        window.selectTrain(match.id);
      }
    }
  });
}

// =============================================================
// 12. Versiebeheer & Automatische Live Updates
// =============================================================
const APP_VERSION = '2.9.8';
const APP_BUILD_COMMIT = '8854d5a';
let appBuildMeta = { version: APP_VERSION, commit: APP_BUILD_COMMIT, buildTime: '' };

async function initVersionManagement() {
  async function forcePurgeAndReload() {
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          await reg.unregister();
        }
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
    } catch (e) {
      console.warn('Fout bij leegmaken cache:', e);
    }
    const cleanUrl = window.location.href.split('?')[0];
    window.location.replace(`${cleanUrl}?v=${Date.now()}`);
  }
  window.forcePurgeAndReload = forcePurgeAndReload;

  async function checkVersion(isAuto = true) {
    try {
      const res = await fetch(`./version.json?_t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        appBuildMeta = data;
        const serverVersion = data.version || APP_VERSION;
        const serverCommit = data.commit || '';
        const verStr = `v${serverVersion}`;
        const commitStr = serverCommit ? ` (${serverCommit})` : '';

        const badge = document.getElementById('appVersionBadge');
        if (badge) {
          badge.innerHTML = `<span>${verStr}</span> <span class="badge-refresh-icon">🔄</span>`;
          badge.title = `Gele versieknop: Treinen ${verStr}${commitStr} - Tik om cache te wissen & direct te herladen`;
        }

        const footerVer = document.getElementById('footerVersionText');
        if (footerVer) {
          footerVer.textContent = `${verStr}${commitStr}`;
        }

        // Bepaal of er een nieuwere versie of commit op de server staat
        const isNewCommit = serverCommit && serverCommit !== 'latest' && serverCommit !== APP_BUILD_COMMIT;
        const isNewVersion = serverVersion && serverVersion !== APP_VERSION;

        if (isNewCommit || isNewVersion) {
          console.log(`🚀 Nieuwe versie beschikbaar: v${serverVersion} (${serverCommit}) vs lokaal ${APP_VERSION} (${APP_BUILD_COMMIT})`);

          // Cooldown check ter voorkoming van reload-loop
          const lastReload = parseInt(sessionStorage.getItem('treinen_last_auto_reload') || '0', 10);
          if (Date.now() - lastReload > 5000) {
            sessionStorage.setItem('treinen_last_auto_reload', Date.now());

            const banner = document.getElementById('updateBanner');
            if (banner) {
              banner.style.display = 'block';
              const text = document.getElementById('updateBannerText');
              if (text) {
                text.innerHTML = `<strong>Nieuwe versie v${serverVersion} (${serverCommit}) gedetecteerd!</strong> Bezig met automatisch verversen...`;
              }
            }

            // Automatisch verversen naar de nieuwste versie
            setTimeout(() => {
              forcePurgeAndReload();
            }, 500);
            return;
          }
        }
      }
    } catch (e) {
      console.warn('Versiecheck niet beschikbaar:', e);
    }
  }
  checkVersionGlobal = checkVersion;

  // Update Reload knoppen
  document.getElementById('btnReloadUpdate')?.addEventListener('click', () => {
    sessionStorage.removeItem('dismissed_version');
    forcePurgeAndReload();
  });

  document.getElementById('btnDismissUpdate')?.addEventListener('click', () => {
    const banner = document.getElementById('updateBanner');
    if (banner) banner.style.display = 'none';
  });

  // Klik op de gele versietag wist direct de cache en herlaadt de pagina
  document.getElementById('appVersionBadge')?.addEventListener('click', () => {
    playAuthenticNSChime();
    showFeedbackToast('🚀 Cache wissen & app direct herladen...', 'info');
    setTimeout(() => {
      forcePurgeAndReload();
    }, 350);
  });

  // Controleer direct bij het laden
  checkVersion();

  // Automatisch direct controleren wanneer de gebruiker terugkeert naar Safari/browser tab
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      checkVersion();
    }
  });

  window.addEventListener('focus', () => {
    checkVersion();
  });

  // Periodiek elke 15 seconden op de achtergrond
  setInterval(checkVersion, 15000);
}

// =============================================================
// 12b. Help & Handleiding Modal (zoals in vroonphoto)
// =============================================================
function openHelpModal() {
  const modal = document.getElementById('helpModal');
  if (!modal) return;
  modal.style.display = 'flex';
  renderDynamicHelpFeatures();

  const verStr = `v${appBuildMeta.version || APP_VERSION}`;
  const commitStr = appBuildMeta.commit || APP_BUILD_COMMIT;
  const badge = document.getElementById('helpModalVersionBadge');
  if (badge) badge.textContent = commitStr ? `${verStr} (${commitStr})` : verStr;

  const footerBuild = document.getElementById('helpFooterBuildInfo');
  if (footerBuild) {
    const timeStr = appBuildMeta.buildTime ? new Date(appBuildMeta.buildTime).toLocaleString('nl-NL') : 'Actueel';
    footerBuild.innerHTML = `Treinen Radar &bull; Versie <strong>${verStr}</strong> &bull; Build: ${timeStr}`;
  }
}

function closeHelpModal() {
  const modal = document.getElementById('helpModal');
  if (modal) modal.style.display = 'none';
}

function renderDynamicHelpFeatures() {
  const container = document.getElementById('helpFeaturesDynamicList');
  if (!container) return;

  const fallbackFeatures = [
    {
      tag: "60 FPS Animatie",
      title: "Continue 60 FPS Dead-Reckoning Treinanimatie",
      desc: "Treinen rijden vloeiend en schokvrij over het spoor op ware GPS-snelheid met bochtentolerantie.",
      icon: "⚡"
    },
    {
      tag: "Tegentreinen",
      title: "Automatische Tegentrein & Richting Herkenning",
      desc: "Onderscheid tussen heenritten (➔ goud) en tegentreinen (⬅ cyaanblauw) met gespiegelde voortgang.",
      icon: "🔄"
    },
    {
      tag: "Traject Planner",
      title: "Slimme Trajectkiezer (Van ➔ Tot) met Geheugen",
      desc: "Onthoudt automatisch het laatst gekozen station met snelle wisselknop en directe traject-filters.",
      icon: "🎯"
    },
    {
      tag: "In Trein",
      title: "Live Cockpit HUD & Automatische Treindetectie",
      desc: "Vind direct uw trein via mobiele GPS inclusief live snelheid, volgend station en resterende reistijd.",
      icon: "📱"
    },
    {
      tag: "Alle Maatschappijen",
      title: "Landelijke Status (NS, Arriva, Qbuzz, Keolis, e.a.)",
      desc: "1 centraal overzicht van alle vervoerders met filters voor op tijd, vertraagd en pech/defect.",
      icon: "🟢"
    },
    {
      tag: "Satelliet",
      title: "Haarscherpe Satellietbeelden & Sporenkaart",
      desc: "Gedetailleerde satelliet-infrastructuur met wissels, perrons en minimalistische donkere stationspillen.",
      icon: "🛰️"
    },
    {
      tag: "GSM-R Radio",
      title: "Live Vervoersinformatie & Verkeersleiding",
      desc: "Real-time spoorwegcommunicatie en storingsberichten rechtstreeks vanuit de ProRail verkeersleiding.",
      icon: "📻"
    },
    {
      tag: "Stationsgong",
      title: "Akoestische 3-Tonige NS Stationsgong",
      desc: "Natuurgetrouwe audiogong bij stationsaankomsten en handmatige audiobediening.",
      icon: "🔔"
    }
  ];

  const features = (appBuildMeta && Array.isArray(appBuildMeta.features) && appBuildMeta.features.length > 0)
    ? appBuildMeta.features
    : fallbackFeatures;

  container.innerHTML = features.map(item => `
    <div class="help-dynamic-card">
      <div class="help-dynamic-top">
        <div class="help-dynamic-icon-title">
          <span class="help-dynamic-icon">${item.icon || '✨'}</span>
          <h5>${item.title}</h5>
        </div>
        <span class="help-dynamic-tag">${item.tag || 'Actief'}</span>
      </div>
      <p>${item.desc}</p>
    </div>
  `).join('');
}

function initHelpModal() {
  document.getElementById('btnOpenHelp')?.addEventListener('click', openHelpModal);
  document.getElementById('btnCloseHelpModal')?.addEventListener('click', closeHelpModal);
  document.getElementById('btnCloseHelpFooter')?.addEventListener('click', closeHelpModal);

  document.getElementById('helpModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'helpModal' || e.target.classList.contains('help-backdrop')) {
      closeHelpModal();
    }
  });
}

// =============================================================
// 12c. Universeel Hoofdmenu & Navigatie (iPad, iPhone, Laptop)
// =============================================================
function openNavMenu() {
  const modal = document.getElementById('appNavMenuModal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.getElementById('btnOpenNavMenu')?.classList.add('active');

  const verStr = `v${appBuildMeta.version || APP_VERSION}`;
  const commitStr = appBuildMeta.commit || APP_BUILD_COMMIT;
  const tag = document.getElementById('navMenuVersionTag');
  if (tag) {
    tag.innerHTML = `ProRail Live Radar &bull; Universeel Menu <strong>${verStr}</strong>${commitStr ? ` (${commitStr})` : ''}`;
  }

  // Update live treinenaantal en actieve modus in het menu
  const count = appState.allLiveFeatures ? appState.allLiveFeatures.length : 0;
  const summaryEl = document.getElementById('navLiveTrainsSummary');
  if (summaryEl) {
    summaryEl.textContent = count > 0 ? `${count} treinen live op het spoor` : 'Radar Online • Live Telemetrie';
  }

  const badgeEl = document.getElementById('navActiveViewBadge');
  if (badgeEl) {
    const layout = document.getElementById('mainLayout');
    let currentMode = 'Satelliet';
    if (layout?.classList.contains('view-split')) currentMode = 'Split Screen';
    else if (layout?.classList.contains('view-list')) currentMode = 'Treinenlijst';
    badgeEl.textContent = currentMode;
  }
}

function closeNavMenu() {
  const modal = document.getElementById('appNavMenuModal');
  if (modal) modal.style.display = 'none';
  document.getElementById('btnOpenNavMenu')?.classList.remove('active');
}

function initNavMenu() {
  const modal = document.getElementById('appNavMenuModal');
  const btnOpen = document.getElementById('btnOpenNavMenu');
  const btnDock = document.getElementById('btnDockMenu');
  const btnClose = document.getElementById('btnCloseNavMenu');
  const btnCloseFooter = document.getElementById('btnCloseNavMenuFooter');
  const backdrop = document.getElementById('navMenuBackdrop');

  btnOpen?.addEventListener('click', () => {
    if (modal && modal.style.display === 'flex') {
      closeNavMenu();
    } else {
      openNavMenu();
    }
  });

  btnDock?.addEventListener('click', openNavMenu);
  btnClose?.addEventListener('click', closeNavMenu);
  btnCloseFooter?.addEventListener('click', closeNavMenu);
  backdrop?.addEventListener('click', closeNavMenu);

  modal?.addEventListener('click', (e) => {
    if (e.target.id === 'appNavMenuModal') {
      closeNavMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
      closeNavMenu();
    }
  });

  // Koppel alle menu interactieve kaarten
  const navButtons = modal?.querySelectorAll('[data-nav]');
  navButtons?.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-nav');
      closeNavMenu();

      switch (target) {
        case 'view-map':
          if (window.setAppViewMode) window.setAppViewMode('map');
          break;
        case 'view-list':
          if (window.setAppViewMode) window.setAppViewMode('list');
          break;
        case 'view-split':
          if (window.setAppViewMode) window.setAppViewMode('split');
          break;
        case 'in-train':
          findMyTrain();
          break;
        case 'custom-route':
          const bar = document.getElementById('routePlannerBar');
          const toggleBtn = document.getElementById('btnToggleRoutePlanner');
          if (bar) {
            bar.style.display = 'block';
            toggleBtn?.classList.add('active');
            document.getElementById('routeFromSelect')?.focus();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (appState.map) {
              setTimeout(() => appState.map.invalidateSize(), 80);
            }
          }
          break;
        case 'force-refresh':
          forceRefreshTrains();
          break;
        case 'freight':
          switchCorridor('freight-all');
          if (window.setAppViewMode) window.setAppViewMode('map');
          break;
        case 'railcams':
          openRailcamModal(appState.activeRailcamId || 'twello');
          break;
        case 'corridor-all':
          switchCorridor('all');
          if (window.setAppViewMode) window.setAppViewMode('map');
          break;
        case 'layer-dark':
          switchLayer('dark');
          break;
        case 'comm':
          if (window.openCommScreen) window.openCommScreen();
          break;
        case 'help':
          openHelpModal();
          break;
        case 'reload-cache':
          window.location.reload(true);
          break;
      }
    });
  });
  // =============================================================
  // 12d. Vaste Linker Sidebar met Navigatietabs (Permanent)
  // =============================================================
  function initSidebarTabs() {
    function updateSidebarStatus() {
      const textEl = document.getElementById('sidebarFooterTrainsText');
      if (textEl) {
        const count = appState.allLiveFeatures ? appState.allLiveFeatures.length : 0;
        textEl.textContent = count > 0 ? `${count} treinen live` : 'Radar Live Online';
      }
    }

    // Koppel weergave tabs (Satellietkaart, Treinenlijst, Gesplitst Scherm)
    document.querySelectorAll('.sidebar-tab-btn[data-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        if (window.setAppViewMode) {
          window.setAppViewMode(view);
        }
      });
    });

    setInterval(updateSidebarStatus, 4500);
    setTimeout(updateSidebarStatus, 1200);
  }

  initSidebarTabs();
}

// =============================================================
// 13. Start Applicatie
// =============================================================
async function init() {
  initMap();
  startRailMotionEngine();
  setupNavigation();
  const defaultMode = (window.innerWidth >= 1024) ? 'split' : 'list';
  window.setAppViewMode(defaultMode);
  initCommunicationEngine();
  initVersionManagement();
  initHelpModal();
  initNavMenu();

  populateLineButtons('ns');
  // Start direct met het laatst opgezochte Van ➔ Tot traject (zodat de keuze voor Tot behouden blijft als standaard)
  let initialFrom = 'BP';
  let initialTo = 'LW';
  try {
    const lsFrom = localStorage.getItem('treinen_last_from');
    const lsTo = localStorage.getItem('treinen_last_to');
    if (lsFrom) initialFrom = lsFrom;
    if (lsTo) initialTo = lsTo;
  } catch (e) {}
  applyCustomRoute(initialFrom, initialTo);

  await appState.bridge.loadWasm('./treinen.wasm');

  const initStartTime = Date.now();
  let firstPollDone = false;
  const startupTimer = setInterval(() => {
    if (firstPollDone) {
      clearInterval(startupTimer);
      return;
    }
    const sec = Math.max(1, Math.round((Date.now() - initStartTime) / 1000));
    const statusText = document.getElementById('statusText');
    if (statusText) statusText.textContent = `⏱️ Verbinden met NDOV Loket... (${sec}s / ~3s)`;
  }, 1000);

  async function poll() {
    try {
      const data = await fetchLiveTrains();
      if (data && data.features) {
        if (!firstPollDone) {
          firstPollDone = true;
          clearInterval(startupTimer);
          const loadSec = ((Date.now() - initStartTime) / 1000).toFixed(1);
          showFeedbackToast(`✓ ${data.features.length} treinen geladen in ${loadSec}s`, 'success');
        }
        appState.allLiveFeatures = data.features;
        updateLineOverview();

        // Werk live naderende treinen bij als de railcam speler openstaat
        const rModal = document.getElementById('railcamModal');
        if (rModal && rModal.style.display !== 'none' && appState.activeRailcamId) {
          const activeCam = RAILCAMS.find(c => c.id === appState.activeRailcamId);
          if (activeCam) updateRailcamRadarApproaching(activeCam);
        }

        // Directe re-evaluatie van Mijn Trein bij binnenkomende telemetrie-updates
        if (appState.isTrackingUser && appState.lastGpsFix) {
          onLiveLocationFix({
            coords: {
              latitude: appState.lastGpsFix.lat,
              longitude: appState.lastGpsFix.lon,
              accuracy: appState.lastGpsFix.acc || 15,
              speed: (appState.lastGpsFix.speed !== null && appState.lastGpsFix.speed !== undefined ? appState.lastGpsFix.speed / 3.6 : null),
              heading: appState.lastGpsFix.heading
            }
          });
        }
      }
    } catch (e) {
      console.warn('Poll waarschuwing:', e);
    }
    setTimeout(poll, 4500);
  }

  poll();

  // Automatische detectie bij opening als de reiziger dat wil
  const chkAuto = document.getElementById('chkAutoDetectOnOpen');
  const autoDetect = localStorage.getItem('treinen_auto_detect_in_train') === 'true';
  if (chkAuto) {
    chkAuto.checked = autoDetect;
    chkAuto.addEventListener('change', () => {
      localStorage.setItem('treinen_auto_detect_in_train', chkAuto.checked ? 'true' : 'false');
    });
  }

  // Als automatische detectie bij openen is ingeschakeld: direct de trein detecteren en alle gegevens tonen!
  if (autoDetect) {
    setTimeout(() => {
      detectAndShowMyTrain(true);
    }, 1000);
  }
}

window.addEventListener('DOMContentLoaded', init);

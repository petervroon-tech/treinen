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
  'enschede-denhaag': {
    id: 'enschede-denhaag',
    category: 'ns',
    name: 'Enschede ➔ Amersfoort ➔ Utrecht ➔ Den Haag Centraal',
    shortName: 'Enschede ➔ Den Haag',
    badge: 'IC',
    operator: 'NS Reizigers',
    primaryOpKey: 'ns',
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
    seriesPattern: /^(5|7|18)\d{2}$/,
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
    seriesPattern: /^(10|12|22)\d{1}$/,
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
    name: 'Waalhaven ➔ Kijfhoek ➔ Utrecht Goederen ➔ Deventer ➔ Hengelo ➔ Bad Bentheim',
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
      { code: 'DVG',  name: 'Deventer Goederenspoor', lat: 52.2575, lon: 6.1606, terminal: false, sporen: 'Goederen' },
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
  trainMarkers: new Map(),
  soundEnabled: true,
  audioCtx: null,
  allLiveFeatures: [],
  lastRenderedTrains: [],
  selectedTrainId: null
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

  // 2. ICE International
  if (rawMat.includes('ice') || rawCol.includes('ice') || rawStr.includes('ice ') ||
      (num >= 100 && num <= 129) || (num >= 220 && num <= 229)) {
    return OPERATORS.ice;
  }

  // 3. IC Berlijn
  if (rawMat.includes('berlijn') || (num >= 140 && num <= 149)) {
    return OPERATORS.icberlijn;
  }

  // 4. Arriva (Noord, Vechtdal, Maaslijn, Limburg)
  if (rawMat.includes('arriva') || rawStr.includes('arriva') || rawCol.includes('arriva') ||
      rawMat.includes('spurt') || rawMat.includes('wink') ||
      (num >= 18900 && num <= 18999) || (num >= 37000 && num <= 38999) || (num >= 32200 && num <= 32399)) {
    return OPERATORS.arriva;
  }

  // 5. Keolis / Blauwnet
  if (rawMat.includes('keolis') || rawMat.includes('blauwnet') || rawCol.includes('blauwnet') ||
      rawStr.includes('blauwnet') || rawMat.includes('syntus') ||
      (num >= 31200 && num <= 31299) || (num >= 7900 && num <= 7999)) {
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
  if (speed >= 120) {
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

  // Vingeraanraking op de satellietkaart: activeer direct station of trein onder je vinger
  map.on('click', (e) => {
    const clickLat = e.latlng.lat;
    const clickLon = e.latlng.lng;

    // 1. Zoek dichtstbijzijnde live trein onder de vingertop (binnen 2.8 km)
    const allParsed = appState.allLiveFeatures.map(parseTrain).filter(Boolean);
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
  const lineColor = corridor.category === 'freight' ? '#ea580c' :
                    corridor.category === 'international' ? '#f43f5e' :
                    corridor.category === 'regional' ? '#0284c7' : '#ffc917';

  appState.routePolyline = L.polyline(latlngs, {
    color: lineColor,
    weight: 4.5,
    opacity: 0.95,
    dashArray: '8, 4',
    lineJoin: 'round'
  }).addTo(map);

  corridor.stations.forEach((st, i) => {
    const isTerm = st.terminal;
    const marker = L.circleMarker([st.lat, st.lon], {
      radius: isTerm ? 11 : 8,
      fillColor: isTerm ? '#ffffff' : lineColor,
      color: '#001948',
      weight: 3,
      fillOpacity: 1.0
    }).addTo(map);

    marker.bindTooltip(`<strong>${st.name}</strong><br><small>Spoor ${st.sporen} &bull; 👉 Tik voor treinen</small>`, {
      permanent: isTerm,
      direction: 'top',
      offset: [0, -8],
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

// Handmatige live verversing van alle treinen en radarstatistieken
async function forceRefreshTrains() {
  const btn = document.getElementById('btnForceRefresh');
  if (btn) btn.innerHTML = '<span>⏳ Laden...</span>';
  try {
    const data = await fetchLiveTrains();
    if (data && data.features) {
      appState.allLiveFeatures = data.features;
      updateLineOverview();
      playAuthenticNSChime();
    }
  } catch (e) {
    console.warn('Ververs fout:', e);
  } finally {
    if (btn) btn.innerHTML = '🔄 Ververs Info';
  }
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

  // Snelheid detectie
  let speed = 0;
  const spdMatch = matnrString.match(/@\s*(\d+)\s*km\/h/i);
  if (spdMatch) speed = parseInt(spdMatch[1], 10);

  // Treinnummer detectie
  let trainNum = '';
  const trMatch = matnrString.match(/trein\s+(\d+)/i);
  if (trMatch) trainNum = trMatch[1];
  else trainNum = matnummer.replace(/\D/g, '') || '0';

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
  let isPechFlag = isPechText ? 1 : 0;
  if (delayMin >= 10) isPechFlag = 1;
  if (speed === 0 && delayMin >= 5) isPechFlag = 1;

  // WASM status classificatie: 0 = ontime, 1 = delayed, 2 = pech
  const statusCode = appState.bridge.classifyStatus(speed, delayMin, isPechFlag);
  const statusType = statusCode === 2 ? 'pech' : (statusCode === 1 ? 'delayed' : 'ontime');

  const puncScore = appState.bridge.calculatePunctuality(speed, delayMin * 60);

  const train = {
    id: `${matnummer}_${trainNum}`,
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

  train.operator = detectOperator(train);
  return train;
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function matchTrainToCorridor(train, corridor) {
  if (!corridor) return true;

  // 1. Controleer of de trein fysiek op een baanvaksegment van de corridor rijdt
  for (let i = 0; i < corridor.stations.length - 1; i++) {
    const s1 = corridor.stations[i];
    const s2 = corridor.stations[i + 1];

    const d1 = distanceKm(train.lat, train.lon, s1.lat, s1.lon);
    const d2 = distanceKm(train.lat, train.lon, s2.lat, s2.lon);
    const segLen = distanceKm(s1.lat, s1.lon, s2.lat, s2.lon);

    if (d1 + d2 <= segLen + 7.5 && d1 <= segLen + 5.0 && d2 <= segLen + 5.0) {
      return { segmentIndex: i, fromStation: s1, toStation: s2, distFromS1: d1 };
    }
  }

  // Check ook of de trein dicht bij een van de stations stilstaat (< 2.5 km)
  for (let i = 0; i < corridor.stations.length; i++) {
    const s = corridor.stations[i];
    if (distanceKm(train.lat, train.lon, s.lat, s.lon) <= 2.5) {
      const segIdx = Math.min(i, Math.max(0, corridor.stations.length - 2));
      return { segmentIndex: segIdx, fromStation: s, toStation: s, distFromS1: 0 };
    }
  }

  // 2. Als treinnummer bij de serie hoort (alleen voor vaste corridors, niet voor custom Van-Naar trajecten)
  if (!corridor.isCustomRoute && corridor.seriesPattern && corridor.seriesPattern.test(train.trainNum)) {
    const isNearStation = corridor.stations.some(s => distanceKm(train.lat, train.lon, s.lat, s.lon) <= 18);
    if (isNearStation) {
      return { segmentIndex: findNearestSegment(train, corridor) };
    }
  }

  return false;
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
  const allParsed = appState.allLiveFeatures.map(parseTrain).filter(Boolean);

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
  const isAllMode = corridorKey === 'all' || appState.activeCategory === 'all';
  const corridor = isAllMode ? null : CORRIDORS[corridorKey];

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

  if (titleEl) titleEl.textContent = `Lijn: ${corridor.name}`;
  if (metaEl) metaEl.textContent = `Vervoerder: ${corridor.operator} &bull; ${corridor.stations.length} Baanvakstations`;
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
      matchedTrains.push(t);

      if (!segmentTrainsMap.has(segIdx)) segmentTrainsMap.set(segIdx, []);
      segmentTrainsMap.get(segIdx).push(t);
    }
  });

  if (countEl) countEl.innerHTML = `Actieve treinen op dit traject: <strong>${matchedTrains.length}</strong>`;

  // Bouw het heldere stationsdiagram met live snelheden & operator badges
  let html = '';
  corridor.stations.forEach((st, idx) => {
    const isTerminal = st.terminal || idx === 0 || idx === corridor.stations.length - 1;

    html += `
      <div class="station-node ${isTerminal ? 'terminal' : ''}" onclick="window.selectStation('${st.code}')" role="button" tabindex="0" title="Tik om alle treinen op ${st.name} te zien">
        <div class="station-track-col">
          <div class="station-bullet"></div>
          ${idx < corridor.stations.length - 1 ? '<div class="track-line"></div>' : ''}
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
      const trainsOnSegment = segmentTrainsMap.get(idx) || [];
      if (trainsOnSegment.length > 0) {
        html += `<div class="trains-between-segment">`;
        trainsOnSegment.forEach(t => {
          const spdInfo = getSpeedBadgeInfo(t.speed);
          const op = t.operator;
          const puncClass = t.statusType === 'ontime' ? 'on-time' : t.statusType === 'delayed' ? 'delayed' : 'halted';
          const puncText = t.statusType === 'ontime' ? 'Op tijd' :
                           t.statusType === 'delayed' ? `+${t.delayMin || 2}m Vertraagd` : '🚨 Pech / Gestrand';

          html += `
            <div class="train-corridor-card ${puncClass}" onclick="window.selectTrain('${t.id}')">
              <div class="t-info">
                <div class="t-header-row">
                  <span class="op-badge ${op.badgeClass}">[${op.code}]</span>
                  <span class="t-number">Trein ${t.trainNum}</span>
                </div>
                <div class="t-mat">${t.matnummer || op.name}</div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="t-speed-badge ${spdInfo.cssClass}">${spdInfo.icon} ${spdInfo.label}</span>
                <span class="t-punc-badge ${puncClass}">${puncText}</span>
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

      html += `
        <div class="unified-train-item ${puncClass}" onclick="window.selectTrain('${t.id}')">
          <div class="ut-left">
            <div class="ut-num-row">
              <span class="op-badge ${op.badgeClass}">[${op.code}]</span>
              <span class="ut-num">Trein #${t.trainNum}</span>
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

  // Bepaal modus: minimal (alleen iconen), compact of full
  const isMinimal = densityMode === 'minimal';
  const useCompact = densityMode === 'compact' || (densityMode === 'smart' && (isAllMode || zoom < 11));
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
              // Alle 4 posities overlappen (dicht cluster bij perron/emplacement zoals Maastricht)
              // -> schakel over naar minimal stand om overlap te elimineren
              trainCompactClass = 'minimal';
            }
          }
        }
      }

      const tagX = posClass === 'tag-pos-right' ? pt.x + 36 : (posClass === 'tag-pos-left' ? pt.x - 36 : pt.x);
      const tagY = posClass === 'tag-pos-bottom' ? pt.y + 28 : pt.y - 20;
      placedTagBoxes.push({ x: tagX, y: tagY });
    }

    if (appState.trainMarkers.has(t.id)) {
      const m = appState.trainMarkers.get(t.id);
      m.setLatLng([t.lat, t.lon]);
      const el = m.getElement();
      if (el) {
        const tag = el.querySelector('.clean-train-tag');
        if (tag) {
          tag.className = `clean-train-tag ${trainCompactClass} ${posClass}`;
          tag.style.borderColor = op.border;
          tag.innerHTML = `
            <span class="tag-op" style="background:${op.bg}; color:${op.color};">[${op.code}]</span>
            <span class="tag-num">${t.trainNum}</span>
            <span class="tag-spd ${spdInfo.cssClass}">${spdInfo.label}</span>
          `;
        }
      }
    } else {
      const html = `
        <div class="clean-train-marker" title="[${op.code}] Trein ${t.trainNum} - ${t.speed} km/u (${t.statusType})">
          <div class="clean-train-tag ${trainCompactClass} ${posClass}" style="border-color: ${op.border};">
            <span class="tag-op" style="background:${op.bg}; color:${op.color};">[${op.code}]</span>
            <span class="tag-num">${t.trainNum}</span>
            <span class="tag-spd ${spdInfo.cssClass}">${spdInfo.label}</span>
          </div>
          <div class="clean-train-pin" style="background: ${op.border}; border-color: ${statusBorder};">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="${op.color}">
              <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zm0 2c3.5 0 6 .4 6 2H6c0-1.6 2.5-2 6-2zm-5 9c-.83 0-1.5-.67-1.5-1.5S6.17 10 7 10s1.5.67 1.5 1.5S7.83 13 7 13zm10 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
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

  playAuthenticNSChime();

  // Mobiele & iPad optimalisatie: als de gebruiker in lijstmodus zat, toon de kaart
  const layout = document.getElementById('mainLayout');
  if (layout && layout.classList.contains('view-list')) {
    layout.classList.remove('view-list');
    layout.classList.add('view-map');
    document.querySelectorAll('.mobile-view-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-view') === 'map');
    });
    if (appState.map) {
      setTimeout(() => appState.map.invalidateSize(), 100);
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

    document.getElementById('inspTitle').textContent = `Trein #${train.trainNum}`;
    document.getElementById('inspOperator').textContent = `${op.name} (${op.code})`;
    document.getElementById('inspSpeed').innerHTML = `<span class="t-speed-badge ${spdInfo.cssClass}">${spdInfo.icon} ${train.speed} km/u</span>`;
    document.getElementById('inspMat').textContent = train.matnummer || 'Standaard materieel';
    document.getElementById('inspPunc').textContent = statusPillLabel;
    document.getElementById('inspPunc').className = `status-pill ${statusPillClass}`;
    document.getElementById('inspStatus').textContent = spdInfo.text;
    document.getElementById('inspGps').textContent = train.gpsdata;
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
// 9b. Station Vertrekstaat & Perronbord (Interactief aanklikbaar)
// =============================================================

const EXTRA_STATIONS = [
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

// Bouw een specifiek deeltraject tussen vertrek- en aankomststation (bv. Buitenpost ➔ Leeuwarden of Breukelen ➔ Utrecht)
function buildCustomRoute(fromCode, toCode) {
  const stA = findStationByCode(fromCode);
  const stB = findStationByCode(toCode);
  if (!stA || !stB || stA.code.toLowerCase() === stB.code.toLowerCase()) return null;

  // 1. Zoek of er een bestaande corridor is waar BEIDE stations op liggen
  let intermediateStations = [];
  for (const cKey in CORRIDORS) {
    const c = CORRIDORS[cKey];
    if (c.isCustomRoute) continue;
    const idxA = c.stations.findIndex(s => s.code.toLowerCase() === fromCode.toLowerCase());
    const idxB = c.stations.findIndex(s => s.code.toLowerCase() === toCode.toLowerCase());
    if (idxA !== -1 && idxB !== -1) {
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

  const customId = `custom-${stA.code.toLowerCase()}-${stB.code.toLowerCase()}`;
  return {
    id: customId,
    category: 'custom',
    name: `${stA.name} ➔ ${stB.name}`,
    shortName: `${stA.name} ➔ ${stB.name}`,
    badge: 'TRAJECT',
    operator: 'Alle Treinen op dit traject',
    stations: cleanedStations,
    isCustomRoute: true
  };
}

function applyCustomRoute(fromCode, toCode) {
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
    summaryEl.innerHTML = `🟢 Actief traject: <strong>${customCorridor.name}</strong> &bull; ${customCorridor.stations.length} stations op het baanvak`;
  }

  // Status filters resetten
  appState.activeStatusFilter = 'all';
  document.querySelectorAll('.status-filter-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btnFilterAll')?.classList.add('active');

  renderCorridorOnMap(customCorridor);
  updateLineOverview();
  playAuthenticNSChime();
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

  let htmlFrom = `<option value="">📍 Kies vertrekstation (${allStations.length} stations)...</option>`;
  let htmlTo = `<option value="">🏁 Kies aankomststation (${allStations.length} stations)...</option>`;

  allStations.forEach(st => {
    htmlFrom += `<option value="${st.code}">${st.name} (${st.code})</option>`;
    htmlTo += `<option value="${st.code}">${st.name} (${st.code})</option>`;
  });

  fromSel.innerHTML = htmlFrom;
  toSel.innerHTML = htmlTo;

  // Standaard suggestie (Buitenpost ➔ Leeuwarden)
  fromSel.value = currentFrom || 'BP';
  toSel.value = currentTo || 'LW';
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

// Selecteer een station en open het interactieve perronbord
window.selectStation = (stationCode) => {
  const station = findStationByCode(stationCode);
  if (!station) return;
  appState.activeStation = station;

  playAuthenticNSChime();

  const modal = document.getElementById('stationModal');
  const titleEl = document.getElementById('stModalTitle');
  const subEl = document.getElementById('stModalSub');
  const countEl = document.getElementById('stModalLiveTrainCount');
  const trackStatusEl = document.getElementById('stModalTrackStatus');
  const listEl = document.getElementById('stationBoardList');

  if (titleEl) titleEl.textContent = station.name;
  if (subEl) {
    subEl.innerHTML = `Code: <strong>${station.code}</strong> &bull; Perrons: <strong>Spoor ${station.sporen}</strong> &bull; ${station.operator || 'NS & Regionaal'}`;
  }

  // Zoek alle naderende en vertrekkende live treinen binnen een gerichte straal van 14 km (overzichtelijk zonder ruis)
  const allParsed = appState.allLiveFeatures.map(parseTrain).filter(Boolean);
  const nearbyTrains = [];

  allParsed.forEach(t => {
    const dist = distanceKm(station.lat, station.lon, t.lat, t.lon);
    if (dist <= 14) {
      const spd = t.speed > 5 ? t.speed : 80;
      const etaMin = Math.max(1, Math.round((dist / spd) * 60));
      nearbyTrains.push({
        ...t,
        dist: Math.round(dist * 10) / 10,
        etaMin
      });
    }
  });

  // Sorteer op nadering (dichtstbijzijnde eerst)
  nearbyTrains.sort((a, b) => a.dist - b.dist);

  if (countEl) countEl.textContent = `${nearbyTrains.length} treinen in nadering (binnen 14 km rond ${station.name})`;

  // Status van baanvak bepalen
  const hasPech = nearbyTrains.some(t => t.statusType === 'pech' || t.delayMin >= 15);
  const hasDelay = nearbyTrains.some(t => t.statusType === 'delayed');
  if (trackStatusEl) {
    if (hasPech) {
      trackStatusEl.className = 'status-pill red';
      trackStatusEl.innerHTML = '🚨 Baanvakstoring / Gestrande trein';
    } else if (hasDelay) {
      trackStatusEl.className = 'status-pill yellow';
      trackStatusEl.innerHTML = '⚠️ Enkele vertragingen';
    } else {
      trackStatusEl.className = 'status-pill green';
      trackStatusEl.innerHTML = '🟢 Normaal treinverkeer (Op tijd)';
    }
  }

  // Bouw de live vertrekstaat
  if (listEl) {
    if (nearbyTrains.length === 0) {
      listEl.innerHTML = `
        <div style="padding: 28px 16px; text-align: center; color: var(--text-sub);">
          <div style="font-size: 2rem; margin-bottom: 8px;">🚉</div>
          <strong style="color: var(--text-main); font-size: 0.95rem;">Geen actieve treinen binnen 14 km van dit station.</strong><br>
          <span style="font-size: 0.8rem;">Kijk op de landelijke satellietradar of schakel naar een andere hoofdlijn.</span>
        </div>
      `;
    } else {
      const now = new Date();
      let html = '';

      nearbyTrains.slice(0, 16).forEach(t => {
        const depTime = new Date(now.getTime() + t.etaMin * 60000);
        const hh = String(depTime.getHours()).padStart(2, '0');
        const mm = String(depTime.getMinutes()).padStart(2, '0');
        const timeStr = `${hh}:${mm}`;

        const spoor = assignPlatform(station.sporen, t.trainNum);
        const spdInfo = getSpeedBadgeInfo(t.speed);
        const op = t.operator;

        let delayTag = '';
        if (t.statusType === 'delayed') {
          delayTag = `<span class="st-delay delayed">+${t.delayMin || 2}m</span>`;
        } else if (t.statusType === 'pech') {
          delayTag = `<span class="st-delay" style="color: #ef4444;">🚨 Pech</span>`;
        } else {
          delayTag = `<span class="st-delay">Op tijd</span>`;
        }

        html += `
          <div class="st-board-row" onclick="window.selectTrainAndCloseStation('${t.id}')" role="button" tabindex="0" title="Tik om trein ${t.trainNum} live op satelliet te volgen">
            <div class="st-col-time">
              <span class="st-time">${timeStr}</span>
              ${delayTag}
            </div>
            <div class="st-col-dest">
              <span class="st-dest-name">Trein #${t.trainNum}</span>
              <span class="st-dest-via">${t.matnummer || op.name} &bull; Richting ${station.corridorName ? station.corridorName.split('➔').pop().trim() : 'Baanvak'}</span>
            </div>
            <div>
              <span class="op-badge ${op.badgeClass}">[${op.code}]</span>
            </div>
            <div>
              <span class="ns-platform-badge">${spoor}</span>
            </div>
            <div class="st-col-radar">
              <span class="st-radar-pill ${t.dist <= 1.0 ? 'at-station' : 'nearing'}">${spdInfo.icon} ${t.speed} km/u</span>
              <span class="st-radar-eta">~${t.dist} km (${t.etaMin}m)</span>
            </div>
          </div>
        `;
      });
      listEl.innerHTML = html;
    }
  }

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
  const allParsed = appState.allLiveFeatures.map(parseTrain).filter(Boolean);
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
  const dest = corridor.name ? corridor.name.split('➔').pop().trim() : 'Eindbestemming';

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
// 10. Live GPS: "In Welke Trein Zit Ik?" & "Waar Ben Ik?"
// =============================================================
function findMyTrain() {
  if (!navigator.geolocation) {
    alert('GPS-locatie is niet beschikbaar in uw browser. Zorg dat locatietoegang is ingeschakeld.');
    return;
  }

  const btnHeader = document.getElementById('btnFindMyTrain');
  const btnPlanner = document.getElementById('btnImInTrainPlanner');

  if (btnHeader) btnHeader.innerHTML = '<span class="gps-icon-animated">📡</span> <span>GPS Zoeken...</span>';
  if (btnPlanner) btnPlanner.innerHTML = '<span>📡 GPS Zoeken...</span>';

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      if (btnHeader) btnHeader.innerHTML = '<span class="pulse-dot-beacon"></span> <span class="btn-icon">🚆</span> <span class="btn-label-text">Ik zit in de trein</span>';
      if (btnPlanner) btnPlanner.innerHTML = '<span class="pulse-dot-beacon"></span> 🚆 Ik zit in de trein!';

      const userLat = pos.coords.latitude;
      const userLon = pos.coords.longitude;
      const userAcc = Math.round(pos.coords.accuracy || 10);
      const userSpeedKmh = pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : null;

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
        appState.userLocationMarker.setLatLng([userLat, userLon]);
      }

      // Zoek dichtstbijzijnde trein uit alle actuele treinen
      const allParsed = appState.allLiveFeatures.map(parseTrain).filter(Boolean);
      if (allParsed.length === 0) {
        alert('Treingegevens worden geladen van de radar. Probeer over 3 seconden opnieuw.');
        return;
      }

      let bestTrain = null;
      let bestScore = Infinity;

      allParsed.forEach(t => {
        const d = distanceKm(userLat, userLon, t.lat, t.lon);
        let score = d;

        // Als gebruiker in een rijdende trein zit (>15 km/u), geef sterke voorkeur aan rijdende treinen!
        if (userSpeedKmh && userSpeedKmh > 15) {
          if (t.speed && t.speed > 15 && d < 3.5) {
            const speedDiff = Math.abs(t.speed - userSpeedKmh);
            score = d * 0.4 + (speedDiff * 0.01);
          } else {
            score = d + 5.0;
          }
        }

        if (score < bestScore) {
          bestScore = score;
          bestTrain = t;
        }
      });

      if (!bestTrain) return;

      const distMeters = Math.round(distanceKm(userLat, userLon, bestTrain.lat, bestTrain.lon) * 1000);
      appState.myTrain = bestTrain;

      // Zoek de dichtstbijzijnde stations uit álle 397 Nederlandse stations
      const allStations = getAllStations().filter(s => s.sporen !== 'Goederen' && s.sporen !== 'DE Grens');
      allStations.sort((a, b) => {
        const da = distanceKm(bestTrain.lat, bestTrain.lon, a.lat, a.lon);
        const db = distanceKm(bestTrain.lat, bestTrain.lon, b.lat, b.lon);
        return da - db;
      });

      const closestStation = allStations[0] || { name: 'Station nabij', code: 'NS' };
      const nextStation = allStations[1] || { name: 'Volgend station', code: 'NS' };

      const distToNextKm = distanceKm(bestTrain.lat, bestTrain.lon, nextStation.lat, nextStation.lon);
      const etaMin = bestTrain.speed > 10 ? Math.round((distToNextKm / bestTrain.speed) * 60) : null;

      const op = bestTrain.operator;
      const spdInfo = getSpeedBadgeInfo(bestTrain.speed);

      // Vul de interactieve Mijn Trein Dashboard Modal
      const modal = document.getElementById('myTrainModal');
      if (modal) {
        document.getElementById('myTrainOpBadge').className = `op-badge ${op.badgeClass}`;
        document.getElementById('myTrainOpBadge').textContent = `[${op.code}]`;
        document.getElementById('myTrainTitle').textContent = `U zit in ${op.name} Trein #${bestTrain.trainNum}`;
        document.getElementById('myTrainSpeed').textContent = bestTrain.speed || (userSpeedKmh || 0);
        document.getElementById('myTrainSpeedStatus').textContent = spdInfo.text;
        document.getElementById('myTrainSpeedStatus').className = `speed-status-pill ${spdInfo.cssClass}`;

        document.getElementById('myTrainRoute').textContent = `${op.name} • Treinserie ${bestTrain.trainNum}`;
        document.getElementById('myTrainSegment').textContent = `Baanvak nabij ${closestStation.name} (richting ${nextStation.name})`;
        document.getElementById('myTrainGpsMeta').innerHTML = `
          📍 <strong>Uw GPS:</strong> ${userLat.toFixed(5)}, ${userLon.toFixed(5)} (±${userAcc}m)${userSpeedKmh ? ` &bull; Snelheid: ${userSpeedKmh} km/u` : ''}<br>
          🚆 <strong>Trein GPS:</strong> ${bestTrain.lat.toFixed(5)}, ${bestTrain.lon.toFixed(5)} &bull; Afstand tot trein: <strong>${distMeters} meter</strong>
        `;

        document.getElementById('myTrainOperator').textContent = `${op.name} (${bestTrain.matnummer || 'Standaard materieel'})`;
        document.getElementById('myTrainMatnr').textContent = `Materieelcode: ${bestTrain.matnummer || 'NVT'} • Trein #${bestTrain.trainNum}`;

        const puncText = bestTrain.statusType === 'ontime' ? '🟢 Volgens schema op tijd' :
                         bestTrain.statusType === 'delayed' ? `🟡 +${bestTrain.delayMin || 2}m Vertraagd` : '🔴 Pech / Storing';
        document.getElementById('myTrainPunctuality').textContent = puncText;
        document.getElementById('myTrainDelay').textContent = `Verwachte vertraging: ${bestTrain.delayMin || 0} minuten`;

        document.getElementById('myTrainNextStation').textContent = `${nextStation.name} (${nextStation.code})`;
        document.getElementById('myTrainNextEta').textContent = `Afstand: ~${distToNextKm.toFixed(1)} km ${etaMin ? `(ca. ${etaMin} min bij ${bestTrain.speed} km/u)` : ''}`;

        document.getElementById('myTrainPrevStation').textContent = `${closestStation.name} (${closestStation.code})`;
        const distFromPrev = distanceKm(bestTrain.lat, bestTrain.lon, closestStation.lat, closestStation.lon);
        document.getElementById('myTrainPrevDist').textContent = `Afstand: ~${distFromPrev.toFixed(1)} km geleden`;

        modal.style.display = 'flex';
      }

      // Speel de akoestische NS Stationsgong
      playAuthenticNSChime();

      // Vlieg de satellietkaart direct naar uw trein
      appState.map.flyTo([bestTrain.lat, bestTrain.lon], 15, { duration: 1.4 });

      // Schakel naar kaart als de app op mobiel staat
      const layout = document.getElementById('mainLayout');
      if (layout && layout.classList.contains('view-list')) {
        layout.classList.remove('view-list');
        layout.classList.add('view-map');
        document.querySelectorAll('.mobile-view-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-view') === 'map');
        });
        setTimeout(() => appState.map.invalidateSize(), 150);
      }
    },
    (err) => {
      if (btnHeader) btnHeader.innerHTML = '<span class="pulse-dot-beacon"></span> <span class="btn-icon">🚆</span> <span class="btn-label-text">Ik zit in de trein</span>';
      if (btnPlanner) btnPlanner.innerHTML = '<span class="pulse-dot-beacon"></span> 🚆 Ik zit in de trein!';
      console.warn('GPS error:', err);
      alert('Kon uw GPS-positie niet bepalen. Geef alstublieft toestemming voor locatie in uw browserinstellingen.');
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
  );
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
  }

  // Trajectplanner standaard open en actief tonen
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

  document.getElementById('btnApplyRoute')?.addEventListener('click', () => {
    const fromSel = document.getElementById('routeFromSelect');
    const toSel = document.getElementById('routeToSelect');
    if (fromSel && toSel && fromSel.value && toSel.value) {
      applyCustomRoute(fromSel.value, toSel.value);
    }
  });

  // Knop: Bekijk alle treinen in heel Nederland
  document.getElementById('btnClearRoute')?.addEventListener('click', () => {
    switchCorridor('all');
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

  // Direct live updaten bij selectie
  document.getElementById('routeFromSelect')?.addEventListener('change', () => {
    const fromVal = document.getElementById('routeFromSelect')?.value;
    const toVal = document.getElementById('routeToSelect')?.value;
    if (fromVal && toVal && fromVal.toLowerCase() !== toVal.toLowerCase()) {
      applyCustomRoute(fromVal, toVal);
    }
  });

  document.getElementById('routeToSelect')?.addEventListener('change', () => {
    const fromVal = document.getElementById('routeFromSelect')?.value;
    const toVal = document.getElementById('routeToSelect')?.value;
    if (fromVal && toVal && fromVal.toLowerCase() !== toVal.toLowerCase()) {
      applyCustomRoute(fromVal, toVal);
    }
  });

  // Label Density Knop op Kaart (Anti-Chaos toggle)
  document.getElementById('btnToggleLabelDensity')?.addEventListener('click', () => {
    toggleLabelDensity();
  });
  // Mobiele & iPad Weergave Schakelaar (Split Screen, Alleen Lijst, Alleen Kaart)
  document.querySelectorAll('.mobile-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.mobile-view-btn').forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');

      const viewMode = target.getAttribute('data-view');
      const layout = document.getElementById('mainLayout');
      if (layout) {
        layout.classList.remove('view-list', 'view-map', 'view-split');
        if (viewMode === 'list') {
          layout.classList.add('view-list');
        } else if (viewMode === 'map') {
          layout.classList.add('view-map');
        } else {
          layout.classList.add('view-split');
        }
      }

      // Ververs Leaflet kaartafmetingen na CSS layout-transitie
      if (appState.map) {
        setTimeout(() => appState.map.invalidateSize(), 150);
      }
    });
  });

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

  // Centreer op Kaart
  document.getElementById('btnCenterMyTrain')?.addEventListener('click', () => {
    const modal = document.getElementById('myTrainModal');
    if (modal) modal.style.display = 'none';
    if (appState.myTrain) {
      appState.map.flyTo([appState.myTrain.lat, appState.myTrain.lon], 16, { duration: 1.0 });
    }
  });

  // Live Meereizen Toggle
  document.getElementById('btnFollowMyTrain')?.addEventListener('click', () => {
    const btn = document.getElementById('btnFollowMyTrain');
    appState.isFollowingMyTrain = !appState.isFollowingMyTrain;

    if (appState.isFollowingMyTrain) {
      btn.classList.add('active');
      const textEl = document.getElementById('followText');
      const iconEl = document.getElementById('followIcon');
      if (textEl) textEl.textContent = '📡 Meereizen Actief';
      if (iconEl) iconEl.textContent = '🟢';

      if (navigator.geolocation) {
        appState.watchPositionId = navigator.geolocation.watchPosition(
          (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            if (appState.userLocationMarker) {
              appState.userLocationMarker.setLatLng([lat, lon]);
            }
            if (appState.isFollowingMyTrain && appState.map) {
              appState.map.panTo([lat, lon]);
            }
          },
          (err) => console.warn('Watch error:', err),
          { enableHighAccuracy: true, maximumAge: 2000 }
        );
      }
    } else {
      btn.classList.remove('active');
      const textEl = document.getElementById('followText');
      const iconEl = document.getElementById('followIcon');
      if (textEl) textEl.textContent = 'Live Meereizen op Satelliet';
      if (iconEl) iconEl.textContent = '📡';
      if (appState.watchPositionId !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(appState.watchPositionId);
        appState.watchPositionId = null;
      }
    }
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
    toggleCorridorPanel(false);
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
        layout.classList.remove('view-list');
        layout.classList.add('view-map');
        document.querySelectorAll('.mobile-view-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-view') === 'map');
        });
        setTimeout(() => appState.map.invalidateSize(), 100);
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
    }
  });

  // Zoekveld
  document.getElementById('trainSearchInput')?.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    if (q.length >= 2) {
      const match = appState.allLiveFeatures.map(parseTrain).find(t => t && (t.trainNum.includes(q) || t.operator.code.toLowerCase().includes(q.toLowerCase())));
      if (match) {
        window.selectTrain(match.id);
      }
    }
  });
}

// =============================================================
// 12. Versiebeheer & Live Updates
// =============================================================
const APP_VERSION = '2.6.0';
let appBuildMeta = { version: APP_VERSION, commit: 'latest', buildTime: '' };

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
    window.location.replace(`${cleanUrl}?reload=${Date.now()}`);
  }

  async function checkVersion() {
    try {
      const res = await fetch(`./version.json?_t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        appBuildMeta = data;
        const verStr = `v${data.version || APP_VERSION}`;
        const commitStr = data.commit ? ` (${data.commit})` : '';

        const badge = document.getElementById('appVersionBadge');
        if (badge) {
          badge.innerHTML = `<span>${verStr}</span> <span class="badge-refresh-icon">🔄</span>`;
          badge.title = `Gele versieknop: Treinen ${verStr}${commitStr} - Tik om cache te wissen & te herladen`;
        }

        const footerVer = document.getElementById('footerVersionText');
        if (footerVer) {
          footerVer.textContent = `${verStr}${commitStr}`;
        }

        // Alleen tonen als er daadwerkelijk een andere versie op de server staat
        const banner = document.getElementById('updateBanner');
        if (data.version && data.version !== APP_VERSION) {
          const dismissedVer = sessionStorage.getItem('dismissed_version');
          if (dismissedVer !== data.version) {
            const verCode = document.getElementById('bannerVersionNum');
            if (verCode) verCode.textContent = `v${data.version}`;
            if (banner) banner.style.display = 'block';
          }
        } else {
          if (banner) banner.style.display = 'none';
        }
      }
    } catch (e) {
      console.warn('Versiecheck niet beschikbaar:', e);
    }
  }

  // Update Reload knoppen
  document.getElementById('btnReloadUpdate')?.addEventListener('click', () => {
    sessionStorage.removeItem('dismissed_version');
    forcePurgeAndReload();
  });

  document.getElementById('btnDismissUpdate')?.addEventListener('click', () => {
    if (appBuildMeta && appBuildMeta.version) {
      sessionStorage.setItem('dismissed_version', appBuildMeta.version);
    }
    const banner = document.getElementById('updateBanner');
    if (banner) banner.style.display = 'none';
  });

  // Klik op de versietag geeft optie om direct cache te wissen en pagina te herladen
  document.getElementById('appVersionBadge')?.addEventListener('click', () => {
    const verStr = `v${appBuildMeta.version || APP_VERSION}`;
    const commitStr = appBuildMeta.commit || 'main';
    const buildTime = appBuildMeta.buildTime ? new Date(appBuildMeta.buildTime).toLocaleString('nl-NL') : 'Recent';
    playAuthenticNSChime();
    const shouldReload = confirm(
      `🚆 Treinen — ProRail Live Satelliet Radar\n\n` +
      `Versie: ${verStr}\nCommit: ${commitStr}\nLaatste build: ${buildTime}\n\n` +
      `Wilt u de app nu direct geforceerd vernieuwen en alle tijdelijke cachebestanden wissen?`
    );
    if (shouldReload) {
      forcePurgeAndReload();
    }
  });

  checkVersion();
  setInterval(checkVersion, 30000);
}

// =============================================================
// 13. Start Applicatie
// =============================================================
async function init() {
  initMap();
  setupNavigation();
  initCommunicationEngine();
  initVersionManagement();

  populateLineButtons('ns');
  // Start direct met de primaire trajectselectie (Buitenpost ➔ Leeuwarden)
  applyCustomRoute('BP', 'LW');

  await appState.bridge.loadWasm('./treinen.wasm');

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

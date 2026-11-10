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
  labelMode: 'smart', // 'smart' (anti-chaos) | 'compact' | 'full'
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

  if (corridor.seriesPattern && corridor.seriesPattern.test(train.trainNum)) {
    return true;
  }

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

    renderMapTrains(allParsed);
    return;
  }

  if (!corridor) return;

  if (titleEl) titleEl.textContent = `Lijn: ${corridor.name}`;
  if (metaEl) metaEl.textContent = `Vervoerder: ${corridor.operator} &bull; ${corridor.stations.length} Baanvakstations`;
  if (statusFooterEl) statusFooterEl.textContent = `Lijn: ${corridor.shortName} &bull; Vervoerder: ${corridor.operator}`;

  // Filter treinen die op deze corridor rijden
  const matchedTrains = [];
  const segmentTrainsMap = new Map();

  allParsed.forEach(t => {
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
      <div class="station-node ${isTerminal ? 'terminal' : ''}" onclick="window.selectStation('${st.code}')" role="button" tabindex="0" title="Tik om alle stoppende treinen en perrons te zien">
        <div class="station-track-col">
          <div class="station-bullet"></div>
          ${idx < corridor.stations.length - 1 ? '<div class="track-line"></div>' : ''}
        </div>
        <div class="station-details">
          <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px;">
            <div class="station-name">${st.name}</div>
            <span class="st-tap-hint">👉 Tik voor treinen</span>
          </div>
          <div class="station-sub">Spoor ${st.sporen} &bull; Code: ${st.code}</div>
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

  const currentIds = new Set();
  const zoom = map.getZoom();
  const isAllMode = appState.activeCorridorKey === 'all' || appState.activeCategory === 'all';
  const densityMode = appState.labelMode || 'smart';

  // Bepaal of compacte tags gebruikt moeten worden om overlappende teksten te voorkomen
  const useCompact = densityMode === 'compact' || (densityMode === 'smart' && (isAllMode || zoom < 11));
  const compactClass = useCompact ? 'compact' : '';

  // Houd bij waar tags op het scherm worden geplaatst voor slimme botsingdetectie
  const placedTagBoxes = [];

  trainList.forEach(t => {
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
    if (pt) {
      const boxW = useCompact ? 48 : 100;
      const boxH = 24;
      let collidesTop = false;
      let collidesBottom = false;
      let collidesRight = false;

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
            posClass = 'tag-pos-left';
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
          tag.className = `clean-train-tag ${compactClass} ${posClass}`;
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
          <div class="clean-train-tag ${compactClass} ${posClass}" style="border-color: ${op.border};">
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

  appState.map.flyTo([train.lat, train.lon], 14, { duration: 1.2 });
};

// =============================================================
// 9b. Station Vertrekstaat & Perronbord (Interactief aanklikbaar)
// =============================================================

// Vind station op code of naam door alle corridors heen
function findStationByCode(codeOrName) {
  if (!codeOrName) return null;
  const target = String(codeOrName).trim().toLowerCase();
  for (const cKey in CORRIDORS) {
    const corridor = CORRIDORS[cKey];
    for (const st of corridor.stations) {
      if (st.code.toLowerCase() === target || st.name.toLowerCase() === target) {
        return { ...st, corridorName: corridor.name, operator: corridor.operator };
      }
    }
  }
  return null;
}

// Haal alle unieke stations op uit alle corridors
function getAllStations() {
  const map = new Map();
  for (const cKey in CORRIDORS) {
    for (const st of CORRIDORS[cKey].stations) {
      if (!map.has(st.code)) {
        map.set(st.code, { ...st, corridorName: CORRIDORS[cKey].name, operator: CORRIDORS[cKey].operator });
      }
    }
  }
  return Array.from(map.values());
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

  // Zoek alle naderende en vertrekkende live treinen binnen een straal van 40 km
  const allParsed = appState.allLiveFeatures.map(parseTrain).filter(Boolean);
  const nearbyTrains = [];

  allParsed.forEach(t => {
    const dist = distanceKm(station.lat, station.lon, t.lat, t.lon);
    if (dist <= 40) {
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

  if (countEl) countEl.textContent = `${nearbyTrains.length} treinen in nadering / op het baanvak`;

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
          <strong style="color: var(--text-main); font-size: 0.95rem;">Geen actieve treinen binnen 40 km van dit station.</strong><br>
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
// 10. Live GPS: "In Welke Trein Zit Ik?" & "Waar Ben Ik?"
// =============================================================
function findMyTrain() {
  if (!navigator.geolocation) {
    alert('GPS-locatie is niet beschikbaar in uw browser. Zorg dat locatietoegang is ingeschakeld.');
    return;
  }

  const btnHeader = document.getElementById('btnFindMyTrain');
  const btnFloat = document.getElementById('btnFloatingFindTrain');

  if (btnHeader) btnHeader.innerHTML = '<span class="gps-icon-animated">📡</span> <span>GPS Zoeken...</span>';
  if (btnFloat) btnFloat.textContent = '📡 GPS Zoeken...';

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      if (btnHeader) btnHeader.innerHTML = '<span class="gps-icon-animated">📍</span> <span class="find-train-label">Waar ben ik? (Mijn Trein)</span>';
      if (btnFloat) btnFloat.textContent = '📍 Waar ben ik?';

      const userLat = pos.coords.latitude;
      const userLon = pos.coords.longitude;
      const userAcc = Math.round(pos.coords.accuracy || 10);
      const userSpeedKmh = pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : null;

      // Update "U bent hier" pulserende marker op de kaart
      if (!appState.userLocationMarker) {
        appState.userLocationMarker = L.circleMarker([userLat, userLon], {
          radius: 10,
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

      // Zoek dichtstbijzijnde trein uit live telemetrie
      const allParsed = appState.allLiveFeatures.map(parseTrain).filter(Boolean);
      if (allParsed.length === 0) {
        alert('Momenteel worden treingegevens geladen. Probeer over 3 seconden opnieuw.');
        return;
      }

      let bestTrain = null;
      let minDistanceKm = Infinity;

      allParsed.forEach(t => {
        const d = distanceKm(userLat, userLon, t.lat, t.lon);
        if (d < minDistanceKm) {
          minDistanceKm = d;
          bestTrain = t;
        }
      });

      if (!bestTrain) return;

      const distMeters = Math.round(minDistanceKm * 1000);
      appState.myTrain = bestTrain;

      // Zoek stations
      let allStations = [];
      Object.values(CORRIDORS).forEach(c => {
        if (c.stations) allStations.push(...c.stations);
      });

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
        document.getElementById('myTrainTitle').textContent = `U zit in Trein #${bestTrain.trainNum}`;
        document.getElementById('myTrainSpeed').textContent = bestTrain.speed || (userSpeedKmh || 0);
        document.getElementById('myTrainSpeedStatus').textContent = spdInfo.text;
        document.getElementById('myTrainSpeedStatus').className = `speed-status-pill ${spdInfo.cssClass}`;

        document.getElementById('myTrainRoute').textContent = `Vervoerder: ${op.name}`;
        document.getElementById('myTrainSegment').textContent = `Baanvak nabij ${closestStation.name} (richting ${nextStation.name})`;
        document.getElementById('myTrainGpsMeta').textContent = `Afstand tot treinantenne: ${distMeters} meter • GPS nauwkeurigheid ±${userAcc}m`;

        document.getElementById('myTrainOperator').textContent = `${op.name} (${bestTrain.matnummer || 'Standaard materieel'})`;
        document.getElementById('myTrainMatnr').textContent = `Materieelcode: ${bestTrain.matnummer || 'NVT'} • Trein ${bestTrain.trainNum}`;

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
      if (btnHeader) btnHeader.innerHTML = '<span class="gps-icon-animated">📍</span> <span class="find-train-label">Waar ben ik? (Mijn Trein)</span>';
      if (btnFloat) btnFloat.textContent = '📍 Waar ben ik?';
      console.warn('GPS error:', err);
      alert('Kon uw GPS-positie niet bepalen. Geef alstublieft toestemming voor locatie in uw browserinstellingen.');
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 3000 }
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
  const modes = ['smart', 'compact', 'full'];
  const curIdx = modes.indexOf(appState.labelMode || 'smart');
  const nextMode = modes[(curIdx + 1) % modes.length];
  appState.labelMode = nextMode;

  const btn = document.getElementById('btnToggleLabelDensity');
  if (btn) {
    if (nextMode === 'smart') {
      btn.textContent = '🏷️ Labels: Slim (Anti-Chaos)';
      btn.classList.remove('active');
    } else if (nextMode === 'compact') {
      btn.textContent = '🏷️ Labels: Compact (Alleen Nr)';
      btn.classList.add('active');
    } else {
      btn.textContent = '🏷️ Labels: Uitgebreid (Alles)';
      btn.classList.add('active');
    }
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
  // Weergavekeuze: Alle Treinen in Heel NL
  document.getElementById('btnViewAllNL')?.addEventListener('click', () => {
    switchCorridor('all');
  });

  // Trajectkeuze Dropdown
  document.getElementById('trajectSelect')?.addEventListener('change', (e) => {
    switchCorridor(e.target.value);
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

  // Live GPS Knoppen: Waar ben ik? (Mijn Trein)
  document.getElementById('btnFindMyTrain')?.addEventListener('click', () => findMyTrain());
  document.getElementById('btnFloatingFindTrain')?.addEventListener('click', () => findMyTrain());

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
    btn.classList.toggle('active', appState.soundEnabled);
    document.getElementById('audioStatusText').textContent = appState.soundEnabled ? '🔊 Geluid: Aan' : '🔇 Geluid: Uit';
    if (appState.soundEnabled) playAuthenticNSChime();
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

  // ESC toets sluit modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
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
// 11. Start Applicatie
// =============================================================
async function init() {
  initMap();
  setupNavigation();

  populateLineButtons('ns');
  const defaultCorridor = CORRIDORS['enschede-denhaag'];
  renderCorridorOnMap(defaultCorridor);

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

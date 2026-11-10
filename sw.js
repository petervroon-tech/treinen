// Treinen Service Worker - Versiebeheer & Offline Cache
const APP_VERSION = '2.5.0';
const CACHE_NAME = `treinen-cache-v${APP_VERSION}`;

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './stations.js',
  './stations.json',
  './app.js',
  './wasm_bridge.js',
  './treinen.wasm',
  './manifest.json',
  './version.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => {
          console.log('[SW] Oude cache opgeruimd:', k);
          return caches.delete(k);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Externe requests (satelliet tegels, treinposities API) niet onderscheppen
  if (url.origin !== self.location.origin) {
    return;
  }

  // version.json ALTIJD direct live van het netwerk ophalen
  if (url.pathname.endsWith('/version.json')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' }).catch(() => caches.match(event.request))
    );
    return;
  }

  // 100% Network-First voor alle applicatiebestanden: ALTIJD de meest recente versie ophalen!
  // Pas als er géén internetverbinding is (bv. in een tunnel), val terug op de offline cache.
  event.respondWith(
    fetch(event.request, { cache: 'no-cache' })
      .then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkRes;
      })
      .catch(() => caches.match(event.request))
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

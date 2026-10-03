const CACHE = 'xl-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

// Cache-first for everything, including the SQL engine and Python runtime from the CDNs,
// so lessons work offline after the first download.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const nav = e.request.mode === 'navigate';
  e.respondWith(
    caches.match(e.request, { ignoreSearch: nav }).then(hit => hit || fetch(e.request).then(res => {
      if (res && (res.ok || res.type === 'opaque')) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => nav ? caches.match('./index.html') : Response.error()))
  );
});

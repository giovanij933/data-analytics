const CACHE = 'xl-v2';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // keep the big runtime downloads from the old cache by copying them over, then drop old caches
  e.waitUntil((async () => {
    const keys = await caches.keys();
    const next = await caches.open(CACHE);
    for (const k of keys.filter(k => k !== CACHE)) {
      const old = await caches.open(k);
      for (const req of await old.keys()) {
        if (/cdnjs|jsdelivr|fonts\.g/.test(req.url)) {
          const res = await old.match(req);
          if (res) await next.put(req, res);
        }
      }
      await caches.delete(k);
    }
    await self.clients.claim();
  })());
});

// Cache-first for app files and the SQL/Python runtimes; YouTube is always fetched live (never cached).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;
  if (/youtube|ytimg|googlevideo|ggpht/.test(url)) return;
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

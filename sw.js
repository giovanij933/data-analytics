// Bump the version string whenever you change index.html so clients pick up the new shell.
const CACHE = 'isx-extract-v33';
// all ISIONXXX apps share one site and one cache storage: only ever clear this app's own old caches
const MINE = k => k.startsWith('isx-extract-') || k.startsWith('xl-');
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg', './sync.js', './ui.js', './ui.css', './apple-touch-icon.png', './icon-192.png', './icon-512.png'];

// fetch this site's own files past the browser's HTTP cache (GitHub Pages lets it keep them ~10 min), so a new
// version never installs or refreshes with the previous one's files; other sites (fonts, runtimes) as usual
const net = r => new URL(r.url).origin === location.origin ? fetch(r.url, { cache: 'no-cache' }) : fetch(r);

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // carry the big SQL/Python runtime downloads over from the old cache, then drop old caches
  e.waitUntil((async () => {
    const keys = await caches.keys();
    const next = await caches.open(CACHE);
    for (const k of keys.filter(k => MINE(k) && k !== CACHE)) {
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

// This app's own files: serve from cache, refresh in the background (stale-while-revalidate).
// Runtimes from other sites: cache-first. YouTube is always fetched live (never cached).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (/api\.github\.com|githubusercontent\.com/.test(e.request.url)) return;   // sync talks to GitHub live, never from cache
  const url = e.request.url;
  if (/youtube|ytimg|googlevideo|ggpht/.test(url)) return;
  const nav = e.request.mode === 'navigate';
  if (new URL(url).origin === location.origin) {
    e.respondWith(caches.open(CACHE).then(async cache => {
      const hit = await cache.match(e.request, { ignoreSearch: nav });
      const fresh = net(e.request).then(res => { if (res.ok) cache.put(e.request, res.clone()); return res })
        .catch(() => hit || (nav ? cache.match('./index.html') : Response.error()));
      return hit || fresh;
    }));
    return;
  }
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

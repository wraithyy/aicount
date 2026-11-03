// Network-first app shell: fresh deploys win online, cached copy keeps the PWA working offline.
const C = 'aicount-v2';
self.addEventListener('install', (e) => e.waitUntil(caches.open(C).then((c) => c.addAll(['./', 'index.html', 'manifest.json', 'icon.svg']))));
self.addEventListener('fetch', (e) => {
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then((r) => {
    const copy = r.clone();
    caches.open(C).then((c) => c.put(e.request, copy));
    return r;
  }).catch(() => caches.match(e.request)));
});

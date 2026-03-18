const CACHE = 'bit-pro-v1';
const ASSETS = ['./', './index.html', './style.css', './manifest.json', './logo.svg'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('fetch', e => {
    // Local files load from Cache (Offline); Stripe/PeerJS load from Grid (Online)
    if (e.request.url.startsWith(self.location.origin)) {
        e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
    } else {
        e.respondWith(fetch(e.request));
    }
});
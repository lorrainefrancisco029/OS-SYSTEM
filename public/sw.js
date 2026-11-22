
const CACHE = "barangay-os-v1";

const ASSETS = [
    "/",
    "/index.html",
    "/assets/manifest.json",
    "/assets/192.png",
    "/assets/barangay-hall.png",
    "/assets/brgylogo512.png",
    "/assets/bootstrap.bundle.min.js",
    "/icons/icon-192.png",
    "/icons/icon-512.png"
];

self.addEventListener("install", e => e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() =>
        self.skipWaiting())
));

self.addEventListener("activate", e => e.waitUntil(
    self.clients.claim()
));

self.addEventListener("fetch", e => {
    if (e.request.method !== "GET") return;

    e.respondWith(
        fetch(e.request).then(r => {
            const copy = r.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy));
            return r;
        }).catch(() =>
            caches.match(e.request).then(r =>
                r || caches.match("/index.html")
            )
        )
    );
});

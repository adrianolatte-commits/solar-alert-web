self.addEventListener('install', event => {
  event.waitUntil(caches.open('solar-alert-v1').then(cache => cache.addAll([
    '/', '/index.html', '/script.js', '/manifest.json'
  ])));
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request)
    .then(resp => resp || fetch(event.request)));
});

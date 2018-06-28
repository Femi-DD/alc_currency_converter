let newCacheName = 'CC_v1';

let assetsToCache = [
  '/currency-converter/',
  '/currency-converter/index.html',
  '/currency-converter/css/style.css',
  '/currency-converter/js/index.js'
];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installed.');
  event.waitUntil(
    caches.open(newCacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

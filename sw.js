let newCacheName = 'CC_v1';

let assetsToCache = [
  '/alc_currency_converter/',
  '/alc_currency_converter/index.html',
  '/alc_currency_converter/css/style.css',
  '/alc_currency_converter/js/index.js'
];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installed.');
  event.waitUntil(
    caches.open(newCacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

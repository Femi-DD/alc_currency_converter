let newCacheName = 'alc_currency_converter_v2';

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

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activated.');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((currentCacheName) => {
        if (currentCacheName !== newCacheName && currentCacheName.startsWith('alc_currency_converter')) {
          console.log('[ServiceWorker] Deleting old cache : ' + currentCacheName);
          return caches.delete(currentCacheName);
        }
      }));
    })
  );

});

self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] Fetching...');

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      } else {
        let requestClone = event.request.clone();

        fetch(requestClone).then((response) => {
          if (response.status === 404 || !response) {
            return response;
          } else {
            let responseClone = response.clone();

            caches.open(newCacheName).then((cache) => {
              cache.put(requestClone, responseClone);
            });

          }
        }).catch((error) => {
          console.log("[ServiceWorker][Error] : Error fetching and caching new request and its response" + error);
        })

      }
      return response;
    }).catch((error) => {
      console.log("[ServiceWorker][Error] : " + error);
    })

  );

});

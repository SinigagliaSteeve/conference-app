const STATIC_CACHE_NAME = 'conf-cache';


self.addEventListener('activate', function (event) {
    console.log('Activating new service worker...');
    console.log('Activating new service worker...');
    const cacheWhitelist = [STATIC_CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) < 0) {
                        return caches.delete(cacheName);
                    }
                }));
        }));
});

// active immédiatement un nouveau service worker 
self.skipWaiting();

self.addEventListener('fetch', function (event) {
    console.log('Fetching:', event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log(event.request.url, 'servi depuis le cache');
                return response;
            }
            console.log(event.request.url, 'servi depuis le réseau'); return fetch(event.request)
        })
            // rubrique à ajouter 
            .then(function (response) {
                return caches.open(STATIC_CACHE_NAME).then(cache => {
                    // mise en cache des ressources qui ne contiennent pas no.cache
                    if (event.request.url.indexOf('devfest.gdgnantes.com') < 0
                        && event.request.url.indexOf('chrome-extension') < 0
                        && event.request.url.indexOf('templates/') < 0
                        && event.request.url.indexOf('js/') < 0
                        && event.request.url.indexOf('no.cache') < 0) {
                        cache.put(event.request.url, response.clone());
                    }
                    return response;
                });
            })
            .catch(error => {
                console.log("error",error);
            })
    );
});

self.addEventListener('push', function (event) {

});

self.addEventListener('install', function (event) {
    console.log('Installation du Service Worker...');
    console.log('Mise en cache des ressources');
});
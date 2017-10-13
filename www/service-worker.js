self.addEventListener('activate', function (event) {

});

self.addEventListener('fetch', function (event) {
    console.log('Fetching:', event.request.url);
});

self.addEventListener('push', function (event) {

});
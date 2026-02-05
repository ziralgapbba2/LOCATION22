const CACHE_NAME = 'inventory-cache-v1';
const BASE_URL = 'https://ziralgapbba2.github.io/LOCATION22/';
const urlsToCache = [
  BASE_URL + 'inventory-pwa.html',
  BASE_URL + 'manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// 설치
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.log('Cache install failed:', err))
  );
  self.skipWaiting();
});

// 캐시에서 응답
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(err => fetch(event.request))
  );
});

// 오래된 캐시 삭제
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Cache names
var dataCacheName = 'QuoteClock-v0.7'
var cacheName = "QuoteClock-1.1"

// Application shell files to be cached
var filesToCache = ['/', '/index.html', '/app.js',
	'/styles.css', 'data.json', 'https://fonts.googleapis.com/css?family=Abel',
	'/images/apple-touch-icon.png', 'mstile-150x150.png', '/favicon-16x16.png',
	'/favicon-32x32.png', '/images/android-chrome-512x512.png', 
	'/images/android-chrome-192x192.png', '/images/safari-pinned-tab.svg'
]

self.addEventListener('install', function (e) {
	console.log('[ServiceWorker] Install')
	e.waitUntil(
		caches.open(cacheName).then(function (cache) {
			console.log('[ServiceWorker] Caching app shell')
			return cache.addAll(filesToCache)
		})
	)
})

self.addEventListener('activate', function (e) {
	console.log('[ServiceWorker] Activate')
	e.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== cacheName && key !== dataCacheName) {
					console.log('[ServiceWorker] Removing old cache', key)
					return caches.delete(key)
				}
			}))
		})
	)
	return self.clients.claim()
})

self.addEventListener('fetch', function (e) {
	console.log('[ServiceWorker] Fetch', e.request.url)
	e.respondWith(
		caches.match(e.request).then(function (response) {
			return response || fetch(e.request)
		})
	)
})
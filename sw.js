// Replaces the service worker that phones installed from the old address
// (/healthscope/). It deletes the old copy of the app and unregisters itself,
// so the old address only forwards to /wapicare-app/. The new app's own
// copy is named wapicare-... and is not touched.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('healthscope-')).map((k) => caches.delete(k))))
      .then(() => self.registration.unregister()),
  );
});

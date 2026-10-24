// 50K Chit Portal – service worker
// Network-first: members always get the latest version; cached copy is used only when offline.
const CACHE = 'chit-portal-v5';
const CORE = ['./', './index.html', './manifest.webmanifest', './firebase-config.js', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  // Only same-origin GET requests; Firebase / WhatsApp / CDN calls go straight to the network
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  // cache: 'no-store' skips the browser's HTTP cache, so a new GitHub upload shows up on the next open
  event.respondWith(
    fetch(req.url, { cache: 'no-store', credentials: 'same-origin' })
      .then((res) => {
        if (!res.ok) return caches.match(req).then((hit) => hit || res);
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error())))
  );
});

// ---------- Push notifications (sent by the "chit-notify" Cloud Functions) ----------
self.addEventListener('push', (event) => {
  let p = {};
  try { p = event.data ? event.data.json() : {}; } catch (e) { p = { data: { body: event.data && event.data.text() } }; }
  const d = p.data || {};
  const n = p.notification || {};
  const title = d.title || n.title || '50K Chit';
  const options = {
    body: d.body || n.body || '',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: d.tag || 'chit',
    renotify: true,
    data: { url: self.registration.scope }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Tap on a notification → open (or focus) the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || self.registration.scope;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if (c.url.startsWith(self.registration.scope) && 'focus' in c) return c.focus(); }
      return self.clients.openWindow(url);
    })
  );
});

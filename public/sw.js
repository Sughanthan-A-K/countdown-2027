self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Innum konja naatkal thaan irukku...',
    icon: data.icon || '/favicon.svg',
    vibrate: [100, 50, 100],
    data: { url: '/' }
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'Countdown 2027', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

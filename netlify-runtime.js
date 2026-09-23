(() => {
  const status = document.getElementById('networkStatus');
  const install = document.getElementById('installApp');
  let deferredInstall = null;

  function updateNetworkStatus() {
    if (!status) return;
    const online = navigator.onLine;
    status.textContent = online ? 'Online · progress saves locally' : 'Offline mode · progress still saves';
    status.classList.toggle('offline', !online);
  }

  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
  updateNetworkStatus();

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstall = event;
    if (install) install.hidden = false;
  });

  if (install) {
    install.addEventListener('click', async () => {
      if (!deferredInstall) return;
      deferredInstall.prompt();
      try { await deferredInstall.userChoice; } catch (_) {}
      deferredInstall = null;
      install.hidden = true;
    });
  }

  window.addEventListener('appinstalled', () => {
    deferredInstall = null;
    if (install) install.hidden = true;
  });

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').catch((error) => {
        console.warn('Service worker registration failed:', error);
      });
    });
  }
})();

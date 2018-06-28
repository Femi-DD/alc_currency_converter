if (!navigator.serviceWorker) {
  console.log('ServiceWorker not Supported');
}

navigator.serviceWorker.register('/currency-converter/sw.js').then((reg) => {
  console.log('ServiceWorker Registration Successful. Scope : ' + reg.scope);
}).catch((error) => {
  console.log('ServiceWorker Registration failed. Error : ' + error);
});

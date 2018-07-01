let dbPromise = idb.open('currency_converter', 11, (upgradeDb) => {

   const keyValStore = upgradeDb.createObjectStore('currencies');
   const keyValStore1 = upgradeDb.createObjectStore('exchangeRates');

});

dbPromise.then((db) => {

   fetch('https://free.currencyconverterapi.com/api/v5/currencies')
      .then(res => res.json())
      .then(response => {

         const tx = db.transaction('currencies', 'readwrite');
         let keyValStore = tx.objectStore('currencies');

         for (let id in response.results) {
            keyValStore.put(id, response.results[id].currencyName);
         }

      }).catch(error => console.log(error));

}).then(() => {

   console.log('data added!');

}).catch((error) => {

   console.log(error);

});
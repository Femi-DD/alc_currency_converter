let dbPromise = idb.open('currency_converter', 22, (upgradeDb) => {
      // switch (upgradeDb.oldVersion) {
      // 	case 0:
      // 		console.log('Creating the currencies object store');
      // 		upgradeDb.createObjectStore('currencies');
      // 	case 1:
      // 		console.log('Creating the exchangeRates object store');
      // 		upgradeDb.createObjectStore('exchangeRates'); { unique: true });
      // }
      const keyValStore = upgradeDb.createObjectStore('currencies');
      keyValStore.createIndex('id', 'id');
      const keyValStore1 = upgradeDb.createObjectStore('exchangeRates');

});

dbPromise.then((db) => {

      fetch('https://free.currencyconverterapi.com/api/v5/currencies')
            .then(res => res.json())
            .then(response => {

                  const tx = db.transaction('currencies', 'readwrite');
                  let keyValStore = tx.objectStore('currencies');

                  for (let id in response.results) {
                        keyValStore.put(response.results[id], id);
                  }
                  return response.json();
            }).catch(error => console.log(error));

}).then(() => {

      console.log('[ObjectStore][Currencies] : All currencies have been saved!');

}).catch((error) => {

      console.log(error);

});




function getParams() {
      const fromCurrency = document.getElementById('from').value;
      const toCurrency = document.getElementById('to').value;
      const valueToConvert = document.getElementById('to_convert').value;

      return { fromCurrency: fromCurrency, toCurrency: toCurrency, valueToConvert: valueToConvert };
}




dbPromise.then((db) => {
      const tx = db.transaction('currencies');
      const keyValStore = tx.objectStore('currencies');
      let index = keyValStore.index('id');
      return index.getAll();
}).then((allCurrencies) => {
      let fromSelect = document.getElementById('from');
      let toSelect = document.getElementById('to');
      console.log('data' + allCurrencies);

      for (let id in allCurrencies) {
            let currencyName = allCurrencies.currencyName;

            let optionFrom = document.createElement("option");
            let optionTo = document.createElement("option");

            optionFrom.setAttribute('id', id);
            optionFrom.text = currencyName + " " + id;

            optionTo.setAttribute('id', id);
            optionTo.text = currencyName + " " + id;

            fromSelect.add(optionFrom);
            toSelect.add(optionTo);
      }

}).catch((error) => {
      console.log('[ObjectStore][Currencies] : An error occured reading currencies from the daatabase.');
});
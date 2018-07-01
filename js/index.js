fetch('https://free.currencyconverterapi.com/api/v5/currencies').then(res => res.json()).then(data => {

   let fromSelect = document.getElementById('from');
   let toSelect = document.getElementById('to');

   for (let id in data.results) {
      let currencyName = data.results[id].currencyName;

      let optionFrom = document.createElement("option");
      let optionTo = document.createElement("option");

      optionFrom.setAttribute('id', id);
      optionFrom.text = id + " " + currencyName;

      optionTo.setAttribute('id', id);
      optionTo.text = id + " " + currencyName;

      fromSelect.add(optionFrom);
      toSelect.add(optionTo);
   }
}).catch(err => console.log(err));
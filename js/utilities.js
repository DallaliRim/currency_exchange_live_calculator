/**
 * This function initializes the select options data, it fetches 
 * data from the currency.json file and stores the name of the
 * currency into an array that will then be looped through in 
 * order to initialize the options.
 * @return {Promise}
 */
function initialize_Select_Options_data() {
  let currencyfile = "./json/currency.json";
  let base_currency_selection = document.querySelector("#base_currency_select");
  let to_currency_selection = document.querySelector("#to_currency_select");
  fetch(currencyfile)
  .then(result => {return result.json()})
  .then(data => {
    for(let currency of Object.entries(data)) {
      dropdownOptions.push(currency[1]);

      let optionFrom = document.createElement("option");
      let optionTo = document.createElement("option");

      optionFrom.innerHTML = currency[1].name;
      optionTo.innerHTML = currency[1].name;

      to_currency_selection.append(optionFrom);
      base_currency_selection.append(optionTo);
    }
  })
  .catch((error) =>{
    console.log("An error has occured, please check the currency path : ", error);
  })
}

/**
 * This function creates the absolute request url that will be used
 * to fetch the data necessary to the conversion. The absolute url
 * is build according to the user inputs (from and to conversion) 
 * along with the desired amount. The main URL does not get affected
 * by the user.
 */
function  getAbsoluteRequestURL() {
  let convertbtn = document.querySelector("#get_data_btn");
  convertbtn.addEventListener("click", () => {
    urlObject = {
      'mainURL': 'https://api.exchangerate.host/convert',
      'fromQry': document.querySelector("#base_currency_select").value,
      'toQry': document.querySelector("#to_currency_select").value,
      'amountQry': document.querySelector("#amount").value,
    }

    let codeFrom = dropdownOptions.find(currency => {
      return currency.name == urlObject.fromQry;
    })
    let codeTo = dropdownOptions.find(currency => {
      return currency.name == urlObject.toQry;
    })

    absoluteURL = urlObject.mainURL + `?from=${codeFrom.code}&to=${codeTo.code}&amount=${urlObject.amountQry}`;
    getData(absoluteURL);
  });
}

/**
 * This function executes everytime the getData() function executes.
 * It creates a table and adds a row to it everytime a conversion is
 * added by the user when the button "convert" is clicked.
 * @param {Object} response 
 */
function displayResults(response) {
  d = new Date() +"";
  let info = [response.query.from, response.query.to, response.info.rate, response.query.amount, response.result, d.substring(0,25)];
  allConversionsArray.push(info);
  const row = document.createElement('tr');
  table.appendChild(row);

  for (let i = 0; i < info.length; i++) {
    const column = document.createElement('td');
    row.appendChild(column);
    let cellContent = info[i];
    column.innerHTML = cellContent;
  }
}

/**
 * This function validates the amount of money the user intends
 * to convert, it makes sure the amount is over 0 but bellow 
 * remains below 999999999999.99 as per the instructions.
 */
function validateAmount() {
  let amountInput = document.querySelector("#amount");
  let convertbtn = document.querySelector("#get_data_btn");
  amountInput.value = 0;
  convertbtn.disabled=true;
  amountInput.addEventListener("change", ()=> {
    convertbtn.disabled=true;
    if(amountInput.value > 0 && amountInput.value < 999999999999.99) {
      convertbtn.disabled=false;
    }
  })
}
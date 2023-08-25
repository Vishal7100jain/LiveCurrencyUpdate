//Vishal Developer
// Import the Freecurrencyapi class from the appropriate module
import Freecurrencyapi from './node_modules/@everapi/freecurrencyapi-js/index.js'; // Update the path accordingly
import FlagsDetials from './Flags.js'; // Fetching Flags 
const freecurrencyapi = new Freecurrencyapi('fca_live_CxBgeetnMIwYInbDGi4xQTDBeo1ogJEWzkaCwmYA');

// Selecting the Select to change its value based on choise
let countryCodeValueTo = document.getElementById("to");
let countryCodeValueFrom = document.getElementById("From");
let convertedValue = document.getElementById("Main-Converted-value")
let countryCodeToConvert = document.getElementById("country-code-to-convert")
let countryCodeFromConvert = document.getElementById("country-code-from-convert")

//array to store the changed code value to reserve it
let codeValueToArry = ["IND"]
let codeValueFromArry = ["USD"]

// function to update the currency 
function UpdateCurrency() {
  countryCodeValueTo.addEventListener("change", (e) => {
    codeValueToArry.push(e.target.value)
    // Currency update code using freecurrencyapi
    if (e.target.value == "Non") {
      countryCodeToConvert.innerHTML = ""
      convertedValue.innerHTML = "error"

    } else {
      freecurrencyapi.latest({
        base_currency: `${e.target.value}`,
        currencies: `${codeValueFromArry[codeValueFromArry.length - 1]}`
      }).then(response => {
        console.log(response.data)
        // access to the value of converted value
        let firstKey = Object.keys(response.data)[0];
        let firstKeyValue = response.data[firstKey];

        //print the converted value
        countryCodeToConvert.innerHTML = e.target.value
        convertedValue.innerHTML = firstKeyValue
        toCheckSameCountryCode()
      });
    }
  });

  countryCodeValueFrom.addEventListener("change", (e) => {
    codeValueFromArry.push(e.target.value)

    // Currency update code using freecurrencyapi
    if (e.target.value == "Non") {
      countryCodeFromConvert.innerHTML = null
      convertedValue.innerHTML = "error"
    } else {
      freecurrencyapi.latest({
        base_currency: `${codeValueToArry[codeValueToArry.length - 1]}`,
        currencies: `${e.target.value}`
      }).then(response => {
        // access to the value of converted value
        let firstKey = Object.keys(response.data)[0];
        let firstKeyValue = response.data[firstKey];
        //print the converted value
        countryCodeFromConvert.innerHTML = e.target.value
        convertedValue.innerHTML = firstKeyValue

        toCheckSameCountryCode()
      });
    }
  });

}

// function to check if the both To, From country are code are same or not 
function toCheckSameCountryCode() {
  if (codeValueToArry[codeValueToArry.length - 1] == codeValueFromArry[codeValueFromArry.length - 1]) {
    convertedValue.innerHTML = 1
  }

  else if (
    (
      (codeValueFromArry[codeValueFromArry.length - 1] == "INR") &&
      (codeValueToArry[codeValueToArry.length - 1] == "IND")
    )
    ||
    (
      (codeValueToArry[codeValueToArry.length - 1] == "USD") &&
      (codeValueFromArry[codeValueFromArry.length - 1] == "USD")
    )
  ) {
    convertedValue.innerHTML = 1
  }
}

// function to reserve the selected country
// function reverseCountryCode() {
//     let ReverseBtn = document.getElementById("reverse")
//     ReverseBtn.addEventListener("click", () => {

//     })
// }

let lastestCountryCode = "INR"
function UpdateAllCurrency() {
  let CodeAllLive = document.getElementById("CodeAllLive");
  let AllValuesCode = document.querySelectorAll("#AllValuesCode");

  CodeAllLive.addEventListener("change", (e) => {
    //code to update the value of currency based on user input
    freecurrencyapi.latest({
      base_currency: `${e.target.value}`,
      currencies: [`INR`, `USD`, `EUR`, `JPY`, `BGN`, `CZK`, `DKK`, `GBP`, `HUF`, `PLN`, `RON`, `SEK`, `CHF`, `ISK`, `NOK`, `HRK`, `RUB`, `TRY`, `AUD`, `BRL`, `CAD`, `CNY`, `HKD`, `IDR`, `ILS`, `KRW`, `MXN`, `MYR`, `NZD`, `PHP`, `SGD`, `THB`, `ZAR`]
    }).then(response => {
      // access to the keys and Values from converted Country code 
      let keys = Object.keys(response.data)
      let Values = Object.values(response.data)

      //selecting html element to print values of country code based on users input
      let AllConvertedValues = document.querySelectorAll("#Converted-value")
      let AllConvertedKeys = document.querySelectorAll("#country-code-for-all")

      //using for loop to print keys and values one by one
      for (let i = 0; i < AllConvertedValues.length; i++) {
        //getting country code which is converted (both Values and keys)
        let key = keys[i]
        let Value = Values[i]
        let AllConvertedKey = AllConvertedKeys[i]
        let AllConvertedValue = AllConvertedValues[i]
        // print the converted value
        AllConvertedKey.innerHTML = key
        AllConvertedValue.innerHTML = Value
      }
      toCheckSameCountryCode()
    });

    //code to change the HTML text based on user input
    let codeValueHTML = e.target.value
    for (let i = 0; i < AllValuesCode.length; i++) {
      let AllCode = AllValuesCode[i]
      AllCode.innerHTML = e.target.value
    }

    //logic to remove the equal country code
    let countryCodeForAll = document.querySelectorAll("#country-code-for-all")
    // Hide the previously selected code
    for (let i = 0; i < countryCodeForAll.length; i++) {
      let countryCodeElement = countryCodeForAll[i];
      let countryCodeinnerhtml = countryCodeElement.innerHTML;

      if (codeValueHTML === countryCodeinnerhtml) {
        countryCodeElement.parentElement.parentElement.style.display = "none";
      }
    }

    // Show the last selected code
    for (let i = 0; i < countryCodeForAll.length; i++) {
      let countryCodeElement = countryCodeForAll[i];
      let countryCodeinnerhtml = countryCodeElement.innerHTML;

      if (lastestCountryCode === countryCodeinnerhtml) {
        countryCodeElement.parentElement.parentElement.style.display = "flex";
      }
    }
    lastestCountryCode = codeValueHTML; // Update the last selected code

    //print Flags in AllLive currency update
    let countryFlagsAllLive = document.getElementById("country-Flags-allLive")
    for (let i = 0; i < FlagsDetials.length; i++) {
      let objs = FlagsDetials[i]
      if (e.target.value == objs.code) {
        let flags = objs.flag
        countryFlagsAllLive.src = flags
      } else if (e.target.value == "Non") {
        countryFlagsAllLive.src = ""
      }
    }
  })

}

//function to fetch the flags and display it
function updateFlagImg() {
  //selecting To and From select to print the flags based on selected country currency code
  let countryFlagsTo = document.getElementById("country-Flags-To")
  let countryFlagsFrom = document.getElementById("country-Flags-From")
  let CodeAllLive = document.getElementById("CodeAllLive");

  //print flags in To select 
  countryCodeValueTo.addEventListener("change", (e) => {
    for (let i = 0; i < FlagsDetials.length; i++) {
      let objs = FlagsDetials[i]
      if (e.target.value == objs.code) {
        let flags = objs.flag
        countryFlagsTo.src = flags
      } else if (e.target.value == "Non") {
        countryFlagsTo.src = ""
      }
    }
  })

  //print flags in From select 
  countryCodeValueFrom.addEventListener("change", (e) => {
    for (let i = 0; i < FlagsDetials.length; i++) {
      let objs = FlagsDetials[i]
      if (e.target.value == objs.code) {
        let flags = objs.flag
        countryFlagsFrom.src = flags
      } else if (e.target.value == "Non") {
        countryFlagsFrom.src = ""
      }
    }
  })
}


let alert = document.getElementById("alert")
let Notification = document.getElementById("Notification")
Notification.addEventListener("click", () => {
  alert.setAttribute("id", "alertAnimation")
  setTimeout(() => {
    alert.setAttribute("id", "alert")
  }, 6000)
})

updateFlagImg()
UpdateCurrency();
UpdateAllCurrency()
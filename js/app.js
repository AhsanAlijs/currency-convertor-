// main.js
import { country_list } from './country-list.js'; // Adjust the path accordingly
const apiKey = '151700b544b27d619b90a025';
const dropList = document.querySelectorAll('.drop-list select');
const fromCurrency = document.querySelector('.from select');
const toCurrency = document.querySelector('.to select');
const button = document.querySelector('form button');
let currency_code = [];
let code;
for (let i = 0; i < dropList.length; i++) {
    for (code in country_list) {
        currency_code.push(code);
        let selected;
        if (i == 0) {
            selected = code == "USD" ? "selected" : ''
        } else if (i == 1) {
            selected = code == "NPR" ? "selected" : ''
        }
        let optionTag = `<option value="${code}"${selected}>${code}</option>`;
        dropList[i].insertAdjacentHTML('beforeend', optionTag);
    }
    dropList[i].addEventListener('change', e => {
        loadFlag(e.target)
    });
}
function loadFlag (element){
for(code in country_list){
    if(code == element.value){
        let imgTAg = element.parentElement.querySelector('img');
        imgTAg.src=`https://flagsapi.com/${country_list[code]}/flat/64.png`
    }
}
}
window.addEventListener('load', e => {
    e.preventDefault();
    getExchangeRate();
})
button.addEventListener('click', e => {
    e.preventDefault();
    getExchangeRate();
})
const exchangeIcon = document.querySelector('.drop-list .icon');
exchangeIcon.addEventListener('click',()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate()
})
function getExchangeRate() {
    const amount = document.querySelector('.amount input');
    const exchangeRateText = document.querySelector('.exchange-rate');
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateText.innerHTML = 'Getting Exchange Rate...'
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`

    fetch(url).then(res => res.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        console.log(totalExchangeRate);
        exchangeRateText.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
    }).catch(()=>{
        exchangeRateText.innerHTML = "Something Went Wrong"
    })
}
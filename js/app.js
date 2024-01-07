// main.js
import { country_list } from './country-list.js'; // Adjust the path accordingly

const dropList = document.querySelectorAll('.drop-list select');
const button = document.querySelector('form button')
let currency_code = [];

for (let i = 0; i < dropList.length; i++) {
    for (let code in country_list) {
        currency_code.push(code);
        let selected;
        if (i == 0) {
            selected = code == "USD" ? "selected":''
        }else if(i==1){
            selected = code == "NPR" ? "selected":''
        }
        let optionTag = `<option value="${code}"${selected}>${code}</option>`;
        dropList[i].insertAdjacentHTML('beforeend', optionTag);
    }
}

button.addEventListener('click',e=>{
    e.preventDefault();
    getExchangeRate();
})
function getExchangeRate(){
    const amount = document.querySelector('.amount input');
    let amountVal=amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
        
    }

    

}
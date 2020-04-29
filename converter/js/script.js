"use strict";

let currency = [
    {
        currencyAbbr: "USD",
        currencyName: "USD – долар",
        currencyK: 1
    },
    { 
        currencyAbbr: "EUR",
        currencyName: "EUR – євро",
        currencyK: 0.9239
    },
    {  
        currencyAbbr: "RUB",    
        currencyName: "RUB – рубль",
        currencyK: 80.2335
    },
    {
        currencyAbbr: "GBP",
        currencyName: "GBP – фунт стерлінгів",
        currencyK: 0.8603
    },
    {
        currencyAbbr: "CHF",
        currencyName: "CHF – швейцарський франк",
        currencyK: 0.9742
    },
    {
        currencyAbbr: "PLN",
        currencyName: "PLN – польський злотий",
        currencyK: 4.2086
    },
    {
        currencyAbbr: "JPY",
        currencyName: "JPY – японська ієна",
        currencyK: 109.6702
    },
    {
        currencyAbbr: "UAH",
        currencyName: "UAH – гривня",
        currencyK: 27.8025
    },
    {
        currencyAbbr: "CAD",
        currencyName: "CAD – канадський долар",
        currencyK: 1.4453
    },
    {
        currencyAbbr: "AUD",
        currencyName: "AUD – австралійський долар",
        currencyK: 1.7215
    },
    {
        currencyAbbr: "GEL",
        currencyName: "GEL – грузинський ларі",
        currencyK: 3.1404
    },
    {
        currencyAbbr: "MDL",
        currencyName: "MDL – молдавський лей",
        currencyK: 17.8817
    },
    {
        currencyAbbr: "CNY",
        currencyName: "CNY – китайський юань",
        currencyK: 7.1110
    },
    {
        currencyAbbr: "DKK",
        currencyName: "DKK – датська крона",
        currencyK: 6.9042
    },
    {
        currencyAbbr: "NOK",
        currencyName: "NOK – норвезька крона",
        currencyK: 11.4221
    },
    {
        currencyAbbr: "SEK",
        currencyName: "SEK – шведська крона",
        currencyK: 10.2881
    },
    {
        currencyAbbr: "BYR",
        currencyName: "BYR – білоруський рубль",
        currencyK: 2.5649
    },
    {
        currencyAbbr: "CZK",
        currencyName: "CZK – чеська крона",
        currencyK: 25.5350
    }
];

let buttons = [document.getElementById('toConverter'), document.getElementById('convertered')];
let inputs = [document.getElementById('toConverterInput'), document.getElementById('converteredInput')];

let reverseButton = document.getElementById('reverseButton');
let currencyTable = document.getElementById('currencyTable');

let currentNumber = [0, 7];

let resultSpan = document.getElementById('resultSpan');

// встановлюємо базові дані
setData(buttons[0], currentNumber[0]);
setData(buttons[1], currentNumber[1]);

// заповнюємо таблицю можливими конвертаціями
currency.forEach((element, index) => {
    let button = document.createElement('button');

    button.classList.add('currency__button');
    button.innerText = currency[index].currencyName;

    // вибір валюти для конвертації
    button.onclick = function(){
        let temp = currentNumber[+currencyTable.getAttribute('data-button-called')]; 
        currentNumber[+currencyTable.getAttribute('data-button-called')] = index;   

        if(currentNumber[0] == currentNumber[1]){
            currentNumber[+currencyTable.getAttribute('data-button-called')] = temp;
            reverse();
        } else {
            setData(buttons[+currencyTable.getAttribute('data-button-called')], index);     
        }

        if(inputs[0].value != ""){
            resultSpan.innerText = `ви отримаєте ${calcResult(0, 1)}`;
        } else if(inputs[1].value != ""){
            resultSpan.innerText = `для операції потрібно ${calcResult(1, 0)}`;
        }

        currencyTable.classList.toggle('currency_show');
    }

    currencyTable.append(button);
});

// відкриття вікна валюти для конвертації
buttons.forEach((element, index)=> {
    element.onclick = function() {
        currencyTable.classList.toggle('currency_show');
        currencyTable.setAttribute('data-button-called', index);
    }
});

// зміна валюти місцями
reverseButton.onclick = reverse;

// вираховування результату
inputs[0].addEventListener('input', function (){
    resultSpan.innerText = `ви отримаєте ${calcResult(0, 1)}`;
});

inputs[1].addEventListener('input', function (){
    resultSpan.innerText = `для операції потрібно ${calcResult(1, 0)}`;
});

inputs[0].onfocus = function (){
    inputs[1].value = '';
    resultSpan.innerText = "";

    if(inputs[0].value != ""){
        resultSpan.innerText = `ви отримаєте ${calcResult(0, 1)}`;
    }
}
inputs[1].onfocus = function (){
    inputs[0].value = '';
    resultSpan.innerText = "";
    
    if(inputs[1].value != ""){
        resultSpan.innerText = `для операції потрібно ${calcResult(1, 0)}`;
    }
}


function setData(button, currentNumber){
    button.innerText = currency[currentNumber].currencyName;
    button.setAttribute('data-currency', currentNumber);
}

function reverse(){
    let temp = currentNumber[0];

    currentNumber[0] = currentNumber[1];
    currentNumber[1] = temp;

    setData(buttons[0], currentNumber[0]);
    setData(buttons[1], currentNumber[1]);

    if(inputs[0].value != ""){
        resultSpan.innerText = `ви отримаєте ${calcResult(0, 1)}`;
    } else if(inputs[1].value != ""){
        resultSpan.innerText = `для операції потрібно ${calcResult(1, 0)}`;
    }
}

function calcResult(first, second){
    let value = +inputs[first].value;

    let inUSD = value / currency[currentNumber[first]].currencyK;
    let result = inUSD * currency[currentNumber[second]].currencyK;

    result = result.toFixed(4) + ` (${currency[currentNumber[second]].currencyAbbr})`;    

    return result;
}
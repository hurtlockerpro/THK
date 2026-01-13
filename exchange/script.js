//  https://v6.exchangerate-api.com/v6/199dd6357bc96f840d04f728/latest/USD
// API Key: 199dd6357bc96f840d04f728
// echange  https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP
//https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP/AMOUNT

const apiKey = '199dd6357bc96f840d04f728';
const apiUrl = `https://v6.exchangerate-api.com/v6`;

const apiExchangePath = '/pair'
const apiSupportedCodesPath = '/codes'

const currency_one = document.getElementById('currency_one');
const currency_two = document.getElementById('currency_two');
const currency_ammount = document.getElementById('currency_ammount');
const btnConvert = document.getElementById('btnConvert');
const conversion_result = document.getElementById('conversion_result');

async function getApiData(path, option = {}) {
    const url = `${apiUrl}/${apiKey}/${path}`;
    const response = await fetch(url, option);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}


getApiData(apiSupportedCodesPath).then(data => {
    //console.log(data.supported_codes);
     data.supported_codes.forEach(supported_code => {
        //console.log(supported_code[0] + ' - ' + supported_code[1]);
        currency_one.innerHTML += creteCustomElement('option', {
            values: [
                {value: supported_code[0], content: supported_code[0] + ' - ' + supported_code[1]},
            ]})
        currency_two.innerHTML += creteCustomElement('option', {
            values: [
                {value: supported_code[0], content: supported_code[0] + ' - ' + supported_code[1]},
            ]})
    })
})

/*
{
    values: [
        {value: 'value1', content: 'Hello World'},
    ],
    css: []
    options: []
}
*/
function creteCustomElement(tagName, options = {}) {
    const element = document.createElement(tagName);
    
    if (options.values && options.values.length > 0) {
        options.values.forEach(option => {
            element.value = option.value;
            element.textContent = option.content;
        });
    }
    if (options.css && options.css.length > 0) {
        options.css.forEach(cssClass => {
            element.classList.add(cssClass);
        });
    }

    return element.outerHTML;
}

/*
console.log(
  creteCustomElement('div', 
    {
        //values: [{value: 'value1', content: 'Hello World'}],
        css: ['class1', 'class2']
    }
)
);
*/


btnConvert.addEventListener('click', (event) => {
    
    const currency_1 = currency_one.value;
    const currency_2 = currency_two.value;
    console.log('selected', currency_1, currency_2);

    if (currency_ammount.value === '' || isNaN(currency_ammount.value) || parseFloat(currency_ammount.value) <= 0) {
        //alert('Please enter a valid amount');
        currency_ammount.style.border = '2px solid red';
        return;
    } else {
        currency_ammount.style.border = '';
    }

    const exchangePath = `${apiExchangePath}/${currency_1}/${currency_2}`;
    getApiData(exchangePath).then(data => {
        console.log(data); 

        const conversion_ammount = data.conversion_rate * parseFloat(currency_ammount.value)
        
        const row_1 = creteCustomElement('div', {
            values: [
                {value: '', content: `Conversion Rate: 1 ${currency_1} = ${data.conversion_rate} ${currency_2}`},
            ],
            css: ['alert', 'alert-light', 'mt-3']
        })
        const row_2 = creteCustomElement('div', {
            values: [
                {value: '', content: `Conversion Result: ${conversion_ammount} ${currency_2}`},
            ],
            css: ['alert', 'alert-light', 'mt-3']
        })

        conversion_result.innerHTML = row_1 + row_2;


    });

});

const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key from exchangerate-api.com
const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const switchBtn = document.getElementById('switch-btn');
const resultDiv = document.getElementById('result');

async function convertCurrency() {
    const amount = amountInput.value;
    const from = fromSelect.value;
    const to = toSelect.value;
    if (!amount || !from || !to) {
        resultDiv.textContent = 'Please fill in all fields';
        return;
    }
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`);
        const data = await response.json();
        if (data.result === 'success') {
            resultDiv.textContent = `${amount} ${from} = ${data.conversion_result} ${to}`;
        } else {
            resultDiv.textContent = 'Conversion failed';
        }
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }
}

function switchCurrencies() {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
}

convertBtn.addEventListener('click', convertCurrency);
switchBtn.addEventListener('click', switchCurrencies);

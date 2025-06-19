'use strict';

const customTip = document.getElementById('tip-custom');
const inputRadios = document.querySelectorAll('input[type="radio"]');
const inputBill = document.getElementById('bill');
const inputPeople = document.getElementById('people');
const errorMessage = document.querySelector('.error-message');
const resetButton = document.querySelector('.reset-button');
const tipAmountText = document.getElementById('tip-amount');
const totalText = document.getElementById('total');

const data = {
    tipPercentage: 0,
    bill: 0,
    people: 0,
}

function validateInput(data) {
    for (const key in data) {
        if (data[key] === 0 || isNaN(data[key]) || data[key] < 0) {
            return false;
        }
    }
    return true;
}

inputRadios.forEach((input) => {
    input.addEventListener('click', (e) => {
        data.tipPercentage = parseFloat(e.target.value);
        updateUI();
    });
});

customTip.addEventListener('focus', (e) => {
    inputRadios.forEach((input) => {
        input.checked = false;
    });
});

customTip.addEventListener('input', (e) => {
    data.tipPercentage = parseFloat(e.target.value);
    updateUI();
});

inputBill.addEventListener('input', (e) => {
    data.bill = parseFloat(e.target.value);
    updateUI();
});

inputPeople.addEventListener('input', (e) => {
    data.people = parseFloat(e.target.value);
    if (data.people === 0) {
        errorMessage.classList.add('active');
    } else {
        errorMessage.classList.remove('active');
        updateUI();
    }
});

function calculateTip() {
    return (data.bill * data.tipPercentage) / 100 / data.people;
}

function calculateTotal(tipAmount) {
    return data.bill / data.people + tipAmount;
}

function updateUI() {
    if (validateInput(data)) {
        const tipAmount = calculateTip();
        const total = calculateTotal(tipAmount);
        tipAmountText.textContent = `$${tipAmount.toFixed(2)}`;
        totalText.textContent = `$${total.toFixed(2)}`;
        resetButton.disabled = false;
    } else {
        tipAmountText.textContent = '$0.00';
        totalText.textContent = '$0.00';
        resetButton.disabled = true;
    }
}

function reset() {
    data.tipPercentage = 0;
    data.bill = 0;
    data.people = 0;
    inputRadios.forEach((input) => {
        input.checked = false;
    });
    customTip.value = '';
    inputBill.value = '';
    inputPeople.value = '';
    updateUI();
}

resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    reset();
});

const formSelect = document.querySelectorAll('.formSelect');
const legSelect = document.querySelector('#legSelect');
const orderReview = document.querySelector('.orderReview')
const totalPriceNode = document.querySelector('.total');

let unitPrice = 779;
let quantity = 1;
const orderLog = {};

const extraCosts = {
    'Steelcut Trio (+£30.00)': 30,
    'In Same Fabric, Group 4 (+£109.00)': 109
};

function validateForm(event) {
    const elementClasses = [...event.target.classList];

    if (elementClasses.includes('inactive')) {
        event.preventDefault();
        [...formSelect]
            .filter(element => {
                return ![...element.classList].includes('inactive')
            })
            .forEach(element => {
                if (!element.value || element.value === 'None') {
                    const required = getSibling(element, 'required')
                    required.style.visibility = 'visible';
                    element.style.border = '2px solid #d0021b'
                }
            })
    }
}

function handleSelect(event) {
    if (event.target.value) {
        const element = event.target;

        updateOrderReview(element);
        updateUnitPrice();
        updateTotalPrice();

        element.style.border = 'none';
        const required = getSibling(element, 'required')
        required.style.visibility = 'hidden';
        const parent = event.target.parentElement;
        const nextSelect = parent.nextElementSibling;
        if (nextSelect) {
            nextSelect.children[0].classList.remove('inactive');
            nextSelect.children[2].classList.remove('inactive');
        } else {
            orderReview.style.display = 'block';
            totalPriceNode.style.visibility = 'visible';
        }
    }
}

function getSibling(element, sibClass) {
    const parent = element.parentElement;
    return [...parent.children].filter(child => {
        return [...child.classList].includes(sibClass)
    })[0];
}

function updateOrderReview(element) {
    const formLabel = getSibling(element, 'formLabel');
    const label = formLabel.innerText
    orderLog[label] = element.value;
    const pNode = document.getElementById(label);
    pNode.innerHTML = `<span class="reviewLabel">${label} </span> ${orderLog[label]}`
}

function updateUnitPrice() {
    let price = 779;
    Object.values(orderLog).forEach(item => {
        if (extraCosts[item]) {
            price += extraCosts[item];
        }
    })
    unitPrice = price;
    const priceToString = `£${unitPrice.toFixed(2)}`
    const unitPriceNode = document.getElementById('unitPrice');
    unitPriceNode.innerHTML = `<span class="priceLabel">Unit Price: </span> ${priceToString}`
}

function updateTotalPrice() {
    const totalPriceString = `${(unitPrice * quantity).toFixed(2)}`
    totalPriceNode.innerHTML = `<span class="priceLabel">Total </span><span style="font-size:22px;">£</span>${totalPriceString}`
}

formSelect.forEach(element => {
    element.addEventListener('mousedown', validateForm)
    element.addEventListener('change', handleSelect)
})
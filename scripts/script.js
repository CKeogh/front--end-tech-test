const formSelect = document.querySelectorAll('.formSelect');
const legSelect = document.querySelector('#legSelect');
const orderReview = document.querySelector('.orderReview')
const totalPriceNode = document.querySelector('.total');
const quantityIncButton = document.querySelector('#quantityInc');
const quantityDecButton = document.querySelector('#quantityDec');
const quantityDisplay = document.querySelector('.quantityDisplay');
const addToBasket = document.querySelector('.addToBasket');

let unitPrice = 779;
const orderLog = {
    quantity: 1,
};

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
                return ![...element.classList].includes('inactive');
            })
            .forEach(element => {
                if (!element.value || element.value === 'None') {
                    const required = getSibling(element, 'required');
                    required.style.visibility = 'visible';
                    element.style.border = '2px solid #d0021b';
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

        element.style.border = '1px #cccccc solid';
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
            addToBasket.style.backgroundColor = '#250858'
        }
    }
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
    const totalPrice = unitPrice * orderLog.quantity;
    orderLog.totalPrice = totalPrice;
    totalPriceNode.innerHTML = `<span class="priceLabel">Total </span><span style="font-size:22px;">£</span>${totalPrice.toFixed(2)}`
}

function changeQuantity(amount) {
    if (orderLog.quantity + amount != 0) {
        orderLog.quantity += amount;
    }
    updateTotalPrice();
    quantityDisplay.value = orderLog.quantity;
}

function handleSubmit() {
    if (Object.keys(orderLog).length === 6) {
        console.log(orderLog)
    }
}

function getSibling(element, sibClass) {
    const parent = element.parentElement;
    return [...parent.children].filter(child => {
        return [...child.classList].includes(sibClass)
    })[0];
}

formSelect.forEach(element => {
    element.addEventListener('mousedown', validateForm)
    element.addEventListener('change', handleSelect)
})

quantityIncButton.addEventListener('click', () => { changeQuantity(1) })
quantityDecButton.addEventListener('click', () => { changeQuantity(-1) })
addToBasket.addEventListener('click', handleSubmit);
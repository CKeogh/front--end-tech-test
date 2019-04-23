
const formSelect = document.querySelectorAll('.formSelect');
const legSelect = document.querySelector('#legSelect');
const orderReview = document.querySelector('.orderReview')

let totalPrice = 779;
const extraCosts = {
    'Steelcut Trio': 30,
    'In Same Fabric, Group 4': 109
};
const orderLog = {};

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

        const { value } = element;
        totalPrice += extraCosts[value]
            ? extraCosts[value]
            : 0;

        updateOrderReview(element);

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

// function calculateUnitPrice() {

// }

formSelect.forEach(element => {
    element.addEventListener('mousedown', validateForm)
    element.addEventListener('change', handleSelect)
})
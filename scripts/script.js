// import { navigation, aList } from '../api';

const navigation = [
    'Furniture',
    'Lighting',
    'Home Accessories',
    'Collections',
    'Gifts',
    'Outlet',
    'Brands',
    'Blog',
    'About',
    'Our Stores'
]

function populateNavBar() {
    const navBar = document.querySelector('.navList')
    navigation.forEach(item => {
        let node = document.createElement('LI')
        let link = document.createElement('A')
        link.setAttribute('href', '#')
        let text = document.createTextNode(item)
        link.appendChild(text)
        node.appendChild(link);
        node.classList.add('navItem');
        navBar.appendChild(node);
    })
}

populateNavBar();
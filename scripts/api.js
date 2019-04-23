
// placeholder api request
const request = {
    navigation: [
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
    ],
    route: [
        'Home',
        'Hay About A Lounge Chair - Low AAL82'
    ],
}

function populateNavBar() {
    const navBar = document.querySelector('.navList')
    request.navigation.forEach(item => {
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

function createRouteString(route) {
    return route.reduce((routeString, page, i) => {
        routeString += i === route.length - 1
            ? `${page}`
            : `${page} » `
        return routeString;
    }, '')
}

function populateRoute() {
    const routeElement = document.querySelector('.route');
    const routeString = createRouteString(request.route);
    const text = document.createTextNode(routeString);
    routeElement.appendChild(text);
}

// function populateDropdown(id, contents) {
//     const formSelect = document.querySelector(id);
//     contents.forEach(item => {
//         const option = document.createElement('div');
//         option.classList.add('formOption');
//         const fabricImage = document.createElement('img');
//         option.appendChild(fabricImage);
//         const formText = document.createElement('div')
//         const text = document.createTextNode(item.name);
//         formText.appendChild(text);
//         fabricImage.src = item.image;
//         option.appendChild(fabricImage);
//         option.appendChild(formText);
//         formSelect.appendChild(option);
//     })
// }

populateNavBar();
populateRoute();
// populateDropdown('#fabricSelect', request.fabrics);

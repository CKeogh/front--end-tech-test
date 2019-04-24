
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

populateNavBar();
populateRoute();

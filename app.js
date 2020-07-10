const inputGroup = document.querySelector('.input-group');
const textField = document.querySelector('.input-restaurant');
const clearButton = document.querySelector('.clear-entries');
const restaurantList = document.querySelector('.restaurant-list');
const randomButton = document.querySelector('.random');



//localStorage.clear();
console.log(restaurantList);

function eventListenerLoader() {
    inputGroup.addEventListener('submit', addNewRestaurantCard);
    clearButton.addEventListener('click', clearEntries);
    randomButton.addEventListener('click', randomRestaurant);
}

eventListenerLoader();
generateRestaurants();

function generateRestaurants() {
    let restaurants = JSON.parse(localStorage.getItem('tasks'));

    restaurants.forEach(doThisThing);
}

function doThisThing(item){
    console.log(item);
    const newCard = document.createElement('div');

    newCard.appendChild(document.createTextNode(item));
    newCard.className = 'restaurantItem';

    var deleter = document.createElement('button');
    deleter.innerHTML = 'delete';

    deleter.addEventListener('click', deleteElement);

    newCard.appendChild(deleter);

    restaurantList.appendChild(newCard);
}

function addNewRestaurantCard(e) {
    const newCard = document.createElement('div');

    newCard.appendChild(document.createTextNode(textField.value));

    newCard.className = 'restaurantItem';

    const deleter = document.createElement('button');
    deleter.innerHTML = 'delete';

    deleter.addEventListener('click', deleteElement);

    newCard.appendChild(deleter);

    restaurantList.appendChild(newCard);

    storeNewItem(textField.value);

    textField.value = "";

    e.preventDefault();
}

function deleteElement(e) {
    console.log(e.target.parentElement.textContent);

    let restaurants = JSON.parse(localStorage.getItem('tasks'));

    console.log(e.target.parentElement[restaurants.length - 1])
    
    restaurants.forEach(function(item, index){
        if(e.target.parentElement.textContent === item) {
            restaurants.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(restaurants));

    console.log(restaurants);
    e.target.parentElement.remove();
    e.preventDefault();
}

function storeNewItem(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearEntries() {
    localStorage.clear();
    while (restaurantList.firstChild) {
        restaurantList.removeChild(restaurantList.firstChild);
    }
}

function randomRestaurant() {

    //* number of nodes in list of restaurants
    let restaurants = JSON.parse(localStorage.getItem('tasks'));
    console.log(restaurants);
    let length = restaurants.length;
    let num = Math.floor(Math.random() * length);
    console.log(restaurants[num]);
}
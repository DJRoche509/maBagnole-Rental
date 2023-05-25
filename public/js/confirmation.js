
// Send the booking information to the server using axios
const year = document.getElementById('year');
const carMake = document.getElementById('car-make');
const carModel = document.getElementById('car-model');
const color = document.getElementById('color');
const mileage = document.getElementById('mileage');
const carSize = document.getElementById('size');
const price = document.getElementById('price');
const checkin = document.getElementById('check-in');
const checkout = document.getElementById('checkout');


var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var data = urlParams.get('data');
var myObject = JSON.parse(decodeURIComponent(data));

console.log(myObject);

// Populate the car info
carMake.innerHTML = myObject.make;
carModel.innerHTML = myObject.model;
color.innerHTML = myObject.color;
mileage.innerHTML = myObject.mileage;
year.innerHTML = myObject.year;
carSize.innerHTML = myObject.size;
price.innerHTML = `$${myObject.cost} per day`;
checkin.innerHTML = `${myObject.pickupDate} ${myObject.pickupTime}`;
checkout.innerHTML = `${myObject.returnDate} ${myObject.returnTime}`;


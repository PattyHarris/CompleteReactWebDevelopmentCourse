// import './utils.js';
import subtract, { square, add } from './utils.js';
import isSenior, { isAdult, canDrink } from './person.js';

console.log('app.js is running!');

console.log("Square: " + square(4));
console.log("Add: " + add(3, 5));

console.log("Subtract: " + subtract(50, 25));

console.log("Is an  adult: " + isAdult(12));
console.log("Can drink: " + canDrink(22));
console.log("Is a senior: " + isSenior(80));

// Arrow Functions - 1 of 2 tutorials.

// ES5
const square = function(x) {
    return x * x;
}

console.log(square(8));

// ES6 - normal version arrow function
// const squareArrow = (x) => {
//     return x * x;
// }

// ES6 - since we're just returning an expression:
const squareArrow = (x) => x * x;

console.log(squareArrow(7));

// Challenge #5 is to take our 'get first name' from the 'let const' lecture and create
// 2 versions of the arrow function as we've done above.

// First version using regular arrow syntax
const getFirstNameRegular = (fullName) => {
    return fullName.split(' ')[0];
}

console.log(getFirstNameRegular('Sam Smith'));

// Second version using shorthand syntax
const getFirstNameShorthand = (fullName) => fullName.split(' ')[0];

console.log(getFirstNameShorthand('John Doe'));

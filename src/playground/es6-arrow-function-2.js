// Second playground file for working with arrow functions.

// Arguments object - it's no longer bound with arrow functions
// For example, in the following ES5 function, you can print out all the
// arguments, even though the last one isn't defined in the parameter list:
const add = function(a, b) {
    console.log(arguments);
    return a + b;
}

// The function only uses 1 and 2, but the console prints out all 4 arguments.
console.log(add(1, 2, 3, 4));

// If the above is switched to an arrow function, the console.log(arguments) will throw an exception:
const addArrow = (a, b) => {
    // console.log(arguments);
    return a + b;
}
console.log(addArrow(2, 3));

// The 'this' keyword is also not bound with arrow functions - meaning that
// the function doesn't have an 'this'

const user = {
    name: 'Patty',
    cities: ['Fortuna', 'Santa Barbara', 'Goleta', 'Palo Alto'],

    // The 'functiion' cannot be replaced with () => since the 'this'
    // (e.g. this.cities) will be undefined - the new syntax replaces
    // printPlacesLived: function() {
    // with - again, this is the NEW ES6 object method defnition syntax -
    // see this in the tutorial about 10:38 in the video.
    
    printPlacesLivedForEach() {

        // In a regular anonymous function, there is no bound 'this'
        // value - so here, this.name doesn't work.
        // this.cities.forEach( function(city) {
        //     console.log(this.name + ' has lived in ' + city);
        // });

        // If we make the above an arrow function, then it works - more clearly,
        // the arrow function doesn't bind it's own 'this' and therefore uses the 'this'
        // of the outter block.
        this.cities.forEach( (city) => {
            console.log(this.name + ' has lived in ' + city);
        })
    },

    // Second version using a map.
    printPlacesLivedMap() {
        // Map allows us to transform each item in the array, as opposed
        // to forEach which iterates over each item.
        // So the above, could be written as
        // const cityMessages = this.cities.map( (city) => {
        //     return this.name + ' has lived in ' + city;
        // })

        // And the above can be simplified as
        return this.cities.map( (city) => this.name + ' has lived in ' + city);
    }
};

user.printPlacesLivedForEach();
console.log(user.printPlacesLivedMap());

// Challenge #6: Create the multiplier object using the map
// function to return the result of running multiply against the
// list of numbers and multiplier number.

const multiplier = {
    numbers: [1, 2, 3, 4],
    multiplyBy: 3,
    multiply() {
        return this.numbers.map( (number) => number * this.multiplyBy);
    }
}

console.log(multiplier.multiply());

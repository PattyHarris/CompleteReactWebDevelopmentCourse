// Show that with var based variables you can re-assign AND redefine
// which can cause some real issues...
var nameVar = 'Patty';
var nameVar = "Tim";
console.log('nameVar', nameVar);

// You can re-assign, but NOT redefine.
let nameLet = 'Jen';
nameLet = 'John';
console.log('nameLet', nameLet);

// Again you can't redefine.  But with const, you also cannot re-assign.
const nameConst = 'Frank';
console.log('nameConst', nameConst);

// Block scope: unlike var, let and const are block scope.  If the var here is
// changed to a let or const, the second console.log will not work.
// Also, since fullName is never re-assigned, it should be a const.

const fullName = 'Patty Harris';
let firstName;

if (fullName) {
    firstName = fullName.split(' ')[0];
    console.log(firstName);
}

console.log(firstName);

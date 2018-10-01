
export const isAdult = (age) => age < 18 ? false :  true;

export const canDrink = (age) => age < 21 ? false : true;

// The above could be simplified to the following binary
// operator instead of using the ternary operator....
const isSenior = (age) => age >= 65;
export default isSenior;

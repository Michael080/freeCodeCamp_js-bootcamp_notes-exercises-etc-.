"use strict";
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/use-destructuring-assignment-to-extract-values-from-objects

// destructuring kicks butts
const user = {name: 'John Doe', age: 34};

const {name, age} = user; 
// creates two const vars for each prop.
name; // => 'John doe'
age; // => 34

// - exercise -
// * Replace the two assignments with an equivalent destructuring assignment. It should still assign the variables today and tomorrow the values of today and tomorrow from the HIGH_TEMPERATURES object.

const HIGH_TEMPERATURES = {
  yesterday: 75,
  today: 77,
  tomorrow: 80
};

// Only change code below this line
const {today, tomorrow} = HIGH_TEMPERATURES;
today; // => 77
tomorrow; // => 80
// Only change code above this line

// --- Use Destructuring Assignment to Assign Variables from Objects -----
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/use-destructuring-assignment-to-assign-variables-from-objects

// - exercise -
// * Replace the two assignments with an equivalent destructuring assignment. It should still assign the variables today and tomorrow the values of today and tomorrow from the HIGH_TEMPERATURES object.

// Only change code below this line
// the syntax here is counterintuitive: assigns value of "HIGH_TEMPERATURE.today & .tomorrow" to consts "highToday" & "highTomorrow" 
const {today: highToday, tomorrow: highTomorrow} = HIGH_TEMPERATURES;
highToday; // => 77
highTomorrow; // => 80
// Only change code above this line


// --- Use Destructuring Assignment to Assign Variables from Nested Objects ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/use-destructuring-assignment-to-assign-variables-from-nested-objects

const user_1 = {
  johnDoe: { 
    age_1: 34,
    email_1: 'johnDoe@freeCodeCamp.com'
  }
};

// destructuring nested objects
// syntax is similar to accessing object props. using bracket notation
user_1['johnDoe']['age_1']; // => 34

const {johnDoe: {age_1, email_1}} = user_1; // age_1; // => 34
// OR
const {johnDoe: {age_1: johnsAge, email_1: johnsEmail}} = user_1;
johnsAge; // => 34

// - exercise -
// * Replace the two assignments with an equivalent destructuring assignment. It should still assign the variables lowToday and highToday the values of today.low and today.high from the LOCAL_FORECAST object.
const LOCAL_FORECAST = {
  // ? removed "y" to avoid declaration conflicts
  yesterda: { low: 61, high: 75 }, 
  // ? removed "y" to avoid declaration conflicts
  toda: { low: 64, high: 77 }, 
  tomorrow: { low: 68, high: 80 }
};

// Only change code below this line
  
// const lowToday = LOCAL_FORECAST.today.low; // - replace via destructuring
// const highToday = LOCAL_FORECAST.today.high; // - replace via destructuring
const {toda: {low: lowToda, high: highToda}} = LOCAL_FORECAST;
lowToda; // => 64
highToda; // => 77
// Only change code above this line


// --- Use Destructuring Assignment to Assign Variables from Arrays ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/use-destructuring-assignment-to-assign-variables-from-arrays

// One key difference between the spread operator and array destructuring is that the spread operator unpacks all contents of an array into a comma-separated list. Consequently, you cannot pick or choose which elements you want to assign to variables.

  // >> spread operator (MDN) << -------------------------------------
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  
  function sum(x, y, z) {
    return x + y + z;
  }

  const numbers = [1, 2, 3];
  console.log(...numbers); // => 1 2 3
  sum(...numbers); // => 6

  // ? here is the pre-ES6 syntax for expanding an array
  /** * sum.apply(@param thisArg * @param argsArray) */
  sum.apply(null, numbers); 
  // >> spread operator (MDN) << -------------------------------------

// Destructuring provides ability to assign variables to particular array-elements
const numeros = [1, 2, 3, 4, 5, 6];
const [a, b,,, c] = numeros; 
// ? the commas between "b" and "c" skip assignment
console.log(a, b, c); // => 1, 2, 5

// * OR
const [d, e,,,,,, f] = [1, 2, 3, 4, 5, 6, 7, 8];
f; // => 8

// 0


// - exercise -
// * Use destructuring assignment to swap the values of a and b so that a receives the value stored in b, and b receives the value stored in a.

// ? using block scope to prevent conflicts w/ in global scope
{
  let a = 8, b = 6;
  // Only change code below this line
  [b, a] = [a, b];
  a; // => 6
  b; // => 8
}


// --- Use Destructuring Assignment with the Rest Parameter to Reassign Array Elements ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/use-destructuring-assignment-with-the-rest-parameter-to-reassign-array-elements

{
// using destructuring w/ rest parameter to perform splice-like operation:
const [a, b, ...arr] = [1, 2, 3, 4, 5, 7]; // a,b assigned correspondingly and ...arr takes the 'rest'
a; // => 1
arr; // => [3, 4, 5, 7]
}

{
// - exercise -
// * Use destructuring assignment with the rest parameter to perform an effective Array.prototype.slice() so that arr is a sub-array of the original array source with the first two elements omitted.
const source = [1,2,3,4,5,6,7,8,9,10];

function removeFirstTwo(list) {
  // Only change code below this line
  // const arr = list; // Change this line
  const [,, ...arr] = list;
  // Only change code above this line
  return arr;
}

const arr = removeFirstTwo(source);
}


// --- Use Destructuring Assignment to Pass an Object as a Function's Parameters ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/use-destructuring-assignment-to-pass-an-object-as-a-functions-parameters

{
  const duder = {name: 'bob', age: 5, nation: 'zimbabwe', location: 'somewheres'};

// destructure object in function argument itself
const profileUpdate = ({name, age, nation, location}) => {
  // ? below comment shows after call profileUpdate(duder) 
  // => const {name, age, nation, location} = profileData; // *deconstruct after
  
  name; // => bob
}

profileUpdate(duder);
}

// - exercise -
// * Use destructuring assignment within the argument to the function half to send only max and min inside the function.

const stats = {
  max: 56.78,
  standard_deviation: 4.34,
  median: 34.54,
  mode: 23.87,
  min: -0.75,
  average: 35.85
};

// Only change code below this line
const half = ({max, min}) => (max + min) / 2.0; 
half(stats); // => 28.015
// Only change code above this line
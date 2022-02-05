'use strict';
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/replace-loops-using-recursion

// ----------- Replace Loops using Recursion -----------

// multiply the first n elements of an array to create the product of those elements.

const arr = [1, 2, 3, 4, 5, 6, 7];

function multiply(arr, n) {
  let product = 1;
  for (let i = 0; i < n; i++) {
    product *= arr[i];
  }
  return product;
}

// However, notice that 
let n = 4;
multiply(arr, n) == ( multiply(arr, n - 1) * arr[n - 1] )

// broken down:
multiply(arr, n); // => 24

// ( multiply(arr, n - 1) * arr[n - 1] )
multiply(arr, n - 1); // multiply(arr, 3) => 6
arr[n - 1]; // => 4
//  That means you can rewrite multiply in terms of itself and never need to use a loop.

function recurseMult(arr, n) {
  if (n <= 0) {
    console.log(1)
    return 1; // base case
  } else {
    return recurseMult(arr, n - 1) * (arr[n - 1]);
  }
}

recurseMult(arr, n); // => 24

// --------------------------- EXERCISE --------------------------------

// Write a recursive function, recurseSum(arr, n), that returns the sum of the first n elements of an array arr.

// const arr = [1, 2, 3, 4, 5, 6, 7];

function sum(arr, n) {
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += arr[i];
  }
  return result;
}

sum(arr, n);

sum(arr, n - 1); // => 21
arr[n - 1]; // => 7
// The same logic as was applied to create recurseMult will work for the sum

function recurseSum(arr, n) {
  if (n <= 0) {
    return 0; // if 'return 1' would be 1 over the correct result: 29 vs 28
  } else {
    return recurseSum(arr, n - 1) + arr[n - 1];
  }
}
// const arr = [1, 2, 3, 4, 5, 6, 7];
// 1. recurseSum(arr, 4) + 5;
// 2. recurseSum(arr, 3) + 4;   
// 3. recurseSum(arr, 2) + 3;
// 4. recurseSum(arr, 1) + 2; 
// 5. recurseSum(arr, 0) + 1;            

recurseSum(arr, 5); // => 15

// ---------------------------------------------------------------
// Recursive countdown

function countDown(n) {
  if (n == 0) {
    return n;
  }

  console.log(n);
  return countDown(n - 1);
}

countDown(10);

// ---------------------------------------------------------------
// Recursive isEven

// One way to tell if a number is even is via: num % 2 == 0 ?
// utilizing the same principle regarding remainders we can
// accomplish the same thing by subtracting 2 multiple times
// and if at the "end" we have a remainder of 0 we know we have
// an even number OR if we have 1 it is an odd number

// my solution:
function isEven(n) {
  if (n == 1) {
    return false;
  } else if (n == 0) {
    return true;
  }

  return isEven(n - 2);
}

isEven(6);

// refacored using ternary:
function refactIsEven(n) {
  if (n < 2) {
    return (n === 1 ? false : n === 0 ? true : 'next');
  }
  return refactIsEven(n - 2);
}

refactIsEven(3);

// freeCodeCamp solution:
let oddOrEven = (number) => {
  if (number === 0){
    return 'Even';
  } else if (number === 1){
    return 'Odd';
  } else {
    return oddOrEven(number - 2);
  }
}
// I think should evaluate to a bool & am not a fan of the 'if' blocks


// -------------------------EloquentJS 03 Functions--------------------------

// The explicit local binding isn’t really needed since a parameter is itself a local binding.
function wrapValue(n) {
  let local = n;
  // returns an anon. function that returns 'local'
  return () => local;
}

let blammo = wrapValue('blammo');
blammo(); // => blammo
let five = wrapValue(5);
five(); // => 5

// With a slight change, we can turn the previous example into a way to create functions that multiply by an arbitrary amount.

function multiplier(factor) {
  return number => number * factor;
}

// binding stores 'factor' w/ val. 2 in the anon. function
let twice = multiplier(2); 
console.log(twice(7));


// Experiments w/ closures: 

// logging global var. and returning 'same' var. w/ anon. function
let env = 123;
function logEnv1() {
  console.log(env);
  return () => env;
}

let envOne = logEnv1();
env = 345;
let env2 = logEnv1();

// console.log() forms a closure but anon. function does not
envOne(); // => logs: 123 returns 345
env2(); // => logs: 345 returns 345

env = 123;

function logEnv2() {
  console.log(env);
  return env;
}

envOne = logEnv2();
env = 345;
env2 = logEnv2();

// can't be accessed via function call like closures created w/ logEnv1() can
envOne; // => logs: 123 returns 123
env2; // => logs: 345 returns 345


// -----Recursion-----

function powerLoop(base, exp) {
  let product = 1;
  for (let i = 0; i < exp; i++) {
    product *= base;
  }

  return product;
}

powerLoop(3, 2);

function power(base, exponent) {
  if (exponent === 0) {
    return 1;
  } else {
    return base * power(base, exponent - 1);
  }
}

power(3,3);

// Consider this puzzle: by starting from the number 1 and repeatedly either adding 5 or multiplying by 3, an infinite set of numbers can be produced. How would you write a function that, given a number, tries to find a sequence of such additions and multiplications that produces that number?

// Here is a recursive solution:
function findSolution(target) {
  function find(current, history) {
    // initial call: current = 1, history = "1"
    if (current == target) {
      return history;
    } else if (current > target) {
      return null;
    } else {
      return find(current + 5, `(${history} + 5)`) ||
             find(current * 3, `(${history} * 3)`);
    }
  }

  return find(1, "1"); // ** all solution histories begin with "1"
}

findSolution(24); // => (((1 * 3) + 5) * 3)


// -----Growing Functions-----
// 'Prettify' string by padding with zeroes until 3 'columns' are achieved
function padPrintString(str, label) {
  while (str.length < 3) {
    str = '0' + str;
  }
  return str;
}

function printFarmInventory(cows, chickens) {
  console.log('buttcheeks');
  let cowString = padPrintString(String(cows));
  console.log(`${cowString} Cows`);
  let chickenString = padPrintString(String(chickens));
  console.log(`${chickenString} Chickens`);
}

printFarmInventory(7, 11);


// return smallest of two numbers
function min(num1, num2) {
  if (num1 < num2) {
    return num1;
  }else {
    return num2;
  }
}

let nums = [2, 3, 1];

min(5, 1);


// return bool evaluating whether input is an even number via recursive function:
function evening(input) {
  // convert negative number to positive
  if (input < 0) {
    input = String(input);
    console.log(input);
    input = input.slice(1, input.length);
    input = Number(input);
  }

  // subtract 2 from number until base case, if num equals 0 it's even
  function evenStevens(num) {
    if (num < 2) {
      return num === 0;
    }
    return evening(num - 2);
  }
  return evenStevens(input);
}

evening(20); // => true
evening(-1); // => false
evening(-4); // => true


// -----Bean Counter-----
// ** I misunderstood the requirement and wrote a single function that utilized a nested countChars() as opppose to defining countChars() as a separate func.
// -- round one (7 lines)--
function countBsFail(str) {
  let count = 0;
  str = Array.from(str);
  const countChars = (target, char) => char === target ? count++ : false;

  str.forEach(char => countChars('B', char));
  return count;
}

// ** Refactored by separating the functions countBs() & countChars()
// -- round two (6 lines)--
function countChars (str, target) {
  let count = 0;
  Array.from(str).forEach(char => char === target ? count++ : false);
  return count;
}

const countBs = str => countChars(str, 'B');

console.log(countBs('BlammoWamBam')); // => 2
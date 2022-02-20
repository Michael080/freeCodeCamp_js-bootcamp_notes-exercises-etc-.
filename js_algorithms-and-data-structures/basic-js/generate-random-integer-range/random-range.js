// 
// submitted to freeCodeCamp
function randomRange(myMin, myMax) {
  // Only change code below this line
  return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
  return 0;
  // Only change code above this line
}

randomRange(2, 5);


// preferred one-line syntax
// define a number min and max
const minMax = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

minMax(2, 5);


// >> MDN - Math.random() NOTES

// Math.random() returns a floating-point, pseudo-random number in the range 0 to less than 1.

// In order to get a rand. number withing a range of 0 to a given number: 
// rand * (number + 1) 

Math.random() * 4; // => range (0 to 3)
console.log(0.4455757272846683 * 5);
// example return values multiplied by 4 (never exceed 4);
0.4455757272846683 * 4; // => 1.78...
// adding 1 to max val // => 2.22...

0.7435442859247052 * 4; // => 2.97...
// adding 1 to max val // => 3.71...

0.879741173107317 * 4; // => 3.51...
// adding 1 to max val // => 4.39...

let min = 3;
let max = 12;
/*
  Math.random() * (max - min + 1) // => range (0 to (1 lessmin-max-difference))
  * this limits the "ceiling" of the return value to accomodate "padding" the result w/ the "min" number after the fact */
let randy = Math.random();
let noAddedMin = randy * (max - min + 1); // => range (0 to 9)
let addedMin = randy * (max - min + 1) + min; // => range (3 to 12)
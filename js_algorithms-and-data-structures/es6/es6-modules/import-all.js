// import all functions from math_functions.js into object called myMathModule 
import * as myMathModule from "./math_functions.js"; 
// ? myMathModule name is arbitrary

// add numbers
myMathModule.add(2, 5); // => 7

// can be destructured to simplify syntax for using imports
const {add, subtract} = myMathModule;
// can be accessed w/ "original" syntax:
add(2, 5); // => 7
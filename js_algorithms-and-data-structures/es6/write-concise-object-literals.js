"use strict";

// --- Write Concise Object Literal Declarations Using Object Property Shorthand ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/write-concise-object-literal-declarations-using-object-property-shorthand

// function that returns object
// ? handy trick for returning an object here
const getMousePosition = (x, y) => ({
  x: x,
  y: y
})

// ? this is how I would have done it but getMousePosition() is much better
const makeObj = (x, y) => { 
  return {x: x, y: y} 
}

// getMousePosition rewritten with more DRY syntax:
const getMouse = (x, y) => ({x, y});
getMouse(2, 43).x; // => 2

// - exercise -
// Use object property shorthand with object literals to create and return an object with name, age and gender properties.
const createPerson = (name, age, gender) => {
  // Only change code below this line
  return {
    name,
    age,
    gender
  };
  // Only change code above this line
};

createPerson('bob', 5, 'male').name;
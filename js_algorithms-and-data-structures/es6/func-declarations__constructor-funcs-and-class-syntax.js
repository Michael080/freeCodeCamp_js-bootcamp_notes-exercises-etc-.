"use strict";

// --- Write Concise Declarative Functions with ES6 ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/write-concise-declarative-functions-with-es6

// function definition w/in object
const person = {
  name: 'Bob',
  sayHello: function() { // * es5 syntax
    return `Hello my name is ${this.name}`
  },
  sayHola() { // * es6 syntax
    return `Hello my name is ${this.name}` 
  }
}


// --- Use class Syntax to Define a Constructor Function ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/use-class-syntax-to-define-a-constructor-function

// class syntax is just syntax, and not a true class-based implementation of an OO paradigm like Java, Python, Ruby, etc,.

// define a constructor function:
{
// * var use is consistent with es5 spec
var SpaceShuttle = function(targetPlanet) { // * es5 syntax
  this.targetPlanet = targetPlanet;
}

var zeus = new SpaceShuttle('Jupiter');
zeus.__proto__;
console.log(zeus);
}
{
// the class syntax replaces the constructor function creation:
class SpaceShuttl {
  constructor(targetPlanet) {
    this.targetPlanet = targetPlanet;
  }
}

const zoos = new SpaceShuttl('Venus');
}

// - exercise -
// Use the class keyword and write a constructor to create the Vegetable class.

// The Vegetable class allows you to create a vegetable object with a property name that gets passed to the constructor.

// Only change code below this line
class Vegetable {
  constructor(name) {
    this.name = name;
  }
}
// Only change code above this line

const carrot = new Vegetable('carrot');
console.log(carrot.name); // Should display 'carrot'



// >> Crockford Constructors (pass object as param) ------------------------
// https://fek.io/blog/crockford-constructors

  // a more extensible approach to using constructors that requires much less refactoring

  // * adding a  property requires refactoring func. param, return vals, and arguments to calls of fluffAMaJig()
  {
  // constructor
  function fluffAMaJig(softness, fluffness, isExplosive/*, favMuzak */) {
    function getSoftness() {
      return `${this.softness}`; // * will break if softness === undefined
    }

    return {
      softness,
      fluffness,
      isExplosive,
      getSoftness
      /*, favMuzak */
    }
  }

  const jigglez = fluffAMaJig(10, 'hyper-fluffed', true/*, Polka */);
  jigglez.getSoftness(); // => 10

  // * will break if softness not passed as arg
  const wiggelz = fluffAMaJig('hyper-fluffed', true/*, Polka */); 
  wiggelz.getSoftness(); // => 'hyper-fluffed' WRONG!!!
  }

  // * "Crockford Constructor" Syntax:
  {
  // constructor
  function fluffAMaJig(params) {
    const {softness, fluffness, isExplosive/*, favMuzak */} = params;
    // * if "softness" is not passed as argument or was passed "out of order" this will not break the constructor
    const getSoftness = () => {
      const {softness} = params;
      return isNaN(softness) ? 0 : softness; // assign default value if not passed as arg 
    }

    return {
      softness,
      fluffness,
      isExplosive,
      getSoftness
    };
  }

  const data_1 = {
    softness: 10, 
    fluffness: 'hyper-fluffed', 
    isExplosive: true/*, 
    Polka */
  }

  const jigglez = fluffAMaJig(data_1);
  jigglez.getSoftness(); // => 10

  const data_2 = {
    /* softness: 10, */// - omitted 
    fluffness: 'hyper-fluffed', 
    isExplosive: true/*, 
    Polka */
  }

  // * won't break if softness not passed as arg thanks to retrieving object params using destructuring of object argument
  const wiggelz = fluffAMaJig(data_2); 
  wiggelz.getSoftness(); /* => 0 */ // - works though omitted 
  wiggelz.fluffness; // => hyper-fluffed
  }
// >> Crockford Constructors ---




// --- Use getters and setters to Control Access to an Object ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/use-getters-and-setters-to-control-access-to-an-object

class Book {
  constructor(author) {
    this._author = author; // underscore "_author" convention for private var.
  }
  // getter
  get writer() {
    return this._author;
  }
  // setter
  set writer(updatedAuthor) {
    this._author = updatedAuthor;
  }
}

const novel = new Book('anonymous');
// get author val
novel.writer; // => 'anonymous'
// set author val
novel.writer = 'newAuth';
// get updated val
novel.writer; // => 'newAuth'

// - exercise -
// Create a "Thermostat" class w/ constructor that takes Fahrenheit temp. as argument.
// In the class, create getter/setter for getting/setting temp in Celsius.

// Only change code below this line
class Thermostat {
  constructor(fahrenheit) {
    this._fahrenheit = fahrenheit;
  }
  get temperature() {
    return this._celsius === undefined ?
      this._celsius = (5/9) * (this._fahrenheit - 32) :
      this._celsius;
  }
  set temperature(celsius) {
    this._celsius = celsius;
  }
}
// Only change code above this line

const thermos = new Thermostat(76); // Setting in Fahrenheit scale
let temp = thermos.temperature; // 24.44 in Celsius
thermos.temperature = 26;
temp = thermos.temperature; // 26 in Celsius

// --- Write Concise Declarative Functions with ES6 ---
// 
// --- Write Concise Declarative Functions with ES6 ---
// 
// --- Write Concise Declarative Functions with ES6 ---
// 
// --- Write Concise Declarative Functions with ES6 ---
// 
// --- Write Concise Declarative Functions with ES6 ---
// 
// --- Write Concise Declarative Functions with ES6 ---
// 
// --- Write Concise Declarative Functions with ES6 ---
// 
// --- Write Concise Declarative Functions with ES6 ---
// 
// --- Write Concise Declarative Functions with ES6 ---
// 
// --- Write Concise Declarative Functions with ES6 ---
// 
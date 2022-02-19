// https://javascript.info/recursion
// --------------- javascript.info/recursion ---------------
//*--- Recursion & stack ---


// - two ways of thinking -
// For something simple to start with – let’s write a function pow(x, n) that raises x to a natural power of n. In other words, multiplies x by itself n times.
// my solution:
function powLoop(base, exp) {
  let product = 1;
  for (let i = 0; i < exp; i++) {
    product *= base;
  }
  return product;
}

function pow(base, exp) {
  if (exp == 1) {
    return base;
  }
  // **  base * pow(base, exp - 1) -- jsinfo;
  return pow(base + base, exp-=1);
}

pow(2,10); // => 1024

// x^3 can be broken down as: 
// x * (x * x) or x * x^2
// if you were to continue breaking it down in this way you wind up with 
// x * x * x 
// This process can be recursively expressed:
// x^n === (x * x^n-1)^n-1, the expression in parenthesis applied n-1 times

// js info solution:
function powjs(base, exp) {
  /* 
  * * Context:
  *    #3 { base: 2 exp: 1 }}}
  *    #2 {base: 2, exp: 2  
  *  * * #1 { base: 2, exp: 3  
  */
  if (exp == 1) {
    /* 
    C:{ base: 2, exp: 3 C:{base: 2, exp: 2 C:{ base: 2 exp: 1 }}}
    */
    return base;
  } else {
    // ** I used addition because I couldn't figure out how to use multiplication w/out mutating value of "base"
    return base * powjs(base, exp - 1);
    // initial:powjs(2,3);
    // 1) 2 * pow(2, 2) => 2 * 4 (via 2), "bubbles up" into global scope
    // 2) 2 * pow(2, 1) => 2 * 2 (via 3)
    // 3) return 2 (base case)
  }
}

powjs(2,3);

// The max. number of nested calls, including the first one, is called recursion depth. In our case it will be exactly n.
// The maximal recursion depth is limited by the JS engine. We can rely on it being 10000, some engines allow more, but 100000 is probably out of limit for the majority of them. There are automatic optimizations that help alleviate this (“tail calls optimizations”), but they are not yet supported everywhere and work only in simple cases.

// - The execution context and stack -

// The execution context is an internal data structure that contains details about the execution of a function: where the control flow is now, the current variables, the value of this (we don’t use it here) and few other internal details.
// * disregard vals created by quokka
let base = 2, exp = 3;
// */ 1) powjs(base,exp); //   3) Context: { base: 2, exp: 3, @ ln 1 }
//       (n == 1) // => false
base * powjs(base, exp-1); // => 2) Context: { base: 2, exp: 3, @ else }
// * although the call in step 2 calls powjs w/ "exp - 1" exp in this context is still 3 until the context on step 3 is created

// context data aggregated and evaluated:
/* initial call: */ powjs(2,3); // => 8 
/*  #1 { base: 2, exp: 3     @ else block */
        base * 4; // => 8
/*  #2 { base: 2, exp: 2      @ else block */
         base * 2; // => 4 
/*  #3 { base: 2 exp: 1 }}}  @ if block base case reached
*/
console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')


//  --- Recursive traversals ---
// Now let’s say we want a function to get the sum of all salaries. How can we do that?

// basic structure of data
// Object (comapny) 
//*    -- Property (department) 
//*        -- Array -- anon. 
//*            -- Object (employee)

// department max nesting depth: 1 
let protoCompany = {
  department1: [ {empName: 'Kazaak', salary: 500}, {empName: 'Schmancy', salary: 1} ],
  department2: [ {empName: 'Leetha', salary: 250} ],
  department3: [ {empName: 'Media', salary: 1}, {empName: 'Nancy', salary: 1} ],
}

// department max nesting depth: 2 
let company = {
  sales: [
    { name: 'John', salary: 1000 }, 
    { name: 'Alice', salary: 1600 }
  ],

  development: {
    sites: [{
      name: 'Peter',
      salary: 2000
    }, {
      name: 'Alex',
      salary: 1800
    }],

    internals: [{
      name: 'Jack',
      salary: 1300
    }]
  }
};

// department max nesting depth: 3 
let withSubs = {
  department1: { 
    sub1: [ {empName: 'Bob', salary: 500} ] 
  },
  department2: { 
    sub2: [ {empName: 'Cathy', salary: 250} ] 
  },
  department3: { 
    sub3: [ {empName: 'Dan', salary: 1} ] 
  },
  protoCompany: {
    department1: [ {empName: 'Kazaak', salary: 500} ],
    department2: [ {empName: 'Leetha', salary: 250} ],
    department3: [ {empName: 'Media', salary: 1} ],
  }
}

// jsinfo's company object
let jsinfoCompany = { // the same object, compressed for brevity
  sales: [
    {name: 'John', salary: 1000}, 
    {name: 'Alice', salary: 1600 }
],
  development: {
    sites: [
      {name: 'Peter', salary: 2000}, 
      {name: 'Alex', salary: 1800 }
  ],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// /** * datatype: @param set {object} */
// function sumSalaries(set) {
//   let total = 0;
//   for (const nested in set) {
//     let subset = set[nested];
//     if(Array.isArray(subset)) {
//       subset.forEach(emp => total += emp.salary);
//     } else {
//       total += sumSalaries(subset);
//     }
//   }
//   return total;
// }

/** * datatype: @param set {object} */
function sumSalaries(set) {
  let total = 0;
  for (const nested in set) {
    let subset = set[nested];
    if(Array.isArray(subset)) {
      subset.forEach(emp => total += emp.salary);
    } else {
      total += sumSalaries(subset);
    }
  }
  return total;
}

//  -----------------------sumSalaries() TESTS---------------------------------
// DEPTH N+1   // (withSubs)
console.log(sumSalaries(withSubs))
console.log(
  'returns total salaries of 751 --- ', sumSalaries(withSubs) === 1502
);
// DEPTH 1   // (protoCompany)
console.log(sumSalaries(protoCompany))
console.log(
  'returns total salaries of 753 --- ', sumSalaries(protoCompany) === 753
);
// DEPTH N+1   // (jsinfoCompany)
console.log(sumSalaries(jsinfoCompany))
console.log(
  'returns total salaries of 7700 --- ', sumSalaries(jsinfoCompany) === 7700
);
// ----------------------------------------------------------------------

// -- jsinfo's "sumSalaries" Solution --
function jsSummer(departments) {
  if (Array.isArray(departments)) {
    // ? why doesn't this return exit the function on companies of depth:1?
    // * I was not seeing that the base case will NEVER be reached until after at least (1) recursive call of jsSummer() in else-block
    return departments.reduce((prev, current) => prev + current.salary, 0);
  } else {
    let sum = 0;
    for (let subdep of Object.values(departments)) {
      sum += jsSummer(subdep); //2600, 3800, 1300, 5100
    }
    return sum;
  }
}



// ---Recursive Structures---
// https://javascript.info/recursion#recursive-structures

// The company objects above are examples of 'recursive structures' where the data structure replicated itself in parts.

// --linked list--
// some objs to store in an ordered list:
let obj1 = {what:'an obj1'},
    obj2 = {what:'an obj2'},
    obj3 = {what:'an obj3'};

let arr = [obj1, obj2, obj3]; //=> delete/insert ops are expensive!
// operations require renumbering ALL elems except for operations that work on the end of the array, this hurts most on large queues
// * linked lists provide fast insertion/deletion

// The linked list element is recursively defined as an object with:
// - value.
// - next: property referencing the next linked list element or null if that’s the end.

// example:
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

// a more readable declaration
list = {value: 1}; //* accessed via ~ list.value;
list.next = {value: 2};
list.next.next = {value: 3};
list.next.next.next = {value: 4};
list.next.next.next.next = null;

// the list can be easily split into multiple parts and rejoined later
let secondList = list.next.next; // => value: 3,4, & null
list.next.next = null; // => values: 1,2, &- null
// * the above splits the linked list in two halves each terminating at null vals

// to 'rejoin' the lists:
list.next.next = secondList; // => values: 1, 2, 3, 4, & null

// items can be inserted or removed -
// examp - to prepend a new value, update the head of list:
list = {value: 'new item', next: list}; 
// => {value: "new item", next: 1-4, etc,.}
// if we want the "order of values" to pick up after "new item" @ 2:
list.next = list.next.next; // => values: "new item", 2...null
// this made list.next "jump over" value "1" & is automatically dropped from memory w/out any mass renumbering

/* The main drawback is that we can’t easily access an element by its number. In an array that’s easy: arr[n] is a direct reference. But in the list we need to start from the first item and go next N times to get the Nth element. */

// lists can be enhanced with a "previous" in add'n to "next"
list = {}; // clear binding for following example
// example:
list = {
  value: 1,
  next: {
    // previous: this.value,
    value: 2,
    next: {
      // previous: list.next,
      value: 3,
      next: {
        // previous: next
        value: 4,
        next: null
      }
    }
  }
};


list.next.prev = list; // => 1 
list.next.next.prev = list.next; // => 2
/* value can be retrieved via: */ list.next.next.prev.value;
list.next.next.next.prev = list.next.next; // => 3

// ? are "prev" properties reference variables?
list.value = 10;
list.next.prev.value; // => 10 (YES!)

function listify(value) {
  // ? take prev via func. param (easiest) - I wonder if there is a more elegant solution
  // this.value ? this.banana = 'nana' : ('no prev please');
  if (!this) {
    this.banana = 'nana'
  } else {
    console.log(this);
    this.banana = this;
  }
  console.log(this.value)
  console.log(this);
  // this.value === undefined
  this.value = value;
  this.next = null;
  return this;
}

let lyst = new listify(1);
lyst.value;
lyst.next = new listify(2);
lyst.next.banana;
lyst.next.next = new listify(3);
lyst.next.next.banana;
lyst.next.next;


// >> chaining functions <<
// https://thenewstack.io/mastering-javascript-callbacks-bind-apply-call/

/** 
 * TODO  add functionality to create next list element w/ no need to call a chain of 'next's
    * TODO may need to implement getHead() - method to find the head element on each operation, // ? maybe there is a more performant solution
    * TODO
*/
function thisser(val, prev, objek = undefined) {  
  this.val = val;
  // set head & prev properties
  if (prev === undefined) {
    this.head = this; 
    // => this would be one way to set the head (useless this way i think, finding the head on each iteration seems costly)
  } else {
    this.prev = prev
  }

  this.next = null;
  this.addNext = (nextVal, prev, objek) => {
    return prev["next"] = new thisser(nextVal, prev, objek);
  };
// ! start here 3-13
  this.getTail = (list) => {
    if (list.next === null) {
      return list.val;
      return 
    } else {
      return this.getTail(list.next);
    }
  }

  return this;
}


let bit = new thisser(0);
bit.addNext(1, bit, bit);
bit.addNext(2,bit.next, bit);
bit.addNext(3,bit.next.next, bit);
bit.addNext(3,bit.next.next.next, bit);
bit.addNext(4,bit.next.next.next.next, bit);

// ------------------------thisser()-TESTS------------------------------
console.log(bit.val === 0);
console.log(bit.next.prev.val === 0);

console.log(bit.head.val === 0);

console.log(bit.next.val === 1);
console.log(bit.next.next.prev.val === 1);

console.log(bit.head.val === 0);


console.log(bit.next.next.val === 2);
console.log(bit.next.next.next.prev.val === 2);

console.log(bit.head.val === 0);


console.log(bit.next.next.next.val === 3);
console.log(bit.next.next.next.next.prev.val === 3);

console.log(bit.head.val === 0);

// ----------------------------------------------------------------


// --- jsinfo Tasks (exercises)---
// https://javascript.info/recursion#tasks

// Write a function sumTo(n) that calculates the sum of numbers 1 + 2 + ... + n.

// >> Ex:
/*
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
*/

// Make 3 solution variants:
  // 1. Using a for loop.
  // 2. Using a recursion, cause sumTo(n) = n + sumTo(n-1) for n > 1.
  // 3. Using the arithmetic progression formula.

//* 1. Using a loop (SOLUTION)
function loopToSum(num) {
  let sum = 0;
  for (let i = num; i > 0; i--){
    sum += i;
    console.log(sum);
  }
  return sum;
}

loopToSum(1);


//* 2. Using a recursion, cause sumTo(n) = n + sumTo(n-1) for n > 1 (SOLUTION)
function sumTo(num) {
  let sum = num;
  return num === 1 ? 
    num :
    sum + sumTo(num-=1); 

    // * alternative via if-block:
    // if (num === 1) {    
    //   console.log(num-1);
    //   return num;
    // } else {
    //   let sum = num;
    //   return sum + sumTo(num-=1);
    // }
}


// * 3. Using the arithmetic progression formula. (NOTES)
// https://en.wikipedia.org/wiki/Arithmetic_progression

  // 7 + 6 + 5 + 4 + 3 + 2 + 1 
    // => {13, 18, 22, 25, 27, 28}, result of operationss

  // 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 
    // => {15, 21, 25, 28, 30 31}, result of operations

  // 14 + 13 + 12 + 11 + 10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 
// => {27, 39, 50, 60, 69, 77, 84, 90, 95, 99, 102, 104, 105}, result of operations

// An = ai + (n - 1)d , focusing on 'An' {...1, 2, 3}, last 3 of first set
// ? initially I was applying the concept 'arithmetic progression' backwards due to the objective of the exercise ie: sumTo(3), {3, 2, 1}
  // d // => 1 (difference)
  // First Term // =>  a(1)
  // 2nd Term (a + d) // => 1 + 1 = 2
  // 3rd Term (a + 2(d)) // => 1 + 2(1) = 3
  // Sum (n(ai + an)) / 2, n = 5 // => (5(1 + 5)) / 2 = 15
  sumTo(5);

  // * using d = 3 instead of 1 {3, 6, 9, 12, 15 ...}
  // nth Term (a + (n - 1)d), for 5th term // => 1 + (5 - 1)1 = 5
  // d // => 3 (difference)
  // First Term // =>  a(3)
  // 2nd Term (a + d) // => 3 + 3
  // 3rd Term (a + 2(d)) // => 3 + 2(3)
  // Sum (n(ai + an)) / 2, n = 5 // => (5(3 + 15)) / 2 = 45

// * 3. Using the arithmetic progression formula. (SOLUTION)
const arithProg = num => (num * (1 + num)) / 2;
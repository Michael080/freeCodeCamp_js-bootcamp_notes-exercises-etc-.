//* --------------- javascript.info/recursion ---------------
//* --- Recursion & stack ---

//* - two ways of thinking -
// For something simple to start with – let’s write a function pow(x, n) that raises x to a natural power of n. In other words, multiplies x by itself n times.
// my solution:
function powLoop(base, exp) {
  let product = 1;
  for (let i = 0; i < exp; i++) {
    product *= base;
    console.log(product);
  }
  return product;
}

console.log(powLoop(2,4));

function pow(base, exp) {
  console.log('base:', base, 'exp:', exp)
  console.log(exp);
  if (exp == 1) {
    console.log(exp)
    return base;
  }
  // **  base * pow(base, exp - 1) -- jsinfo;
  return pow(base + base, exp-=1);
}

pow(2,10);

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
    console.log(base, exp);
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

//* - The execution context and stack -

// The execution context is an internal data structure that contains details about the execution of a function: where the control flow is now, the current variables, the value of this (we don’t use it here) and few other internal details.
// ** disregard vals created by quokka
let base = 2, exp = 3;
//** */ 1) powjs(base,exp); //   3) Context: { base: 2, exp: 3, @ ln 1 }
//  (n == 1) => false
base * powjs(base, exp-1); // => 2) Context: { base: 2, exp: 3, @ else }
// ** although the call in step 2 calls powjs w/ "exp - 1" exp in this context is still 3 until the context on step 3 is created

// context data aggregated and evaluated:
/* initial call: */ powjs(2,3); // => 8 
/*  #1 { base: 2, exp: 3     @ else block */
        base * 4; // => 8
/*  #2 { base: 2, exp: 2      @ else block */
         base * 2; // => 4 
/*  #3 { base: 2 exp: 1 }}}  @ if block base case reached
*/
console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')


// * --- Recursive traversals ---

// basic structure of data
// Object -- Property -- Array -- anon. Object
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

const someArr = [1,'banana',9,22];
let [first, second, third] = someArr;
console.log(first, second, third);


const development = {
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

// prototypical example of the company-object which ONLY has main departments, no sub-departments, and a uniform depth of "1"
let protoCompany = {
  department1: [ {empName: 'Kazaak', salary: 500}, {empName: 'Schmancy', salary: 1} ],
  department2: [ {empName: 'Leetha', salary: 250} ],
  department3: [ {empName: 'Media', salary: 1}, {empName: 'Nancy', salary: 1} ],
}

// example company-object with main departments, and sub-departments of depths 1, 2, 3 respectively

let withSubs = {
  department1: { 
    sub1: [ {empName: 'Bob', salary: 500}] 
  },
  department2: { 
    sub2: [ {empName: 'Cathy', salary: 250}] 
  },
  department3: { 
    sub3: [ {empName: 'Dan', salary: 1}] 
  },
  protoCompany: {
    department1: [ {empName: 'Kazaak', salary: 500} ],
    department2: [ {empName: 'Leetha', salary: 250} ],
    department3: [ {empName: 'Media', salary: 1} ],
  }
}

// jsinfo's company object
let jsinfoCompany = { // the same object, compressed for brevity
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// Now let’s say we want a function to get the sum of all salaries. How can we do that?

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

// * -----------------------TESTS---------------------------------
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


//* -- jsinfo Solution --
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
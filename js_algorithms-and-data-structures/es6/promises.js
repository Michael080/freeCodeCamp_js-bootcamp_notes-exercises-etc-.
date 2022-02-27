"use strict";

// Create a JavaScript Promise
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/create-a-javascript-promise

//  A promise is a proxy for a value not necessarily known when the promis is created. It allows you to associate handlers w/ an asynchronous action's eventual success value or failure reason.

// Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.

// It takes a function, as its argument, w/ two params - 'resolve' and 'reject'. These are methods used to determine the outcome oft he promise.
{//
const myPromise = new Promise((resolve, reject) => {

});
}//

// --- Complete a Promise with resolve and reject ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/complete-a-promise-with-resolve-and-reject

// A promise has three states: "pending", "fulfilled", and "rejected". The "resolve" & "reject" params given to the promise argument are used to complete the promise, "resolve" when you expect it to succeed and "reject" when not. 
{//
const myPromis = new Promise((resolve, reject) => {
  let condition = true; // dummy condition
  if (condition === true) {
    resolve("Promise was fulfilled"); // need not be string - could be "anything" often is an object to use data from
  } else {
    reject("Promise was rejected");
  }
})



// --- Handle a Fulfilled Promise with then ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/handle-a-fulfilled-promise-with-then

// Promises are most useful when dealing w/ processess w/ unknown execution/completion time, often server requests. Doing something in response to completion of this server request can be achieved using the 'then' method which is executed immediatley after the promise is fulfilled w/ 'resolve'.

myPromis.then(result => { // *'result' provided by arg given to 'resolve' method

})
}//
// - exercise -
// Add the then method to your promise. Use result as the parameter of its callback function and log result to the console.
{//
const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer is set to true to represent a successful response from a server
  let responseFromServer = true;
  if (responseFromServer) {
    resolve("We got the data");
  } else {
    reject("Data not received");
  }
}).then(result => console.log('makeServerRequest --- result:', result));



// --- Handle a Rejected Promise with catch ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/handle-a-rejected-promise-with-catch

// 'catch' is a method which executes immediately after a promise has been rejected.

makeServerRequest.catch(error => { // 'error' provided by arg passed to 'reject'

})
}//

// - exercise -
// Add the catch method to your promise. Use error as the parameter of its callback function and log error to the console.
{
const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer is set to false to represent an unsuccessful response from a server
  let responseFromServer = false;
    
  if(responseFromServer) {
    resolve("We got the data");
  } else {  
    reject("Data not received");
  }
});

makeServerRequest.then(result => {
  console.log(result);
}).catch(error => console.log('catch error exercise --- error:',error));
}
"use strict";//

//--- Reuse JavaScript Code Using import ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/reuse-javascript-code-using-import

import { add, subtract } from './math_functions.js';

add(4, 7); // => 11

// --- Create an Export Fallback with export default @ more-es6-modules.js ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/create-an-export-fallback-with-export-default
// import 'default export' stringConcat() and nonDef()
import stringConcat, { nonDef } from './more-es6-modules.js';

stringConcat('string', ' more string'); // => 'string more string'
nonDef(); // => 'this function not exported as default'
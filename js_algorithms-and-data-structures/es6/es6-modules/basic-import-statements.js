"use strict";//

//--- Reuse JavaScript Code Using import ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/reuse-javascript-code-using-import

import { add, subtract } from './math_functions.js';

add(4, 7); // => 11
subtract(4, 7); // => -3

// --- Create an Export Fallback with export default @ more-es6-modules.js ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/create-an-export-fallback-with-export-default

/*
  * Default Export --- stringConcat()
    * -Used for exporting on main value per module
    * - Name independent when importing could be called "stringConcat" OR  whatever
    * - Syntax for exporting requires keywords: "export default function...etc,." OR "export {stringConcat as default};" 
    
   * Named Export --- nonDef()
    * - Exporting Several values for one module
    * - Have to use the same name when importing (if not using alias) such as: "import stringConcat, { nonDef as nonDefferzzz } from '...js';"
    * - Uses curly braces to get values out during import "... { nonDef }"
*/

// import 'Default Export' stringConcat() and 'Named Export' nonDef()
// * NOTE: filename MUST have prefix "./"
import stringConcat, { nonDef } from './more-es6-modules.js';

stringConcat('string', ' more string'); // => 'string more string'
nonDef(); // => 'this function not exported as default'
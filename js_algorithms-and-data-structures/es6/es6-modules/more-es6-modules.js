// --- Create an Export Fallback with export default  ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/create-an-export-fallback-with-export-default

// Usually you will use this syntax if only one value is being exported from a file. It is also used to create a fallback value for a file or module.
// * imported @ basic-import-statements.js
export default function stringConcat(str, newChars) {
  return str + newChars;
}

const nonDef = () => {
  let str =  'this function not exported as default'
  return str
};
// * imported @ basic-import-statements.js
export {nonDef};
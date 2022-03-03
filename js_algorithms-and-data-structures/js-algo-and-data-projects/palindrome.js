// --- Palindrome Checker ---
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/palindrome-checker
// We'll pass strings with varying formats, such as racecar, RaceCar, and race CAR among others.
// We'll also pass strings with special symbols, such as 2A3*3a2, 2A3 3a2, and 2_A3*3#A2.
/** *@param str type: string return: bool evaluating palindrome */ 
function palindrome(str) {
  // remove non-alphanumeric chars and return formatted string
  function formatStr(str) {
    str = str.toLowerCase().split(""); // => lowercase - [char1, char2, ...]
    let formatted = "";
    /** 
    * isNum(), isAlpha(), & isAlNum check chars are alphanumeric
    * @param charCode unicode number via "char.charCodeAt() */
    const isNum = charCode => charCode >= 48 && charCode <= 57, // => bool
          isAlpha = charCode => charCode >= 97 && charCode <= 122, // => bool
          isAlNum = charCode => isNum(charCode) || isAlpha(charCode); // => bool

    str.forEach(char => {
      const unicode = char.charCodeAt(0);

      isAlNum(unicode) ?
        formatted += char :
        false;
    });
    return formatted;
  }
  
  const isMatch = (char1, char2) => char1 === char2; // => bool (compare chars)
  const formatted = formatStr(str); // => str lowercase alphanumeric
  const LOOPLENGTH = Math.floor(formatted.length / 2); // => number (midpoint)
  
  // check if palindrome
  for (let i = 0; i < LOOPLENGTH; i++) {
    let leftChar = formatted[i]; // left-half of string
    let rightChar = formatted[formatted.length - (i + 1)]; // right-half of string
    // break loop and return bool "false" upon first mismatch
    if (isMatch(leftChar, rightChar) !== true) {
      return false
    }
  }
  return true; // is palindrome!
}
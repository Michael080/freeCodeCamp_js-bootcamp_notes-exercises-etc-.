// * The function should use recursion to return an array containing the integers n through 1 based on the n parameter. If the function is called with a number less than 1, the function should return an empty array.

// Only change code below this line
function countdown(input, final = []){
  final.push(input);
  if (input >= 1) {
    return (input < 2) ? final : countdown(input-1, final);
  } else {
    return [];
  }
}
// Only change code above this line
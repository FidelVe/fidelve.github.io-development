```javascript
// FreeCodeCamp.
// Javascript algorithms and Data Structures
// Palindrome Checker
function isPalindrome(string) {
  // Evaluate if input string is a palindrome or not
  // returns either true or false

  let regex = /[^\W_]/g;

  if (string.match(regex) !== null) {
    // If the result of evaluating the regular expression into the string
    // is not null
    let charArr = string.match(regex).map(each => each.toLowerCase());
    for (let i = 0; i < Math.floor(charArr.length / 2); i++) {
      if (charArr[i] !== charArr[charArr.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }
  // if the input is not a valid string return false
  return false;
}
```

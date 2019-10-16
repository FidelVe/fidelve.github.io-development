```javascript
// FreeCodeCamp.
// JavaScript Algorithms and Data Structures Project:
// Palindrome Checker.

function isPalindrome(string) {
  // This functions takes a string as an argument
  // and returns true if the string is a palindrome
  // false if not.

  let regex = /[^\W\_]/g;
  let charArr = string.match(regex).map( (each) => {
    return each.toLowerCase();
  });

  for (let i=0; i < Math.floor(charArr.length/2); i++) {
    if (charArr[i] != charArr[charArr.length-1-i]) {
      return false;
    }
  }

  return true;
}
```

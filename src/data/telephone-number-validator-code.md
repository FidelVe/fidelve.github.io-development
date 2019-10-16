```javascript
// FreeCodeCamp.
// JavaScript Algorithms and Data Structures Projects:
// Telephone Number Validator
function telephoneCheck(str) {
  let regex = /^1{0,1}\s{0,1}(?:[0-9]{3}[\s\-]{0,1}){2}[0-9]{4}$|^1{0,1}\s{0,1}\([0-9]{3}\)[\s\-]{0,1}[[0-9]{3}[\s\-]{0,1}[0-9]{4}$/;
  return regex.test(str);
}
```

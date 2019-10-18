```javascript
// FreeCodeCamp.
// javaScript Algorithms and Data Structures Projects:
// Caesars Cipher
function rot13(str) {
  // LBH QVQ VG!
  let abc = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
  let result = [];
  let regex = /[a-zA-Z]/;

  for (let each of str) {
    let newLetter = each;
    if (regex.test(each)) {
      let pos = abc.indexOf(each);
      let newpos = pos + 13 >= 26 ? pos - 13 : pos + 13;
      newLetter = abc.charAt(newpos);
    }
    result.push(newLetter);
  }

  return result.reduce((total, value) => {
    return total + value;
  });
}
```

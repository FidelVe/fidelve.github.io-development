```javascript
// FreeCodeCamp.
// JavaScript Algorithms and Data Structures Projects:
// Roman Numeral Converter

function convertToRoman(input) {
  // Converts decimal integers to roman numeral
  // {
  //   "1": "I", "5": "V", "10": "X", "50": "L",
  //   "100": "C", "500": "D", "1000": "M"
  // };

  let num = input;
  let result = [];

  while (num != 0) {
    if (num >= 1000) {
      result.push('M');
      num -= 1000;
    } else if (num >= 900) {
      result.push('CM');
      num -= 900;
    } else if (num >= 500) {
      result.push('D');
      num -= 500;
    } else if (num >= 400) {
      result.push('CD');
      num -= 400;
    } else if (num >= 100) {
      result.push('C');
      num -= 100;
    } else if (num >= 90) {
      result.push('XC');
      num -= 90;
    } else if (num >= 50) {
      result.push('L');
      num -= 50;
    } else if (num >= 40) {
      result.push('XL');
      num -= 40;
    } else if (num >= 10) {
      result.push('X');
      num -= 10;
    } else if (num >= 9) {
      result.push('IX');
      num -= 9;
    } else if (num >= 5) {
      result.push('V');
      num -= 5;
    } else if (num >= 4) {
      result.push('IV');
      num -= 4;
    } else if (num >= 1) {
      result.push('I');
      num -= 1;
    } else {
      console.log(`error: input = ${input}. num = ${num}\nresult = ${result}`);
      break;
    }
  }

  return result.reduce((total, value) => {
    return total + value;
  });
}
```

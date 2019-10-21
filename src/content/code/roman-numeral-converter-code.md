```javascript
// FreeCodeCamp.
// JavaScript Algorithms and Data Structures Projects:
// Roman Numeral Converter

function convertToRoman(input) {
  // Converts decimal integers to roman numeral

  let arrayOfRelation = [
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let num = input;
  let result = [];

  if (input > 1000) {
    let overThousand = Math.floor(input / 1000);
    num = num - overThousand * 1000;
    result.push('M'.repeat(overThousand));
  }

  for (let valuePair of arrayOfRelation) {
    while (num >= valuePair[0]) {
      num -= valuePair[0];
      result.push(valuePair[1]);
    }
  }

  if (result.length > 0) {
    return result.reduce((total, value) => total + value);
  } else {
    return '';
  }
}
```

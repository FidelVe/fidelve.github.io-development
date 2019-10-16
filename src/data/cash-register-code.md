```javascript
// FreeCodeCamp.
// JavaScript Algorithms and Data Structures Projects:
// Cash Register

let testResults = [
  [
    [19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]], {}],
  [
    [19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]], {status: "OPEN", change: [["QUARTER", 0.5]]}],
  [
    [3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]], {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}],
  [
    [19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]], [{status: "INSUFFICIENT_FUNDS", change: []}]],
  [
    [19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]], [{status: "INSUFFICIENT_FUNDS", change: []}]],
  [
    [19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]], [{status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}]]
];

function dictFrom2dArr(arr) {
  let dict = {};

  for (let each of arr) {
    dict[each[0]] = each[1];
  }
  return dict;
}


function checkCashRegister(price, cash, cid) {
  function makeTransaction(num, amount) {
    change = Math.round((change-num)*100)/100;
    cidDict[amount] = Math.round((cidDict[amount]-num)*100)/100;
    changeDict[amount] = Math.round((changeDict[amount]+num)*100)/100;
  }

  let changeDict = {
    "PENNY": 0, "NICKEL": 0, "DIME": 0,
    "QUARTER": 0, "ONE": 0, "FIVE": 0,
    "TEN": 0, "TWENTY": 0, "ONE HUNDRED": 0
  };
  let cidDict = dictFrom2dArr(cid);
  let changeArr = [];
  let registerStatus;
  var change = cash - price;
  let totalInRegister = 0;
  let foo = cid.forEach( (money, index) => {
    totalInRegister += money[1];
  })
  totalInRegister = Math.round(totalInRegister*100)/100;
  
  let exitFlag = 0;
  if (change > totalInRegister) {
    return {"status": "INSUFFICIENT_FUNDS",
      "change": changeArr}
  } else {
    while(change > 0) {
      change = Math.round(change*100)/100;
      exitFlag += 1;
      if (exitFlag > 100) {
        break
      };
      if (change >= 100 && cidDict["ONE HUNDRED"] >= 100) {
        makeTransaction(100, "ONE HUNDRED");
      } else if (change >= 20 && cidDict["TWENTY"] >= 20) {
        makeTransaction(20, "TWENTY");
      } else if (change >= 10 && cidDict["TEN"] >= 10) {
        makeTransaction(10, "TEN");
      } else if (change >= 5 && cidDict["FIVE"] >= 5) {
        makeTransaction(5, "FIVE");
      } else if (change >= 1 && cidDict["ONE"] >= 1) {
        makeTransaction(1, "ONE");
      } else if (change >= 0.25 && cidDict["QUARTER"] >= 0.25) {
        makeTransaction(0.25, "QUARTER");
      } else if (change >= 0.1 && cidDict["DIME"] >= 0.1) {
        makeTransaction(0.1, "DIME");
      } else if (change >= 0.05 && cidDict["NICKEL"] >= 0.05) {
        makeTransaction(0.05, "NICKEL");
      } else if (change >= 0.01 && cidDict["PENNY"] >= 0.01) {
        makeTransaction(0.01, "PENNY");
      } else {
        return {"status": "INSUFFICIENT_FUNDS",
          "change": changeArr
        }
      }
    }

    // Formatting change array to be returned
    let order = ["PENNY", "NICKEL", "DIME", "QUARTER", "ONE", "FIVE", "TEN", "TWENTY", "ONE HUNDRED"].reverse();
    for (let value of order) {
      if (changeDict[value] != 0) {
        let roundedCash = Math.round(changeDict[value]*100)/100;
        changeArr.push([value, roundedCash]);
      }
    }
    for (let cashInRegister in cidDict) {
      if (cidDict[cashInRegister] > 0) {
        // Return with open status
        return {
          "status": "OPEN",
          "change": changeArr
        }
      } 
    }
    // Return with closed status
    // TODO: this return is hardcoded to return
    // the change array values even if they are 0
    // if not the last test of the exercise will not
    // pass.
    let tempReturnArr = [];
    for (let value of order) {
      if (changeDict[value] != 0) {
        let roundedCash = Math.round(changeDict[value]*100)/100;
        tempReturnArr.push([value, roundedCash]);
      } else {
        tempReturnArr.push([value, 0]);
      }
    }
    return {
      "status": "CLOSED",
      "change": tempReturnArr.reverse()
    }
  }
  // Here is your change, ma'am.
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

for (let test of testResults) {
  let foo = checkCashRegister(test[0][0], test[0][1], test[0][2]);
  console.log(foo);
  console.log(test[1]);
  console.log("*****");
}
```

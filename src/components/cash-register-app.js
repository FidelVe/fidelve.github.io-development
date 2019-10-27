/*
 * Simple Cash Register App.
 * Takes price of product, payment in cash and amount of money in cash inside
 * the register. It calculates the change due to the client, if the transaction
 * can be made or not (depending if the cash in the register is enough for the
 * change) and the new register cash state (how many bills and coins of each
 * denomination are left)
 * */
import React from 'react';
import {useState} from 'react';
import style from './cash-register-app.module.css';
import CollapseContainer from './collapse-container';
import MoneyInput from './money-input';

// Contants declaration
const LABELS = [
  'hundred',
  'fifty',
  'twenty',
  'ten',
  'five',
  'one',
  'quarter',
  'dime',
  'nickel',
  'cent',
];
const DEFAULT_REGISTER = [
  {label: LABELS[0], value: '100', amount: '200', isCoin: false},
  {label: LABELS[1], value: '50', amount: '150', isCoin: false},
  {label: LABELS[2], value: '20', amount: '120', isCoin: false},
  {label: LABELS[3], value: '10', amount: '70', isCoin: false},
  {label: LABELS[4], value: '5', amount: '85', isCoin: false},
  {label: LABELS[5], value: '1', amount: '42', isCoin: false},
  {label: LABELS[6], value: '25', amount: '4.25', isCoin: true},
  {label: LABELS[7], value: '10', amount: '3.1', isCoin: true},
  {label: LABELS[8], value: '5', amount: '5.05', isCoin: true},
  {label: LABELS[9], value: '1', amount: '3.11', isCoin: true},
];
const LEGEND_STYLE = {
  backgroundColor: '#fff',
  fontSize: '16px',
  lineHeight: '18px',
  borderRadius: '2px',
};
// Collapse inner content style
const COLL_CONT_STYLE = {padding: '6px 0px'};

const CashRegisterApp = props => {
  /*
   * This is a component that simulates a Cash Register.
   * The Cash Register has an amount of bills of various denominations inside
   * and makes transactions. It takes a payment amount and a price, it
   * calculates the change that it needs to returns and based on the amount
   * of cash it has inside, it returns the exact change.
   */
  // Component state
  const [cashInRegister, setCashInRegister] = useState(createCashState());
  const [change, setChange] = useState(createCashState(true));
  const [updatedCashInRegister, setUpdatedCashInRegister] = useState(
    createCashState(true),
  );
  const [price, setPrice] = useState('');
  const [payment, setPayment] = useState('');

  const updateCash = childData => {
    /*
     * Ex:
     * childData = {label: "one" value: 10}
     */
    return updateObject(cashInRegister, childData);
  };

  const onCalculate = () => {
    // Takes the price, payment and cashInRegister states and calculates
    // the client change, and new state for the register
    let changeState = createCashState(true);
    let registerState = {...cashInRegister};
    let changeAmount =
      Math.round((parseFloat(payment) - parseFloat(price)) * 100) / 100;

    if (changeAmount > 0 && changeAmount < registerState.amount) {
      // if the payment entered by the user is bigger than the price and
      // the amount in the register is bigger than the payment, the
      // transaction is valid
      wrapperForMakeTransaction(changeAmount, registerState);
    } else {
      alert(
        'Payment cannot be processed: Payment should be bigger than the price and less than the amount in the register',
      );
    }
  };

  return (
    <div className={style.container}>
      <fieldset style={{marginBottom: '4px'}}>
        <legend style={LEGEND_STYLE}>Input:</legend>
        <div className={style.container3}>
          <div className={style.container1}>
            <div className={style.container2}>
              <h5>Price:</h5>
              <input
                type="text"
                value={price}
                onChange={e => setPrice(validateCashInput(e.target.value))}
              />
            </div>
            <div className={style.container2}>
              <h5>Payment:</h5>
              <input
                type="text"
                value={payment}
                onChange={e => setPayment(validateCashInput(e.target.value))}
              />
            </div>
            <div className={style.container2}>
              <button onClick={onCalculate}>Calculate</button>
            </div>
          </div>
          <CollapseContainer
            large={false}
            styledBorder={false}
            headerText={`Cash in register: $${toTwoDecimalPoints(
              cashInRegister.amount,
            )}`}
            contentStyle={COLL_CONT_STYLE}>
            <div className={style.collapseContent}>
              {LABELS.map((label, key) => (
                <MoneyInput
                  label={label}
                  action={data => setCashInRegister(updateCash(data))}
                  key={label}
                  value={cashInRegister[label].value}
                  isCents={cashInRegister[label].isCoin}
                  input={toTwoDecimalPoints(cashInRegister[label].amount)}
                />
              ))}
            </div>
          </CollapseContainer>
        </div>
      </fieldset>
      <fieldset style={{marginBottom: '4px'}}>
        <legend style={LEGEND_STYLE}>Result:</legend>
        <div className={style.container1}>
          {[
            ['Client change:', change],
            ['New cash in Register:', updatedCashInRegister],
          ].map((array, key) => (
            <CollapseContainer
              key={key}
              large={false}
              styledBorder={false}
              headerText={`${array[0]} $${toTwoDecimalPoints(array[1].amount)}`}
              contentStyle={COLL_CONT_STYLE}>
              <div className={style.collapseContent}>
                {LABELS.map((label, key) => (
                  <MoneyInput
                    label={label}
                    action={data => null}
                    key={label}
                    value={array[1][label].value}
                    isCents={array[1][label].isCoin}
                    input={array[1][label].amount}
                  />
                ))}
              </div>
            </CollapseContainer>
          ))}
        </div>
      </fieldset>
      {/* <hr className={style.hr} /> */}
      <div className={style.container1}></div>
    </div>
  );
};

CashRegisterApp.defaultProps = {};

function validateCashInput(value) {
  // Validates input to only accept numbers, either integer or decimal
  // This functions returns a string in order to keep the decimal point
  // if the user adds it

  // This compensates for the fact that parseFloat() eliminates trailing zeros
  const lastChar =
    value[value.length - 1] === '.'
      ? '.'
      : value[value.length - 2] === '.' && value[value.length - 1] === '0'
      ? '.0'
      : '';

  const parsedValue = parseFloat(value);
  if (Number.isNaN(parsedValue)) {
    return '';
  }
  return parsedValue.toString() + lastChar;
}

function createCashState(returnEmpty = false) {
  let state = {
    amount: 0,
    state: '',
  };

  for (let obj of DEFAULT_REGISTER) {
    let tempObj = {};
    tempObj.value = obj.value;
    tempObj.isCoin = obj.isCoin;
    if (!returnEmpty) {
      tempObj.amount = obj.amount;
      state.amount += parseFloat(obj.amount);
    } else {
      tempObj.amount = 0;
    }
    state[obj.label] = tempObj;
  }

  return state;
}

function toTwoDecimalPoints(num) {
  return Math.round(parseFloat(num) * 100) / 100;
}

function updateObject(obj, update) {
  let newObj = {...obj};
  let oldValue = parseFloat(newObj[update.label].amount);
  let newValue = parseFloat(update.value);

  newObj.amount = `${parseFloat(newObj.amount) - oldValue + newValue}`;
  newObj[update.label].amount = `${newValue}`;

  return newObj;
}

function wrapperForMakeTransaction(change, state) {
  /* This is a wrapper to format the cash register data into an object
   * in the correct format for makeTransaction().
   * This is to avoid refactorin makeTransaction() and make it reusable.
   */
  let formattedState = {totalAmount: state.amount};
  LABELS.forEach(
    label => (formattedState[label] = toTwoDecimalPoints(state[label].amount)),
  );

  console.log(makeTransaction(change, formattedState));
}
function fooTest() {
  let foo = {a: 0, b: 0, c: 0};
  console.log(foo);
  foo.a = 1;
}

function makeTransaction(change, registerState) {
  /*
   * This functions takes an amount to return (change) and a state
   * (registerState) and calculates if the change can be returned or not.
   * The object format for the registerState is as follow:
   * const REGISTER_STATE = {
   *   totalAmount: int,
   *   hundred: int,
   *   fifty: int,
   *   twenty: int,
   *   ten: int,
   *   five: int,
   *   one: int,
   * };
   * TODO: Refactor to make it work with coins
   */
  // Making a copy of the inputs that we are going to mutate, to make
  // sure this is a pure function
  let copyOfRegisterState = {...registerState};
  let copyOfChange = change;
  console.log(`Change: ${copyOfChange}`);
  console.log(`Register State: `, copyOfRegisterState);

  // An ordered array of bill denomination from higher to lowest
  const bills = [
    ['hundred', 100],
    ['fifty', 50],
    ['twenty', 20],
    ['ten', 10],
    ['five', 5],
    ['one', 1],
  ];

  const coins = [
    ['quarter', 0.25],
    ['dime', 0.1],
    ['nickel', 0.05],
    ['cent', 0.01],
  ];

  // Initializing the object we are going to return
  let returnedCash = {totalAmount: 0};
  bills.forEach(bill => (returnedCash[bill[0]] = 0));
  // { hundred: 0, fifty: 0, twenty: 0, ten: 0, five: 0,
  // one: 0, quarter: 0, dime: 0, nickel: 0, cent: 0 };

  if (copyOfChange <= copyOfRegisterState.totalAmount) {
    // Making sure we have enough money for the transaction

    if (copyOfChange === copyOfRegisterState.totalAmount) {
      // If the change to return is the same amount inside the register
      return copyOfRegisterState;
    }

    for (let eachBill of bills) {
      // Going from highest denomination to lower

      if (eachBill[1] <= copyOfChange) {
        // If the current bill value is smaller than the change to return

        let multiplier = Math.floor(copyOfChange / eachBill[1]);
        let amountToAddAndSubstract =
          eachBill[1] * multiplier < copyOfRegisterState[eachBill[0]]
            ? eachBill[1] * multiplier
            : copyOfRegisterState[eachBill[0]];

        // Substracting the amount from the ATM state (the copy we made)
        copyOfRegisterState[eachBill[0]] -= amountToAddAndSubstract;
        copyOfRegisterState.totalAmount -= amountToAddAndSubstract;

        // Adding the amount to object to return
        returnedCash[eachBill[0]] += amountToAddAndSubstract;
        returnedCash.totalAmount += amountToAddAndSubstract;

        // Updating the amount
        copyOfChange -= amountToAddAndSubstract;
      }
    }

    //TODO: TEST FROM HERE
    returnedCash = toTwoDecimalPoints(returnedCash.totalAmount);
    console.log(change, returnedCash);
    if (returnedCash === change) {
      // If we have the right combination of each bill to return
      // the exact change, we return it.
      return returnedCash;
    }
  }

  // If we get to this point the amount of cash cannot be returned
  // we either dont have enough money or the combination of bills
  // we have cannot be combined to return the requested amount
  return 'The requested amount cannot be procesed';
}

export default CashRegisterApp;

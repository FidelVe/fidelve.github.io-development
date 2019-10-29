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
import COLORS from '../assets/color-scheme';

// Main Color to use
const COLOR = COLORS.sand;

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
  fontSize: '12px',
  lineHeight: '14px',
  borderRadius: '2px',
  padding: '0px 2px',
};
const BUTTON_STYLE = {
  // border: 'solid thin black',
  // borderRadius: '2px',
  // backgroundColor: COLOR.splitComplementary.second.tint,
  // color: '#000',
};
// Collapse inner content style
const COLL_CONT_STYLE = {}; //{padding: '6px 0px'};

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
    let changeAmount = toTwoDecimalPoints(payment - price);
    // Math.round((parseFloat(payment) - parseFloat(price)) * 100) / 100;

    if (changeAmount > 0 && changeAmount < registerState.amount) {
      // if the payment entered by the user is bigger than the price and
      // the amount in the register is bigger than the payment, the
      // transaction is valid
      [changeState, registerState] = wrapperForMakeTransaction(
        changeAmount,
        registerState,
      );

      setChange(changeState);
      setUpdatedCashInRegister(registerState);
    } else {
      alert(
        'Payment cannot be processed: Payment should be bigger than the price and less than the amount in the register',
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#eee', //COLOR.tint,
        borderColor: COLOR.shade,
        maxWidth: '670px',
        margin: '6px auto',
      }}
      className={style.container}>
      <fieldset style={{marginBottom: '4px'}}>
        <legend style={LEGEND_STYLE}>Input:</legend>
        <div className={style.container3}>
          <div
            style={{
              backgroundColor: COLOR.splitComplementary.second.main,
              margin: '4px 0px',
            }}
            className={style.container1}>
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
              <button
                style={BUTTON_STYLE}
                className={style.button}
                onClick={onCalculate}>
                Calculate
              </button>
            </div>
          </div>
          <CollapseContainer
            large={false}
            styledBorder={false}
            headerText={`Cash in register: $${toTwoDecimalPoints(
              cashInRegister.amount,
            )}`}
            mainInlineStyle={{
              backgroundColor: COLOR.splitComplementary.second.main,
              marginBottom: '4px',
            }}
            contentInlineStyle={COLL_CONT_STYLE}>
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
              mainInlineStyle={{
                backgroundColor: COLOR.splitComplementary.second.main,
                marginBottom: '4px',
              }}
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
                    disable={true}
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
  // creating blank change and register states
  let outputChangeState = createCashState(true);
  let outputRegisterState = createCashState(true);

  // Creating a minimized state in the appropiate format to serve
  // as input to makeTransaction()
  let minimizedState = {totalAmount: state.amount};
  LABELS.forEach(
    label => (minimizedState[label] = toTwoDecimalPoints(state[label].amount)),
  );

  // Calculating the change and the register new state
  let [rawChangeState, rawRegisterNewState] = makeTransaction(
    change,
    minimizedState,
  );

  // Updating outputChangeState and outputRegisterState
  if (rawChangeState && rawRegisterNewState !== null) {
    outputChangeState.amount = rawChangeState.totalAmount;
    outputRegisterState.amount = rawRegisterNewState.totalAmount;

    LABELS.forEach(label => {
      outputChangeState[label].amount = rawChangeState[label];
      outputRegisterState[label].amount = rawRegisterNewState[label];
    });
  } else {
    [outputRegisterState, outputChangeState] = [null, null];
  }

  return [outputChangeState, outputRegisterState];
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
   */
  // Making a copy of the inputs that we are going to mutate, to make
  // sure this is a pure function
  let copyOfRegisterState = {...registerState};
  let copyOfChange = change;

  // An ordered array of bill denomination from higher to lowest
  const bills = [
    ['hundred', 100],
    ['fifty', 50],
    ['twenty', 20],
    ['ten', 10],
    ['five', 5],
    ['one', 1],
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

    // Temp variable to calculate the register's new totalAmount state
    let tempTotalAmount = 0;

    for (let eachBill of bills) {
      // Going from highest denomination to lower

      if (eachBill[1] <= copyOfChange) {
        // If the current bill value is smaller than the change to return

        let multiplier = Math.floor(copyOfChange / eachBill[1]);
        // This multiplier handles coins (value<1) and bills (value >=1)
        // let multiplier =
        //   eachBill[1] >= 1
        //     ? Math.floor(copyOfChange / eachBill[1])
        //     : Math.floor(copyOfChange / eachBill[1]) -
        //       Math.floor(Math.floor(copyOfChange) / eachBill[1]);

        let amountToAddAndSubstract =
          eachBill[1] * multiplier < copyOfRegisterState[eachBill[0]]
            ? eachBill[1] * multiplier
            : copyOfRegisterState[eachBill[0]];

        // Updating variables by substracting or adding the transaction
        // substracting
        [copyOfRegisterState[eachBill[0]], copyOfChange] = [
          copyOfRegisterState[eachBill[0]],
          copyOfChange,
        ].map(each => toTwoDecimalPoints(each - amountToAddAndSubstract));
        // Adding
        [returnedCash[eachBill[0]], returnedCash.totalAmount] = [
          returnedCash[eachBill[0]],
          returnedCash.totalAmount,
        ].map(each => toTwoDecimalPoints(each + amountToAddAndSubstract));
      }

      // Adding up the updated state for each denomination
      tempTotalAmount += copyOfRegisterState[eachBill[0]];
    }

    // The new register total amount is the sum of the updated state for
    // each denomination after substracting value from them
    copyOfRegisterState.totalAmount = tempTotalAmount;

    if (returnedCash.totalAmount === change) {
      // If we have the right combination of each bill to return
      // the exact change, we return it.
      return [returnedCash, copyOfRegisterState];
    }
  }

  // If we get to this point the amount of cash cannot be returned
  // we either dont have enough money or the combination of bills
  // we have cannot be combined to return the requested amount
  return [null, null];
}

export default CashRegisterApp;

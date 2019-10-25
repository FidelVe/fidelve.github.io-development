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
// DEFAULT_REGISTER is the default amount of cash in the register
const DEFAULT_REGISTER = {
  hundred: '200',
  fifty: '150',
  twenty: '120',
  ten: '70',
  five: '85',
  one: '42',
  quarter: '3.25',
  dime: '4.1',
  nickel: '5.05',
  cent: '3.11',
};
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
const DEFAULT_REGISTER_TEMP = [
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
const MONEY_ARRAY = [
  ['100', false, 'hundred'],
  ['50', false, 'fifty'],
  ['20', false, 'twenty'],
  ['10', false, 'ten'],
  ['5', false, 'five'],
  ['1', false, 'one'],
  ['25', true, 'quarter'],
  ['10', true, 'dime'],
  ['5', true, 'nickel'],
  ['1', true, 'cent'],
];

const CashRegisterApp = props => {
  /*
   */

  // let childStates = {...DEFAULT_REGISTER};
  const [cashInRegister, setCashInRegister] = useState(createInitState());

  const updateCash = childData => {
    return updateObject(cashInRegister, childData);
  };

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div className={style.innerContainer1}>
          <h5>Price:</h5>
          <input type="text" />
        </div>
        <div className={style.innerContainer1}>
          <h5>Payment:</h5>
          <input type="text" />
        </div>
        <div className={style.innerContainer1}>
          <button>Calculate</button>
        </div>
      </div>
      <div className={style.innerContainer}>
        <CollapseContainer
          large={false}
          styledBorder={false}
          headerText={`Cash in register: $${cashInRegister.amount}`}
          contentStyle={{padding: '6px 0px'}}>
          <div className={style.collapseContent}>
            {LABELS.map((label, key) => (
              <MoneyInput
                label={label}
                action={data => setCashInRegister(updateCash(data))}
                key={label}
                value={cashInRegister[label].value}
                isCents={cashInRegister[label].isCoin}
                input={cashInRegister[label].amount}
              />
            ))}
          </div>
        </CollapseContainer>
      </div>
      {/* <hr className={style.hr} /> */}
      <div className={style.innerContainer}></div>
    </div>
  );
};

CashRegisterApp.defaultProps = {};

function createInitState() {
  let state = {
    amount: 0,
    state: '',
  };

  for (let obj of DEFAULT_REGISTER_TEMP) {
    let tempObj = {};
    tempObj.value = obj.value;
    tempObj.amount = obj.amount;
    tempObj.isCoin = obj.isCoin;
    state[obj.label] = tempObj;
    state.amount += parseFloat(obj.amount);
  }

  return state;
}

function updateObject(obj, update) {
  console.log(obj);
  console.log(update);
  let newObj = {...obj};
  let oldValue = parseFloat(newObj[update.label].amount);
  let newValue = parseFloat(update.value);

  newObj.amount = `${parseFloat(newObj.amount) - oldValue + newValue}`;
  newObj[update.label].amount = `${newValue}`;

  return newObj;
}

export default CashRegisterApp;

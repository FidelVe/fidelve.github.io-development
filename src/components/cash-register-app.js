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

const CashRegisterApp = props => {
  /*
   */

  const [inputValue, setInputValue] = useState('');

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div className={style.innerContainer1}>
          <h5>"foo"</h5>
          <input type="text" />
        </div>
        <div className={style.innerContainer1}>
          <h5>"foo"</h5>
          <input type="text" />
        </div>
      </div>
      <div className={style.innerContainer}></div>
      <div className={style.innerContainer}></div>
    </div>
  );
};

CashRegisterApp.defaultProps = {};

export default CashRegisterApp;

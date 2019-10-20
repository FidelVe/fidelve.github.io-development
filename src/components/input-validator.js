/*
 * Responsive validator component.
 * Takes an input and a validator function. depending on the result
 * of validating the input agains the function, it displays a valid or
 * invalid result icon (green check icon or red error icon)
 * */
import React from 'react';
import {useState} from 'react';
import style from './input-validator.module.css';

const InputValidator = props => {
  /*
   * props.validator
   * props.label
   * props.placeholder
   */

  const [isValid, setIsValid] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const evalInput = e => {
    if (e.target.value !== '') {
      // Check that e.target.value is not an empty string
      let result = props.validator(e.target.value);
      if (typeof result === 'boolean') {
        // result is a boolean (true or false).
        setIsValid(result);
      } else {
        throw 'Error. result is not a boolean value';
      }
    }
    // Updates input value being displayed
    setInputValue(e.target.value);
  };

  return (
    <div className={style.container}>
      <h5 className={style.label}>{props.label}:</h5>
      <input
        value={inputValue}
        onChange={e => evalInput(e)}
        className={style.input}
        placeholder={props.placeholder}
        type="text"
      />
      {isValid ? (
        <div className={style.image} />
      ) : (
        <div className={`${style.image} ${style.error}`} />
      )}
    </div>
  );
};

export default InputValidator;

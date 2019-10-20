/*
 * Responsive input transform component.
 * Takes an input and a validator function. depending on the result
 * of validating the input agains the function, it displays a valid or
 * invalid result icon (green check icon or red error icon)
 * */
import React from 'react';
import {useState} from 'react';
import style from './input-transform.module.css';

const InputTransform = props => {
  /*
   * props.inputLabel
   * props.inputPlaceholder
   * props.inputType
   * props.transformFunction
   * props.outputLabel
   * props.outputPlaceholder
   */

  const [inputValue, setInputValue] = useState('');

  const wrapperFunction = input => {
    return props.transformFunction(input);
  };

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div className={style.labelContainer}>
          <h5 className={style.label}>{props.inputLabel}:</h5>
        </div>
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className={style.input}
          placeholder={props.inputPlaceholder}
          type={props.inputType}
        />
      </div>
      <div className={style.innerContainer}>
        <div className={style.labelContainer}>
          <h5 className={style.label}>{props.outputLabel}:</h5>
        </div>
        <input
          disabled
          value={wrapperFunction(inputValue)}
          className={style.input}
          placeholder={props.outputPlaceholder}
          type="text"
        />
      </div>
    </div>
  );
};

InputTransform.defaultProps = {
  inputLabel: 'input Label',
  inputPlaceholder: 'input placeholder',
  inputType: 'text',
  transformFunction: i => i,
  outputLabel: 'output label',
  outputPlaceholder: 'output placeholder',
};
export default InputTransform;

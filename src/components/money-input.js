/*
 * MoneyInput component, part of Cash Register App.
 * */
import React from 'react';
import {useState} from 'react';
import style from './money-input.module.css';

const MoneyInput = ({value, isCents, input, action, label}) => {
  const step = isCents ? parseInt(value) / 100 : parseInt(value);
  const unit = isCents ? 'coins' : 'bills';
  const unitLabel = isCents ? '\u00A2' : '\u0024';

  //component state
  const [inputValue, setInputValue] = useState(parseFloat(input));

  const onInputChange = e => {
    // Set internal state
    setInputValue(e.target.value);
    // Pass data to parent
    action({label: e.target.getAttribute('label'), value: e.target.value});
  };

  return (
    <div className={style.container}>
      <p
        style={{
          margin: '2px 4px',
        }}>{`Amount in ${unitLabel}${value} ${unit}`}</p>
      <div className={style.innerContainer}>
        &#36;:
        <input
          label={label}
          type="number"
          min="0"
          step={`${step}`}
          value={input}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

MoneyInput.defaultProps = {
  input: 0,
};
export default MoneyInput;

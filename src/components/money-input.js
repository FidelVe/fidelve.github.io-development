/*
 * MoneyInput component, part of Cash Register App.
 * This is a stateless component, the input state is saved
 * in the parent component.
 * */
import React from 'react';
// import {useState} from 'react';
import style from './money-input.module.css';

const MoneyInput = ({value, isCents, input, action, label, disable}) => {
  const step = isCents ? parseInt(value) / 100 : parseInt(value);
  const unit = isCents ? 'coins' : 'bills';
  const unitLabel = isCents ? '\u00A2' : '\u0024';

  //component state
  // const [inputValue, setInputValue] = useState(parseFloat(input));

  const onInputChange = e => {
    let newInputValue = parseFloat(e.target.value);
    let parsedStep = parseFloat(step);

    if (validateInput(newInputValue, parsedStep)) {
      // Set internal state
      // setInputValue(newInputValue);
      // Pass data to parent
      action({
        label: e.target.getAttribute('label'),
        value: newInputValue,
      });
    } else {
      console.log('not valid number');
    }
  };

  return (
    <div className={style.container}>
      <p
        style={{
          margin: '2px 4px',
        }}>{`Amount in ${unitLabel}${value} ${unit}`}</p>
      <div className={style.innerContainer}>
        &#36;:
        {disable ? (
          <input
            label={label}
            type="number"
            min="0"
            step={`${step}`}
            value={input}
            onChange={onInputChange}
            disabled
          />
        ) : (
          <input
            label={label}
            type="number"
            min="0"
            step={`${step}`}
            value={input}
            onChange={onInputChange}
          />
        )}
      </div>
    </div>
  );
};

function validateInput(input, minValue) {
  let parsedInput = Math.round(100 * input);
  let parsedMinValue = Math.round(100 * minValue);
  return parsedInput % parsedMinValue === 0 ? true : false;
}
MoneyInput.defaultProps = {
  input: 0,
  disable: false,
};
export default MoneyInput;

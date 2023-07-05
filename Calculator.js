import React, { useState } from 'react';
import styles from './Calculator.module.css';

const calculatorButtons = [
    ['7', '8', '9', '/','sqrt'],
    ['4', '5', '6', '*','sq'],
    ['1', '2', '3', '-','%'],
    ['0', '.', '=', '+','C'],
  ];
  

function Calculator() {
  const [calcInput, setCalcInput] = useState('');

  function handleCalcButtonClick(buttonValue) {
    switch (buttonValue) {
      case '=':
        try {
          setCalcInput(eval(calcInput));
        } catch {
          setCalcInput("Error");
        }
        break;
      case 'C':
        setCalcInput('');
        break;
      case 'sqrt':
        setCalcInput(Math.sqrt(calcInput));
        break;
      case 'sq':
        setCalcInput(Math.pow(calcInput, 2));
        break;
      case '%':
        setCalcInput(calcInput / 100);
        break;
      default:
        setCalcInput(calcInput + buttonValue);
        break;
    }
  }

  return (
    <div className={styles.calculator}>
      <input type='text' className={styles.display} value={calcInput} readOnly />
      <div className={styles.buttonGrid}>
        {calculatorButtons.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((buttonValue, index) => (
              <button key={index} className={styles.button} onClick={() => handleCalcButtonClick(buttonValue)}>
                {buttonValue}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calculator;

import React, { useRef } from 'react';
import './App.css';
import useCalc from './hooks/useCalc';

function App() {
  const operandOneRef = useRef('0');
  const operandTwoRef = useRef('0');
  const operatorRef = useRef('+');
  const [setOperands, setOperation, result] = useCalc();

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOperands([operandOneRef.current, operandTwoRef.current]);
    setOperation(operatorRef.current as any);
  };

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const data = e.currentTarget.value;
    const name = e.currentTarget.name;

    switch (name) {
      case 'operandOne':
        operandOneRef.current = data;
        break;
      case 'operandTwo':
        operandTwoRef.current = data;
        break;
    }
  };

  const onChangeSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    const data = e.currentTarget.value;
    operatorRef.current = data;
  };

  const error = result === Infinity ? 'Cannot divide by zero' : '';

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input className="operandOne" name="operandOne" type="number" onChange={onChangeInput} />
        <div className="selectContainer">
          <select name="operator" onChange={onChangeSelect}>
            <option value="+">Add + </option>
            <option value="*">Multiply *</option>
            <option value="-">Substract -</option>
            <option value="/">Divide /</option>
          </select>
        </div>
        <input className="operandTwo" name="operandTwo" type="number" onChange={onChangeInput} />
        <button className="calc-button">Calculate</button>
      </form>
      <div className="result">
        <CalculatorResult result={result} error={error} />
      </div>
    </div>
  );
}

type CalculatorResultProps = {
  result: number | null;
  error: string;
};

const CalculatorResult = ({ result, error }: CalculatorResultProps) => {
  if (error) {
    return <div className="calc-error">{error}</div>
  }

  return (
    <div className="calc-result">
      = {result}
    </div>
  );
}

export default App;

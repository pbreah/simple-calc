import { useEffect, useState } from "react";

enum Operators {
  Plus = '+',
  Minus = '-',
  Multiply = '*',
  Divide = '/'
}

const useCalc = () => {
  const [operands, setOperands] = useState<[string, string]>(['0', '0']);
  const [operation, setOperation] = useState<Operators>(Operators.Plus);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const [op1, op2] = operands;
    setResult(calculate(parseInt(op1), operation, parseInt(op2)));
  }, [operands, operation]);

  return [setOperands, setOperation, result] as const;
};

/* Used to perform our calculator operations */
const calculate = (operandOne: number, operator: string, operandTwo: number) => {
  if (isNaN(operandOne) || isNaN(operandTwo)) return null;
  
  switch (operator) {
    case '+':
      return operandOne + operandTwo;
    case '-':
      return operandOne - operandTwo;
    case '*':
      return operandOne * operandTwo;
    case '/':
      if (operandTwo !== 0) return operandOne / operandTwo;
      return Infinity;
    default:
      return null;
  }
};

export default useCalc;
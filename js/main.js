const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return b === 0 ? 'error' : a / b;
}
function pow(a, b) {
  return a ** b;
}

function operate() {
  let result;
  secondOperand = parseFloat(displayValue);
  switch (currentOperator) {
    case '+':
      result = add(firstOperand, secondOperand);
      break;
    case '-':
      result = subtract(firstOperand, secondOperand);
      break;
    case '*':
      result = multiply(firstOperand, secondOperand);
      break;
    case '/':
      result = divide(firstOperand, secondOperand);
      break;
    case '**':
      result = pow(firstOperand, secondOperand);
      break;
  }

  displayValue = result.toString();
  firstOperand = result;
  currentOperator = null;
  updateDisplay();
}

function updateDisplay() {
  display.textContent = displayValue;
}

function clearCalculator() {
  displayValue = '0';
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  updateDisplay();
}

function handleNumber(number) {
  if (displayValue === '0') {
    displayValue = number;
  } else {
    displayValue += number;
  }
  updateDisplay();
}
function handleDecimal() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
  }
  updateDisplay();
}
function handleOperator(operator) {
  if (firstOperand !== null && currentOperator !== null) {
    operate();
  }
  firstOperand = parseFloat(displayValue);
  currentOperator = operator;
  displayValue = '0';
}
function handleBackSpace() {
  displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : '0';
  updateDisplay();

  updateDisplay();
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('number')) {
      handleNumber(btn.textContent);
    } else if (btn.id === 'clear') {
      clearCalculator();
    } else if (btn.id === 'decimal') {
      handleDecimal();
    } else if (btn.id === 'backspace') {
      handleBackSpace();
    } else if (btn.id === 'equals') {
      if (firstOperand !== null && currentOperator !== null) {
        operate();
      }
    } else {
      handleOperator(btn.textContent);
    }
  });
});

updateDisplay();

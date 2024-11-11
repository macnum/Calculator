const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.btn');

let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;

function add(first, second) {
  return first + second;
}

function subtract(first, second) {
  return first - second;
}
function multiply(first, second) {
  return first * second;
}
function divide(first, second) {
  return second === 0 ? 'error' : first / second;
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
  }
  displayValue = result.toString();
  firstOperand = displayValue;
  currentOperator = null;
  updateDisplay();
}

function updateDisplay() {
  display.textContent = displayValue;
}

function clearCalculator() {
  displayValue = '0';
  firstOperand = null;
  currentOperator = null;
  updateDisplay();
}

function handleDecimal() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
  }
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
function handleOperator(operator) {
  if (firstOperand !== null && currentOperator !== null) {
    operate();
  }
  firstOperand = parseFloat(displayValue);
  currentOperator = operator;
  displayValue = '0';
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.classList.contains('number')) {
      handleNumber(button.textContent);
    } else if (button.id === 'clear') {
      clearCalculator();
    } else if (button.id === 'decimal') {
      handleDecimal();
    } else if (button.id === 'equals') {
      if (firstOperand !== null && currentOperator !== null) {
        operate();
      }
    } else {
      handleOperator(button.textContent);
    }
  });
});

updateDisplay();

const operators = document.querySelectorAll(".operator");
const operand = document.querySelectorAll(".operand");
const equalSign = document.querySelector(".equals");
const bigResult = document.querySelector(".big-result");
const clearButton = document.querySelector(".clear");
bigResult.textContent = 0;
let leftSide = 0;
let rightSide = "";
let middle = "";
let isOperating = false;
function add(a, b) {
  return roundNumber(Number(a) + Number(b));
}

function subtract(a, b) {
  return roundNumber(Number(a) - Number(b));
}

function multiply(a, b) {
  return roundNumber(Number(a) * Number(b));
}

function divide(a, b) {
  return roundNumber(Number(a) / Number(b));
}
function modulo(a, b) {
  return roundNumber(Number(a) % Number(b));
}

function roundNumber(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function operate(firstNumber, operator, secondNumber) {
  if (operator == "+") {
    return add(firstNumber, secondNumber);
  } else if (operator == "-") {
    return subtract(firstNumber, secondNumber);
  } else if (operator == "*") {
    return multiply(firstNumber, secondNumber);
  } else if (operator == "/") {
    return divide(firstNumber, secondNumber);
  } else if (operator == "%") {
    return modulo(firstNumber, secondNumber);
  } else {
    return "invalid";
  }
}

operators.forEach((item) => {
  item.addEventListener("click", (e) => {
    let value = e.target.textContent;
    if (isOperating) {
      if (rightSide == "") {
        middle = value;
      } else {
        leftSide = operate(leftSide, middle, rightSide);
        rightSide = "";
        middle = value;
      }
    } else {
      isOperating = true;
      middle = value;
    }
    displayOnScreen();
  });
});

operand.forEach((item) => {
  item.addEventListener("click", (e) => {
    let value = e.target.textContent;
    if (!isOperating) {
      if (leftSide == 0) {
        leftSide = value;
      } else {
        leftSide += value;
      }
      displayOnScreen();
    } else {
      rightSide += value;
      displayOnScreen();
    }
  });
});

equalSign.addEventListener("click", () => {
  leftSide = operate(leftSide, middle, rightSide);
  isOperating = false;
  rightSide = "";
  middle = "";
  displayOnScreen();
});

clearButton.addEventListener("click", clearScreen);

function displayOnScreen() {
  bigResult.textContent = leftSide + middle + rightSide;
}

function clearScreen() {
  leftSide = 0;
  middle = "";
  rightSide = "";
  isOperating = false;
  displayOnScreen();
}

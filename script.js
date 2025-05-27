const operators = document.querySelectorAll(".operator");
const operand = document.querySelectorAll(".operand");
const equalSign = document.querySelector(".equals");
const bigResult = document.querySelector(".big-result");
const clearButton = document.querySelector(".clear");
const clearNumber = document.querySelector(".clear-character");
const smallDisplay = document.querySelector(".small-result");
let result = 0;
smallDisplay.textContent = 0;
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
  if (b == "") {
    b = 1;
  }
  return roundNumber(Number(a) * Number(b));
}

function divide(a, b) {
  if (b == "") {
    b = 1;
  }

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
function operandConditions(e) {
  let value = e.target.textContent;
  if (!isOperating) {
    if (leftSide == 0) {
      leftSide = value;
    } else {
      leftSide += value;
    }
    displayOnScreen();
    setSmallDisplay();
  } else {
    rightSide += value;
    result = operate(leftSide, middle, rightSide);
    setSmallDisplay(result);
    displayOnScreen();
  }
}
function operatorConditon(e) {
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
}

operators.forEach((item) => {
  item.addEventListener("click", operatorConditon);
});

operand.forEach((item) => {
  item.addEventListener("click", operandConditions);
});
function equalSignCondition(e) {
  leftSide = operate(leftSide, middle, rightSide);
  if (leftSide == "Infinity") {
    operand.forEach((item) => {
      item.removeEventListener("click", operandConditions);
    });
    operators.forEach((item) => {
      item.removeEventListener("click", operatorConditon);
    });
    equalSign.removeEventListener("click", equalSignCondition);
  }
  isOperating = false;
  rightSide = "";
  middle = "";
  displayOnScreen();
  setSmallDisplay();
}
equalSign.addEventListener("click", equalSignCondition);

clearButton.addEventListener("click", clearScreen);

function displayOnScreen() {
  bigResult.textContent = leftSide + middle + rightSide;
}

function clearScreen() {
  leftSide = 0;
  middle = "";
  rightSide = "";
  isOperating = false;
  operand.forEach((item) => {
    item.addEventListener("click", operandConditions);
  });
  displayOnScreen();
  setSmallDisplay(leftSide);
  operators.forEach((item) => {
    item.addEventListener("click", operatorConditon);
  });
}

clearNumber.addEventListener("click", clearNumbers);

function clearNumbers() {
  if (isOperating) {
    if (rightSide == "") {
      middle = "";
      isOperating = false;
      setSmallDisplay(leftSide);
    } else {
      rightSide = rightSide.split("");
      rightSide.splice(rightSide.length - 1, 1);
      rightSide = rightSide.join("");
      result = operate(leftSide, middle, rightSide);
      setSmallDisplay(result);
    }
    displayOnScreen();
  } else {
    if (String(leftSide).length > 1) {
      leftSide = String(leftSide).split("");
      leftSide.splice(leftSide.length - 1, 1);
      leftSide = leftSide.join("");
    } else {
      if (leftSide.length == 1) {
        leftSide = 0;
      }
    }
    displayOnScreen();
    setSmallDisplay(leftSide);
  }
}

function setSmallDisplay(result = "") {
  if (result === "") {
    smallDisplay.textContent = leftSide + middle;
  } else if (result == 0) {
    smallDisplay.textContent = result;
  } else {
    smallDisplay.textContent = result;
  }
}

let calculation = {
  mode: {
    typing: true,
    operation: false,
    result: false,
  },
  number: {
    first: null,
    second: null,
    shownOperation: null,
    shownResult: "0",
  },
  activeOperator: null,
  buttons: {
    clear: {
      isActive: false,
    },
    undo: {
      isActive: false,
    },
    operators: {
      isActive: false,
      valid: ["+", "-", "*", "/"],
    },
    numbers: {
      isActive: false,
      valid: [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
    equal: {
      isActive: false,
    },
  },
};

function showActiveOperation() {
  let signButtons = document.querySelectorAll(
    `[class^="calculator__buttons"][class$="--sign--top"]`
  );
  signButtons.forEach(function (button) {
    button.style.background = "var(--button-sign_color)";
    button.style.color = "var(--button_outline_color)";
  });
  if (calculation.activeOperator !== null) {
    let operator = {
      ["+"]: "add",
      ["-"]: "substract",
      ["*"]: "multiply",
      ["/"]: "divide",
    };
    let activeButton = document.querySelector(
      `.calculator__buttons__${operator[calculation.activeOperator]}--sign--top`
    );
    activeButton.style.background = "rgb(70, 70, 70)";
    activeButton.style.color = "rgb(220, 220, 220)";
    return;
  }
}

function clearRedundantFloat(string) {
  if (string !== null) {
    if (string.lastIndexOf(".") === string.length - 1) {
      return string.slice(0, string.lastIndexOf("."));
    }
  }
  return string;
}

function writeScreen(button) {
  if (calculation.mode.result) {
    clear();
  }

  let shownResult = calculation.number.shownResult;
  let shownOperation = calculation.number.shownOperation;

  if (shownResult.length > 10) {
    return;
  }
  if (button === ".") {
    if (!shownResult.includes(".")) {
      shownResult = shownResult.concat("", ".");
    }
  } else if (shownResult === "0") {
    shownResult = button;
  } else {
    shownResult = shownResult.concat("", button);
  }

  calculation.number.shownResult = shownResult;
  calculation.number.shownOperation = shownOperation;
}

function refreshScreen() {
  let operation = document.querySelector(".calculator__screen__operation--top");
  let result = document.querySelector(".calculator__screen__result--top");

  operation.textContent = calculation.number.shownOperation;
  result.textContent = calculation.number.shownResult;
}

function setModButtons(buttonStatus) {
  const buttons = {
    clear: buttonStatus[0],
    undo: buttonStatus[1],
    operators: buttonStatus[2],
    numbers: buttonStatus[3],
    equal: buttonStatus[4],
  };
  for (const [button, status] of Object.entries(buttons)) {
    calculation.buttons[button].isActive = status;
  }
}

function modOptions(mode, button) {
  if (mode === "typing") {
    if (calculation.mode.operation) {
      if (button !== "undo") {
        calculation.number.shownResult = "0";
      }
      if (button === "undo") {
        calculation.activeOperator = null;
      }
    }
    setModButtons([
      true,
      true,
      true,
      true,
      calculation.number.first === null ? false : true,
    ]);
  }
  if (mode === "operation") {
    calculation.number.shownResult = clearRedundantFloat(
      calculation.number.shownResult
    );
    calculation.number.first = calculation.number.shownResult;
    calculation.number.shownOperation = calculation.number.first;
    calculation.activeOperator = button;
    setModButtons([true, true, true, true, true]);
  }
  if (mode === "result") {
    if (!calculation.mode.result) {
      calculation.number.second = calculation.number.shownResult;
      calculation.number.shownOperation = calculation.number.second;
    }
    if (calculation.mode.result) {
      calculation.number.first = calculation.number.shownResult;
    }
    equals(calculation.number.first, calculation.number.second);
    setModButtons([true, false, true, false, true]);
  }
}

function setMode(newMode, button) {
  modOptions(newMode, button);
  for (const mode in calculation.mode) {
    calculation.mode[mode] = false;
  }
  calculation.mode[newMode] = true;
  showActiveOperation();
}

function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  const msg = "Can't divide by zero!";
  return num2 === 0 ? msg : num1 / num2;
}

function equals(num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  function getDecimalsCount(num) {
    // https://stackoverflow.com/questions/9553354/how-do-i-get-the-decimal-places-of-a-floating-point-number-in-javascript#comment99611709_9553423
    if (isNaN(+num)) return 0;
    const decimals = (num + "").split(".")[1];
    if (decimals) {
      if (decimals === "0") {
        return 0;
      }
      return decimals.length;
    }
    return 0;
  }

  let result = 0;
  switch (calculation.activeOperator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = substract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
  }
  let decimalsCount = Math.max(getDecimalsCount(num1), getDecimalsCount(num2));
  let resultDecimalsCount = getDecimalsCount(result.toFixed(decimalsCount));
  calculation.number.shownResult = result.toFixed(resultDecimalsCount);
}

function clear() {
  setMode("typing");
  calculation.number.first = null;
  calculation.number.second = null;
  calculation.number.shownResult = "0";
  calculation.number.shownOperation = null;
  calculation.activeOperator = null;
  showActiveOperation();
}

function undo() {
  let screenResult = calculation.number.shownResult;

  if (!calculation.mode.result) {
    screenResult = screenResult.length === 1 ? "0" : screenResult.slice(0, -1);
  }

  calculation.number.shownResult = screenResult;
}

function initCalculation(button) {
  if (calculation.buttons.clear.isActive) {
    if (button === "clear") {
      clear();
    }
  }
  if (calculation.buttons.undo.isActive) {
    if (button === "undo") {
      if (calculation.mode.operation) {
        setMode("typing", button);
      } else {
        undo();
      }
    }
  }
  if (calculation.buttons.numbers.isActive) {
    if (calculation.buttons.numbers.valid.includes(button)) {
      if (!calculation.mode.typing) {
        setMode("typing");
      }
      writeScreen(button);
    }
  }
  if (calculation.buttons.operators.isActive) {
    if (calculation.buttons.operators.valid.includes(button)) {
      setMode("operation", button);
    }
  }
  if (calculation.buttons.equal.isActive) {
    if (button === "=") {
      setMode("result", button);
    }
  }
  refreshScreen();
  debug();
}

function initButtons() {
  const addButton = document.querySelector(".calculator__buttons__add--sign");
  addButton.addEventListener("click", () => initCalculation("+"));

  const substractButton = document.querySelector(
    ".calculator__buttons__substract--sign"
  );
  substractButton.addEventListener("click", () => initCalculation("-"));

  const multiplyButton = document.querySelector(
    ".calculator__buttons__multiply--sign"
  );
  multiplyButton.addEventListener("click", () => initCalculation("*"));

  const divideButton = document.querySelector(
    ".calculator__buttons__divide--sign"
  );
  divideButton.addEventListener("click", () => initCalculation("/"));

  const equalsButton = document.querySelector(
    ".calculator__buttons__equals--sign"
  );
  equalsButton.addEventListener("click", () => initCalculation("="));

  const floatButton = document.querySelector(".calculator__buttons__float");
  floatButton.addEventListener("click", () => initCalculation("."));

  const clearButton = document.querySelector(
    ".calculator__buttons__clear--utility"
  );
  clearButton.addEventListener("click", () => initCalculation("clear"));

  const undoButton = document.querySelector(
    ".calculator__buttons__undo--utility"
  );
  undoButton.addEventListener("click", () => initCalculation("undo"));

  const oneButton = document.querySelector(".calculator__buttons__one");
  oneButton.addEventListener("click", () => initCalculation("1"));

  const twoButton = document.querySelector(".calculator__buttons__two");
  twoButton.addEventListener("click", () => initCalculation("2"));

  const threeButton = document.querySelector(".calculator__buttons__three");
  threeButton.addEventListener("click", () => initCalculation("3"));

  const fourButton = document.querySelector(".calculator__buttons__four");
  fourButton.addEventListener("click", () => initCalculation("4"));

  const fiveButton = document.querySelector(".calculator__buttons__five");
  fiveButton.addEventListener("click", () => initCalculation("5"));

  const sixButton = document.querySelector(".calculator__buttons__six");
  sixButton.addEventListener("click", () => initCalculation("6"));

  const sevenButton = document.querySelector(".calculator__buttons__seven");
  sevenButton.addEventListener("click", () => initCalculation("7"));

  const eightButton = document.querySelector(".calculator__buttons__eight");
  eightButton.addEventListener("click", () => initCalculation("8"));

  const nineButton = document.querySelector(".calculator__buttons__nine");
  nineButton.addEventListener("click", () => initCalculation("9"));

  const zeroButton = document.querySelector(".calculator__buttons__zero");
  zeroButton.addEventListener("click", () => initCalculation("0"));

  document.addEventListener("keyup", function (event) {
    switch (event.key) {
      case "+":
        initCalculation("+");
        break;
      case "-":
        initCalculation("-");
        break;
      case "*":
        initCalculation("*");
        break;
      case "/":
        initCalculation("/");
        break;
      case "=":
        initCalculation("=");
        break;
      case "Enter":
        initCalculation("=");
        break;
      case ".":
        initCalculation(".");
        break;
      case "c":
        initCalculation("clear");
        break;
      case "Delete":
        initCalculation("clear");
        break;
      case "Backspace":
        initCalculation("undo");
        break;
      case "0":
        initCalculation("0");
        break;
      case "1":
        initCalculation("1");
        break;
      case "2":
        initCalculation("2");
        break;
      case "3":
        initCalculation("3");
        break;
      case "4":
        initCalculation("4");
        break;
      case "5":
        initCalculation("5");
        break;
      case "6":
        initCalculation("6");
        break;
      case "7":
        initCalculation("7");
        break;
      case "8":
        initCalculation("8");
        break;
      case "9":
        initCalculation("9");
        break;

      default:
        break;
    }
  });
}

calculateDimensions();
initButtons();
setMode("typing");
function debug() {
  // NOTE: Remove when project is done

  // console.log(`---calculation.mode---`);
  // console.log(`typing: ${calculation.mode.typing}`);
  // console.log(`operation: ${calculation.mode.operation}`);
  // console.log(`result: ${calculation.mode.result}`);

  console.log(`---calculation.number---`);
  console.log(`temp1: ${calculation.number.first}`);
  console.log(`temp2: ${calculation.number.second}`);
  console.log(`shownResult: ${calculation.number.shownResult}`);
  console.log(`shownOperation: ${calculation.number.shownOperation}`);

  // console.log(`---calculation---`);
  // console.log(`activeOperator: ${calculation.activeOperator}`);

  // console.log(`---calculation.buttons---`);
  // console.log(`clear.isActive: ${calculation.buttons.clear.isActive}`);
  // console.log(`undo.isActive: ${calculation.buttons.undo.isActive}`);
  // console.log(`operators.isActive: ${calculation.buttons.operators.isActive}`);
  // console.log(`numbers.isActive: ${calculation.buttons.numbers.isActive}`);
  // console.log(`equal.isActive: ${calculation.buttons.equal.isActive}`);
}

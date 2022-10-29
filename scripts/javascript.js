let calculation = {
  mode: {
    typing: true,
    operation: false,
    result: false,
  },
  number: {
    temp1: null,
    temp2: null,
    shown: "0",
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

function calculateDimensions() {
  if (window.innerWidth > window.innerHeight) {
    document.querySelector(".calculator").style.maxHeight = "90vh";
  } else {
    document.querySelector(".calculator").style.maxWidth = "90vw";
  }
}

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
        calculation.number.shown = "0";
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
      calculation.number.temp1 === null ? false : true,
    ]);
  }
  if (mode === "operation") {
    calculation.number.temp1 = calculation.number.shown;
    calculation.activeOperator = button;
    setModButtons([true, true, true, true, true]);
  }
  if (mode === "result") {
    if (!calculation.mode.result) {
      calculation.number.temp2 = calculation.number.shown;
      equals(calculation.number.temp1, calculation.number.shown);
    }
    if (calculation.mode.result) {
      equals(calculation.number.temp2, calculation.number.shown);
    }
    setModButtons([true, false, true, false, true]);
  }
}

function setMode(newMode, button) {
  modOptions(newMode, button);
  for (const mode in calculation.mode) {
    calculation.mode[mode] = false;
  }
  console.log(`set mode: ${newMode}`);
  calculation.mode[newMode] = true;
  showActiveOperation();
}

function refreshScreen() {
  let screen = document.querySelector(".calculator__screen--top");
  screen.textContent = calculation.number.shown;
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
  switch (calculation.activeOperator) {
    case "+":
      calculation.number.shown = add(num1, num2);
      break;
    case "-":
      calculation.number.shown = substract(num1, num2);
      break;
    case "*":
      calculation.number.shown = multiply(num1, num2);
      break;
    case "/":
      calculation.number.shown = divide(num1, num2);
      break;
  }
}

function clear() {
  setMode("typing");
  calculation.number.shown = "0";
  calculation.activeOperator = null;
  showActiveOperation();
}

function undo() {
  let screen = calculation.number.shown;

  if (!calculation.mode.result) {
    screen = screen.length === 1 ? "0" : screen.slice(0, -1);
  }

  calculation.number.shown = screen;
}

function writeScreen(button) {
  if (calculation.mode.result) {
    clear();
  }

  let screen = calculation.number.shown;

  if (screen.length > 10) {
    return;
  }
  if (button === ".") {
    if (!screen.includes(".")) {
      screen = screen.concat("", ".");
    }
  } else if (screen === "0") {
    screen = button;
  } else {
    screen = screen.concat("", button);
  }

  calculation.number.shown = screen;
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
      case "add":
        initCalculation("add");
        break;
      case "substract":
        initCalculation("substract");
        break;
      case "multiply":
        initCalculation("multiply");
        break;
      case "divide":
        initCalculation("divide");
        break;
      case "=":
        initCalculation("=");
        break;
      case "Enter":
        initCalculation("=");
        break;
      case "float":
        initCalculation("float");
        break;
      case "c":
        initCalculation("c");
        break;
      case "Delete":
        initCalculation("c");
        break;
      case "Backspace":
        initCalculation("d");
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

  console.log(`---calculation.mode---`);
  console.log(`typing: ${calculation.mode.typing}`);
  console.log(`operation: ${calculation.mode.operation}`);
  console.log(`result: ${calculation.mode.result}`);

  console.log(`---calculation.number---`);
  console.log(`shown: ${calculation.number.shown}`);
  console.log(`temp1: ${calculation.number.temp1}`);
  console.log(`temp2: ${calculation.number.temp2}`);

  console.log(`---calculation---`);
  console.log(`activeOperator: ${calculation.activeOperator}`);

  console.log(`---calculation.buttons---`);
  console.log(`clear.isActive: ${calculation.buttons.clear.isActive}`);
  console.log(`undo.isActive: ${calculation.buttons.undo.isActive}`);
  console.log(`operators.isActive: ${calculation.buttons.operators.isActive}`);
  console.log(`numbers.isActive: ${calculation.buttons.numbers.isActive}`);
  console.log(`equal.isActive: ${calculation.buttons.equal.isActive}`);
}

// GLOBAL VARIABLES
const operBtns = [
    {
        btn: document.querySelector("#add"),
        symbol: "+"
    },
    {
        btn: document.querySelector("#subtract"),
        symbol: "-"
    },
    {
        btn: document.querySelector("#multiply"),
        symbol: "*"
    },
    {
        btn: document.querySelector("#divide"),
        symbol: "/"
    }];

const resetBtn = document.querySelector("#reset");
const equalsBtn = document.querySelector("#equals");
const percentBtn = document.querySelector("#percent");
const plusMinusBtn = document.querySelector("#plus-minus");
const decimalPointBtn = document.querySelector("#decimal");
const backSpace = document.querySelector("#back");

// BASIC MATH FUNCTIONS

function sum(a, b) { return a + b; };

function subtract(a, b) { return a - b; };

function multiply(a, b) { return a * b; };

function divide(a, b) { return (b === 0) ? "ERR" : a / b; };

function makeCalculation(a, b, operator) {
    if (b == undefined || operator === undefined) return;
    if (operator === "+") return sum(a, b);
    if (operator === "-") return subtract(a, b);
    if (operator === "*") return multiply(a, b);
    if (operator === "/") return divide(a, b);
};

// CALCULATOR ELEMENTS & FUNCTIONS

const numButtons = [];
const inputs = {
    num: "0",
    display: document.querySelector(".display-result"),
    numsArray: [],
    operator: []
};

function inputNumbers(index) {
    if (inputs.num.length < 12
        || inputs.display.textContent.includes("-")
        && inputs.num.length < 13) {
        if (inputs.num === "0"
            || inputs.operator[inputs.operator.length - 1] === "="
            && inputs.num !== "0.") {
            inputs.num = `${index}`;
        } else {
            inputs.num += `${index}`;
        }
        inputs.display.textContent = inputs.num;
    }
}

for (let i = 0; i < 10; i++) {
    numButtons.push(document.querySelector(`#btn${i}`));
    numButtons[i].addEventListener("click", (e) => {
        e.preventDefault();
        inputNumbers(i);
    });
};


function displayResult() {
    const result =
        makeCalculation(inputs.numsArray[inputs.numsArray.length - 2],
            inputs.numsArray[inputs.numsArray.length - 1],
            inputs.operator[inputs.operator.length - 2]);
    if (result === undefined) {
        return;
    }
    if (result === "ERR") {
        inputs.display.textContent = result;
    } else {
        let rounded = Math.round(result * 10000000000) / 10000000000;
        if (rounded.toString().length > 12) {
            inputs.display.textContent = `E ${rounded.toString().slice(0, 11)}`;
        } else {
            inputs.display.textContent = rounded;
            inputs.numsArray.push(rounded);
        }
    }
};

function displayPercent() {
    if (inputs.display.textContent.includes("%")) { return }
    inputs.display.textContent += "%";
};

function convertToPercent(num) {
    let newPercent = num / 100;
    inputs.numsArray.push(newPercent);
};

function calculatePercent(a, b) {
    return a * b / 100;
};

function pushNewNum() {
    if (inputs.display.textContent.includes("%")) {
        if (inputs.numsArray.length >= 1) {
            const newNum =
                calculatePercent(inputs.numsArray[inputs.numsArray.length - 1],
                    (inputs.num));
            inputs.numsArray.push(Number(newNum));
        } else {
            convertToPercent(inputs.num);
        }
    } else { inputs.numsArray.push(Number(inputs.num)); }
};

function removeHighlight() {
    for (let i = 0; i < 4; i++) {
        operBtns[i].btn.classList.remove("highlighted");
    }
}

function operate(symbol) {
    removeHighlight();
    while (inputs.display.textContent.includes("E")) {
        inputs.num = "";
        return;
    }
    inputs.operator.push(symbol.toString())
    while (inputs.num === "") {
        return;
    }
    pushNewNum();
    inputs.num = "";
    displayResult();
};

function reset() {
    inputs.numsArray.length = 0;
    inputs.display.textContent = "0";
    inputs.num = "0";
    inputs.operator.splice(0, inputs.operator.length);
    removeHighlight();
};

function equals() {
    if (inputs.num === "") {
        return
    }
    inputs.operator.push("=");
    pushNewNum();
    displayResult();
    inputs.num = inputs.display.textContent;
    removeHighlight();
}

function clearLastChar() {
    inputs.num = inputs.num.slice(0, inputs.num.length - 1);
    inputs.display.textContent = inputs.num;
}

function addDecimalPoint() {
    if (inputs.display.textContent.includes(".")) { return };
    if (inputs.operator[inputs.operator.length - 1] === "="
        || inputs.display.textContent === "") {
        inputs.display.textContent = "0."
    } else {
        inputs.display.textContent += ".";
    }
    inputs.num = inputs.display.textContent;
}

function toggleFadeInOut() {
    inputs.display.classList.toggle("fade-in-out");
    inputs.display.classList.toggle("fade-in-out-again");
}

// OTHER EVENT LISTENERS

for (let i = 0; i < operBtns.length; i++) {
    operBtns[i].btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleFadeInOut();
        operate(operBtns[i].symbol);
        operBtns[i].btn.classList.add("highlighted");
    })
}

resetBtn.addEventListener("click", reset);

equalsBtn.addEventListener("click", equals)

percentBtn.addEventListener("click", displayPercent);

plusMinusBtn.addEventListener("click", () => {
    let displayNum = inputs.display.textContent;
    if (displayNum > 0) {
        displayNum = -Math.abs(displayNum)
    } else if (displayNum < 0) {
        displayNum = Math.abs(displayNum);
    }
    inputs.display.textContent = displayNum;
    inputs.num = displayNum.toString();
});

decimalPointBtn.addEventListener("click", addDecimalPoint);

backSpace.addEventListener("click", clearLastChar);

// KEYBOARD SUPPORT

document.addEventListener("keydown", (e) => {
    const numKey = document.querySelector(`button[data-num-key="${e.key}"]`);
    const operKey = document.querySelector(`button[data-oper-key="${e.key}"]`);
    const randKey = document.querySelector(`button[data-rand-key="${e.key}"]`)
    if (!numKey && !operKey && !randKey && !e.key === "Enter") return;
    if (operKey) {
        toggleFadeInOut();
        operate(e.key);
        for (let i = 0; i < operBtns.length; i++) {
            if (e.key === operBtns[i].symbol) {
                operBtns[i].btn.classList.add("highlighted");
            }
        }
    };
    if (numKey) { inputNumbers(numKey.textContent); }
    if (randKey || e.key === "Enter") {
        if (e.key === "Enter" || e.key === "=") { equals() };
        if (e.key === "Escape") { reset() };
        if (e.key === "Backspace") { clearLastChar() };
        if (e.key === ".") { addDecimalPoint() };
        if (e.key === "%") { displayPercent() };
    }
});
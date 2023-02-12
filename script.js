// GLOBAL VARIABLES

const plusBtn = document.querySelector("#add");
const minusBtn = document.querySelector("#subtract");
const mulBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");
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

for (let i = 0; i < 10; i++) {
    numButtons.push(document.querySelector(`#btn${i}`));
    numButtons[i].addEventListener("click", (e) => {
        e.preventDefault();
        if (inputs.num.length < 12
            || inputs.display.textContent.includes("-")
            && inputs.num.length < 13) {
            if (inputs.num === "0"
                || inputs.operator[inputs.operator.length - 1] === "="
                && inputs.num !== "0.") {
                inputs.num = `${i}`;
            } else {
                inputs.num += `${i}`;
            }
            inputs.display.textContent = inputs.num;
        }
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
        inputs.display.textContent = rounded;
        inputs.numsArray.push(rounded);
    }
};

function displayPercent() {
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

function operate(symbol) {
    while (inputs.display.textContent === "ERR") {
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
};


// EVENT LISTENERS

plusBtn.addEventListener("click", () => operate("+"));

minusBtn.addEventListener("click", () => operate("-"));

mulBtn.addEventListener("click", () => operate("*"));

divideBtn.addEventListener("click", () => operate("/"))

resetBtn.addEventListener("click", reset);

equalsBtn.addEventListener("click", () => {
    if (inputs.num === "") {
        return
    }
    inputs.operator.push("=");
    pushNewNum();
    displayResult();
    inputs.num = inputs.display.textContent;
})

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

decimalPointBtn.addEventListener("click", () => {
    if (inputs.display.textContent.includes(".")) { return };
    if (inputs.operator[inputs.operator.length - 1] === "="
        || inputs.display.textContent === "") {
        inputs.display.textContent = "0."
    } else {
        inputs.display.textContent += ".";
    }
    inputs.num = inputs.display.textContent;
});

backSpace.addEventListener("click", () => {
    inputs.num = inputs.num.slice(0, inputs.num.length - 1);
    inputs.display.textContent = inputs.num;
});
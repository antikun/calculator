const plusBtn = document.querySelector("#add");
const minusBtn = document.querySelector("#subtract");
const mulBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");
const resetBtn = document.querySelector("#reset");
const equalsBtn = document.querySelector("#equals");
const percentBtn = document.querySelector("#percent");
const plusMinusBtn = document.querySelector("#plus-minus");

const numButtons = [];
const inputs = {
    num: "0",
    display: document.querySelector(".display-result"),
    numsArray: [],
    operator: []
}

for (let i = 0; i < 10; i++) {
    numButtons.push(document.querySelector(`#btn${i}`));
    numButtons[i].addEventListener("click", (e) => {
        e.preventDefault();
        if (inputs.num === "0"
            || inputs.operator[inputs.operator.length - 1] === "=") {
            inputs.num = `${i}`;
        } else {
            inputs.num += `${i}`;
        }
        inputs.display.textContent = inputs.num;
    })
}

function sum(a, b) { return a + b; }

function subtract(a, b) { return a - b; }

function multiply(a, b) { return a * b; }

function divide(a, b) { return a / b; }

function makeCalculation(a, b, operator) {
    if (b == undefined || operator === undefined) return;
    if (operator === "+") return sum(a, b);
    if (operator === "-") return subtract(a, b);
    if (operator === "*") return multiply(a, b);
    if (operator === "/") return divide(a, b);
}

function displayResult() {
    const result =
        makeCalculation(inputs.numsArray[inputs.numsArray.length - 2],
            inputs.numsArray[inputs.numsArray.length - 1],
            inputs.operator[inputs.operator.length - 2]);
    if (result === undefined) {
        return;
    }
    inputs.numsArray.push(result);
    inputs.display.textContent = result;
}

function displayPercent() {
    inputs.display.textContent += "%";
}

function convertToPercent(num) {
    let newPercent = num / 100;
    inputs.numsArray.push(newPercent);
}

function calculatePercent(a, b) {
    return a * b / 100
}

function pushNewNum() {
    if (inputs.display.textContent.includes("%")) {
        if (inputs.numsArray.length >= 1) {
            const newNum =
                calculatePercent(inputs.numsArray[inputs.numsArray.length - 1],
                    parseInt(inputs.display.textContent));
            inputs.numsArray.push(newNum);
        } else {
            convertToPercent(inputs.num);
        }
    } else { inputs.numsArray.push(parseInt(inputs.num)); }
}

function operate(symbol) {
    inputs.operator.push(symbol.toString())
    while (inputs.num === "") {
        return
    }
    pushNewNum();
    inputs.num = "";
    displayResult();
}

function reset() {
    inputs.numsArray.length = 0;
    inputs.display.textContent = "0";
    inputs.num = "0";
    inputs.operator.splice(0, inputs.operator.length);
}

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
    inputs.numsArray.pop();
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
    inputs.num = displayNum;
});
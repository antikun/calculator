const plusBtn = document.querySelector("#add");
const minusBtn = document.querySelector("#subtract");
const mulBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");
const resetBtn = document.querySelector("#reset");
const equalsBtn = document.querySelector("#equals");

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
        if (inputs.num === "0") {
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
    const result = makeCalculation(inputs.numsArray[0], inputs.numsArray[1], inputs.operator[0]);
    if (result == undefined) {
        return;
    } else {
        if (inputs.numsArray.length < 2) {
            inputs.numsArray.push(result);
        }
        if (inputs.numsArray.length >= 2) {
            inputs.numsArray.splice(0, 2);
            inputs.numsArray.push(result);
        }
        inputs.display.textContent = result;
    };
}

function operate(symbol) {
    inputs.numsArray.push(parseInt(inputs.num));
    inputs.num = "";
    inputs.operator.push(symbol.toString())
    displayResult();
    inputs.operator.unshift(symbol.toString());
}

function reset() {
    inputs.numsArray.splice(0, 2);
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
    inputs.numsArray.push(parseInt(inputs.num));
    displayResult();
    inputs.num = inputs.display.textContent;
    inputs.operator.splice(0, inputs.operator.length);
    inputs.numsArray.pop();
})

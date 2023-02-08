function sum(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    if (b == "") return;
    if (operator === "+") return sum(a, b);
    if (operator === "-") return subtract(a, b);
    if (operator === "*") return multiply(a, b);
    if (operator === "/") return divide(a, b);
}

const numButtons = [];
for (let i = 0; i < 10; i++) {
    numButtons.push(document.querySelector(`#btn${i}`));
}

const plusBtn = document.querySelector("#add");

const inputs = {
    display: document.querySelector(".display-result"),
    numsArray: [],
    operator: ""
}

// numButtons.forEach(button => addEventListener("click", function (e) {
//     e.preventDefault();
// }))

plusBtn.addEventListener("click", function () {
    inputs.numsArray.push(parseInt(inputs.display.textContent));
    inputs.operator = "+";
    const result = operate(inputs.numsArray[0], inputs.numsArray[1], inputs.operator);
    if (result == undefined) {
        return;
    } else {
        inputs.numsArray.push(result);
        inputs.display.textContent = result;
    }
})

numButtons[1].addEventListener("click", () => {
    let num = "";
    inputs.display.textContent = (num += "1");
    // inputs.num1 = parseInt(inputs.display.textContent);
})

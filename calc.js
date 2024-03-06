let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener("DOMContentLoaded", function(){
    let operators = document.querySelectorAll(".operator");
    let numbers = document.querySelectorAll(".number");

    let sign = document.querySelector(".btn-sign");
    let backspace = document.querySelector(".btn-backspace");
    let clear = document.querySelector(".btn-clear");
    let equal = document.querySelector(".btn-equal");
    let decimal = document.querySelector("btn-decimal");

    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current"); 

    numbers.forEach((number) =>  number.addEventListener("click", function(event){
        outputNum(event.target.textContent)
        currentScreen.textContent = currentValue;
        //utilizes text property so the number on the button outputs when clicked
    }));

    operators.forEach((op) => op.addEventListener("click", function(event){
        outputOp(event.target.textContent)
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
    }))

    clear.addEventListener("click", function(event){
        operator = '';
        previousValue = '';
        currentValue = '';
        previousScreen.textContent = currentValue;
        currentScreen.textContent = currentValue;
    })

    equal.addEventListener("click", function(){
        calculate();
    })
 })

 //outputs number entered
 function outputNum(num){
    if (currentValue.length <= 6){
        currentValue += num;
    }
 }

 function outputOp(op){
    operator = op;
    previousValue = currentValue;
    currentValue = '';
 }

 function calculate() {
    //convert string into Numbers for arithmetic
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if (operator  === "+"){
        previousVaue += currentValue;
    }
    else if (operator === "-"){
        previousValue -= currentValue;
    }
    else if (operator === "x"){
        previousValue *= currentValue;
    }
    //does not require parameters since this is last resort
    else {
        previousValue /= currentValue;
    }

    console.log(previousValue)
 } 

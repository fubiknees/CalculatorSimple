let operator = '';
let previousValue = '';
let currentValue = '';

//previousValue is the first number plus operator
//currentValue is the second number 


//connecting all relevant html divs to javascript via variables
document.addEventListener("DOMContentLoaded", function(){
    let operators = document.querySelectorAll(".operator");
    let numbers = document.querySelectorAll(".number");

    let sign = document.querySelector(".btn-sign");
    let backspace = document.querySelector(".btn-backspace");
    let clear = document.querySelector(".btn-clear");
    let equal = document.querySelector(".btn-equal");
    let decimal = document.querySelector(".btn-decimal");

    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current"); 

    error();

    //function that goes through all "number" divs(name of variable we assigned), AEL on click
    //which allows for it to extract textContent value of all number buttons 
    numbers.forEach((number) =>  number.addEventListener("click", function(event){
        outputNum(event.target.textContent)
        currentScreen.textContent = currentValue;//Allows for input 
        //utilizes text property so the number on the button outputs when clicked
    }));


    //operator function that clears currentScreen and displays both number and operator on previousScreen
    operators.forEach((op) => op.addEventListener("click", function(event){
        outputOp(event.target.textContent)
        previousScreen.textContent = previousValue + " " + operator; //creates format for previousScreen
        currentScreen.textContent = currentValue; //allows for input separate from previous input
    }))

    //clears everything
    clear.addEventListener("click", function(event){
        operator = '';
        previousValue = '';//clears values
        currentValue = '';
        previousScreen.textContent = currentValue; //clears screens
        currentScreen.textContent = currentValue;
    })

    //function that creates total in the currentScreen and clears previousScreen
    equal.addEventListener("click", function(){
        if(currentValue != '' && previousValue != ''){
        previousOperator = operator;    
        operate();
        previousScreen.textContent = ''; //clears top screen 
            if (previousValue.length <= 9){
                currentScreen.textContent = previousValue;   
                previousValue = "";// fixes post equal glitch by clearing old info
            } else {
                currentScreen.textContent = previousValue.slice(0,9) + "...";
            }
        } 
    })

    decimal.addEventListener("click", function(){
        addDecimal();
    })

    backspace.addEventListener("click", function(){
        currentScreen.textContent = currentScreen.textContent.toString().slice(0,-1);
        currentValue = currentScreen.textContent;
        // console.log("backspace");
    })  

    sign.addEventListener("click", function() {
        currentScreen.textContent = Number(currentScreen.textContent) * -1;
        currentValue = currentScreen.textContent;
    })

 })

 //allows adding of individual digits < 8 in length
 function outputNum(num){
    if (currentValue.length <= 8){ //limits length using if statement
        currentValue += num; //adds individual digits
    }
    if(previousValue != "" && currentValue === "0" && operator != ("+","-","x")){
        currentValue = "¯|_(ツ)_/¯";
        console.log(`${operator} ${currentValue} ${previousValue}`);
    };
 }

//moves info to previousValue and empties currentValue on trigger
 function outputOp(op){
    previousOperator = operator; //stores correct operator for use in equation
    operator = op; //updates global variable
    console.log(`${previousOperator} ${operator} ${op} ${currentValue} ${previousValue}`);
    if(previousValue != "" && currentValue != ""){
        operate(previousOperator);
        console.log('1st');
    };

    // if (previousValue === "" && currentValue != ""){
    //     previousValue = currentValue;
    //     currentValue.textContent = 0;
    //     console.log("2nd)");
    //     operate(operator);
    // };
        previousValue = currentValue; //moves currentValue to previousValue 
        currentValue = "";
        console.log(`${previousOperator} ${operator} ${op} ${currentValue} ${previousValue}`);
 };

 function operate() {
    //convert string input into Numbers for arithmetic
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if (previousOperator  === "+"){
        previousValue += currentValue;
    }   
    else if (previousOperator   === "-"){
        previousValue -= currentValue;
    }
    else if (previousOperator  === "x"){
        previousValue *= currentValue;
    }
    //does not require parameters since this is last resort
    else {
        previousValue /= currentValue;
    }

    ///after arithmetic is done convert back to string for display output
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();

    
}

 //rounds number 
 function roundNumber (num){
    return Math.round(num *10000)/10000; 
 }

 function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue += '.';
    }
 }

 function error(){
   
 }



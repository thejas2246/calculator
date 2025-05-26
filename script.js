function add(a,b){
    return roundNumber(a+b);
}

function subtract(a,b){
    return roundNumber(a - b)
}

function multiply(a,b){
    return roundNumber(a * b)
}

function divide(a,b){
    return roundNumber(a/b);
}

function roundNumber(num){
    return Math.round((num + Number.EPSILON) * 100) / 100
}
console.log(multiply(3,4.3))
console.log(add(0.1,0.2))
console.log(subtract(0.1,0.2))
console.log(divide(2,0))

operate(12,"+",10);
operate(0.1,"/",0.2)
function operate(firstNumber,operator,secondNumber){
    if(operator=="+"){
        console.log(add(firstNumber,secondNumber));
    }
    else if(operator=="-"){
        console.log(subtract(firstNumber,secondNumber));
    }
    else if(operator=="*"){
        console.log(multiply(firstNumber,secondNumber));
    }
    else if(operator=="/"){
        console.log(divide(firstNumber,secondNumber));
    }
    else{
        console.log("invalid");
    }
}

function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(a,operator,b) {
    a = +a;
    b = +b;
    let result;
    switch (operator) {
        case 'plus':
            result = add(a,b);
            break;
        case 'minus':
            result = subtract(a,b);
            break;
        case 'times':
            result = multiply(a,b);
            break;
        case 'divide':
            result = divide(a,b); 
            break;  
    }
return result;
}

const equation = {
    firstNumber:'',
    secondNumber:'',
    operator:'',
    equaled: false,
}

function writeEquation(input) {
    if (display.textContent == 0) {
        display.textContent = '';
    }
    if (equation.equaled) {
        display.textContent = `${input}`;
        equation.firstNumber = display.textContent;
        equation.secondNumber = '';
        equation.operator = '';
        equation.equaled = false;
    } else if (equation.operator === '') {
        display.textContent += `${input}`
        equation.firstNumber = display.textContent;
    } else if (equation.operator !== '') {
        if (equation.secondNumber === '') {
            display.textContent = `${input}`;
        }
        else {
            display.textContent += `${input}`;
        }
        equation.secondNumber = display.textContent;
    } 
}

function clear() {
    equation.firstNumber = ''
    equation.secondNumber = ''
    equation.operator = ''
    equation.equaled =  false
    display.textContent = 0;
}

function addOperator(input) {
    if (equation.equaled) {
        equation.equaled = false;
    } else if (equation.operator !== '' && equation.secondNumber !== '') {
        let outcome = operate(equation.firstNumber,equation.operator,equation.secondNumber);
    display.textContent = outcome;
    }
    equation.firstNumber = display.textContent;
    equation.secondNumber = '';
    equation.operator = input;
}

const display = document.querySelector('.display');
display.textContent = 0;

const one = document.querySelector('.one');
one.addEventListener('click', (e) => {
    writeEquation(1);
})

const two = document.querySelector('.two');
two.addEventListener('click', () => {
    writeEquation(2);
})
const three =document.querySelector('.three');
three.addEventListener('click', () => {
    writeEquation(3);
})
const four =document.querySelector('.four');
four.addEventListener('click', () => {
    writeEquation(4);
})
const five =document.querySelector('.five');
five.addEventListener('click', () => {
    writeEquation(5);
})
const six =document.querySelector('.six');
six.addEventListener('click', () => {
    writeEquation(6);
})
const seven =document.querySelector('.seven');
seven.addEventListener('click', () => {
    writeEquation(7);
})
const eight =document.querySelector('.eight');
eight.addEventListener('click', () => {
    writeEquation(8);
})
const nine =document.querySelector('.nine');
nine.addEventListener('click', () => {
    writeEquation(9);
})

const plus = document.querySelector('.plus');
plus.addEventListener('click', (e) => {
    addOperator('plus');
})

const equals = document.querySelector('.equals');
equals.addEventListener('click',(e) => {
    let outcome = operate(equation.firstNumber,equation.operator,equation.secondNumber);
    display.textContent = outcome;
    equation.firstNumber= display.textContent;
    equation.equaled = true;
})

const backspace = document.querySelector('.backspace');
backspace.addEventListener('click',() => {
    display.textContent = display.textContent.slice(0,-1);
})

const clearOut = document.querySelector('.clear');
clearOut.addEventListener('click', () => {
    clear();
} )


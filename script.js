function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function division(a,b) {
    return a/b;
}

let operatorSymbol;
function operate(a,operator,b) {
    a = +a;
    b = +b;
    let result;
    switch (operator) {
        case 'plus':
            result = add(a,b);
            operatorSymbol = `+`
            break;
        case 'minus':
            result = subtract(a,b);
            operatorSymbol = `-`
            break;
        case 'times':
            result = multiply(a,b);
            operatorSymbol = `*`
            break;
        case 'divide':
            result = division(a,b); 
            operatorSymbol = `/`;
            break;  
    }
    result = cutToMax9(result);
return result;
}

const equation = {
    firstNumber:'',
    secondNumber:'',
    operator:'',
    equaled: false,
}

function cutToMax9(result) {
    if (Number.isInteger(result) && result.toString().length>9) {
        return result.toExponential(5);
    } else if (!Number.isInteger(result) && result.toString().length > 10) {
        let resultArray = result.toString().split('.');
        console.log(resultArray);
        let roundToLength = Math.pow(10,(9 - resultArray[0].length));
        if (resultArray[0].length > 9) {
            return result.toExponential(5);
        } else {
            let newResult = Math.round(result * roundToLength) / roundToLength;
            return newResult;
        }
    } else {
        return result;
    }
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
        if (display.textContent.length > 8) {
            return
        } else {
        display.textContent += `${input}`
        equation.firstNumber = display.textContent;
        }
    } else if (equation.operator !== '') {
        if (equation.secondNumber === '') {
            display.textContent = `${input}`;
        }
        else {
            if (display.textContent.length > 8) {
                return
            } else {
                display.textContent += `${input}`;
            }
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
    equationTracker.textContent = '';
}

function addOperator(input) {
    if (equation.equaled) {
        equation.equaled = false;
    } else if (equation.operator !== '' && equation.secondNumber !== '') {
        let outcome = operate(equation.firstNumber,equation.operator,equation.secondNumber);
    display.textContent = outcome;
    equationTracker.textContent = `${equation.firstNumber} ${operatorSymbol} ${equation.secondNumber} = `
    }
    equation.firstNumber = display.textContent;
    equation.secondNumber = '';
    equation.operator = input;
}

const display = document.querySelector('.display');
display.textContent = 0;

const dot = document.querySelector('.dot');
dot.addEventListener('click', (e) => {
    writeEquation('.');
} )
const zero = document.querySelector('.zero');
zero.addEventListener('click', (e) => {
writeEquation(0);
})

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

const minus = document.querySelector('.minus');
minus.addEventListener('click', () => {
    addOperator('minus');
})
const times = document.querySelector('.times');
times.addEventListener('click', () => {
    addOperator('times');
})
const divide = document.querySelector('.divide');
divide.addEventListener('click', () => {
    addOperator('divide');
})

const percent = document.querySelector('.percent');
percent.addEventListener('click', () => {
    if (equation.secondNumber === '' ) {
        display.textContent = display.textContent / 100;
    } else if (equation.operator === 'plus' || equation.operator === 'minus') {
        let percentOf = (display.textContent/100) * equation.firstNumber
        display.textContent = cutToMax9(percentOf);
        equation.secondNumber = display.textContent;
    } else if (equation.operator === 'times' || equation.operator === 'divide') {
        display.textContent = display.textContent / 100;
        equation.secondNumber = display.textContent;   
    }
})

const plusMinus = document.querySelector('.plusMinus');
plusMinus.addEventListener('click', () =>{
    if (+display.textContent < 0) {
        display.textContent = display.textContent.slice(1);
    } else if (+display.textContent > 0) {
        display.textContent = '-' + display.textContent;
    } else {
        return
    }
} )

const equationTracker = document.querySelector('.equationTracker');

const equals = document.querySelector('.equals');
equals.addEventListener('click',(e) => {
    if (equation.secondNumber === '') {
        return;
    } else if (!equation.equaled) { //this is to account for percent and +/- buttons
        equation.secondNumber = display.textContent;
    }
    let outcome = operate(equation.firstNumber,equation.operator,equation.secondNumber);
    equationTracker.textContent = `${equation.firstNumber} ${operatorSymbol} ${equation.secondNumber} = `;
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



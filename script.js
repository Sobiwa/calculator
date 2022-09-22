//User's input is stored here
const equation = {
    firstNumber:'',
    secondNumber:'',
    operator:'',
    equaled: false,
}

//For clearing highlights with keyboard use
const Operators = document.querySelectorAll('.operator');

//Assigned value in 'operate' function
let operatorSymbol;

//Display affected by user
const equationTracker = document.querySelector('.equationTracker');

const display = document.querySelector('.display');
display.textContent = 0;

//Assigns function to each div
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

const dot = document.querySelector('.dot');
dot.addEventListener('click', (e) => {
    if (display.textContent.includes('.')) {
        return
    } else writeEquation('.');
} )

//Operators
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

//Advanced operators
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
    togglePlusMinus();
} )

function togglePlusMinus() {
    let numToProcess = +removeCommas(display.textContent);
    if (equation.firstNumber !== '' && equation.operator !== '' && equation.secondNumber === '') {
        display.textContent = '-0';
    } else if (numToProcess.toString().includes('-') || Object.is(numToProcess, -0)) {
        display.textContent = display.textContent.slice(1);
    } else if (!numToProcess.toString().includes('-')) {
        display.textContent = '-' + display.textContent;
    } 
    if (equation.equaled) {
        equation.firstNumber = display.textContent;
    } else if (equation.operator === '' && equation.secondNumber === '') {
        equation.firstNumber = display.textContent;
    } else if (equation.operator !== '' && equation.firstNumber !== '') {
        equation.secondNumber = display.textContent;
    }
}

const equals = document.querySelector('.equals');
equals.addEventListener('click',(e) => {
    removeHighlight();
    if (equation.operator === 'divide' && equation.secondNumber === '0' ) {
        display.textContent = 'AHHHHHH!!!!';
        setTimeout(() => {
            clear()
        }, 500);
        return;
    } else if (equation.secondNumber === '') {
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

//Deletion/Clear
const backspace = document.querySelector('.backspace');
backspace.addEventListener('click',() => {
    let newValue = display.textContent.slice(0,-1);
    newValue = addCommas(newValue);
    display.textContent = newValue;
})

const clearOut = document.querySelector('.clear');
clearOut.addEventListener('click', () => {
    clear();
} )

//Keyboard functionality
addEventListener('keydown', (e) => {
    switch (e.key) {
        case '0':
            writeEquation(0);
            zero.classList.add('activeByKey');
            break;
        case '1':
            writeEquation(1);
            one.classList.add('activeByKey');
            break;
        case '2':
            writeEquation(2);
            two.classList.add('activeByKey');
            break;
        case '3':
            writeEquation(3);
            three.classList.add('activeByKey');
            break;
        case '4':
            writeEquation(4);
            four.classList.add('activeByKey');
            break;
        case '5':
            writeEquation(5);
            five.classList.add('activeByKey');
            break;
        case '6':
            writeEquation(6);
            six.classList.add('activeByKey');
            break;
        case '7':
            writeEquation(7);
            seven.classList.add('activeByKey');
            break;
        case '8':
            writeEquation(8);
            eight.classList.add('activeByKey');
            break;
        case '9':
            writeEquation(9);
            nine.classList.add('activeByKey');
            break;
        case '.':
            if (display.textContent.includes('.')) {
                return
            } else writeEquation('.');
            dot.classList.add('activeByKey');
            break;
        case '+':
            addOperator('plus');
            plus.classList.add('highlight');
            plus.classList.add('activeByKey');
            break;
        case '-':
            addOperator('minus');
            minus.classList.add('highlight');
            minus.classList.add('activeByKey');
            break;
        case '*':
            addOperator('times');
            times.classList.add('highlight');
            times.classList.add('activeByKey');
            break;
        case ('/'):
            addOperator('divide');
            divide.classList.add('highlight');
            divide.classList.add('activeByKey');
            break;
        case ('%'):
            if (equation.secondNumber === '') {
                display.textContent = display.textContent / 100;
            } else if (equation.operator === 'plus' || equation.operator === 'minus') {
                let percentOf = (display.textContent / 100) * equation.firstNumber
                display.textContent = cutToMax9(percentOf);
                equation.secondNumber = display.textContent;
            } else if (equation.operator === 'times' || equation.operator === 'divide') {
                display.textContent = display.textContent / 100;
                equation.secondNumber = display.textContent;
            }
            percent.classList.add('activeByKey');
            break;
        case ('c'):
            clear();
            clearOut.classList.add('activeByKey');
            break;
        case ('='):
            removeHighlight();
            if (equation.operator === 'divide' && equation.secondNumber === '0' ) {
                display.textContent = 'AHHHHHH!!!!';
                setTimeout(() => {
                    clear()
                }, 500);
                return;
            } else if (equation.secondNumber === '') {
                return;
            } else if (!equation.equaled) { //this is to account for percent and +/- buttons
                equation.secondNumber = display.textContent;
            }
            let outcome = operate(equation.firstNumber,equation.operator,equation.secondNumber);
            equationTracker.textContent = `${equation.firstNumber} ${operatorSymbol} ${equation.secondNumber} = `;
            display.textContent = outcome;
            equation.firstNumber= display.textContent;
            equation.equaled = true;
            equals.classList.add('activeByKey');
            break;
        case ('_'):
            togglePlusMinus();
            plusMinus.classList.add('activeByKey');
            break;
        case 'Backspace':
            let newValue = display.textContent.slice(0,-1);
            newValue = addCommas(newValue);
            display.textContent = newValue;
            backspace.classList.add('activeByKey');
            break;
    }
})

addEventListener('keyup', (e) => {
    switch (e.key) {
        case '0':
            zero.classList.remove('activeByKey');
            break;
        case '1':
            one.classList.remove('activeByKey');
            break;
        case '2':
            two.classList.remove('activeByKey');
            break;
        case '3':
            three.classList.remove('activeByKey');
            break;
        case '4':
            four.classList.remove('activeByKey');
            break;
        case '5':
            five.classList.remove('activeByKey');
            break;
        case '6':
            six.classList.remove('activeByKey');
            break;
        case '7':
            seven.classList.remove('activeByKey');
            break;
        case '8':
            eight.classList.remove('activeByKey');
            break;
        case '9':
            nine.classList.remove('activeByKey');
            break;
        case '.':
            dot.classList.remove('activeByKey');
            break;
        case '+':
            plus.classList.remove('activeByKey');
            break;
        case '-':
            minus.classList.remove('activeByKey');
            break;
        case '*':
            times.classList.remove('activeByKey');
            break;
        case ('/'):
            divide.classList.remove('activeByKey');
            break;
        case ('%'):
            percent.classList.remove('activeByKey');
            break;
        case ('c'):
            clearOut.classList.remove('activeByKey');
            break;
        case ('='):
            equals.classList.remove('activeByKey');
            break;
        case ('_'):
            plusMinus.classList.remove('activeByKey');
            break;
        case('Backspace'):
            backspace.classList.remove('activeByKey')
            break;
    }
})

//////////FUNCTIONS///////////
//accepts input from user based on input already entered
function writeEquation(input) {
    let trueLength = ignoreNegForLength(removeCommas(display.textContent));
    if (display.textContent === '0' && input !== '.') {
        display.textContent = '';
    } else if (display.textContent === '-0' && input !== '.') {
        console.log(display.textContent);
        display.textContent = display.textContent.slice(0,-1);
    }
    if (equation.equaled) {
        display.textContent = `${input}`;
        equation.firstNumber = display.textContent;
        equation.secondNumber = '';
        equation.operator = '';
        equation.equaled = false;
    } else if (equation.operator === '') {
        if (trueLength > 8) {
            return
        } else {
        let newNum = display.textContent + `${input}`;
        display.textContent = addCommas(newNum);
        equation.firstNumber = display.textContent;
        }
    } else if (equation.operator !== '') {
        if (equation.secondNumber === '') {
            display.textContent = `${input}`;
        }
        else {
            if (trueLength > 8) {
                return
            } else {
                let newNum = display.textContent + `${input}`;
                display.textContent = addCommas(newNum);
            }
        }
        equation.secondNumber = display.textContent;
    } 
}

removeCommas = num => num.toString().replaceAll(',', '');

function ignoreNegForLength (num) {
    let trueLength = num.length;
    if (num.toString().includes('-')) {
        trueLength -= 1;
    }
    return trueLength;
}
   
function addCommas(num) {
    num = removeCommas(num);
    let numLength = ignoreNegForLength(num);
    let processedNonDecimals;
    if (num.toString().includes('e')) {
        processedNonDecimals = num;
    } else if (numLength > 3 && num.toString().includes('.')) {
        let numArray = num.split('.');
        let nonDecimals = numArray[0];
        nonDecimals = nonDecimals.toString();
        numLength = ignoreNegForLength(nonDecimals);
        if (3 < numLength && numLength < 7) {
            processedNonDecimals = nonDecimals.slice(0, -3) + ',' + 
            nonDecimals.slice(-3);
            numArray[0] = processedNonDecimals;
            processedNonDecimals = numArray.join('.');
        } else if (numLength > 6) {
            processedNonDecimals = nonDecimals.slice(0, -6) + ',' + 
            nonDecimals.slice(-6, -3) + nonDecimals.slice(-3);
            numArray[0] = processedNonDecimals;
            processedNonDecimals = numArray.join('.');
        } else {
            processedNonDecimals = num;
        }
    } else if (numLength > 3) {
        let nonDecimals = num;
        nonDecimals = nonDecimals.toString();
        if (3 < numLength && numLength < 7) {
            processedNonDecimals = nonDecimals.slice(0, -3) + ',' + 
            nonDecimals.slice(-3);
        } else if (numLength > 6) {
            processedNonDecimals = nonDecimals.slice(0, -6) + ',' + 
            nonDecimals.slice(-6, -3) + ',' + nonDecimals.slice(-3);
        }
    } else {
        processedNonDecimals = num;
    }
    return processedNonDecimals;
}

//Adds new operator and executes equation if required fields are filled
function addOperator(input) {
    removeHighlight();
    if (equation.operator === 'divide' && equation.secondNumber === '0' ) {
        display.textContent = 'AHHHHHH!!!!';
        setTimeout(() => {
            clear()
        }, 500);
        return;
    } 
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
    console.log(equation.firstNumber);
}

//Basic math functions
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

//Utilizes basic math functions with input from user
function operate(a,operator,b) {
    a = +removeCommas(a);
    b = +removeCommas(b);

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
    result = addCommas(cutToMax9(result));
    console.log(equation.firstNumber);
return result;
}

//cuts down large numbers to 9 digits
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

function clear() {
    removeHighlight();
    equation.firstNumber = ''
    equation.secondNumber = ''
    equation.operator = ''
    equation.equaled =  false
    display.textContent = 0;
    equationTracker.textContent = '';
}

function removeHighlight() {
    Operators.forEach((operator) => {
        if (operator.classList.contains('highlight')) {
            operator.classList.remove('highlight');
        }
    })
}
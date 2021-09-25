const calculatorWrap = document.querySelector('#calculator');
const display = document.querySelector('#display');

calculatorWrap.addEventListener('click', writeSymbolInDisplay);

function writeSymbolInDisplay(event) {
    const symb = event.target.defaultValue;

    if (symb === 'Del') {
        display.value = '';
        return;
    } else if (symb === '=') {
        const res = showResult(display.value);
        display.value = res;
        return;
    } else if(symb) {
        display.value += String(symb);
    }
}

function showResult(calculatorOperation) {
    // const reSigns = /[+-]/;
    // const reNumbers = /[0-9]+/g;

    const numbs = calculatorOperation.split(/[+-]/);
    const signs = calculatorOperation.split(/[0-9]+/g).filter((sign) => sign !== '' && (sign === '+' || sign === '-'));

    const firstStageNumbs = numbs.map(calculate).map(numb => Number(numb));

    return calculateCurrentStage(firstStageNumbs, signs);
}

function calculate(operator, i, arr) {
    // const reSigns = /[*/]+/;
    // const reNumbers = /[0-9]+/g;

    if (isNaN(operator)) {
        const numbs = operator.split(/[*/]+/);
        const signs = operator.split(/[0-9]+/g).filter((sign) => sign !== '');

        return calculateCurrentStage(numbs, signs);
    }

    return operator;
}

function calculateCurrentStage(numbs, signs) {
    let count = 0;

    return numbs.reduce((res, item, ind) => {
        if (ind === 0) {
            return item;
        }

        if (signs[count] === '+') {
            count++;
            return res + item;
        } else if (signs[count] === '-') {
            count++;
            return res - item;
        } else if (signs[count] === '*') {
            count++;
            return res * item;
        } else if (signs[count] === '/') {
            count++;
            return res / item;
        }
    })
}
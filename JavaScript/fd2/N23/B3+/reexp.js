function arraying(expression) {
    let arrExp = [];
    let i = 0;

    while (i < expression.length) {
        if (expression[i] === ' ') {
            i++;
            continue;
        }

        if (expression[i] >= '0' && expression[i] <= '9' || expression[i] === '-' && (i === 0 || expression[i - 1] === '(' || expression[i - 1] in "+-*/")) {
            let buffer = '';

            if (expression[i] === '-' && (i === 0 || expression[i - 1] === '(' || expression[i - 1] in "+-*/")) {
                buffer += expression[i];
                i++;
            }

            while (i < expression.length && (expression[i] >= '0' && expression[i] <= '9' || expression[i] === '.')) {
                buffer += expression[i++];
            }
            i--;

            arrExp.push(buffer);
        } else {
            arrExp.push(expression[i]);
        }
        i++;
    }

    return arrExp;
}

let expression = "2*(-3+1)-(3.15/-22.333)";
let arrExp = arraying(expression);
console.log(arrExp);
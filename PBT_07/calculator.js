const VALID_OPERATORS = ["+", "-", "*", "/", "%", "**"];

function calculate(num1, operator, num2) {
    
    if (typeof num1 !== "number" || typeof num2 !== "number" || isNaN(num1) || isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }

    if (!VALID_OPERATORS.includes(operator)) {
        return `Lỗi: Operator '${operator}' không hợp lệ`;
    }

  
    if ((operator === "/" || operator === "%") && num2 === 0) {
        return "Lỗi: Không thể chia cho 0";
    }

    switch (operator) {
        case "+":  return num1 + num2;
        case "-":  return num1 - num2;
        case "*":  return num1 * num2;
        case "/":  return num1 / num2;
        case "%":  return num1 % num2;
        case "**": return num1 ** num2;
    }
}

console.log(calculate(10, "+", 5));      // → 15
console.log(calculate(10, "-", 3));      // → 7
console.log(calculate(10, "/", 0));  
console.log(calculate(10, "^", 5)); 
console.log(calculate(5, "+", "xyz")); 
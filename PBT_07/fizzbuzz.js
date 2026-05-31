//V1
console.log("=== Version 1: Classic FizzBuzz (1-100) ===\n");

const results1 = [];
for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0)      results1.push("FizzBuzz");
    else if (i % 3 === 0)  results1.push("Fizz");
    else if (i % 5 === 0)  results1.push("Buzz");
    else                   results1.push(String(i));
}
console.log(results1.join(", "));

//V2
console.log("\n Version 2: Custom FizzBuzz \n");


//  @param {number} n 
//  @param {Array<{divisor: number, word: string}>} rules 
 
function customFizzBuzz(n, rules) {
    const output = [];

    for (let i = 1; i <= n; i++) {
        let word = "";

      
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                word += rules[j].word;
            }
        }

        output.push(word !== "" ? word : String(i));
    }

    return output;
}

const rules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" },
];

const results2 = customFizzBuzz(105, rules);
console.log(results2.join(", "));


console.log("\n--- Kiểm tra số đặc biệt ---");
console.log(`21  (3×7) = ${results2[20]}`);   
console.log(`15  (3×5) = ${results2[14]}`);   
console.log(`35  (5×7) = ${results2[34]}`);   
console.log(`105 (3×5×7) = ${results2[104]}`); 
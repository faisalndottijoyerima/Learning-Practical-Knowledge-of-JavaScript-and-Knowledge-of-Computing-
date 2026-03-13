// main.js
import { sum, average, min, max } from './Utils.js';
import Calculator from './calculator.js';

console.log("=== Array Helpers ===");
const numbers = [4, 8, 1, 12, 7, 3];

console.log("Numbers:", numbers);
console.log("Sum:", sum(numbers));
console.log("Average:", average(numbers));
console.log("Min:", min(numbers));
console.log("Max:", max(numbers));

console.log("\n=== Calculator ===");
const calc = new Calculator(100);

calc.add(50)
    .subtract(20)
    .multiply(2)
    .divide(4);

console.log("Final calculator value:", calc.getValue());
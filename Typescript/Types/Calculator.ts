// ============================================
// TypeScript Calculator
// ============================================


// ── 1 & 2. Basic operations with proper types ──

function add(a: number, b: number): number {
  return a + b;
}

function subtract(a: number, b: number): number {
  return a - b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

function divide(a: number, b: number): number {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}


// ── 3. Optional parameter (label is optional) ──

function calculate(a: number, b: number, operation: string, label?: string): string {
  let result: number;

  switch (operation) {
    case "add":      result = add(a, b); break;
    case "subtract": result = subtract(a, b); break;
    case "multiply": result = multiply(a, b); break;
    case "divide":   result = divide(a, b); break;
    default: throw new Error(`Unknown operation: ${operation}`);
  }

  const prefix = label ? `[${label}] ` : "";
  return `${prefix}${a} ${operation} ${b} = ${result}`;
}


// ── 4. Function that returns a typed object ──

interface CalcResult {
  operation: string;
  operands: number[];
  result: number;
  timestamp: string;
}

function calculateWithDetails(a: number, b: number, operation: string): CalcResult {
  let result: number;

  switch (operation) {
    case "add":      result = add(a, b); break;
    case "subtract": result = subtract(a, b); break;
    case "multiply": result = multiply(a, b); break;
    case "divide":   result = divide(a, b); break;
    default: throw new Error(`Unknown operation: ${operation}`);
  }

  return {
    operation,
    operands: [a, b],
    result,
    timestamp: new Date().toISOString(),
  };
}


// ── 5. Rest parameters ──

function sumAll(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

function multiplyAll(...numbers: number[]): number {
  return numbers.reduce((total, n) => total * n, 1);
}



// ============================================
// Running the Calculator
// ============================================

console.log("=== Basic Operations ===");
console.log(calculate(10, 5, "add"));
console.log(calculate(10, 5, "subtract"));
console.log(calculate(10, 5, "multiply"));
console.log(calculate(10, 5, "divide"));

console.log("\n=== With Optional Label ===");
console.log(calculate(20, 4, "divide", "My Calculation"));  // label provided
console.log(calculate(20, 4, "divide"));                    // label omitted

console.log("\n=== Returns Typed Object ===");
const details = calculateWithDetails(8, 3, "multiply");
console.log(details);
console.log("Result only:", details.result);
console.log("Timestamp:", details.timestamp);

console.log("\n=== Rest Parameters ===");
console.log("Sum of 1,2,3,4,5:       ", sumAll(1, 2, 3, 4, 5));
console.log("Sum of 10,20:            ", sumAll(10, 20));
console.log("Product of 2,3,4:        ", multiplyAll(2, 3, 4));
console.log("Product of 5,5,5:        ", multiplyAll(5, 5, 5));

console.log("\n=== Runtime Error Checking ===");
try {
  divide(10, 0);
} catch (e: unknown) {
  if (e instanceof Error) console.log("Caught error:", e.message);
}
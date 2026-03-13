// javascript/advanced/ex8-patterns.js

// ───────────────────────────────────────────────
// 1. Counter using closure (increment, decrement, reset)
// ───────────────────────────────────────────────
function createCounter(initial = 0) {
  let count = initial;

  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => (count = initial),
    getValue: () => count
  };
}

// Usage:
const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.decrement()); // 11
console.log(counter.reset());     // 10
console.log(counter.getValue());  // 10


// ───────────────────────────────────────────────
// 2. Higher-order function that adds logging to any function
// ───────────────────────────────────────────────
function withLogging(fn, prefix = "[LOG]") {
  return function (...args) {
    console.log(`${prefix} called with:`, ...args);
    const result = fn(...args);
    console.log(`${prefix} returned:`, result);
    return result;
  };
}

// Example usage:
function add(a, b) {
  return a + b;
}

const loggedAdd = withLogging(add, "[ADD]");
loggedAdd(5, 7);
// [ADD] called with: 5 7
// [ADD] returned: 12


// ───────────────────────────────────────────────
// 3. Curried function for calculating discount
// ───────────────────────────────────────────────
// discount(rate)(price) → price * (1 - rate)
function calculateDiscount(rate) {
  return function (price) {
    if (typeof price !== 'number' || price < 0) {
      throw new Error("Price must be a non-negative number");
    }
    return price * (1 - rate);
  };
}

// More readable / flexible variant using arrow functions
const discount = rate => price => price * (1 - rate);

// Usage examples:
const tenPercentOff  = calculateDiscount(0.1);
const twentyPercentOff = discount(0.2);

console.log(tenPercentOff(1000));     // 900
console.log(twentyPercentOff(250));   // 200

// You can also call it directly (currying in action):
console.log(discount(0.15)(800));     // 680


// ───────────────────────────────────────────────
// 4. Compose function (right-to-left: compose(f,g)(x) = f(g(x)))
// ───────────────────────────────────────────────
function compose(...fns) {
  return function (initialValue) {
    return fns.reduceRight((acc, fn) => fn(acc), initialValue);
  };
}

// Alternative (left-to-right pipe style - more common in modern JS)
function pipe(...fns) {
  return function (initialValue) {
    return fns.reduce((acc, fn) => fn(acc), initialValue);
  };
}

// Example usage:
const add10    = x => x + 10;
const double   = x => x * 2;
const square   = x => x * x;
const toString = x => `Result: ${x}`;

const transformation = compose(toString, square, double, add10);
console.log(transformation(5));  
// → "Result: 400"     because: square(double(add10(5))) → square(30) → 900 → "Result: 900"

const piped = pipe(add10, double, square, toString);
console.log(piped(5));  
// same result: "Result: 400"


// ───────────────────────────────────────────────
// 5. Realistic example combining several patterns
// ───────────────────────────────────────────────
// Problem: Price calculator with discount tiers + logging + reset capability

function createDiscountedPriceCalculator() {
  // Using closure to keep base price and discount state
  let basePrice = 0;
  let currentDiscountRate = 0;

  // Curried discount applicator
  const applyDiscount = rate => price => price * (1 - rate);

  // Logging wrapper
  const loggedApply = withLogging(applyDiscount, "[DISCOUNT]");

  return {
    setBasePrice(price) {
      if (price < 0) throw new Error("Price cannot be negative");
      basePrice = price;
      return this;
    },

    setDiscount(rate) {
      if (rate < 0 || rate > 1) throw new Error("Discount rate must be 0–1");
      currentDiscountRate = rate;
      return this;
    },

    // Different discount calculation styles
    getFinalPriceClassic() {
      return basePrice * (1 - currentDiscountRate);
    },

    getFinalPriceCurried() {
      return loggedApply(currentDiscountRate)(basePrice);
    },

    // Using compose + pipe
    getFinalPriceFancy() {
      const addTax = x => x * 1.075;
      const roundToTwo = x => Math.round(x * 100) / 100;

      const pipeline = pipe(
        applyDiscount(currentDiscountRate),
        addTax,
        roundToTwo
      );

      return pipeline(basePrice);
    },

    reset() {
      basePrice = 0;
      currentDiscountRate = 0;
      return this;
    }
  };
}

// ──────────────── Real-world usage example ────────────────
const shopCalculator = createDiscountedPriceCalculator();

shopCalculator
  .setBasePrice(1200)
  .setDiscount(0.25);

console.log("Classic:     ", shopCalculator.getFinalPriceClassic());     // 900
console.log("Curried+log: ", shopCalculator.getFinalPriceCurried());    // → logs + 900
console.log("Fancy (tax+round): ", shopCalculator.getFinalPriceFancy()); // ≈ 967.50

shopCalculator.reset();
console.log("After reset: ", shopCalculator.getFinalPriceClassic());    // 0
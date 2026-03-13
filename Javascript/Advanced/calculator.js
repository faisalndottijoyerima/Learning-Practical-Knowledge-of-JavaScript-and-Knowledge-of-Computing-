// calculator.js
export default class Calculator {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  add(n) {
    this.value += n;
    return this;
  }

  subtract(n) {
    this.value -= n;
    return this;
  }

  multiply(n) {
    this.value *= n;
    return this;
  }

  divide(n) {
    if (n === 0) throw new Error("Division by zero");
    this.value /= n;
    return this;
  }

  getValue() {
    return this.value;
  }
}
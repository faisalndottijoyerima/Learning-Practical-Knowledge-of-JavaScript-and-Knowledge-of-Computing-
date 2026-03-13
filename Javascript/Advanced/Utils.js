// utils.js
export function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

export function average(arr) {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

export function min(arr) {
  return Math.min(...arr);
}

export function max(arr) {
  return Math.max(...arr);
}
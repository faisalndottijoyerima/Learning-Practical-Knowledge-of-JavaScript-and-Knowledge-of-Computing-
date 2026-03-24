function getFirst<T>(array: T[]): T | undefined {
    return array.length > 0 ? array[0] : undefined;
}

// Usage:
const firstNum = getFirst([1, 2, 3]);                    // 1
const firstStr = getFirst(["a", "b", "c"]);              // "a"
const firstUser = getFirst([{ id: 1, name: "Faisal" }]); // { id: 1, name: "Faisal" }

// Works with empty array safely
const emptyFirst = getFirst([]);                         // undefined

console.log(firstNum);      
console.log(firstStr);
console.log(firstUser);
console.log(emptyFirst);        
function wrapInArray<T>(value: T): T[] {
  return [value];
}

wrapInArray(42)        // → [42]        (T = number)
wrapInArray("hello")   // → ["hello"]   (T = string)
wrapInArray(true)      // → [true]      (T = boolean)
wrapInArray({ name: "Ada" })  // → [{ name: "Ada" }]  (T = object)

console.log(wrapInArray(42))        // → [42]        (T = number)
console.log(wrapInArray("hello"))   // → ["hello"]   (T = string)
console.log(wrapInArray(true))      // → [true]      (T = boolean)
console.log(wrapInArray({ name: "Ada" }))  // → [{ name: "Ada" }]  (T = object)     

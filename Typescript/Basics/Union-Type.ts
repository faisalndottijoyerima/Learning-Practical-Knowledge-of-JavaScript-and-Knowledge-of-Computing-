// ─── 5. Union Type: string | number ──────────────────────
let id: string | number;
 
id = 101;
console.log("\nID (as number):", id);
 
id = "USR-202";
console.log("ID (as string):", id);
 
// Union with a function
function printId(value: string | number): void {
  if (typeof value === "string") {
    console.log("String ID (uppercase):", value.toUpperCase());
  } else {
    console.log("Numeric ID (doubled):", value * 2);
  }
}
 
printId(id);
printId(55);
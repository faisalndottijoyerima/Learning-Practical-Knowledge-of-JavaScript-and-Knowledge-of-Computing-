// ─── 3. Array of Numbers with Typed Methods ──────────────
const scores: number[] = [85, 92, 78, 95, 88];
 
const total: number = scores.reduce((sum, n) => sum + n, 0);
const average: number = total / scores.length;
const highest: number = Math.max(...scores);
const passing: number[] = scores.filter((s) => s >= 80);
 
console.log("\nScores:", scores);
console.log("Total:", total);
console.log("Average:", average.toFixed(2));
console.log("Highest:", highest);
console.log("Passing scores (>=80):", passing);
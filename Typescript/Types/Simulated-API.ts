// ============================================================
// 4. Utility: Simulate API Delay with setTimeout
// ============================================================
 
function simulateDelay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { simulateDelay };   

console.log("Utility function for simulating API delay defined successfully."); 

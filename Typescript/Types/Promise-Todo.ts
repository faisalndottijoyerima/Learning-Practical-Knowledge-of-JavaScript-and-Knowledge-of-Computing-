// 5. Function that returns Promise<Todo[]>
// ============================================================

import { simulateDelay } from "./Simulated-API.js";
import { mockTodos } from "./Simulated-Dbase.js";
import { ApiError } from "./Custom-error.js";
import type { Todo } from "./Todo-interface.js";

export async function fetchAllTodos(): Promise<Todo[]> {
  await simulateDelay(600); // Simulate network latency

  if (mockTodos.length === 0) {
    throw new ApiError(404, "No todos found");
  }

  return [...mockTodos]; // Return a copy to prevent mutation
}

console.log("Function to fetch all todos defined successfully.");
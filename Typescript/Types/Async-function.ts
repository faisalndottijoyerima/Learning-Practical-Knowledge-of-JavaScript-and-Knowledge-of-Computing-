// ============================================================
// 6. Async function to fetch single Todo by ID
// ============================================================

import { simulateDelay } from "./Simulated-API.js";
import { mockTodos } from "./Simulated-Dbase.js";
import { NotFoundError } from "./Custom-error.js";
import type { Todo } from "./Todo-interface.js";

export async function fetchTodoById(id: number): Promise<Todo> {
  await simulateDelay(300);

  const todo = mockTodos.find((t: Todo) => t.id === id);

  if (!todo) {
    throw new NotFoundError(id); // Typed error thrown here
  }

  return { ...todo }; // Return a copy
}

console.log("Function to fetch a single todo by ID defined successfully."); 
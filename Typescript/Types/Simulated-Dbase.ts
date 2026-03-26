// ============================================================
// 3. Simulated Database
// ============================================================

import type { Todo } from "./Todo-interface.js";

const mockTodos: Todo[] = [
  {
    id: 1,
    title: "Buy groceries",
    completed: false,
    userId: 1,
    createdAt: new Date("2024-01-01"),
    priority: "high",
  },
  {
    id: 2,
    title: "Read TypeScript docs",
    completed: true,
    userId: 1,
    createdAt: new Date("2024-01-02"),
    priority: "medium",
  },
  {
    id: 3,
    title: "Go for a run",
    completed: false,
    userId: 2,
    createdAt: new Date("2024-01-03"),
    priority: "low",
  },
  {
    id: 4,
    title: "Write unit tests",
    completed: false,
    userId: 1,
    createdAt: new Date("2024-01-04"),
    priority: "high",
  },
];

export { mockTodos };

export const db = {
  todos: mockTodos,
};
console.log("Simulated database initialized."); 

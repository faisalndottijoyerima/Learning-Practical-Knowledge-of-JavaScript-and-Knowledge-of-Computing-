// ============================================================
// 1. Todo Interface
// ============================================================
 
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  createdAt: Date;
  priority: "low" | "medium" | "high";
}

console.log("Todo interface defined successfully.");

/**
 * Generic filter function by status.
 * Works with any type that has a 'completed' boolean property.
 */

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface SerializedTodo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

function filterByStatus<T extends { completed: boolean }>(
  todos: readonly T[],
  status: 'completed' | 'incomplete'
): T[] {
  return todos.filter((todo) =>
    status === 'completed' ? todo.completed : !todo.completed
  );
}

class TodoManager {
  private todos: Todo[] = [];
  private readonly STORAGE_KEY = 'todos';

  constructor() {
    this.loadFromStorage();
  }

  private generateId(): string {
    return (
      Date.now().toString(36) +
      '-' +
      Math.random().toString(36).substring(2, 10)
    );
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored === null) {
      this.todos = [];
      return;
    }

    try {
      const serialized: SerializedTodo[] = JSON.parse(stored);
      this.todos = serialized.map(
        (s: SerializedTodo): Todo => ({
          ...s,
          createdAt: new Date(s.createdAt),
        })
      );
    } catch {
      console.error('Failed to load todos from localStorage. Starting fresh.');
      this.todos = [];
    }
  }

  private saveToStorage(): void {
    const serialized: SerializedTodo[] = this.todos.map(
      (t: Todo): SerializedTodo => ({
        id: t.id,
        title: t.title,
        completed: t.completed,
        createdAt: t.createdAt.toISOString(),
      })
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(serialized));
  }

    addTodo(title: string): void {
    const newTodo: Todo = {
        id: this.generateId(),
        title,
        completed: false,
        createdAt: new Date(),
    };
    this.todos.push(newTodo);
    this.saveToStorage();
  } 

    toggleTodo(id: string): void {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.todos[index]!.completed = !this.todos[index]!.completed;
      this.saveToStorage();
    }
  }

    getTodosByStatus(status: 'completed' | 'incomplete'): Todo[] {      
    return filterByStatus(this.todos, status);
    }
}

export { TodoManager, filterByStatus }; 

console.log("Generic filter function and TodoManager class defined successfully."); 







  
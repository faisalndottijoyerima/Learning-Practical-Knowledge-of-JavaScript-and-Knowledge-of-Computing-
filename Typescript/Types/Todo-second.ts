interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

/**
 * Serialized version for localStorage (Date becomes ISO string)
 * This keeps everything fully typed with no 'any'
 */
type SerializedTodo = Omit<Todo, 'createdAt'> & {
  createdAt: string;
};

// Example usage:
const todo: Todo = {
  id: '1',      

    title: 'Learn TypeScript',  
    completed: false,
    createdAt: new Date(),
};  

// Serialize for storage
const serializedTodo: SerializedTodo = {
  ...todo,
  createdAt: todo.createdAt.toISOString(),
};      
// Deserialize from storage
const deserializedTodo: Todo = {
 
    ...serializedTodo,      
    createdAt: new Date(serializedTodo.createdAt),
};  
console.log(todo);
console.log(serializedTodo);
console.log(deserializedTodo);


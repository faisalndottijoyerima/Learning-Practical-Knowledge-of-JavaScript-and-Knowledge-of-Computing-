class Stack<T> {
    private items: T[] = [];

    // Push element onto the stack
    push(item: T): void {
        this.items.push(item);
    }

    // Remove and return the top element
    pop(): T | undefined {
        return this.items.pop();
    }

    // Return the top element without removing it
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    // Check if stack is empty
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Get current size of stack
    size(): number {
        return this.items.length;
    }

    // Clear the stack
    clear(): void {
        this.items = [];
    }
}

// Example usage:
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
console.log(numberStack.peek());            
console.log(numberStack.pop());             
console.log(numberStack.size());            
console.log(numberStack.isEmpty());         
numberStack.clear();
console.log(numberStack.isEmpty());     

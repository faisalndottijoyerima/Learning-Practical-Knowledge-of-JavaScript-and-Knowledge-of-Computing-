class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// Stack of numbers
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);
console.log(numberStack.peek());   // 30
console.log(numberStack.pop());    // 30
console.log(numberStack.size());   // 2

// Stack of strings
const stringStack = new Stack<string>();
stringStack.push("TypeScript");
stringStack.push("is");
stringStack.push("awesome");
console.log(stringStack.pop());    // "awesome"

// Stack of objects
interface User {
    id: number;
    name: string;
}

const userStack = new Stack<User>();
userStack.push({ id: 1, name: "Faisal" });
userStack.push({ id: 2, name: "Alice" });

console.log(userStack.peek());     // { id: 2, name: "Alice" }
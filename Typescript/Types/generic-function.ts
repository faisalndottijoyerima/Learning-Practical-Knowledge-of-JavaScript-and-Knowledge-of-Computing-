// 1. Generic function
function wrapInArray<T>(value: T): T[] {
    return [value];
}

// 2. Generic interface
interface Response<T> {
    success: boolean;
    data: T;
    message?: string;
    statusCode?: number;
}

// 3. Generic Stack class
class Stack<T> {
    private items: T[] = [];

    push(item: T): void { this.items.push(item); }
    pop(): T | undefined { return this.items.pop(); }
    peek(): T | undefined { return this.items[this.items.length - 1]; }
    isEmpty(): boolean { return this.items.length === 0; }
    size(): number { return this.items.length; }
}

// 5. Get first element
function getFirst<T>(array: T[]): T | undefined {
    return array[0];
}

// Testing everything
const numStack = new Stack<number>();
numStack.push(100);
console.log(getFirst(numStack['items'])); // Not recommended, just for demo

const names = wrapInArray("Faisal");
console.log(names); // ["Faisal"]


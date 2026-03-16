// hello.ts
const message: string = "Hello World from TypeScript";
console.log(message);

const greet = (name: string = "stranger") => {
  console.log(`Hey ${name}, welcome!`);
};

greet("Faisal");
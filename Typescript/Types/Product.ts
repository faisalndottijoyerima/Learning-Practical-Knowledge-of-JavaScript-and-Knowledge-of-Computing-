// ============================================
// TypeScript — Product Interface
// ============================================


// ── 1. Product Interface ──

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}


// ── Create some Product instances ──

const laptop: Product = {
  id: 1,
  name: "MacBook Pro",
  price: 1999.99,
  category: "Electronics",
};

const pen: Product = {
  id: 2,
  name: "Ballpoint Pen",
  price: 1.49,
  category: "Stationery",
};

const shirt: Product = {
  id: 3,
  name: "Plain White T-Shirt",
  price: 14.99,
  category: "Clothing",
};


// ── A simple function that accepts a Product ──

function printProduct(product: Product): void {
  console.log(`[${product.id}] ${product.name}`);
  console.log(`    Category : ${product.category}`);
  console.log(`    Price    : $${product.price.toFixed(2)}`);
}


// ── Test it ──

console.log("=== Product Listings ===\n");
printProduct(laptop);
console.log();
printProduct(pen);
console.log();
printProduct(shirt);


// ── Type error examples (compile-time) ──
// Uncommenting these would cause TypeScript errors:

// const bad1: Product = { id: "A1", name: "Ghost", price: 9.99, category: "None" };
// ❌ id must be a number, not a string

// const bad2: Product = { id: 4, name: "Invisible", category: "None" };
// ❌ price is missing — all fields are required

// const bad3: Product = { id: 5, name: "Oops", price: "free", category: "Deals" };
// ❌ price must be a number, not a string

console.log("\n✅ All Product types valid!");
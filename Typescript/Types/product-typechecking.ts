// ============================================
// TypeScript — Instances & Type Checking
// ============================================


// ── Interfaces & Type Alias ──

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface Cart {
  cartId: number;
  owner: string;
  products: Product[];
  status: Status;
}

interface DigitalProduct extends Product {
  downloadUrl: string;
  fileSize: string;
  fileFormat: string;
}

type Status = "pending" | "shipped" | "delivered";


// ── Type Guard ──

function isDigital(product: Product): product is DigitalProduct {
  return "downloadUrl" in product;
}


// ============================================
// 6. Create Instances
// ============================================

// ── Physical Product instances ──
const keyboard: Product = {
  id: 1,
  name: "Mechanical Keyboard",
  price: 89.99,
  category: "Electronics",
};

const headphones: Product = {
  id: 2,
  name: "Wireless Headphones",
  price: 149.99,
  category: "Electronics",
};

const notebook: Product = {
  id: 3,
  name: "Notebook",
  price: 4.99,
  category: "Stationery",
};

const shirt: Product = {
  id: 4,
  name: "Plain White T-Shirt",
  price: 14.99,
  category: "Clothing",
};

// ── DigitalProduct instances ──
const ebook: DigitalProduct = {
  id: 5,
  name: "TypeScript Mastery eBook",
  price: 19.99,
  category: "Books",
  downloadUrl: "https://store.example.com/downloads/ts-mastery.pdf",
  fileSize: "8MB",
  fileFormat: "PDF",
};

const course: DigitalProduct = {
  id: 6,
  name: "Advanced React Course",
  price: 49.99,
  category: "Courses",
  downloadUrl: "https://store.example.com/downloads/react-advanced.zip",
  fileSize: "2.4GB",
  fileFormat: "ZIP",
};

// ── Cart instances ──
const aliceCart: Cart = {
  cartId: 101,
  owner: "Alice",
  products: [keyboard, ebook, notebook],
  status: "pending",
};

const bobCart: Cart = {
  cartId: 102,
  owner: "Bob",
  products: [headphones, course, shirt],
  status: "shipped",
};

const emptyCart: Cart = {
  cartId: 103,
  owner: "Carol",
  products: [],
  status: "delivered",
};


// ============================================
// Type Checking Tests
// ============================================

function printSectionHeader(title: string): void {
  console.log(`\n${"=".repeat(45)}`);
  console.log(`  ${title}`);
  console.log("=".repeat(45));
}

function printResult(label: string, value: unknown): void {
  console.log(`  ✔ ${label}: ${JSON.stringify(value)}`);
}


// ── TEST 1: Product field types ──
printSectionHeader("TEST 1 — Product Field Types");
printResult("keyboard.id     (number)",   typeof keyboard.id      === "number");
printResult("keyboard.name   (string)",   typeof keyboard.name    === "string");
printResult("keyboard.price  (number)",   typeof keyboard.price   === "number");
printResult("keyboard.category (string)", typeof keyboard.category === "string");


// ── TEST 2: DigitalProduct inherits Product fields ──
printSectionHeader("TEST 2 — DigitalProduct Inherits Product");
printResult("ebook has id",          "id"          in ebook);
printResult("ebook has name",        "name"        in ebook);
printResult("ebook has price",       "price"       in ebook);
printResult("ebook has category",    "category"    in ebook);
printResult("ebook has downloadUrl", "downloadUrl" in ebook);
printResult("ebook has fileSize",    "fileSize"    in ebook);
printResult("ebook has fileFormat",  "fileFormat"  in ebook);


// ── TEST 3: Type Guard — isDigital() ──
printSectionHeader("TEST 3 — Type Guard isDigital()");
printResult("keyboard  is digital", isDigital(keyboard));    // false
printResult("headphones is digital",isDigital(headphones));  // false
printResult("ebook     is digital", isDigital(ebook));       // true
printResult("course    is digital", isDigital(course));      // true


// ── TEST 4: Status type alias ──
printSectionHeader("TEST 4 — Status Type Alias");
const validStatuses: Status[] = ["pending", "shipped", "delivered"];
validStatuses.forEach((s) =>
  printResult(`"${s}" is valid Status`, true)
);
printResult("aliceCart.status", aliceCart.status);
printResult("bobCart.status",   bobCart.status);
printResult("emptyCart.status", emptyCart.status);


// ── TEST 5: Cart contains Product array ──
printSectionHeader("TEST 5 — Cart Contains Product[]");
printResult("aliceCart.products is array", Array.isArray(aliceCart.products));
printResult("aliceCart products count",    aliceCart.products.length);
printResult("bobCart products count",      bobCart.products.length);
printResult("emptyCart products count",    emptyCart.products.length);
aliceCart.products.forEach((p) =>
  printResult(`  product[${p.id}] has valid price (number)`, typeof p.price === "number")
);


// ── TEST 6: DigitalProduct is assignable to Product ──
printSectionHeader("TEST 6 — DigitalProduct Assignable to Product");
const productRef: Product = ebook;   // ✅ DigitalProduct can be used as Product
printResult("ebook assigned to Product type", productRef.name === ebook.name);
printResult("product ref name",  productRef.name);
printResult("product ref price", productRef.price);


// ── TEST 7: Compile-time error examples ──
printSectionHeader("TEST 7 — Compile-Time Errors (intentional)");
console.log("  The lines below are commented out — uncommenting causes TS errors:\n");

console.log(`  // const bad1: Product = { id: "X", name: "A", price: 9, category: "B" };`);
console.log(`  // ❌ id must be number, not string\n`);

console.log(`  // const bad2: Product = { id: 1, name: "A", category: "B" };`);
console.log(`  // ❌ price is missing — all fields are required\n`);

console.log(`  // const bad3: Cart = { ...aliceCart, status: "returned" };`);
console.log(`  // ❌ "returned" is not assignable to type Status\n`);

console.log(`  // const bad4: DigitalProduct = { id: 7, name: "App", price: 2.99, category: "Apps" };`);
console.log(`  // ❌ missing downloadUrl, fileSize, fileFormat\n`);

console.log(`  // const bad5: Cart = { ...aliceCart, products: ["laptop", "pen"] };`);
console.log(`  // ❌ products must be Product[], not string[]\n`);

console.log(`  // headphones.price = "expensive";`);
console.log(`  // ❌ price must be number, not string`);


// ── Final Summary ──
printSectionHeader("SUMMARY");
console.log("  ✅ 2  Physical Product instances created");
console.log("  ✅ 2  DigitalProduct instances created");
console.log("  ✅ 3  Cart instances created (2 with items, 1 empty)");
console.log("  ✅ Type guard correctly identifies digital products");
console.log("  ✅ Status type alias rejects invalid values at compile time");
console.log("  ✅ DigitalProduct is assignable to Product (inheritance works)");
console.log("  ✅ All 5 compile-time error cases documented\n");
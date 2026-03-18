// ============================================
// TypeScript — DigitalProduct extends Product
// ============================================


// ── Base Interface ──

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}


// ── 5. DigitalProduct extends Product ──

interface DigitalProduct extends Product {
  downloadUrl: string;
  fileSize: string;       // e.g. "120MB", "2.4GB"
  fileFormat: string;     // e.g. "PDF", "MP4", "ZIP"
}


// ============================================
// Type Guard — detect digital vs physical
// ============================================

function isDigital(product: Product): product is DigitalProduct {
  return "downloadUrl" in product;
}


// ============================================
// Functions
// ============================================

// Print physical product details
function printProduct(product: Product): void {
  console.log(`  [${product.id}] ${product.name}`);
  console.log(`       Category : ${product.category}`);
  console.log(`       Price    : $${product.price.toFixed(2)}`);
}

// Print digital product — shows extra fields
function printDigitalProduct(product: DigitalProduct): void {
  printProduct(product);   // reuse base function
  console.log(`       Download : ${product.downloadUrl}`);
  console.log(`       Size     : ${product.fileSize}`);
  console.log(`       Format   : ${product.fileFormat}`);
}

// Works for BOTH — uses type guard to decide what to print
function printAnyProduct(product: Product): void {
  if (isDigital(product)) {
    console.log("  📥 [Digital]");
    printDigitalProduct(product);
  } else {
    console.log("  📦 [Physical]");
    printProduct(product);
  }
}

// Generate a download receipt for a digital product
function generateReceipt(product: DigitalProduct, buyer: string): string {
  return (
    `---- Download Receipt ----\n` +
    `  Buyer   : ${buyer}\n` +
    `  Product : ${product.name}\n` +
    `  Format  : ${product.fileFormat} (${product.fileSize})\n` +
    `  Price   : $${product.price.toFixed(2)}\n` +
    `  Link    : ${product.downloadUrl}\n` +
    `-------------------------`
  );
}

// Apply a discount — works for any Product or DigitalProduct
function applyDiscount(product: Product, percent: number): Product {
  const newPrice = product.price - (product.price * percent) / 100;
  return { ...product, price: parseFloat(newPrice.toFixed(2)) };
}


// ============================================
// Instances & Tests
// ============================================

// ── Physical Products ──
const keyboard: Product = {
  id: 1,
  name: "Mechanical Keyboard",
  price: 89.99,
  category: "Electronics",
};

const notebook: Product = {
  id: 2,
  name: "Notebook",
  price: 4.99,
  category: "Stationery",
};

// ── Digital Products (inherits all Product fields + adds 3 more) ──
const ebook: DigitalProduct = {
  id: 3,
  name: "TypeScript Mastery eBook",
  price: 19.99,
  category: "Books",
  downloadUrl: "https://store.example.com/downloads/ts-mastery.pdf",
  fileSize: "8MB",
  fileFormat: "PDF",
};

const course: DigitalProduct = {
  id: 4,
  name: "Advanced React Course",
  price: 49.99,
  category: "Courses",
  downloadUrl: "https://store.example.com/downloads/react-advanced.zip",
  fileSize: "2.4GB",
  fileFormat: "ZIP",
};

const music: DigitalProduct = {
  id: 5,
  name: "Lo-Fi Beats Pack",
  price: 9.99,
  category: "Music",
  downloadUrl: "https://store.example.com/downloads/lofi-pack.mp3",
  fileSize: "320MB",
  fileFormat: "MP3",
};


// --- printProduct (physical) ---
console.log("=== Physical Products ===");
printProduct(keyboard);
console.log();
printProduct(notebook);

// --- printDigitalProduct ---
console.log("\n=== Digital Products ===");
printDigitalProduct(ebook);
console.log();
printDigitalProduct(course);

// --- printAnyProduct (type guard) ---
console.log("\n=== printAnyProduct() — type guard in action ===");
[keyboard, ebook, notebook, course, music].forEach((p) => {
  printAnyProduct(p);
  console.log();
});

// --- generateReceipt ---
console.log("=== generateReceipt() ===");
console.log(generateReceipt(ebook, "Alice"));
console.log();
console.log(generateReceipt(music, "Bob"));

// --- applyDiscount works on both types ---
console.log("\n=== applyDiscount() on DigitalProduct ===");
const discounted = applyDiscount(course, 30) as DigitalProduct;
console.log(`  Original  : $${course.price}`);
console.log(`  After 30% off : $${discounted.price}`);


// ── Type error examples (compile-time) ──
// Uncommenting these would cause TypeScript errors:

// const bad: DigitalProduct = { id: 6, name: "App", price: 0.99, category: "Apps" };
// ❌ missing downloadUrl, fileSize, fileFormat

// const bad2: DigitalProduct = { ...ebook, downloadUrl: 12345 };
// ❌ downloadUrl must be a string, not a number

// printDigitalProduct(keyboard);
// ❌ keyboard is a Product, not a DigitalProduct

console.log("\n✅ DigitalProduct extension works correctly!");
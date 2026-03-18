// ============================================
// TypeScript — Functions Accepting Interfaces
// ============================================


// ── Interfaces ──

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
}


// ============================================
// Functions that accept Product interface
// ============================================

// Print a single product's details
function printProduct(product: Product): void {
  console.log(`  [${product.id}] ${product.name}`);
  console.log(`       Category : ${product.category}`);
  console.log(`       Price    : $${product.price.toFixed(2)}`);
}

// Check if a product is affordable under a given budget
function isAffordable(product: Product, budget: number): boolean {
  return product.price <= budget;
}

// Apply a discount to a product and return updated product
function applyDiscount(product: Product, percent: number): Product {
  const discounted = product.price - (product.price * percent) / 100;
  return { ...product, price: parseFloat(discounted.toFixed(2)) };
}

// Format a product as a single summary string
function formatProduct(product: Product): string {
  return `${product.name} (${product.category}) — $${product.price.toFixed(2)}`;
}


// ============================================
// Functions that accept Cart interface
// ============================================

// Add a product to the cart
function addToCart(cart: Cart, product: Product): Cart {
  return { ...cart, products: [...cart.products, product] };
}

// Remove a product from the cart by id
function removeFromCart(cart: Cart, productId: number): Cart {
  return {
    ...cart,
    products: cart.products.filter((p) => p.id !== productId),
  };
}

// Get the total price of all products in the cart
function getCartTotal(cart: Cart): number {
  return cart.products.reduce((sum, p) => sum + p.price, 0);
}

// Get number of items in the cart
function getCartCount(cart: Cart): number {
  return cart.products.length;
}

// Find a product inside the cart by id
function findInCart(cart: Cart, productId: number): Product | undefined {
  return cart.products.find((p) => p.id === productId);
}

// Filter cart products by category
function filterByCategory(cart: Cart, category: string): Product[] {
  return cart.products.filter((p) => p.category === category);
}

// Check if cart is empty
function isCartEmpty(cart: Cart): boolean {
  return cart.products.length === 0;
}

// Print full cart summary
function printCart(cart: Cart): void {
  console.log(`\n  🛒 Cart #${cart.cartId}  —  Owner: ${cart.owner}`);
  if (isCartEmpty(cart)) {
    console.log("     (cart is empty)");
    return;
  }
  cart.products.forEach((p) =>
    console.log(`     • ${formatProduct(p)}`)
  );
  console.log(`     ─────────────────────────────`);
  console.log(`     Total : $${getCartTotal(cart).toFixed(2)} (${getCartCount(cart)} items)`);
}


// ============================================
// Test all functions
// ============================================

// ── Products ──
const laptop: Product = { id: 1, name: "MacBook Pro",       price: 1999.99, category: "Electronics" };
const phone:  Product = { id: 2, name: "iPhone 15",         price: 999.99,  category: "Electronics" };
const pen:    Product = { id: 3, name: "Ballpoint Pen",      price: 1.49,    category: "Stationery"  };
const shirt:  Product = { id: 4, name: "Plain White T-Shirt",price: 14.99,   category: "Clothing"    };

// ── Cart ──
let myCart: Cart = { cartId: 101, owner: "Alice", products: [] };


// --- printProduct ---
console.log("=== printProduct() ===");
printProduct(laptop);

// --- isAffordable ---
console.log("\n=== isAffordable() ===");
console.log(`  Laptop affordable under $500? ${isAffordable(laptop, 500)}`);   // false
console.log(`  Pen affordable under $500?    ${isAffordable(pen, 500)}`);      // true

// --- applyDiscount ---
console.log("\n=== applyDiscount() ===");
const discountedPhone = applyDiscount(phone, 20); // 20% off
console.log(`  Original : $${phone.price}`);
console.log(`  After 20% off: $${discountedPhone.price}`);

// --- formatProduct ---
console.log("\n=== formatProduct() ===");
console.log(" ", formatProduct(shirt));

// --- addToCart ---
console.log("\n=== addToCart() ===");
myCart = addToCart(myCart, laptop);
myCart = addToCart(myCart, phone);
myCart = addToCart(myCart, pen);
myCart = addToCart(myCart, shirt);
printCart(myCart);

// --- findInCart ---
console.log("\n=== findInCart() ===");
const found = findInCart(myCart, 3);
console.log(`  Looking for id 3:`, found ? formatProduct(found) : "Not found");

// --- filterByCategory ---
console.log("\n=== filterByCategory() ===");
const electronics = filterByCategory(myCart, "Electronics");
console.log(`  Electronics in cart (${electronics.length}):`);
electronics.forEach((p) => console.log(`    • ${formatProduct(p)}`));

// --- removeFromCart ---
console.log("\n=== removeFromCart() ===");
myCart = removeFromCart(myCart, 3); // remove Pen
printCart(myCart);

// --- isCartEmpty ---
console.log("\n=== isCartEmpty() ===");
const emptyCart: Cart = { cartId: 999, owner: "Bob", products: [] };
console.log(`  myCart empty?    ${isCartEmpty(myCart)}`);    // false
console.log(`  emptyCart empty? ${isCartEmpty(emptyCart)}`); // true

console.log("\n✅ All functions work correctly!");
// ============================================
// TypeScript — Cart Interface
// ============================================


// ── Product Interface (dependency) ──

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}


// ── 2. Cart Interface with products array ──

interface Cart {
  cartId: number;
  owner: string;
  products: Product[];   // array of Product objects
}


// ── Product instances ──

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


// ── Functions that work with Cart ──

// Add a product to the cart
function addToCart(cart: Cart, product: Product): Cart {
  return {
    ...cart,
    products: [...cart.products, product],
  };
}

// Remove a product from the cart by id
function removeFromCart(cart: Cart, productId: number): Cart {
  return {
    ...cart,
    products: cart.products.filter((p) => p.id !== productId),
  };
}

// Calculate total price
function getCartTotal(cart: Cart): number {
  return cart.products.reduce((sum, p) => sum + p.price, 0);
}

// Print a full cart summary
function printCart(cart: Cart): void {
  console.log(`\n🛒 Cart #${cart.cartId}  —  Owner: ${cart.owner}`);
  console.log(`   Items  : ${cart.products.length}`);
  if (cart.products.length === 0) {
    console.log("   (cart is empty)");
  } else {
    cart.products.forEach((p) =>
      console.log(`     • [${p.id}] ${p.name} (${p.category}) — $${p.price.toFixed(2)}`)
    );
    console.log(`   Total  : $${getCartTotal(cart).toFixed(2)}`);
  }
}


// ── Create a Cart instance ──

let myCart: Cart = {
  cartId: 101,
  owner: "Alice",
  products: [],          // start empty
};

console.log("=== Empty Cart ===");
printCart(myCart);

// Add products one by one
myCart = addToCart(myCart, laptop);
myCart = addToCart(myCart, pen);
myCart = addToCart(myCart, shirt);

console.log("\n=== After Adding 3 Products ===");
printCart(myCart);

// Remove one product
myCart = removeFromCart(myCart, 2); // remove Pen
console.log("\n=== After Removing Pen ===");
printCart(myCart);


// ── Type error examples (compile-time) ──
// Uncommenting these would cause TypeScript errors:

// const badCart: Cart = { cartId: "C1", owner: "Bob", products: [] };
// ❌ cartId must be a number, not a string

// const badCart2: Cart = { cartId: 102, owner: "Bob", products: "laptop" };
// ❌ products must be an array of Product, not a string

// addToCart(myCart, { id: 4, name: "Watch", price: "200", category: "Fashion" });
// ❌ price must be a number, not a string

console.log("\n✅ All Cart types valid!");
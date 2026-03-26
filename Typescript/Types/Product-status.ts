// ============================================
// TypeScript — Type Alias for Status
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
  status: Status;          // uses the Status type alias
}


// ── 4. Type Alias ──

type Status = "pending" | "shipped" | "delivered";


// ============================================
// Functions using Status
// ============================================

// Update the cart's status
function updateStatus(cart: Cart, newStatus: Status): Cart {
  return { ...cart, status: newStatus };
}

// Print the current status with an emoji indicator
function printStatus(cart: Cart): void {
  const icons: Record<Status, string> = {
    pending:   "🕐",
    shipped:   "🚚",
    delivered: "✅",
  };
  console.log(`  Cart #${cart.cartId} (${cart.owner}) → ${icons[cart.status]} ${cart.status.toUpperCase()}`);
}

// Check if an order has been delivered
function isDelivered(cart: Cart): boolean {
  return cart.status === "delivered";
}

// Check if an order is still in progress (not yet delivered)
function isInProgress(cart: Cart): boolean {
  return cart.status === "pending" || cart.status === "shipped";
}

// Simulate moving an order through all stages
function advanceStatus(cart: Cart): Cart {
  const flow: Record<Status, Status> = {
    pending:   "shipped",
    shipped:   "delivered",
    delivered: "delivered",   // already at final stage
  };
  return { ...cart, status: flow[cart.status] };
}


// ============================================
// Test Status type alias
// ============================================

// ── Products ──
const laptop: Product = { id: 1, name: "MacBook Pro", price: 1999.99, category: "Electronics" };
const pen:    Product = { id: 2, name: "Ballpoint Pen", price: 1.49,  category: "Stationery"  };

// ── Carts starting at different statuses ──
let order1: Cart = { cartId: 101, owner: "Alice", products: [laptop], status: "pending"   };
let order2: Cart = { cartId: 102, owner: "Bob",   products: [pen],    status: "shipped"   };
let order3: Cart = { cartId: 103, owner: "Carol", products: [laptop], status: "delivered" };


// --- printStatus ---
console.log("=== Initial Statuses ===");
printStatus(order1);
printStatus(order2);
printStatus(order3);

// --- updateStatus ---
console.log("\n=== updateStatus() ===");
order1 = updateStatus(order1, "shipped");
console.log(`  Alice's order updated:`);
printStatus(order1);

// --- isDelivered / isInProgress ---
console.log("\n=== isDelivered() & isInProgress() ===");
console.log(`  order1 delivered?   ${isDelivered(order1)}`);   // false — shipped
console.log(`  order3 delivered?   ${isDelivered(order3)}`);   // true
console.log(`  order1 in progress? ${isInProgress(order1)}`);  // true — shipped
console.log(`  order3 in progress? ${isInProgress(order3)}`);  // false — delivered

// --- advanceStatus (simulate full journey) ---
console.log("\n=== advanceStatus() — Full Order Journey ===");
let journey: Cart = { cartId: 201, owner: "Dave", products: [pen], status: "pending" };
console.log("  Start:");
printStatus(journey);
journey = advanceStatus(journey);
console.log("  After first advance:");
printStatus(journey);
journey = advanceStatus(journey);
console.log("  After second advance:");
printStatus(journey);
journey = advanceStatus(journey);
console.log("  After third advance (already delivered):");
printStatus(journey);


// ── Type error examples (compile-time) ──
// Uncommenting these would cause TypeScript errors:

// const badStatus: Status = "lost";
// ❌ Type '"lost"' is not assignable to type 'Status'

// order1 = updateStatus(order1, "returned");
// ❌ Type '"returned"' is not assignable to type 'Status'

// const badCart: Cart = { cartId: 104, owner: "Eve", products: [], status: "processing" };
// ❌ Type '"processing"' is not assignable to type 'Status'

console.log("\n✅ All Status types valid!");
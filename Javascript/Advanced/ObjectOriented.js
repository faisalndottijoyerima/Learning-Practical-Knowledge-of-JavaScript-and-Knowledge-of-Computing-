// ============================================================
// Exercise 6: Classes & Inheritance
// ============================================================

// ── 1. BankAccount base class ────────────────────────────────
class BankAccount {
  #balance; // private field

  constructor(owner, initialBalance = 0) {
    if (initialBalance < 0) throw new Error("Initial balance cannot be negative.");
    this.owner = owner;
    this.#balance = initialBalance;
    this.transactions = [];
    console.log(`✅ Account created for ${this.owner} with $${this.#balance.toFixed(2)}`);
  }

  // ── 2. Core methods ────────────────────────────────────────

  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit amount must be positive.");
    this.#balance += amount;
    this.transactions.push({ type: "deposit", amount, balance: this.#balance });
    console.log(`  ➕ Deposited  $${amount.toFixed(2)} → Balance: $${this.#balance.toFixed(2)}`);
    return this;                // enables method chaining
  }

  withdraw(amount) {
    if (amount <= 0)            throw new Error("Withdrawal amount must be positive.");
    if (amount > this.#balance) throw new Error(`Insufficient funds. Available: $${this.#balance.toFixed(2)}`);
    this.#balance -= amount;
    this.transactions.push({ type: "withdrawal", amount, balance: this.#balance });
    console.log(`  ➖ Withdrew   $${amount.toFixed(2)} → Balance: $${this.#balance.toFixed(2)}`);
    return this;
  }

  getBalance() {
    return this.#balance;
  }

  printStatement() {
    console.log(`\n  📄 Statement for ${this.owner}`);
    console.log("  " + "─".repeat(44));
    this.transactions.forEach(({ type, amount, balance }, i) => {
      const label = type === "deposit" ? "DEP" : "WDR";
      console.log(`  ${i + 1}. [${label}] $${amount.toFixed(2).padStart(8)}  |  Balance: $${balance.toFixed(2)}`);
    });
    console.log(`  ${"─".repeat(44)}`);
    console.log(`  Current Balance: $${this.#balance.toFixed(2)}\n`);
  }

  toString() {
    return `BankAccount(owner="${this.owner}", balance=$${this.#balance.toFixed(2)})`;
  }
}

// ── 3. SavingsAccount — extends BankAccount ──────────────────
class SavingsAccount extends BankAccount {
  constructor(owner, initialBalance = 0, annualInterestRate = 0.05) {
    super(owner, initialBalance);
    this.annualInterestRate = annualInterestRate;
    this.interestEarned = 0;
  }

  // ── 4. Interest calculation ──────────────────────────────

  /**
   * Applies simple interest for a given number of months.
   * Formula: interest = balance × (annualRate / 12) × months
   */
  applyInterest(months = 1) {
    const interest = this.getBalance() * (this.annualInterestRate / 12) * months;
    this.interestEarned += interest;
    console.log(`  💰 Interest applied (${months} mo @ ${(this.annualInterestRate * 100).toFixed(2)}% p.a.): +$${interest.toFixed(2)}`);
    this.deposit(interest);
    return interest;
  }

  /**
   * Projects the balance after compound interest over N years.
   * Formula: A = P × (1 + r/n)^(n×t)
   */
  projectBalance(years, compoundsPerYear = 12) {
    const P = this.getBalance();
    const r = this.annualInterestRate;
    const n = compoundsPerYear;
    const projected = P * Math.pow(1 + r / n, n * years);
    console.log(`  🔮 Projected balance in ${years} yr(s): $${projected.toFixed(2)}`);
    return projected;
  }

  toString() {
    return `SavingsAccount(owner="${this.owner}", balance=$${this.getBalance().toFixed(2)}, rate=${(this.annualInterestRate * 100).toFixed(2)}%)`;
  }
}

// ── 5. Create instances & test all methods ───────────────────

console.log("═".repeat(52));
console.log("  🏦  BankAccount Demo");
console.log("═".repeat(52));

const alice = new BankAccount("Alice", 1000);
alice
  .deposit(500)
  .deposit(250)
  .withdraw(200)
  .withdraw(100);

console.log(`\n  Balance via getBalance(): $${alice.getBalance().toFixed(2)}`);
alice.printStatement();

// Error handling
console.log("  ⚠️  Testing error handling...");
try {
  alice.withdraw(99999);
} catch (e) {
  console.log(`  Caught: ${e.message}`);
}

console.log("\n" + "═".repeat(52));
console.log("  💎  SavingsAccount Demo");
console.log("═".repeat(52));

const bob = new SavingsAccount("Bob", 5000, 0.06); // 6% annual
bob.deposit(1000);
bob.applyInterest(1);           // 1 month of interest
bob.applyInterest(3);           // 3 months of interest
bob.projectBalance(5);          // projection over 5 years
bob.printStatement();

console.log(`  Total interest earned: $${bob.interestEarned.toFixed(2)}`);

// instanceof checks
console.log("\n" + "═".repeat(52));
console.log("  🔍  Type Checks");
console.log("═".repeat(52));
console.log(`  alice instanceof BankAccount:   ${alice instanceof BankAccount}`);
console.log(`  bob   instanceof BankAccount:   ${bob instanceof BankAccount}`);
console.log(`  bob   instanceof SavingsAccount:${bob instanceof SavingsAccount}`);
console.log(`  alice instanceof SavingsAccount:${alice instanceof SavingsAccount}`);

console.log("\n  toString() output:");
console.log(`  ${alice}`);
console.log(`  ${bob}`);
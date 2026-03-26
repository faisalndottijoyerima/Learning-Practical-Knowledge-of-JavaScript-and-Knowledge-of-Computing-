import { BankAccount } from "./Interface-bankacc.js";

class SavingsAccount extends BankAccount {
    private interestRate: number; // e.g., 0.05 for 5%

    constructor(accountId: string, initialBalance: number = 0, interestRate: number = 0.03) {
        super(accountId, initialBalance);
        this.interestRate = Math.max(0, interestRate);
    }

    // Method to calculate and add interest
    public applyInterest(): void {
        const interest = this.getBalance() * this.interestRate;
        if (interest > 0) {
            this.deposit(interest); // reuse deposit method
            console.log(`Interest applied: $${interest.toFixed(2)} at ${this.interestRate * 100}%`);
        }
    }

    // Optional: Getter for interest rate
    public getInterestRate(): number {
        return this.interestRate;
    }
}

// Example usage
const mySavings = new SavingsAccount("987654321", 5000, 0.05);
console.log(`Initial Balance: $${mySavings.getBalance()}`);
mySavings.applyInterest();
console.log(`Balance after interest: $${mySavings.getBalance()}`);  
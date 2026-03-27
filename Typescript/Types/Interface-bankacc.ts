// Define the Account interface
export interface Account {
    readonly accountId: string;
    getBalance(): number;
    deposit(amount: number): void;
    withdraw(amount: number): boolean;
}

// Base BankAccount class implementing the interface
export class BankAccount implements Account {
    // Readonly property
    public readonly accountId: string;

    // Private property (cannot be accessed from outside)
    private balance: number;

    constructor(accountId: string, initialBalance: number = 0) {
        this.accountId = accountId;
        this.balance = Math.max(0, initialBalance); // prevent negative initial balance
    }

    public getBalance(): number {
        return this.balance;
    }

    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited $${amount}. New balance: $${this.balance}`);
        } else {
            console.error("Deposit amount must be positive");
        }
    }

    public withdraw(amount: number): boolean {
        if (amount <= 0) {
            console.error("Withdrawal amount must be positive");
            return false;
        }
        if (amount > this.balance) {
            console.error("Insufficient funds");
            return false;
        }
        this.balance -= amount;
        console.log(`Withdrew $${amount}. Remaining balance: $${this.balance}`);
        return true;
    }
}

// Example usage
const myAccount = new BankAccount("123456789", 1000);
console.log(`Initial Balance: $${myAccount.getBalance()}`); 
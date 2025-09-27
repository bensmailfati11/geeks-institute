# ===========================
# Exercise 1: Bank Account
# ===========================

class BankAccount:
    def __init__(self, username, password, balance=0):
        self.username = username
        self.password = password
        self.balance = balance
        self.authenticated = False

    def authenticate(self, username, password):
        if self.username == username and self.password == password:
            self.authenticated = True
            print(f"{self.username} successfully authenticated!")
        else:
            raise Exception("Authentication failed!")

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("You must be authenticated to deposit money.")
        if amount <= 0:
            raise Exception("Deposit amount must be positive.")
        self.balance += amount
        print(f"Deposited {amount}. New balance: {self.balance}")

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("You must be authenticated to withdraw money.")
        if amount <= 0:
            raise Exception("Withdrawal amount must be positive.")
        if amount > self.balance:
            raise Exception("Insufficient funds.")
        self.balance -= amount
        print(f"Withdrew {amount}. New balance: {self.balance}")


# ===========================
# Part II: Minimum Balance Account
# ===========================

class MinimumBalanceAccount(BankAccount):
    def __init__(self, username, password, balance=0, minimum_balance=0):
        super().__init__(username, password, balance)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("You must be authenticated to withdraw money.")
        if amount <= 0:
            raise Exception("Withdrawal amount must be positive.")
        if self.balance - amount < self.minimum_balance:
            raise Exception(f"Cannot withdraw {amount}. Minimum balance {self.minimum_balance} must be maintained.")
        self.balance -= amount
        print(f"Withdrew {amount}. New balance: {self.balance}")


# ===========================
# Part IV: ATM Class
# ===========================

class ATM:
    def __init__(self, account_list, try_limit=2):
        if not isinstance(account_list, list) or not all(isinstance(acc, BankAccount) for acc in account_list):
            raise Exception("account_list must be a list of BankAccount or MinimumBalanceAccount instances.")
        if try_limit <= 0:
            print("Invalid try limit. Setting try_limit to 2")
            try_limit = 2

        self.account_list = account_list
        self.try_limit = try_limit
        self.current_tries = 0

        self.show_main_menu()

    def show_main_menu(self):
        while True:
            print("\n--- ATM Main Menu ---")
            print("1. Log in")
            print("2. Exit")
            choice = input("Choose an option: ")
            if choice == "1":
                username = input("Enter username: ")
                password = input("Enter password: ")
                self.log_in(username, password)
            elif choice == "2":
                print("Exiting ATM. Goodbye!")
                break
            else:
                print("Invalid option. Try again.")

    def log_in(self, username, password):
        for account in self.account_list:
            try:
                account.authenticate(username, password)
                self.show_account_menu(account)
                return
            except Exception:
                continue

        self.current_tries += 1
        if self.current_tries >= self.try_limit:
            print("Maximum login attempts reached. ATM shutting down.")
            exit()
        else:
            print(f"Login failed. You have {self.try_limit - self.current_tries} tries left.")

    def show_account_menu(self, account):
        while True:
            print(f"\n--- Account Menu ({account.username}) ---")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Exit")
            choice = input("Choose an option: ")

            if choice == "1":
                try:
                    amount = float(input("Enter amount to deposit: "))
                    account.deposit(amount)
                except Exception as e:
                    print(e)
            elif choice == "2":
                try:
                    amount = float(input("Enter amount to withdraw: "))
                    account.withdraw(amount)
                except Exception as e:
                    print(e)
            elif choice == "3":
                print(f"Exiting account menu for {account.username}")
                break
            else:
                print("Invalid option. Try again.")


# ===========================
# Example Usage
# ===========================

# Create accounts
acc1 = BankAccount("alice", "1234", 100)
acc2 = MinimumBalanceAccount("bob", "abcd", 200, minimum_balance=50)

# Start ATM
atm_machine = ATM([acc1, acc2], try_limit=3)

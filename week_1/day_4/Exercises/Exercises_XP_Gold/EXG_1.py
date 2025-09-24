class BankAccount:
    def __init__(self, balance=0, username="", password=""):
        self.balance = balance
        self.username = username
        self.password = password
        self.authenticated = False

    def authenticate(self, username, password):
        if self.username == username and self.password == password:
            self.authenticated = True
            print("Authentication successful.")
        else:
            raise Exception("Authentication failed!")

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("You must be authenticated to deposit.")
        if amount <= 0:
            raise Exception("Deposit amount must be positive.")
        self.balance += amount
        print(f"Deposited {amount}. New balance: {self.balance}")

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("You must be authenticated to withdraw.")
        if amount <= 0:
            raise Exception("Withdraw amount must be positive.")
        if amount > self.balance:
            raise Exception("Insufficient funds.")
        self.balance -= amount
        print(f"Withdrawn {amount}. New balance: {self.balance}")

class MinimumBalanceAccount(BankAccount):
    def __init__(self, balance=0, username="", password="", minimum_balance=0):
        super().__init__(balance, username, password)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("You must be authenticated to withdraw.")
        if amount <= 0:
            raise Exception("Withdraw amount must be positive.")
        if self.balance - amount < self.minimum_balance:
            raise Exception("Withdrawal denied. Minimum balance requirement not met.")
        self.balance -= amount
        print(f"Withdrawn {amount}. New balance: {self.balance}")

class ATM:
    def __init__(self, account_list, try_limit=2):
        if not isinstance(account_list, list) or not all(isinstance(acc, BankAccount) for acc in account_list):
            raise Exception("account_list must contain only BankAccount or MinimumBalanceAccount instances.")
        if try_limit <= 0:
            print("Invalid try_limit. Defaulting to 2.")
            try_limit = 2

        self.account_list = account_list
        self.try_limit = try_limit
        self.current_tries = 0

        self.show_main_menu()

    def show_main_menu(self):
        while True:
            print("\n===== ATM Main Menu =====")
            print("1. Log In")
            print("2. Exit")

            choice = input("Choose an option: ")
            if choice == "1":
                username = input("Enter username: ")
                password = input("Enter password: ")
                self.log_in(username, password)
            elif choice == "2":
                print("Goodbye!")
                break
            else:
                print("Invalid choice, try again.")

    def log_in(self, username, password):
        for account in self.account_list:
            try:
                account.authenticate(username, password)
                self.show_account_menu(account)
                return
            except Exception:
                continue

        self.current_tries += 1
        print(f"Invalid login. Attempt {self.current_tries}/{self.try_limit}")
        if self.current_tries >= self.try_limit:
            print("Max tries reached. Shutting down.")
            exit()

    def show_account_menu(self, account):
        while True:
            print("\n===== Account Menu =====")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Exit")

            choice = input("Choose an option: ")
            if choice == "1":
                amount = int(input("Enter deposit amount: "))
                try:
                    account.deposit(amount)
                except Exception as e:
                    print(e)
            elif choice == "2":
                amount = int(input("Enter withdraw amount: "))
                try:
                    account.withdraw(amount)
                except Exception as e:
                    print(e)
            elif choice == "3":
                print("Logging out...")
                break
            else:
                print("Invalid choice, try again.")

# Create accounts
acc1 = BankAccount(1000, "user1", "pass1")
acc2 = MinimumBalanceAccount(500, "user2", "pass2", minimum_balance=200)

# Start ATM
atm = ATM([acc1, acc2], try_limit=3)


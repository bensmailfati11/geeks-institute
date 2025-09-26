# ========================================
# Exercise 1: Call History
# ========================================

class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []  # List to store calls
        self.messages = []      # List to store messages

    # Method to make a call to another Phone object
    def call(self, other_phone):
        record = f"{self.phone_number} called {other_phone.phone_number}"
        print(record)
        self.call_history.append(record)

    # Method to show call history
    def show_call_history(self):
        print(f"\nCall history for {self.phone_number}:")
        if not self.call_history:
            print("No calls yet.")
        for entry in self.call_history:
            print(entry)

    # Method to send a message to another Phone object
    def send_message(self, other_phone, content):
        message = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content
        }
        print(f"Message sent from {self.phone_number} to {other_phone.phone_number}: '{content}'")
        self.messages.append(message)
        other_phone.messages.append(message)  # Also store on receiver side

    # Show outgoing messages (messages sent by this phone)
    def show_outgoing_messages(self):
        print(f"\nOutgoing messages from {self.phone_number}:")
        outgoing = [m for m in self.messages if m["from"] == self.phone_number]
        if not outgoing:
            print("No outgoing messages.")
        for m in outgoing:
            print(f"To {m['to']}: {m['content']}")

    # Show incoming messages (messages received by this phone)
    def show_incoming_messages(self):
        print(f"\nIncoming messages for {self.phone_number}:")
        incoming = [m for m in self.messages if m["to"] == self.phone_number]
        if not incoming:
            print("No incoming messages.")
        for m in incoming:
            print(f"From {m['from']}: {m['content']}")

    # Show messages from a specific phone number
    def show_messages_from(self, other_phone_number):
        print(f"\nMessages from {other_phone_number} to {self.phone_number}:")
        messages_from = [m for m in self.messages if m["from"] == other_phone_number and m["to"] == self.phone_number]
        if not messages_from:
            print("No messages from this number.")
        for m in messages_from:
            print(f"{m['content']}")


# ========================================
# Example usage
# ========================================

phone1 = Phone("123-456-7890")
phone2 = Phone("987-654-3210")

# Make calls
phone1.call(phone2)
phone2.call(phone1)
phone1.call(phone2)

# Show call histories
phone1.show_call_history()
phone2.show_call_history()

# Send messages
phone1.send_message(phone2, "Hello! How are you?")
phone2.send_message(phone1, "I am good, thanks!")
phone1.send_message(phone2, "Want to meet later?")

# Show messages
phone1.show_outgoing_messages()
phone1.show_incoming_messages()
phone1.show_messages_from("987-654-3210")

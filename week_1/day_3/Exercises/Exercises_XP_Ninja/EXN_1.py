class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []  # list of call logs
        self.messages = []      # list of message dicts

    def call(self, other_phone):
        log = f"{self.phone_number} called {other_phone.phone_number}"
        print(log)
        self.call_history.append(log)

    def show_call_history(self):
        print("Call History:")
        for call in self.call_history:
            print("-", call)

    def send_message(self, other_phone, content):
        message = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content
        }
        self.messages.append(message)
        print(f"Message sent from {self.phone_number} to {other_phone.phone_number}: {content}")

    def show_outgoing_messages(self):
        print(f"Outgoing messages from {self.phone_number}:")
        for msg in self.messages:
            if msg["from"] == self.phone_number:
                print(msg)

    def show_incoming_messages(self):
        print(f"Incoming messages for {self.phone_number}:")
        for msg in self.messages:
            if msg["to"] == self.phone_number:
                print(msg)

    def show_messages_from(self, other_phone):
        print(f"Messages from {other_phone.phone_number} to {self.phone_number}:")
        for msg in self.messages:
            if msg["from"] == other_phone.phone_number and msg["to"] == self.phone_number:
                print(msg)

# Create two phones
phone1 = Phone("111-111-111")
phone2 = Phone("222-222-222")

# Calls
phone1.call(phone2)
phone2.call(phone1)
phone1.show_call_history()

# Messages
phone1.send_message(phone2, "Hello, how are you?")
phone2.send_message(phone1, "I’m good, thanks!")

# Display messages
phone1.show_outgoing_messages()
phone2.show_incoming_messages()
phone1.show_messages_from(phone2)

from flask import Flask, render_template, request, jsonify
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

class SimpleChatBot:
    def __init__(self):
        self.history = []
    
    def chat(self, message):
        try:
            # Add user message to history
            self.history.append({"role": "user", "content": message})
            
            # USING YOUR CODE with requests library
            response = requests.post(
                url="https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5000",
                    "X-Title": "My ChatBot",
                },
                data=json.dumps({
                    "model": "openrouter/auto",  # Auto-selects best available model
                    "messages": self.history,
                })
            )
            
            if response.status_code == 200:
                data = response.json()
                bot_reply = data['choices'][0]['message']['content']
                
                # Add bot response to history
                self.history.append({"role": "assistant", "content": bot_reply})
                
                return {"success": True, "reply": bot_reply}
            else:
                error_msg = f"API Error: {response.status_code} - {response.text}"
                return {"success": False, "reply": error_msg}
            
        except Exception as e:
            return {"success": False, "reply": f"Error: {str(e)}"}
    
    def clear(self):
        self.history = []
        return "Chat cleared"

# Create chatbot instance
bot = SimpleChatBot()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send', methods=['POST'])
def send_message():
    user_message = request.json.get('message', '')
    response = bot.chat(user_message)
    return jsonify(response)

@app.route('/clear', methods=['POST'])
def clear_chat():
    bot.clear()
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True)
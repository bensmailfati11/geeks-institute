from flask import Flask, render_template, request, redirect, url_for, flash 
from database.index import get_connection  # importe la fonction pour se connecter à la DB

app = Flask(__name__)
app.secret_key = "secretkey123"

@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == "__main__":
    app.run(debug=True)

import psycopg2
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Connexion à PostgreSQL
conn = psycopg2.connect(
    host="localhost",
    database="demodb",
    user="postgres",
    password="root",
    port=5433
)
cursor = conn.cursor()

#Routes CRUD
@app.route("/menu")
def menu():
    cursor.execute("SELECT * FROM Menu_Items")
    items = cursor.fetchall()
    return render_template("menu.html", items=items)

@app.route("/add", methods=["GET", "POST"])
def add_item():
    if request.method == "POST":
        name = request.form["name"]
        price = request.form["price"]
        cursor.execute("INSERT INTO Menu_Items (name, price) VALUES (%s, %s)", (name, price))
        conn.commit()
        return redirect("/menu")
    return render_template("add_item.html")

@app.route("/delete/<int:item_id>")
def delete_item(item_id):
    cursor.execute("DELETE FROM Menu_Items WHERE id = %s", (item_id,))
    conn.commit()
    return redirect("/menu")

@app.route("/update/<int:item_id>", methods=["GET", "POST"])
def update_item(item_id):
    if request.method == "POST":
        name = request.form["name"]
        price = request.form["price"]
        cursor.execute("UPDATE Menu_Items SET name=%s, price=%s WHERE id=%s", (name, price, item_id))
        conn.commit()
        return redirect("/menu")
    
    cursor.execute("SELECT * FROM Menu_Items WHERE id=%s", (item_id,))
    item = cursor.fetchone()
    return render_template("update_item.html", item=item)

# 👉 Route d'accueil
@app.route("/")
def index():
    return redirect("/menu")

#Lancer l'application
if __name__ == "__main__":
    app.run(debug=True)

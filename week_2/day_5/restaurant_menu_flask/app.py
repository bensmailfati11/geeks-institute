from flask import Flask, render_template, request, redirect, url_for, jsonify
import psycopg2
import os

app = Flask(__name__)

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'database': 'demodb',
    'user': 'postgres',
    'password': 'ben123',
    'port': 5433
}

def get_db_connection():
    """Establish database connection"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

def init_database():
    """Initialize database table"""
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS Menu_Items (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    price DECIMAL(10,2) NOT NULL
                )
            ''')
            conn.commit()
            cursor.close()
            conn.close()
            print("✅ Menu_Items table initialized successfully")
        except Exception as e:
            print(f"❌ Database initialization error: {e}")

# 📌 PART 2 - WEB ROUTES (User Interface)

@app.route('/')
def index():
    """Home route - redirect to menu"""
    return redirect('/menu')

@app.route('/menu')
def menu():
    """Show all menu items"""
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM Menu_Items ORDER BY id')
            items = cursor.fetchall()
            cursor.close()
            conn.close()
            return render_template('menu.html', items=items)
        except Exception as e:
            return f"Error retrieving data: {e}", 500
    return "Database connection error", 500

@app.route('/add', methods=['GET', 'POST'])
def add_item():
    """Add new menu item"""
    if request.method == 'POST':
        name = request.form['name']
        price = request.form['price']
        
        conn = get_db_connection()
        if conn:
            try:
                cursor = conn.cursor()
                cursor.execute(
                    'INSERT INTO Menu_Items (name, price) VALUES (%s, %s)',
                    (name, float(price))
                )
                conn.commit()
                cursor.close()
                conn.close()
                return redirect('/menu')
            except Exception as e:
                return f"Error adding item: {e}", 500
        return "Database connection error", 500
    
    return render_template('add_item.html')

@app.route('/delete/<int:item_id>')
def delete_item(item_id):
    """Delete menu item by ID"""
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM Menu_Items WHERE id = %s', (item_id,))
            conn.commit()
            cursor.close()
            conn.close()
            return redirect('/menu')
        except Exception as e:
            return f"Error deleting item: {e}", 500
    return "Database connection error", 500

@app.route('/update/<int:item_id>', methods=['GET', 'POST'])
def update_item(item_id):
    """Update menu item"""
    conn = get_db_connection()
    if not conn:
        return "Database connection error", 500
    
    if request.method == 'POST':
        name = request.form['name']
        price = request.form['price']
        
        try:
            cursor = conn.cursor()
            cursor.execute(
                'UPDATE Menu_Items SET name = %s, price = %s WHERE id = %s',
                (name, float(price), item_id)
            )
            conn.commit()
            cursor.close()
            conn.close()
            return redirect('/menu')
        except Exception as e:
            return f"Error updating item: {e}", 500
    
    # GET - Show form with current data
    try:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM Menu_Items WHERE id = %s', (item_id,))
        item = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if item:
            return render_template('update_item.html', item=item)
        else:
            return "Item not found", 404
    except Exception as e:
        return f"Error retrieving item: {e}", 500

# 📌 API ENDPOINTS (REST API with proper HTTP methods)

@app.route('/api/menu', methods=['GET'])
def api_get_menu():
    """API - Get all menu items"""
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM Menu_Items ORDER BY id')
            items = cursor.fetchall()
            cursor.close()
            conn.close()
            
            # Convert to JSON format
            menu_list = []
            for item in items:
                menu_list.append({
                    'id': item[0],
                    'name': item[1],
                    'price': float(item[2])
                })
            
            return jsonify(menu_list)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    return jsonify({'error': 'Database connection failed'}), 500

@app.route('/api/menu', methods=['POST'])
def api_add_item():
    """API - Add new menu item"""
    data = request.get_json()
    
    if not data or 'name' not in data or 'price' not in data:
        return jsonify({'error': 'Name and price are required'}), 400
    
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO Menu_Items (name, price) VALUES (%s, %s) RETURNING id',
                (data['name'], float(data['price']))
            )
            new_id = cursor.fetchone()[0]
            conn.commit()
            cursor.close()
            conn.close()
            
            return jsonify({
                'message': 'Item added successfully',
                'id': new_id,
                'name': data['name'],
                'price': float(data['price'])
            }), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    return jsonify({'error': 'Database connection failed'}), 500

@app.route('/api/menu/<int:item_id>', methods=['GET'])
def api_get_item(item_id):
    """API - Get specific menu item"""
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM Menu_Items WHERE id = %s', (item_id,))
            item = cursor.fetchone()
            cursor.close()
            conn.close()
            
            if item:
                return jsonify({
                    'id': item[0],
                    'name': item[1],
                    'price': float(item[2])
                })
            else:
                return jsonify({'error': 'Item not found'}), 404
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    return jsonify({'error': 'Database connection failed'}), 500

@app.route('/api/menu/<int:item_id>', methods=['PUT'])
def api_update_item(item_id):
    """API - Update menu item"""
    data = request.get_json()
    
    if not data or 'name' not in data or 'price' not in data:
        return jsonify({'error': 'Name and price are required'}), 400
    
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute(
                'UPDATE Menu_Items SET name = %s, price = %s WHERE id = %s',
                (data['name'], float(data['price']), item_id)
            )
            
            if cursor.rowcount == 0:
                return jsonify({'error': 'Item not found'}), 404
            
            conn.commit()
            cursor.close()
            conn.close()
            
            return jsonify({
                'message': 'Item updated successfully',
                'id': item_id,
                'name': data['name'],
                'price': float(data['price'])
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    return jsonify({'error': 'Database connection failed'}), 500

@app.route('/api/menu/<int:item_id>', methods=['DELETE'])
def api_delete_item(item_id):
    """API - Delete menu item"""
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM Menu_Items WHERE id = %s', (item_id,))
            
            if cursor.rowcount == 0:
                return jsonify({'error': 'Item not found'}), 404
            
            conn.commit()
            cursor.close()
            conn.close()
            
            return jsonify({'message': 'Item deleted successfully'})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    return jsonify({'error': 'Database connection failed'}), 500

if __name__ == '__main__':
    # Initialize database on startup
    init_database()
    print("🚀 Restaurant Menu Manager started!")
    print("🌐 Web Interface: http://localhost:5000/menu")
    print("🔗 API Base URL: http://localhost:5000/api/menu")
    app.run(debug=True)
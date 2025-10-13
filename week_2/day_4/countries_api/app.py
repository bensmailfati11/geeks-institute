from flask import Flask, render_template, jsonify, redirect, url_for, flash
import requests
import psycopg2
import random
import os
from config import DB_CONFIG

# Set encoding for Windows compatibility
os.environ['PYTHONIOENCODING'] = 'utf-8'

app = Flask(__name__)
app.secret_key = 'countries-api-2024-secure-key-f4t1m4-z4hr4-proj3ct'

# Add custom filter for number formatting
@app.template_filter('format_number')
def format_number(value):
    """Format numbers with commas"""
    try:
        return "{:,}".format(int(value))
    except (ValueError, TypeError):
        return str(value)

def get_db_connection():
    """Get database connection"""
    try:
        conn = psycopg2.connect(
            dbname=DB_CONFIG['database'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password'],
            host=DB_CONFIG['host'],
            port=DB_CONFIG['port'],
            client_encoding='utf8'
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

def create_database_and_table():

    try:
        # Connect to default postgres database first
        conn = psycopg2.connect(
            dbname="postgres",
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password'],
            host=DB_CONFIG['host'],
            port=DB_CONFIG['port'],
            client_encoding='utf8'
        )
        conn.autocommit = True
        cursor = conn.cursor()
        
        # Create database if it doesn't exist
        cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'countries_db'")
        exists = cursor.fetchone()
        if not exists:
            cursor.execute("CREATE DATABASE countries_db")
        
        cursor.close()
        conn.close()
        
        # Now connect to our database to create the table
        conn = get_db_connection()
        if conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS countries (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255),
                    capital VARCHAR(255),
                    flag VARCHAR(255),
                    subregion VARCHAR(255),
                    population BIGINT
                )
            """)
            conn.commit()
            cursor.close()
            conn.close()
        return True
    except Exception as e:
        print(f"Error creating database/table: {e}")
        return False

@app.route('/')
def index():
    """Home page"""
    return render_template('index.html')

@app.route('/test-connection')
def test_connection():
    """Test database connection"""
    try:
        conn = psycopg2.connect(
            dbname="postgres",
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password'],
            host=DB_CONFIG['host'],
            port=DB_CONFIG['port'],
            client_encoding='utf8'
        )
        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()[0]
        cursor.close()
        conn.close()
        
        return jsonify({
            'status': 'success',
            'message': 'Connection successful!',
            'version': version
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

@app.route('/fetch-countries')
def fetch_countries():

    try:
        # Ensure database and table exist
        if not create_database_and_table():
            return jsonify({
                'status': 'error',
                'message': 'Could not create database/table'
            })
        
        # Fetch countries from API
        response = requests.get("https://restcountries.com/v3.1/all?fields=name,capital,flags,subregion,population")
        
        if response.status_code != 200:
            return jsonify({
                'status': 'error',
                'message': f'API request failed with status {response.status_code}'
            })
        
        countries = response.json()
        
        # Select 10 random countries
        random_countries = random.sample(countries, min(10, len(countries)))
        
        # Save to database
        conn = get_db_connection()
        if not conn:
            return jsonify({
                'status': 'error',
                'message': 'Database connection failed'
            })
        
        cursor = conn.cursor()
        
        # Clear existing data
        cursor.execute("DELETE FROM countries")
        
        # Insert new countries
        saved_countries = []
        for country in random_countries:
            name = country.get('name', {}).get('common', 'N/A')
            capital = country.get('capital', ['N/A'])
            capital = capital[0] if capital and len(capital) > 0 else 'N/A'
            flag = country.get('flags', {}).get('png', '')
            subregion = country.get('subregion', 'N/A')
            population = country.get('population', 0)

            cursor.execute("""
                INSERT INTO countries (name, capital, flag, subregion, population)
                VALUES (%s, %s, %s, %s, %s)
            """, (name, capital, flag, subregion, population))
            
            saved_countries.append({
                'name': name,
                'capital': capital,
                'flag': flag,
                'subregion': subregion,
                'population': population
            })
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({
            'status': 'success',
            'message': f'Successfully saved {len(saved_countries)} countries!',
            'countries': saved_countries
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

@app.route('/view-countries')
def view_countries():
    """View all countries in database"""
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({
                'status': 'error',
                'message': 'Database connection failed'
            })
        
        cursor = conn.cursor()
        cursor.execute("SELECT name, capital, flag, subregion, population FROM countries ORDER BY population DESC")
        results = cursor.fetchall()
        
        countries = []
        for row in results:
            countries.append({
                'name': row[0],
                'capital': row[1] or 'N/A',
                'flag': row[2] or '',
                'subregion': row[3] or 'N/A',
                'population': row[4] or 0
            })
        
        cursor.close()
        conn.close()
        
        return render_template('countries.html', countries=countries)
        
    except Exception as e:
        return render_template('countries.html', countries=[], error=str(e))

@app.route('/api/countries')
def api_countries():
    """API endpoint to get countries as JSON"""
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({'status': 'error', 'message': 'Database connection failed'})
        
        cursor = conn.cursor()
        cursor.execute("SELECT name, capital, flag, subregion, population FROM countries ORDER BY population DESC")
        results = cursor.fetchall()
        
        countries = []
        for row in results:
            countries.append({
                'name': row[0],
                'capital': row[1] or 'N/A',
                'flag': row[2] or '',
                'subregion': row[3] or 'N/A',
                'population': row[4] or 0
            })
        
        cursor.close()
        conn.close()
        
        return jsonify({
            'status': 'success',
            'count': len(countries),
            'countries': countries
        })
        
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    # Create database and table on startup
    create_database_and_table()
    
    print("🚀 Starting Countries API Web Application...")
    print("🌐 Open your browser and go to: http://localhost:5000")
    print("📊 Available endpoints:")
    print("   • http://localhost:5000/ - Home page")
    print("   • http://localhost:5000/view-countries - View countries")
    print("   • http://localhost:5000/api/countries - JSON API")
    
    app.run(debug=True, host='localhost', port=5000)
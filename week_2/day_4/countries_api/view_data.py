import psycopg2
import sys
import os
from config import DB_CONFIG

# Set encoding for Windows compatibility
os.environ['PYTHONIOENCODING'] = 'utf-8'

def view_countries_data():
    """Query and display all countries data from the database"""
    try:
        # Connect to PostgreSQL
        conn = psycopg2.connect(
            dbname=DB_CONFIG['database'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password'],
            host=DB_CONFIG['host'],
            port=DB_CONFIG['port'],
            client_encoding='utf8'
        )
        cursor = conn.cursor()
        
        # Execute the query
        query = "SELECT name, capital, subregion, population FROM countries ORDER BY population DESC;"
        cursor.execute(query)
        
        # Fetch all results
        results = cursor.fetchall()
        
        if not results:
            print("📭 No countries found in the database.")
            print("💡 Run 'python main.py' first to populate the database.")
            return
        
        # Display results in a nice format
        print("🌍 Countries Data from Database:")
        print("=" * 80)
        print(f"{'Country':<30} {'Capital':<20} {'Subregion':<20} {'Population':>10}")
        print("-" * 80)
        
        for row in results:
            name, capital, subregion, population = row
            # Handle None values
            capital = capital or "N/A"
            subregion = subregion or "N/A"
            population = population or 0
            
            print(f"{name:<30} {capital:<20} {subregion:<20} {population:>10,}")
        
        print("-" * 80)
        print(f"📊 Total countries: {len(results)}")
        
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"❌ Error querying database: {e}")
        print("💡 Make sure:")
        print("  - PostgreSQL is running")
        print("  - The database exists (run 'python main.py' first)")
        print("  - Your credentials in config.py are correct")

if __name__ == "__main__":
    view_countries_data()
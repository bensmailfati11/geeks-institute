import requests
import psycopg2
import random
import sys
import os
from config import DB_CONFIG

# Set encoding for Windows compatibility
os.environ['PYTHONIOENCODING'] = 'utf-8'
sys.stdout.reconfigure(encoding='utf-8', errors='ignore')
sys.stderr.reconfigure(encoding='utf-8', errors='ignore')

def create_database_and_table():
    """Create the database and table if they don't exist"""
    try:
        # Connect to default postgres database first to create our database
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
            print("✅ Database 'countries_db' created successfully!")
        else:
            print("ℹ️ Database 'countries_db' already exists")
        
        cursor.close()
        conn.close()
        
        # Now connect to our countries_db database to create the table
        conn = psycopg2.connect(
            dbname=DB_CONFIG['database'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password'],
            host=DB_CONFIG['host'],
            port=DB_CONFIG['port'],
            client_encoding='utf8'
        )
        cursor = conn.cursor()
        
        # Create table if it doesn't exist
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
        print("✅ Table 'countries' created successfully!")
        
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"❌ Error creating database/table: {e}")
        print("Please make sure PostgreSQL is running and update the password in config.py")
        sys.exit(1)

def fetch_and_save_countries():
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

        print("🌍 Fetching countries from REST Countries API...")
        
        # 1. Get all countries from REST Countries API
        # Updated API call with required fields parameter
        response = requests.get("https://restcountries.com/v3.1/all?fields=name,capital,flags,subregion,population")
        
        if response.status_code != 200:
            print(f"❌ Failed to fetch countries. Status code: {response.status_code}")
            return
            
        countries = response.json()
        print(f"✅ Fetched {len(countries)} countries from API")

        # 2. Pick 10 random countries
        if len(countries) < 10:
            print(f"⚠️ Only {len(countries)} countries available, using all of them")
            random_countries = countries
        else:
            random_countries = random.sample(countries, 10)
            print(f"🎲 Selected 10 random countries")

        # 3. Clear existing data (optional - remove if you want to keep accumulating data)
        cursor.execute("DELETE FROM countries")
        print("🧹 Cleared existing data from countries table")

        # 4. Insert them into the database
        inserted_count = 0
        for country in random_countries:
            try:
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
                
                inserted_count += 1
                print(f"  📝 Added: {name} (Capital: {capital}, Population: {population:,})")
                
            except Exception as e:
                print(f"  ❌ Error inserting {country.get('name', {}).get('common', 'Unknown')}: {e}")

        conn.commit()
        cursor.close()
        conn.close()

        print(f"\n✅ {inserted_count} countries saved to the database successfully!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("Please make sure:")
        print("  - PostgreSQL is running")
        print("  - Update the password in config.py")
        print("  - The database user has proper permissions")

def main():
    print("🚀 Starting Countries API to PostgreSQL script...")
    print("=" * 50)
    
    # Step 1: Create database and table
    create_database_and_table()
    
    # Step 2: Fetch and save countries
    fetch_and_save_countries()
    
    print("=" * 50)
    print("🎉 Script completed!")
    print("\n💡 To view the saved countries, run this SQL query:")
    print("   SELECT name, capital, subregion, population FROM countries ORDER BY population DESC;")

if __name__ == "__main__":
    main()
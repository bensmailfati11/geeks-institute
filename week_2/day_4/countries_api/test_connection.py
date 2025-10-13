import psycopg2
import sys
import os
from config import DB_CONFIG

# Set encoding for Windows compatibility
os.environ['PYTHONIOENCODING'] = 'utf-8'

def test_connection():
    """Simple test to verify PostgreSQL connection works"""
    try:
        print("🔍 Testing PostgreSQL connection...")
        print(f"Host: {DB_CONFIG['host']}")
        print(f"Port: {DB_CONFIG['port']}")
        print(f"User: {DB_CONFIG['user']}")
        print(f"Database: postgres (for initial test)")
        
        # Test connection to default postgres database
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
        version = cursor.fetchone()
        
        print(f"✅ Connection successful!")
        print(f"PostgreSQL version: {version[0]}")
        
        cursor.close()
        conn.close()
        
        return True
        
    except psycopg2.OperationalError as e:
        print(f"❌ Connection failed: {e}")
        print("\n💡 Common solutions:")
        print("1. Make sure PostgreSQL service is running")
        print("2. Check if the password in config.py is correct")
        print("3. Verify the port number (currently set to 5433)")
        print("4. Ensure the 'postgres' user exists and has login permissions")
        return False
        
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

if __name__ == "__main__":
    if test_connection():
        print("\n🚀 Connection test passed! You can now run main.py")
    else:
        print("\n⚠️ Please fix the connection issue before running main.py")
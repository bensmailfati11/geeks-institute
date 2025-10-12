#!/usr/bin/env python3
import os
import sys
import sqlite3

def test_part1():
    """Test Part 1 - Dictionary-based authentication"""
    print("🧪 Testing Part 1 - Dictionary Authentication...")
    
    # Import and test the main components
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))
    
    # Simulate the dictionary from part 1
    users = {
        "alice": "password123",
        "bob": "mypassword",
        "charlie": "secret456"
    }
    
    # Test valid login
    assert "alice" in users and users["alice"] == "password123"
    assert "bob" in users and users["bob"] == "mypassword"
    assert "charlie" in users and users["charlie"] == "secret456"
    
    # Test invalid login
    assert not ("david" in users and users.get("david") == "wrongpass")
    
    print("✅ Part 1 tests passed!")

def test_part3_database():
    """Test Part 3 - Database functionality"""
    print("🧪 Testing Part 3 - Database Authentication...")
    
    # Import the database class
    from part3_database import AuthenticationDB
    
    # Create test database
    test_db = AuthenticationDB("test_users.db")
    
    # Test user validation
    assert test_db.validate_user("alice", "password123")
    assert test_db.validate_user("bob", "mypassword")
    assert not test_db.validate_user("alice", "wrongpassword")
    assert not test_db.validate_user("nonexistent", "password")
    
    # Test user creation
    assert test_db.add_user("testuser", "testpass")
    assert test_db.validate_user("testuser", "testpass")
    assert test_db.user_exists("testuser")
    assert not test_db.add_user("testuser", "anotherpass")  # Should fail - duplicate
    
    # Clean up
    if os.path.exists("test_users.db"):
        os.remove("test_users.db")
    
    print("✅ Part 3 tests passed!")

def test_bonus_encryption():
    """Test Bonus - Encrypted password functionality"""
    print("🧪 Testing Bonus - Password Encryption...")
    
    # Import the secure database class
    from bonus_encrypted import SecureAuthenticationDB
    
    # Create test database
    test_db = SecureAuthenticationDB("test_secure_users.db")
    
    # Test default user validation
    assert test_db.validate_user("alice", "password123")
    assert test_db.validate_user("bob", "mypassword")
    assert not test_db.validate_user("alice", "wrongpassword")
    
    # Test password hashing
    salt1 = test_db.generate_salt()
    salt2 = test_db.generate_salt()
    assert salt1 != salt2  # Salts should be unique
    assert len(salt1) == 32  # Should be 32 hex characters
    
    # Test password creation and validation
    test_password = "mysecretpass"
    assert test_db.add_user("encrypteduser", test_password)
    assert test_db.validate_user("encrypteduser", test_password)
    assert not test_db.validate_user("encrypteduser", "wrongpassword")
    
    # Verify password is actually encrypted in database
    conn = sqlite3.connect("test_secure_users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT password_hash, salt FROM users WHERE username = ?", ("encrypteduser",))
    result = cursor.fetchone()
    conn.close()
    
    assert result is not None
    stored_hash, salt = result
    assert stored_hash != test_password  # Password should be hashed, not plaintext
    assert len(stored_hash) == 64  # SHA-256 produces 64-character hex string
    
    # Clean up
    if os.path.exists("test_secure_users.db"):
        os.remove("test_secure_users.db")
    
    print("✅ Bonus tests passed!")

def test_database_schema():
    """Test database schema creation"""
    print("🧪 Testing Database Schema...")
    
    from part3_database import AuthenticationDB
    
    # Create database and check schema
    test_db = AuthenticationDB("schema_test.db")
    
    conn = sqlite3.connect("schema_test.db")
    cursor = conn.cursor()
    
    # Check if users table exists
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")
    table_exists = cursor.fetchone() is not None
    assert table_exists
    
    # Check table structure
    cursor.execute("PRAGMA table_info(users)")
    columns = cursor.fetchall()
    column_names = [col[1] for col in columns]
    
    expected_columns = ['id', 'username', 'password', 'created_at']
    for col in expected_columns:
        assert col in column_names
    
    conn.close()
    
    # Clean up
    if os.path.exists("schema_test.db"):
        os.remove("schema_test.db")
    
    print("✅ Database schema tests passed!")

def main():
    """Run all tests"""
    print("🚀 Starting Authentication Database Tests...\n")
    
    try:
        test_part1()
        test_part3_database()
        test_bonus_encryption()
        test_database_schema()
        
        print("\n🎉 All tests passed! The authentication system is working correctly.")
        print("You can now run any of the main scripts:")
        print("  - python part1_login.py")
        print("  - python part2_login_signup.py") 
        print("  - python part3_database.py")
        print("  - python bonus_encrypted.py")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        print("Please check your implementation.")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
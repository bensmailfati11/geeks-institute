import psycopg2
from psycopg2 import sql, Error

class DatabaseConnection:

    
    @staticmethod
    def get_connection():

        try:
            connection = psycopg2.connect(
                host="localhost",
                database="restaurant_menu",  # Change this to your database name
                user="postgres",  # Change this to your username
                password="your_password",  # Change this to your password
                port="5432"  # Default PostgreSQL port
            )
            return connection
        except Error as e:
            print(f"Error connecting to PostgreSQL database: {e}")
            return None
    
    @staticmethod
    def execute_query(query, params=None, fetch=False, fetch_one=False):

        connection = DatabaseConnection.get_connection()
        if not connection:
            return None
            
        try:
            cursor = connection.cursor()
            cursor.execute(query, params)
            
            if fetch_one:
                result = cursor.fetchone()
            elif fetch:
                result = cursor.fetchall()
            else:
                result = None
                
            connection.commit()
            cursor.close()
            connection.close()
            
            return result
            
        except Error as e:
            print(f"Database error: {e}")
            if connection:
                connection.rollback()
                connection.close()
            return None
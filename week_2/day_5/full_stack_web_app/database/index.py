import psycopg2

def get_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="----------",
        user="-------",
        password="--------",
        port=5433
    )
    return conn

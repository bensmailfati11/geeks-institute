from database_connection import DatabaseConnection

class MenuItem:
    """Represents a menu item with name and price"""
    
    def __init__(self, name, price=0):

        self.name = name
        self.price = price
        self.item_id = None
    
    def save(self):

        if self.item_id:
            # Update existing item
            return self.update(self.name, self.price)
        else:
            # Insert new item
            query = "INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s) RETURNING item_id"
            result = DatabaseConnection.execute_query(query, (self.name, self.price), fetch_one=True)
            
            if result:
                self.item_id = result[0]
                return True
            return False
    
    def delete(self):

        if not self.item_id:
            # Try to find the item by name if no ID is set
            query = "SELECT item_id FROM Menu_Items WHERE item_name = %s"
            result = DatabaseConnection.execute_query(query, (self.name,), fetch_one=True)
            if result:
                self.item_id = result[0]
            else:
                return False
        
        query = "DELETE FROM Menu_Items WHERE item_id = %s"
        result = DatabaseConnection.execute_query(query, (self.item_id,))
        
        # If the query executed without error, it was successful
        return result is not None
    
    def update(self, new_name, new_price):

        if not self.item_id:
            # Try to find the item by name if no ID is set
            query = "SELECT item_id FROM Menu_Items WHERE item_name = %s"
            result = DatabaseConnection.execute_query(query, (self.name,), fetch_one=True)
            if result:
                self.item_id = result[0]
            else:
                return False
        
        query = "UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_id = %s"
        result = DatabaseConnection.execute_query(query, (new_name, new_price, self.item_id))
        
        if result is not None:
            # Update the instance attributes
            self.name = new_name
            self.price = new_price
            return True
        return False
    
    def __str__(self):

        return f"{self.name}: ${self.price}"
    
    def __repr__(self):

        return f"MenuItem(name='{self.name}', price={self.price}, id={self.item_id})"
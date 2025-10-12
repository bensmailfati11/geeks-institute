from database_connection import DatabaseConnection
from menu_item import MenuItem

class MenuManager:
    """Manager class for menu operations"""
    
    @classmethod
    def get_by_name(cls, item_name):

        query = "SELECT item_id, item_name, item_price FROM Menu_Items WHERE item_name = %s"
        result = DatabaseConnection.execute_query(query, (item_name,), fetch_one=True)
        
        if result:
            item_id, name, price = result
            menu_item = MenuItem(name, price)
            menu_item.item_id = item_id
            return menu_item
        
        return None
    
    @classmethod
    def all_items(cls):

        query = "SELECT item_id, item_name, item_price FROM Menu_Items ORDER BY item_name"
        results = DatabaseConnection.execute_query(query, fetch=True)
        
        items = []
        if results:
            for item_id, name, price in results:
                menu_item = MenuItem(name, price)
                menu_item.item_id = item_id
                items.append(menu_item)
        
        return items
    
    @classmethod
    def all(cls):

        return cls.all_items()
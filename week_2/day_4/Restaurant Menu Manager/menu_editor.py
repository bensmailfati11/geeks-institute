from menu_item import MenuItem
from menu_manager import MenuManager

def show_user_menu():
    """Display the program menu and handle user input"""
    while True:
        print("\n" + "="*50)
        print("           RESTAURANT MENU MANAGER")
        print("="*50)
        print("Please choose an option:")
        print("(V) View an Item")
        print("(A) Add an Item")
        print("(D) Delete an Item")
        print("(U) Update an Item")
        print("(S) Show the Menu")
        print("(E) Exit")
        print("="*50)
        
        choice = input("Enter your choice: ").upper().strip()
        
        if choice == 'V':
            view_item()
        elif choice == 'A':
            add_item_to_menu()
        elif choice == 'D':
            remove_item_from_menu()
        elif choice == 'U':
            update_item_from_menu()
        elif choice == 'S':
            show_restaurant_menu()
        elif choice == 'E':
            print("\nThank you for using the Restaurant Menu Manager!")
            show_restaurant_menu()
            break
        else:
            print("Invalid choice. Please try again.")

def view_item():
    """View a specific item by name"""
    item_name = input("Enter the name of the item to view: ").strip()
    
    if not item_name:
        print("Item name cannot be empty.")
        return
    
    item = MenuManager.get_by_name(item_name)
    
    if item:
        print(f"\nItem found: {item}")
    else:
        print(f"Item '{item_name}' not found in the menu.")

def add_item_to_menu():
    """Add a new item to the menu"""
    item_name = input("Enter the item name: ").strip()
    
    if not item_name:
        print("Item name cannot be empty.")
        return
    
    # Check if item already exists
    existing_item = MenuManager.get_by_name(item_name)
    if existing_item:
        print(f"Item '{item_name}' already exists in the menu.")
        return
    
    try:
        item_price = int(input("Enter the item price: ").strip())
        if item_price < 0:
            print("Price cannot be negative.")
            return
    except ValueError:
        print("Please enter a valid number for the price.")
        return
    
    # Create new menu item and save it
    new_item = MenuItem(item_name, item_price)
    
    if new_item.save():
        print("Item was added successfully.")
    else:
        print("There was an error adding the item.")

def remove_item_from_menu():
    """Remove an item from the menu"""
    item_name = input("Enter the name of the item to remove: ").strip()
    
    if not item_name:
        print("Item name cannot be empty.")
        return
    
    # Create a MenuItem object with the name to delete
    item_to_delete = MenuItem(item_name)
    
    if item_to_delete.delete():
        print("Item was deleted successfully.")
    else:
        print("There was an error - item not found or could not be deleted.")

def update_item_from_menu():
    """Update an existing item in the menu"""
    old_name = input("Enter the name of the item to update: ").strip()
    
    if not old_name:
        print("Item name cannot be empty.")
        return
    
    # Check if the item exists
    existing_item = MenuManager.get_by_name(old_name)
    if not existing_item:
        print(f"Item '{old_name}' not found in the menu.")
        return
    
    print(f"Current item: {existing_item}")
    
    new_name = input("Enter the new item name: ").strip()
    if not new_name:
        print("New item name cannot be empty.")
        return
    
    try:
        new_price = int(input("Enter the new item price: ").strip())
        if new_price < 0:
            print("Price cannot be negative.")
            return
    except ValueError:
        print("Please enter a valid number for the price.")
        return
    
    # Update the existing item
    if existing_item.update(new_name, new_price):
        print("Item was updated successfully.")
    else:
        print("There was an error updating the item.")

def show_restaurant_menu():
    """Display the complete restaurant menu"""
    items = MenuManager.all_items()
    
    print("\n" + "="*50)
    print("           RESTAURANT MENU")
    print("="*50)
    
    if not items:
        print("The menu is currently empty.")
    else:
        for item in items:
            print(f"{item.name:.<30} ${item.price}")
    
    print("="*50)

if __name__ == "__main__":
    # Start the menu editor program
    show_user_menu()
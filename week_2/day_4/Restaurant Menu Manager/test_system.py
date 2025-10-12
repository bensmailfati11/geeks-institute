from menu_item import MenuItem
from menu_manager import MenuManager

def test_menu_system():
    """Test the menu system functionality"""
    
    print("Testing Restaurant Menu Management System")
    print("="*50)
    
    # Test 1: Create and save a new item (as shown in the exercise)
    print("\n1. Testing MenuItem creation and save:")
    item = MenuItem('Burger', 35)
    if item.save():
        print(f"✓ Created and saved: {item}")
    else:
        print("✗ Failed to save item")
    
    # Test 2: Get item by name (as shown in the exercise)
    print("\n2. Testing MenuManager.get_by_name:")
    item2 = MenuManager.get_by_name('Beef Stew')
    if item2:
        print(f"✓ Found item: {item2}")
    else:
        print("✗ Item 'Beef Stew' not found (this is expected if you haven't run the setup SQL)")
    
    # Test 3: Get all items (as shown in the exercise)
    print("\n3. Testing MenuManager.all():")
    items = MenuManager.all()
    print(f"✓ Found {len(items)} items in menu:")
    for item in items:
        print(f"   - {item}")
    
    # Test 4: Update item (as shown in the exercise)
    print("\n4. Testing MenuItem.update:")
    burger_item = MenuManager.get_by_name('Burger')
    if burger_item:
        if burger_item.update('Veggie Burger', 37):
            print(f"✓ Updated item: {burger_item}")
        else:
            print("✗ Failed to update item")
    
    # Test 5: Delete item (as shown in the exercise)
    print("\n5. Testing MenuItem.delete:")
    veggie_burger = MenuManager.get_by_name('Veggie Burger')
    if veggie_burger:
        if veggie_burger.delete():
            print("✓ Item deleted successfully")
        else:
            print("✗ Failed to delete item")
    
    print("\n" + "="*50)
    print("Test completed!")

if __name__ == "__main__":
    test_menu_system()
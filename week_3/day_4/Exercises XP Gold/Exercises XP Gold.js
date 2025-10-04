
// EXERCISES XP GOLD


console.log("🌟 Exercises XP Gold - JavaScript Loaded!");

// =============================================
// EXERCISE 1: SELECT MUSIC GENRE
// =============================================

const musicExercise = {
    // Display the value of the selected option
    displaySelectedValue: function() {
        const genresSelect = document.getElementById('genres');
        const selectedValue = genresSelect.value;
        const selectedText = genresSelect.options[genresSelect.selectedIndex].text;
        
        const resultDiv = document.getElementById('selectedGenre');
        resultDiv.innerHTML = `
            <strong>Selected Genre:</strong><br>
            Value: "${selectedValue}"<br>
            Text: "${selectedText}"
        `;
        
        console.log(`🎵 Selected genre: ${selectedText} (${selectedValue})`);
    },

    // Add an additional option to the select tag
    addClassicOption: function() {
        const genresSelect = document.getElementById('genres');
        
        // Check if Classic option already exists
        const classicExists = Array.from(genresSelect.options).some(option => 
            option.value === 'classic'
        );
        
        if (!classicExists) {
            const classicOption = document.createElement('option');
            classicOption.value = 'classic';
            classicOption.textContent = 'Classic';
            genresSelect.appendChild(classicOption);
            
            console.log("✅ Classic option added to select");
            
            const resultDiv = document.getElementById('selectedGenre');
            resultDiv.innerHTML = '<strong>✅ Classic option added successfully!</strong>';
        } else {
            console.log("ℹ️ Classic option already exists");
            const resultDiv = document.getElementById('selectedGenre');
            resultDiv.innerHTML = '<strong>ℹ️ Classic option already exists</strong>';
        }
    },

    // Set the newly added option as selected by default
    setClassicDefault: function() {
        const genresSelect = document.getElementById('genres');
        const classicOption = genresSelect.querySelector('option[value="classic"]');
        
        if (classicOption) {
            classicOption.selected = true;
            console.log("✅ Classic set as default selection");
            
            const resultDiv = document.getElementById('selectedGenre');
            resultDiv.innerHTML = '<strong>✅ Classic set as default selection!</strong>';
            
            // Display the new selected value
            this.displaySelectedValue();
        } else {
            console.log("❌ Classic option not found. Please add it first.");
            const resultDiv = document.getElementById('selectedGenre');
            resultDiv.innerHTML = '<strong>❌ Please add Classic option first!</strong>';
        }
    }
};

// =============================================
// EXERCISE 2: DELETE COLORS
// =============================================

const colorExercise = {
    // Initialize color deletion functionality
    init: function() {
        const removeButton = document.getElementById('removeColorBtn');
        removeButton.addEventListener('click', this.removeColor);
        console.log("🎨 Color deletion initialized");
    },

    // Remove the selected color from dropdown list
    removeColor: function() {
        const colorSelect = document.getElementById('colorSelect');
        const selectedIndex = colorSelect.selectedIndex;
        const resultDiv = document.getElementById('colorResult');
        
        if (selectedIndex === -1) {
            resultDiv.innerHTML = '<strong>❌ Please select a color first!</strong>';
            console.log("❌ No color selected");
            return;
        }
        
        const removedColor = colorSelect.options[selectedIndex].text;
        colorSelect.remove(selectedIndex);
        
        resultDiv.innerHTML = `<strong>✅ Removed color: "${removedColor}"</strong>`;
        console.log(`✅ Removed color: ${removedColor}`);
        
        // If no colors left, show message
        if (colorSelect.options.length === 0) {
            resultDiv.innerHTML += '<br><strong>🎉 All colors have been removed!</strong>';
            console.log("🎉 All colors removed");
        }
    }
};

// =============================================
// EXERCISE 3: SHOPPING LIST
// =============================================

const shoppingListExercise = {
    // Empty shopping list array
    shoppingList: [],

    // Initialize shopping list functionality
    init: function() {
        this.createShoppingForm();
        this.renderShoppingList();
        console.log("🛒 Shopping list initialized");
    },

    // Create form and add to DOM
    createShoppingForm: function() {
        const root = document.getElementById('root');
        
        // Create form container
        const formContainer = document.createElement('div');
        formContainer.className = 'shopping-form';
        
        // Create form HTML
        formContainer.innerHTML = `
            <h3>🛍️ My Shopping List</h3>
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                <input type="text" id="itemInput" placeholder="Enter item to buy..." style="flex: 1; min-width: 200px;">
                <button onclick="shoppingListExercise.addItem()">Add Item</button>
                <button class="clear-btn" onclick="shoppingListExercise.clearAll()">Clear All</button>
            </div>
            <div style="margin-top: 10px; font-size: 0.9em; color: #666;">
                Items in list: <span class="item-counter" id="itemCount">0</span>
            </div>
        `;
        
        root.appendChild(formContainer);
        
        // Add Enter key support
        document.getElementById('itemInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                shoppingListExercise.addItem();
            }
        });
    },

    // Add new item to shopping list
    addItem: function() {
        const itemInput = document.getElementById('itemInput');
        const itemText = itemInput.value.trim();
        
        if (itemText === '') {
            alert('Please enter an item!');
            return;
        }
        
        // Add item to array
        this.shoppingList.push(itemText);
        console.log(`✅ Added item: "${itemText}"`);
        
        // Clear input
        itemInput.value = '';
        itemInput.focus();
        
        // Update display
        this.renderShoppingList();
    },

    // Clear all items from shopping list
    clearAll: function() {
        if (this.shoppingList.length === 0) {
            alert('Shopping list is already empty!');
            return;
        }
        
        this.shoppingList = [];
        console.log("🗑️ Shopping list cleared");
        this.renderShoppingList();
    },

    // Render shopping list to DOM
    renderShoppingList: function() {
        const root = document.getElementById('root');
        
        // Remove existing list if present
        const existingList = document.getElementById('shoppingListContainer');
        if (existingList) {
            existingList.remove();
        }
        
        // Create list container
        const listContainer = document.createElement('div');
        listContainer.id = 'shoppingListContainer';
        
        if (this.shoppingList.length === 0) {
            listContainer.innerHTML = `
                <div class="empty-message">
                    🛒 Your shopping list is empty<br>
                    <small>Add items using the form above</small>
                </div>
            `;
        } else {
            const listElement = document.createElement('ul');
            listElement.className = 'shopping-list';
            
            this.shoppingList.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${index + 1}. ${item}</span>
                    <button onclick="shoppingListExercise.removeSingleItem(${index})" 
                            style="background: #ea4335; padding: 5px 10px; font-size: 0.8em;">
                        Remove
                    </button>
                `;
                listElement.appendChild(listItem);
            });
            
            listContainer.appendChild(listElement);
        }
        
        root.appendChild(listContainer);
        
        // Update item count
        document.getElementById('itemCount').textContent = this.shoppingList.length;
        
        console.log(`📊 Shopping list updated: ${this.shoppingList.length} items`);
    },

    // Bonus: Remove single item
    removeSingleItem: function(index) {
        const removedItem = this.shoppingList.splice(index, 1)[0];
        console.log(`✅ Removed item: "${removedItem}"`);
        this.renderShoppingList();
    }
};

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Initializing Exercises XP Gold...");
    
    // Initialize Exercise 2
    colorExercise.init();
    
    // Initialize Exercise 3
    shoppingListExercise.init();
    
    console.log("✅ All exercises initialized successfully!");
    console.log("\n📋 Available Functions:");
    console.log("   Exercise 1 - Music Genre:");
    console.log("   • musicExercise.displaySelectedValue()");
    console.log("   • musicExercise.addClassicOption()");
    console.log("   • musicExercise.setClassicDefault()");
    
    console.log("\n   Exercise 2 - Delete Colors:");
    console.log("   • colorExercise.removeColor() - (Auto-bound to button)");
    
    console.log("\n   Exercise 3 - Shopping List:");
    console.log("   • shoppingListExercise.addItem()");
    console.log("   • shoppingListExercise.clearAll()");
    console.log("   • shoppingListExercise.removeSingleItem(index)");
});

// Make functions globally available
window.musicExercise = musicExercise;
window.colorExercise = colorExercise;
window.shoppingListExercise = shoppingListExercise;
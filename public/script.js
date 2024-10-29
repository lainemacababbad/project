const apiUrl = "http://localhost:3000/api"; // Use the API base URL

// Fetch and display all Filipino foods
async function fetchFilipinoFood() {
    try {
        const response = await fetch(`${apiUrl}/filipinofood`);
        const data = await response.json();
        displayFoodList(data);
        showSection('foodListSection');
    } catch (error) {
        console.error("Error fetching Filipino food:", error);
    }
}

// Add a new food item
async function addFood(event) {
    event.preventDefault();
    const food = {
        name: document.getElementById("foodName").value,
        description: document.getElementById("foodDescription").value,
        ingredients: document.getElementById("foodIngredients").value,
        instructions: document.getElementById("foodInstructions").value,
        region: document.getElementById("foodRegion").value,
        createdAt: new Date().toISOString()
    };

    try {
        const response = await fetch(`${apiUrl}/filipinofood`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(food)
        });
        if (response.ok) {
            fetchFilipinoFood();
        }
    } catch (error) {
        console.error("Error adding food:", error);
    }
}

// Fetch and display all shopping list items
async function fetchShoppingList() {
    try {
        const response = await fetch(`${apiUrl}/shoppinglist`);
        const data = await response.json();
        displayShoppingList(data);
        showSection('shoppingListSection');
    } catch (error) {
        console.error("Error fetching shopping list:", error);
    }
}

// Add a new shopping list item
async function addShoppingItem(event) {
    event.preventDefault();
    const item = {
        name: document.getElementById("itemName").value,
        quantity: document.getElementById("itemQuantity").value,
        unit: document.getElementById("itemUnit").value,
        category: document.getElementById("itemCategory").value,
        purchased: false,
        createdAt: new Date().toISOString()
    };

    try {
        const response = await fetch(`${apiUrl}/shoppinglist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        });
        if (response.ok) {
            fetchShoppingList();
        }
    } catch (error) {
        console.error("Error adding shopping item:", error);
    }
}

// Show the specified section and hide others
function showSection(sectionId) {
    const sections = ['foodListSection', 'shoppingListSection', 'addFoodSection', 'addShoppingItemSection'];
    sections.forEach(section => {
        document.getElementById(section).style.display = (section === sectionId) ? 'block' : 'none';
    });
}

// Show add food form
function showAddFoodForm() {
    showSection('addFoodSection');
}

// Show add shopping item form
function showAddShoppingItemForm() {
    showSection('addShoppingItemSection');
}

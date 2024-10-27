document.addEventListener("DOMContentLoaded", () => {
    // Fetch Filipino food
    fetch("http://localhost:3000/api-docs")
      .then((response) => response.json())
      .then((data) => {
        const foodList = document.getElementById("food-list");
        data.forEach((food) => {
          const li = document.createElement("li");
          li.textContent = `${food.name} - ${food.region}`;
          foodList.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching Filipino food:", error));
  
    // Fetch Shopping List
    fetch("http://localhost:3000/api-docs")
      .then((response) => response.json())
      .then((data) => {
        const shoppingList = document.getElementById("shopping-list-items");
        data.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = `${item.name} (${item.quantity} ${item.unit}) - ${item.category}`;
          shoppingList.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching shopping list:", error));
  });
  
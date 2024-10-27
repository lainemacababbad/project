const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

//FILIPINO FOOD COLLECTION
// show all the filipino food
const getAllFilipinoFood = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .collection("filipinofood")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// show a filipino food based on id
const getSingleFilipinoFood = async (req, res, next) => {
  const foodId = req.params.id;

  try {
    const result = await mongodb
      .getDb()
      .collection("filipinofood")
      .findOne({ _id: new ObjectId(foodId) });

    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Filipino Food not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// add a filipino food
const newFilipinoFood = async (req, res) => {
  const food = {
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    region: req.body.region,
    createdAt: req.body.createdAt,
  };

  try {
    const response = await mongodb
      .getDb()
      .collection("filipinofood")
      .insertOne(food);

    if (response.acknowledged) {
      res.status(201).json({
        message: "Food added successfully",
        foodId: response.insertedId,
      });
    } else {
      res.status(500).json({ message: "Error occurred while adding food." });
    }
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update filipino food
const updateFilipinoFood = async (req, res) => {
  const foodId = new ObjectId(req.params.id);
  const updatedFields = {};

  try {
    const response = await mongodb
      .getDb()
      .collection("filipinofood")
      .updateOne({ _id: foodId }, { $set: updatedFields });

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Food updated successfully." });
    } else {
      res.status(404).json({ message: "Food not found or no changes made." });
    }
  } catch (error) {
    console.error("Error updating food:", error);
    res
      .status(500)
      .json({ message: "Some error occurred while updating the food." });
  }
};

// delete food
const deleteFilipinoFood = async (req, res) => {
  const foodId = new ObjectId(req.params.id);

  try {
    const response = await mongodb
      .getDb()
      .collection("filipinofood")
      .deleteOne({ _id: foodId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Food deleted successfully." });
    } else {
      res.status(404).json({ message: "Food not found." });
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({
      message: "Some error occurred while deleting the food.",
    });
  }
};

// SHOPPING LIST COLLECTION
// show all the shopping list
const getAllShoppingList = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .collection("shoppinglist")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// show a shopping list based on id
const getSingleShoppingList = async (req, res, next) => {
  const listId = req.params.id;

  try {
    const result = await mongodb
      .getDb()
      .collection("shoppinglist")
      .findOne({ _id: new ObjectId(listId) });

    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "List not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a shopping list
const newShoppingList = async (req, res) => {
  const list = {
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    category: req.body.category,
    purchased: req.body.purchased,
    createdAt: req.body.createdAt,
  };

  try {
    const response = await mongodb
      .getDb()
      .collection("shoppinglist")
      .insertOne(list);

    if (response.acknowledged) {
      res.status(201).json({
        message: "Shopping list added successfully",
        listId: response.insertedId,
      });
    } else {
      res.status(500).json({ message: "Error occurred while adding list." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update shopping list
const updateShoppingList = async (req, res) => {
  const listId = new ObjectId(req.params.id);
  const list = {
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    category: req.body.category,
    purchased: req.body.purchased,
    createdAt: req.body.createdAt,
  };
  try {
    const response = await mongodb
      .getDb()
      .collection("shoppinglist")
      .replaceOne({ _id: listId }, list);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "List updated successfully." });
    } else {
      res.status(404).json({ message: "List not found or no changes made." });
    }
  } catch (error) {
    console.error("Error updating list:", error);
    res
      .status(500)
      .json({ message: "Some error occurred while updating the list." });
  }
};

// delete shopping list
const deleteShoppingList = async (req, res) => {
  const listId = req.params.id;

  try {
    const response = await mongodb
      .getDb()
      .collection("shoppinglist")
      .deleteOne({ _id: listId });

    if (response.acknowledged) {
      res.status(200).json({ message: "List deleted successfully." });
    } else {
      res.status(404).json({ message: "List not found." });
    }
  } catch (error) {
    console.error("Error deleting list:", error);
    res
      .status(500)
      .json({ message: "Some error occurred while deleting the list." });
  }
};

module.exports = {
  getAllFilipinoFood,
  getSingleFilipinoFood,
  newFilipinoFood,
  updateFilipinoFood,
  deleteFilipinoFood,
  getAllShoppingList,
  getSingleShoppingList,
  newShoppingList,
  updateShoppingList,
  deleteShoppingList,
};

const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

//FILIPINO FOOD COLLECTION
// show all the filipino food
const getAllFilipinoFood = async (req, res, next) => {
  const result = await mongodb.getDb().collection("filipinofood").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

// show a filipino food based on id
const getSingleFilipinoFood = async (req, res, next) => {
  const userId =  new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .collection("filipinofood")
  .findOne({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
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
  const response = await mongodb
    .getDb()
    .collection("filipinoFood")
    .insertOne(food);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while adding a Filipino food."
      );
  }
};

// update filipino food
const updateFilipinoFood = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const food = {
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    region: req.body.region,
    createdAt: req.body.createdAt
  };
  const response = await mongodb
    .getDb()
    .collection('filipinoFood')
    .replaceOne({ _id: userId }, food);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};


// delete food
const deleteFilipinoFood = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
  .getDb()
  .collection("filipinoFood")
  .deleteOne({ _id: userId });
  if (response.acknowledged) {
    res.status(200).json(response);
    } else {
      res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the contact."
      );
  }
};

// SHOPPING LIST COLLECTION
// show all the shopping list
const getAllShoppingList = async (req, res, next) => {
    const result = await mongodb.getDb().collection("shoppinglist").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  };

  // show a filipino food based on id
const getSingleShoppingList = async (req, res, next) => {
  const userId =  new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .collection("shoppinglist")
  .findOne({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

// add a filipino food
const newShoppingList = async (req, res) => {
  const list = {
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    category: req.body.category,
    purchased: req.body.purchased,
    createdAt: req.body.createdAt,
  };
  const response = await mongodb
    .getDb()
    .collection("shoppingList")
    .insertOne(list);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while adding a Filipino food."
      );
  }
};

// update filipino food
const updateShoppingList = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const list = {
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    category: req.body.category,
    purchased: req.body.purchased,
    createdAt: req.body.createdAt
  };
  const response = await mongodb
    .getDb()
    .collection('shoppingList')
    .replaceOne({ _id: userId }, list);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};


// delete food
const deleteShoppingList = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
  .getDb()
  .collection("shoppingList")
  .deleteOne({ _id: userId });
  if (response.acknowledged) {
    res.status(200).json(response);
    } else {
      res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the contact."
      );
  }
};

module.exports = { getAllFilipinoFood, getSingleFilipinoFood, newFilipinoFood, updateFilipinoFood, deleteFilipinoFood, getAllShoppingList, getSingleShoppingList, newShoppingList, updateShoppingList,deleteShoppingList};

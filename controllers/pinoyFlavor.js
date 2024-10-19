const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// show all the filipino food
const getAllFilipinoFood = async (req, res, next) => {
  const result = await mongodb.getDb().collection("filipinofood").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

// show all the shopping list
const getAllShoppingList = async (req, res, next) => {
    const result = await mongodb.getDb().collection("shoppinglist").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  };

module.exports = { getAllFilipinoFood, getAllShoppingList};

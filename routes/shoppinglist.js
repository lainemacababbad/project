const express = require("express");
const router = express.Router();

const shoppingListController = require("../controllers/pinoyFlavor");

/**
 * @swagger
 * /shoppingList:
 *   get:
 *     summary: Get a list of shopping items
 *     description: Retrieve a list of shopping items from the database.
 *     responses:
 *       200:
 *         description: A JSON array of shopping list items
 */
router.get("/", shoppingListController.getAllShoppingList); // Get all shopping list items

/**
 * @swagger
 * /shoppingList/{id}:
 *   get:
 *     summary: Get a single shopping item by ID
 *     description: Retrieve a single shopping item from the database using the ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single shopping list item
 */
router.get("/:id", shoppingListController.getSingleShoppingList); // Get single shopping list item by ID

/**
 * @swagger
 * /shoppingList:
 *   post:
 *     summary: Create a new shopping list item
 *     description: Add a new shopping list item to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *               unit:
 *                 type: string
 *               category:
 *                 type: string
 *               purchased:
 *                 type: boolean
 *               createdAt:
 *                 type: string
 *             required:
 *               - name
 *               - quantity
 *               - unit
 *               - category
 *               - purchased
 *               - createdAt
 *     responses:
 *       201:
 *         description: Shopping list item created successfully
 *       500:
 *         description: Error occurred while adding food.
 */
router.post("/", shoppingListController.newShoppingList); // Add new shopping list item

/**
 * @swagger
 * /shoppingList/{id}:
 *   put:
 *     summary: Update a shopping list item by ID
 *     description: Update the details of an existing shopping list item.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *               unit:
 *                 type: string
 *               category:
 *                 type: string
 *               purchased:
 *                 type: boolean
 *               createdAt:
 *                 type: string
 *             required:
 *               - name
 *               - quantity
 *               - unit
 *               - category
 *               - purchased
 *               - createdAt
 *     responses:
 *       200:
 *         description: Shopping list item updated successfully
 *       404:
 *         description: Food not found or no changes made.
 *       500:
 *         description: An error occurred while updating the food.
 */
router.put("/:id", shoppingListController.updateShoppingList); // Update shopping list item

/**
 * @swagger
 * /shoppingList/{id}:
 *   delete:
 *     summary: Delete a shopping list item by ID
 *     description: Remove a shopping list item from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shopping list item deleted successfully
 *       404:
 *         description: Food not found.
 *       500:
 *         description: An error occurred while deleting the food.
 */
router.delete("/:id", shoppingListController.deleteShoppingList); // Delete shopping list item

module.exports = router;

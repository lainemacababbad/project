const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/pinoyFlavor');

/**
 * @swagger
 * /shoppingList:
 *   get:
 *     summary: Get a list of shopping list
 *     description: Retrieve a shopping list from the database.
 *     responses:
 *       200:
 *         description: Successful response with a shopping list.
 */
router.get('/', contactsController.getAllShoppingList); // get all shopping list

/**
 * @swagger
 * /shoppingList/{id}:
 *   get:
 *     summary: Get a single list by ID
 *     description: Retrieve a single list from the database based on the ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with a single shopping list.
 */
router.get('/:id', contactsController.getSingleShoppingList);  // get a single shopping list based on the id

/**
 * @swagger
 * /shoppingList:
 *   post:
 *     summary: Create a new shopping list
 *     description: Create a new shopping list and add it to the database.
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
 *                  type: number
 *               unit:
 *                 type: string
 *               category:
 *                 type: string
 *               purchased:
 *                 type: boolean
 *               createdAt:
 *                  type: string
 *             required:
 *               - name
 *               - quantity
 *               - unit
 *               - category
 *               - purchased
 *               - createAt
 *     responses:
 *       201:
 *         description: Shopping list created successfully.
 * 
 * 
 * 
 * 
 */
router.post('/', contactsController.newShoppingList); // add a shopping list

/**
 * @swagger
 * /shoppingList/{id}:
 *   put:
 *     summary: Update a list
 *     description: Update an existing list in the database.
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
 *                  type: number
 *               unit:
 *                 type: string
 *               category:
 *                 type: string
 *               purchased:
 *                 type: boolean
 *               createdAt:
 *                  type: string
 *     responses:
 *       204:
 *         description: Shopping list updated successfully.
 */
router.put('/:id', contactsController.updateShoppingList); // update shopping list

/**
 * @swagger
 * /shoppingList/{id}:
 *   delete:
 *     summary: Delete a list
 *     description: Delete a list from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shopping list deleted successfully.
 */
router.delete('/:id', contactsController.deleteShoppingList); // delete shopping list

module.exports = router;
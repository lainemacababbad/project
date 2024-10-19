const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/pinoyFlavor');

/**
 * @swagger
 * /filipinoFood:
 *   get:
 *     summary: Get a list of Filipino food
 *     description: Retrieve a list of Filipino food from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of Filipino food.
 */
router.get('/', contactsController.getAllFilipinoFood); // get all filipino food

/**
 * @swagger
 * /filipinoFood/{id}:
 *   get:
 *     summary: Get a single food by ID
 *     description: Retrieve a single food from the database based on the ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with a single food.
 */
router.get('/:id', contactsController.getSingleFilipinoFood);  // get a single filipino food based on the id

/**
 * @swagger
 * /filipinoFood:
 *   post:
 *     summary: Create a new food
 *     description: Create a new food and add it to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                  type: string
 *               ingredients:
 *                 type: array
 *               instructions:
 *                 type: array
 *               region:
 *                 type: string
 *               createdAt:
 *                 type: string
 *             required:
 *               - name
 *               - desctiption
 *               - ingredients
 *               - instructions
 *               - region
 *               - createdAt
 *     responses:
 *       201:
 *         description: Filipino food created successfully.
 * 
 * 
 * 
 */
router.post('/', contactsController.newFilipinoFood); // add a filipino food

/**
 * @swagger
 * /filipinoFood/{id}:
 *   put:
 *     summary: Update a food
 *     description: Update an existing food in the database.
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
 *               description:
 *                  type: string
 *               ingredients:
 *                 type: array
 *               instructions:
 *                 type: array
 *               region:
 *                 type: string
 *               createdAt:
 *                 type: string
 *     responses:
 *       204:
 *         description: Filipino food updated successfully.
 */
router.put('/:id', contactsController.updateFilipinoFood); // update a food

/**
 * @swagger
 * /filipinoFood/{id}:
 *   delete:
 *     summary: Delete a food
 *     description: Delete a food from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filipino food deleted successfully.
 */
router.delete('/:id', contactsController.deleteFilipinoFood); // delete a food 

module.exports = router;
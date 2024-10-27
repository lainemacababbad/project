const express = require("express");
const router = express.Router();
const { validateFilipinoFood } = require('../validators/validator');
const { validationResult } = require('express-validator');

const pinoyfood = require("../controllers/pinoyFlavor");



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
router.get("/", pinoyfood.getAllFilipinoFood); // get all filipino food

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
router.get("/:id", pinoyfood.getSingleFilipinoFood); // get a single filipino food based on the id

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
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *               region:
 *                 type: string
 *               createdAt:
 *                 type: string
 *             required:
 *               - name
 *               - description  # Fixed typo here
 *               - ingredients
 *               - instructions
 *               - region
 *               - createdAt
 *     responses:
 *       201:
 *         description: Filipino food created successfully.
 *       500:
 *         description: Error occurred while adding food.
 */
router.post("/", validateFilipinoFood, pinoyfood.newFilipinoFood); // add a filipino food

/**
 * @swagger
 * /filipinoFood/{id}:
 *   put:
 *     summary: Update a food
 *     description: Update an existing food in the database. Only the fields provided in the request body will be updated.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *               region:
 *                 type: string
 *               createdAt:
 *                 type: string
 *     responses:
 *       200:
 *         description: Filipino food updated successfully.
 *       404:
 *         description: Food not found or no changes made.
 *       500:
 *         description: An error occurred while updating the food.
 */
router.put("/:id", validateFilipinoFood, pinoyfood.updateFilipinoFood); // update a food

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
 *         description: The ID of the food to delete.
 *     responses:
 *       200:
 *         description: Filipino food deleted successfully.
 *       404:
 *         description: Food not found.
 *       500:
 *         description: An error occurred while deleting the food.
 */
router.delete("/:id", pinoyfood.deleteFilipinoFood); // delete a food


module.exports = router;

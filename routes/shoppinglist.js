const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/pinoyFlavor');

router.get('/', contactsController.getAllShoppingList); // get all filipino food

module.exports = router;
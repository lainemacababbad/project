const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/pinoyFlavor');

router.get('/', contactsController.getAllFilipinoFood); // get all filipino food

module.exports = router;
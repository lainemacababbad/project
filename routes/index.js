const express = require('express');
const router = express.Router();

router.use('/filipinofood', require('./filipinofood'))

router.use('/shoppinglist', require('./shoppinglist'))

module.exports = router;
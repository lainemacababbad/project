const { body } = require('express-validator');

const validateFilipinoFood = [
    body('name').isString(),
    body('description').isString(),
    body('ingredients').isArray().isLength({ min: 1 }).withMessage('At least one ingredient is required.'),
    body('instructions').isArray().isLength({ min: 1 }).withMessage('At least one instruction is required.'),
    body('region').isString()
];

module.exports = { validateFilipinoFood };
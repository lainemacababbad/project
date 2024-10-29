// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Filipino Food API',
      version: '1.0.0',
      description: 'API for managing Filipino food and shopping list',
    },
    servers: [
      {
        url: 'http://localhost:3000/', // Update this URL accordingly
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;

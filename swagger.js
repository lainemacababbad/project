const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pinoy Flavor API',
      version: '1.0.0',
      description: 'API documentation for Pinoy Flavor',
    },
  },
  apis: ['./routes/*.js'], // Path to the API routes
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

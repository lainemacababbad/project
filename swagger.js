const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: { // Change this from swaggerDefinition to definition
    openapi: '3.1.0', // Ensure this matches a supported version
    info: {
      title: 'Filipino Food API',
      version: '1.0.0',
      description: 'API for managing Filipino food and shopping list',
    },
    servers: [
      {
        url: 'https://cse341-project-6k9u.onrender.com/',
      },
    ],
    components: {
      securitySchemes: {
        OpenId: {
          type: 'openIdConnect',
          openIdConnectUrl: 'https://dev-u2wo228hitj2qwjk.us.auth0.com/.well-known/openid-configuration',
        },
      },
    },
    security: [
      {
        OpenId: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
module.exports = swaggerSpec;
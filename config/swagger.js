const swaggerJSDoc = require('swagger-jsdoc');
const PORT = process.env.PORT || 3000;

const swaggerConfig = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'API Supermarket',
      version: '1.0.0',
      description: 'API para la gestión integral del sistema de supermercado'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor Local'
      }
    ]
  },
  apis: ['./docs/*.js'], 
};

module.exports = swaggerJSDoc(swaggerConfig);
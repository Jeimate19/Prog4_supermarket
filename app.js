const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

// Importaciones locales (Configuracion y BD)
const swaggerSpec = require('./config/swagger');
const { sequelize } = require('./models');

// Importaciones de Rutas
const productRoutes = require('./routes/productRoutes');
const providerRoutes = require('./routes/providerRoutes');
const userRoutes = require('./routes/userRoutes');
const saleRoutes = require('./routes/saleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Documentacion Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Registro de endpoints principales
app.use('/api/products', productRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sales', saleRoutes);

app.get('/api', (req, res) => {
  return res.json({ message: 'API en funcionamiento' });
});

const bootstrap = async () => {
  try {
    await sequelize.sync();
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error al iniciar el servidor o sincronizar la BD:', err);
  }
};

bootstrap();
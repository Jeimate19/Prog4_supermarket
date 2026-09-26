const { Product, Provider } = require('../models');

// Consultar todos los productos y el proveedor
const getAll = async (req, res) => {
  try {
    const productsList = await Product.findAll({
      include: {
        model: Provider,
        attributes: ['id', 'name', 'email']
      }
    });

    return res.json(productsList);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Consultar producto por ID
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const singleProduct = await Product.findByPk(id, {
      include: Provider
    });

    if (!singleProduct) {
      return res.status(404).json({ message: 'No se encuentra el producto' });
    }

    return res.json(singleProduct);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo producto
const create = async (req, res) => {
  try {
    const productPayload = req.body;
    const newProduct = await Product.create(productPayload);

    return res.status(201).json(newProduct);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Actualizar un producto existente
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const productPayload = req.body;
    
    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      return res.status(404).json({ message: 'No se encuentra el producto' });
    }

    await existingProduct.update(productPayload);

    return res.json(existingProduct);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Eliminar un producto por su ID
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const productToDelete = await Product.findByPk(id);

    if (!productToDelete) {
      return res.status(404).json({ message: 'No se encuentra el producto' });
    }

    await productToDelete.destroy();

    return res.json({ message: 'Se ha eliminado correctamente el producto' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Exportar todos los controladores agrupados
module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};
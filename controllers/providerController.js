const { Provider, Product } = require('../models');

// Para obtener todos los proveedores con sus productos asociados
const getAll = async (req, res) => {
  try {
    const providersList = await Provider.findAll({
      include: {
        model: Product,
        attributes: ['id', 'name', 'price', 'stock']
      }
    });

    return res.json(providersList);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//Para obtener el detalle de un proveedor en especifico por su ID
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const targetProvider = await Provider.findByPk(id, {
      include: Product
    });

    // Para verificar que el registro realmente exista en la base de datos
    if (!targetProvider) {
      return res.status(404).json({ message: 'No se ha encontrado al proveedor' });
    }

    return res.json(targetProvider);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Para registrar un nuevo proveedor en el sistema
const create = async (req, res) => {
  try {
    const providerPayload = req.body;
    const newProvider = await Provider.create(providerPayload);

    return res.status(201).json(newProvider);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Para modificar los datos de un proveedor ya registrado
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePayload = req.body;

    const providerToUpdate = await Provider.findByPk(id);

    // Para comprobar la existencia antes de intentar actualizar el proveedor
    if (!providerToUpdate) {
      return res.status(404).json({ message: 'No se ha encontrado al proveedor' });
    }

    // Para aplicar cambios realizados 
    await providerToUpdate.update(updatePayload);

    return res.json(providerToUpdate);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Para eliminar un proveedor del sistema
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    
    const providerToDelete = await Provider.findByPk(id);

    // Si el proveedor no esta en la base de datos muestra error
    if (!providerToDelete) {
      return res.status(404).json({ message: 'No se ha encontrado al proveedor' });
    }

    // Proceso de borrado
    await providerToDelete.destroy();

    return res.json({ message: 'Se ha eliminado al proveedor correctamente' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Se centraliza la exportación de los metodos del controlador
module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};
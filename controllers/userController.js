const { User, Sale } = require('../models');

// Para recuperar el listado completo de usuarios junto con su historial de compras
const getAll = async (req, res) => {
  try {
    const usersList = await User.findAll({
      include: {
        model: Sale,
        attributes: ['id', 'total', 'date'] // Extraemos unicamente los campos esenciales de la venta
      }
    });

    return res.json(usersList);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Para consultar el perfil y ventas de un usuario especifico mediante su ID
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = await User.findByPk(id, {
      include: Sale
    });

    // Comprobamos si el registro existe en la base de datos
    if (!foundUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.json(foundUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Para registrar un nuevo usuario en la plataforma
const create = async (req, res) => {
  try {
    const userPayload = req.body;
    const newUser = await User.create(userPayload);

    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Modificar la informacion de un perfil de usuario ya existente
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const existingUser = await User.findByPk(id);

    // Verificamos que el usuario a editar realmente exista antes de procesar
    if (!existingUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Aplicar y guardar los nuevos cambios
    await existingUser.update(updateData);

    return res.json(existingUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Para eliminar un usuario del sistema de manera definitiva
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    
    const userToDelete = await User.findByPk(id);

    // Si no hay coincidencias en la BD, interrumpimos y devolvemos 404
    if (!userToDelete) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Ejecutar la eliminacion del registro
    await userToDelete.destroy();

    return res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Exportar todos los metodos del controlador agrupados en un solo objeto
module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};
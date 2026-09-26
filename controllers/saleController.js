const { sequelize, Sale, Detail, Product, User } = require('../models');

// Recuperar el historial de ventas completo
const getAll = async (req, res) => {
  try {
    const salesHistory = await Sale.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Detail, include: [{ model: Product, attributes: ['id', 'name', 'price'] }] }
      ]
    });
    return res.json(salesHistory);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Consultar una venta especifica por ID 
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const singleSale = await Sale.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Detail, include: [{ model: Product, attributes: ['id', 'name', 'price'] }] }
      ]
    });

    if (!singleSale) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    return res.json(singleSale);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Registrar una nueva venta
const create = async (req, res) => {
  const dbTransaction = await sequelize.transaction();
  try {
    const { userId, products: itemsList } = req.body;

    if (!itemsList || itemsList.length === 0) {
      throw new Error('La venta debe tener productos');
    }

    const customer = await User.findByPk(userId, { transaction: dbTransaction });
    if (!customer) throw new Error('Usuario no existe');

    let grandTotal = 0;
    const newSale = await Sale.create({ userId }, { transaction: dbTransaction });

    for (const item of itemsList) {
      const { productId, quantity } = item;
      if (!quantity || quantity <= 0) throw new Error('Cantidad inválida');

      const dbProduct = await Product.findByPk(productId, { transaction: dbTransaction });
      if (!dbProduct) throw new Error('Producto no existe');
      if (dbProduct.stock < quantity) throw new Error(`Stock insuficiente para ${dbProduct.name}`);

      const itemSubtotal = dbProduct.price * quantity;
      grandTotal += itemSubtotal;

      await Detail.create({
        saleId: newSale.id,
        productId,
        quantity,
        price: dbProduct.price
      }, { transaction: dbTransaction });

      await dbProduct.update({ stock: dbProduct.stock - quantity }, { transaction: dbTransaction });
    }

    await newSale.update({ total: grandTotal }, { transaction: dbTransaction });
    await dbTransaction.commit();

    return res.status(201).json({ message: 'Venta creada correctamente', saleId: newSale.id, total: grandTotal });
  } catch (err) {
    await dbTransaction.rollback();
    return res.status(500).json({ error: err.message });
  }
};

// Actualizar una venta
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePayload = req.body;
    
    const existingSale = await Sale.findByPk(id);
    if (!existingSale) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }

    await existingSale.update(updatePayload);
    return res.json(existingSale);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Eliminar una venta
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const saleToDelete = await Sale.findByPk(id);

    if (!saleToDelete) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }

    await saleToDelete.destroy();
    return res.json({ message: 'Venta eliminada correctamente' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };
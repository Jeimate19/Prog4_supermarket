const Sequelize = require('sequelize');
const dbConnection = require('../config/database');

const ProviderModel = require('./provider')(dbConnection, Sequelize);
const ProductModel = require('./product')(dbConnection, Sequelize);
const UserModel = require('./user')(dbConnection, Sequelize);
const SaleModel = require('./sale')(dbConnection, Sequelize);
const DetailModel = require('./detail')(dbConnection, Sequelize);

const database = {
  Provider: ProviderModel,
  Product: ProductModel,
  User: UserModel,
  Sale: SaleModel,
  Detail: DetailModel,

  sequelize: dbConnection,
  Sequelize: Sequelize
};

Object.values(database).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(database);
  }
});

module.exports = database;
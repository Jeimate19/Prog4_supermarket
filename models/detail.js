module.exports = (sequelize, DataTypes) => {
  const detailSchema = {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { 
          msg: 'La cantidad debe ser un numero entero' 
        },
        min: { 
          args: [1], 
          msg: 'La cantidad debe ser mayor a 0' 
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { 
          msg: 'El precio debe ser numerico' 
        },
        min: { 
          args: [0], 
          msg: 'El precio no puede ser negativo' 
        }
      }
    }
  };
  const DetailModel = sequelize.define('Detail', detailSchema);

  DetailModel.associate = (models) => {
    const { Sale, Product } = models;

    DetailModel.belongsTo(Sale, { foreignKey: 'saleId' });
    DetailModel.belongsTo(Product, { foreignKey: 'productId' });
  };
  
  return DetailModel;
};
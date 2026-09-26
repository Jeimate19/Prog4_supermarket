module.exports = (sequelize, DataTypes) => {
  const saleSchema = {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isFloat: {
          msg: 'El total debe ser numerico'
        },
        min: {
          args: [0],
          msg: 'El total no puede ser negativo'
        }
      }
    }
  };

  const SaleModel = sequelize.define('Sale', saleSchema);

  SaleModel.associate = (models) => {
    const { User, Detail } = models;

    SaleModel.belongsTo(User, { foreignKey: 'userId' });
    SaleModel.hasMany(Detail, { 
      foreignKey: 'saleId',
      onDelete: 'CASCADE'
    });
  };

  return SaleModel;
};
module.exports = (sequelize, DataTypes) => {
  const userSchema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre es obligatorio'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'El email ya esta registrado'
      },
      validate: {
        isEmail: {
          msg: 'Debe ser un email valido'
        }
      },
      set(value) {
        this.setDataValue('email', value.toLowerCase());
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['admin', 'user']],
          msg: 'El rol debe ser admin o user'
        }
      }
    }
  };

  const UserModel = sequelize.define('User', userSchema);

  UserModel.associate = (models) => {
    const { Sale } = models;

    UserModel.hasMany(Sale, { 
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return UserModel;
};
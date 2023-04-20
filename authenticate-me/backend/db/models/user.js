'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
      validate: {
        len: [4,30],
        isEmail: false
      }
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: DataTypes.STRING.BINARY,
    allowNull: false,
    validate: {
      len: [60, 60]
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'updatedAt', 'email', 'createdAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      },
      loginUser: {
        attributes: {}
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
'use strict';

const bcrypt = require('bcryptjs')
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
    toSafeObject() {
      const {id, username, email} = this;
      return {id, username, email};
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString())
    }

    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    }

    static async login({credential, password}) {
      const {OP} = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: [
            {
              username: credential
            },
            {
              email: credential
            }
          ]
        }
      });

      if(user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id)
      }
    }

    static async signup({username, email, password}) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword
      })

      return await User.scope('currentUser').findByPk(user.id)
    }

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
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
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
'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { onDelete: 'cascade', onUpdate: 'cascade' })
      User.hasMany(models.Post, { onDelete: 'cascade', onUpdate: 'cascade' })
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: `username already taken`
      },
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: {
          args: [8, 20],
          msg: `Password must be between 8 to 10 characters in length`
        }
      }
    },
    role: {
      type : DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    const salt = bcrypt.genSaltSync(8)
    const hash = bcrypt.hashSync(instance.password, salt)
    instance.password = hash
    instance.role = 'user'
  })
  User.beforeUpdate((instance, options) => {
    const salt = bcrypt.genSaltSync(8)
    const hash = bcrypt.hashSync(instance.password, salt)
    instance.password = hash
  })
  return User;
};
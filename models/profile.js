'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }

    dateOfBirthFormat() {
      return new Date(this.dateOfBirth).toISOString().split("T")[0]
    }
  }
  Profile.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Name cannot be empty`
        },
        notEmpty: {
          msg: `Name cannot be empty`
        },
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Phone Number cannot be empty`
        },
        notEmpty: {
          msg: `Phone Number cannot be empty`
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: `Email must be unique`
      },
      validate: {
        notNull: {
          msg: `Email cannot be empty`
        },
        notEmpty: {
          msg: `Email cannot be empty`
        },
        isEmail: {
          msg: `Email must be in email format`
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `address cannot be empty`
        },
        notEmpty: {
          msg: `address cannot be empty`
        },
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Date of Birth cannot be empty`
        },
        notEmpty: {
          msg: `Date of Birth cannot be empty`
        },
        isBefore: {
          args: `${new Date().getFullYear() - 18}-01-01`,
          msg: `Minimum age must be 18`
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};
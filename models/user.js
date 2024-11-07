'use strict';

const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {foreignKey: 'UserId', as: 'profile'})
      User.hasMany(models.Post, {foreignKey: 'UserId'})
    }
  }
  User.init({
    username:{
        type : DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg : "Username required!"
          },
          notEmpty: {
            msg : "Username required!"
          }
        }
      },   
    fullName:{
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "fullName required!"
        },
        notEmpty: {
          msg : "fullName required!"
        }
      }
    }, 
    email:{
      type : DataTypes.STRING,
      allowNull: false,
      isUnique :true,
      validate: {
        notNull: {
          msg : "email required!"
        },
        notEmpty: {
          msg : "email required!"
        },
        isEmail : {
          msg : "must enter in email format"
        }
      }
    }, 
    password:{
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "password required!"
        },
        notEmpty: {
          msg : "password required!"
        },
        len: {
          args: [5,20],
          msg: "The minimum length is 5 characters and the maximum length is 20 characters"
        }
      }
    }, 
    role: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(instance, options){
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(instance.password, salt);

        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
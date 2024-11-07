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
      Profile.belongsTo(models.User, {foreignKey : 'UserId'})
    }
  }
  Profile.init({
    gender: DataTypes.STRING,
    biodata:{
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "biodata required!"
        },
        notEmpty: {
          msg : "biodata required!"
        },
        len: {
          args: [5,60],
          msg: "The minimum length is 5 characters and the maximum length is 60 characters"
        }
      }
    },
    
    location: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    photoProfile: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};
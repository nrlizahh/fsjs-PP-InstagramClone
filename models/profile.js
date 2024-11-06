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
    biodata: DataTypes.STRING,
    location: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    photoProfile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};
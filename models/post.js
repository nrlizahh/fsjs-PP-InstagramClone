'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {foreignKey : 'UserId'})
      Post.belongsToMany(models.Tag, { through: 'PostTag' });
    }
  }
  Post.init({
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {notNull: {
        msg : "image required!"
      },
      notEmpty: {
        msg : "image required!"
      },
      }
    },
    caption: DataTypes.TEXT,
    createdDate: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
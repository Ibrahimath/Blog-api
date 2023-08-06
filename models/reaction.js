'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reaction.init({
    reaction_id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    post_id: DataTypes.UUID,
    email: DataTypes.STRING,
    reaction: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reaction',
  });
  return reaction;
};
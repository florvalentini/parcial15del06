'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.hasOne(models.User, { 
        foreignKey: 'address_id', 
        as: 'users' 
      });
    }
  };
  Address.init({
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    location: DataTypes.STRING,
    cp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasOne(models.OrderDetail, {
        foreignKey: 'product_id',
        as: 'orderdetails'
      });
      Product.belongsTo(models.Brand);
      Product.belongsTo(models.Category);

      Product.hasMany(models.Image, { 
        foreignKey: 'product_id', 
        as: 'images' 
      });

      Product.belongsTo(models.Size); 
      Product.belongsTo(models.Gender);
    }
  };
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    stock_min: DataTypes.INTEGER,
    stock_max: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    size_id: DataTypes.INTEGER,
    gender_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
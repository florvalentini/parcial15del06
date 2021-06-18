'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderDetail, {
        foreignKey: 'order_id',
        as: 'orderdetails'
      });

      Order.hasOne(models.Shipping, {
        foreignKey: 'shipping_id',
        as: 'shippings'
      });
      Order.belongsTo(models.State);
      Order.belongsTo(models.User);
      Order.belongsTo(models.Payment);
      Order.belongsTo(models.Address);
    }
  };
  Order.init({
    number: DataTypes.INTEGER,
    date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,
    shipping_id: DataTypes.INTEGER,
    state_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
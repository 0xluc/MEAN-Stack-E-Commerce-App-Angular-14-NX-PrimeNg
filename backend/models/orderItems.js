'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./product');
const Order = require('./orders');
const Order_Items = sequelize.define('orderItems', {
    order_id: {
    type: DataTypes.BIGINT(3),
    allowNull: false,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.BIGINT(2),
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.BIGINT(3),
    allowNull: false,
  },
},
{
    sequelize,
    modelName: 'orderItems',
    tableName: 'order_items'
})

Order_Items.belongsTo(Product, {foreignKey: 'product_id', onDelete: 'CASCADE'})
sequelize.sync().then(() => {
    console.log('Order_items table created sucessfully!')
}).catch((error) => {
    console.error('Unable to create tablle: ', error)
})
module.exports = Order_Items
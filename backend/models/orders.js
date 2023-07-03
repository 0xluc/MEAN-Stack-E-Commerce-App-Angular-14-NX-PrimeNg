'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Order_Items = require('./orderItems');
const Order = sequelize.define("orders",{
    id: {
        type: DataTypes.BIGINT(3),
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      shippingAddress1: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      shippingAddress2: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      zip: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: true,
      },
      user: {
        type: DataTypes.BIGINT(3),
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      dataOrdered: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },{
        sequelize,
        modelName:'orders'
    })
Order.hasMany(Order_Items, {
  foreignKey: 'order_id',
  sourceKey: 'id',
});

sequelize.sync().then(() => {
    console.log('Orders table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
module.exports = Order 


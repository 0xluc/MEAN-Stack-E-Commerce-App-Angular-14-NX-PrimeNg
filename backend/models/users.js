'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = sequelize.define( "users", {
    id: {
        type: DataTypes.BIGINT(3),
        primaryKey: true,
        autoIncrement: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      passwordHash: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(3),
        allowNull: true,
      },
      street: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      zip: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      apartment: {
        type: DataTypes.STRING(20),
        allowNull: true,
      }
    },{
        sequelize,
        modelName: 'users'
})
sequelize.sync().then(() => {
    console.log('Users table created sucessfully!')
}).catch((error) => {
    console.error('Unable to create tablle: ', error)
})
module.exports = User
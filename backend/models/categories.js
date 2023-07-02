'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Category = sequelize.define('categories', {
    id: {
    type: DataTypes.BIGINT(2),
    primaryKey: true,
    autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(10)
    },
    icon: {
      type: DataTypes.STRING(20)
    }
}, {
    sequelize,
    modelName: 'categories',
    tableName: 'categories'
})

sequelize.sync().then(() => {
    console.log('Categories table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
module.exports = Category

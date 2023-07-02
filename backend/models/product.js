'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Category = require('../models/categories');
    
const Product = sequelize.define("products",{
    id: { type: DataTypes.BIGINT(2),
        primaryKey: true,
        autoIncrement: true
    },
    image: DataTypes.TEXT,
    brand: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(14,2),
    rating: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    numReviews: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    isFeatured: DataTypes.BOOLEAN,
    name: DataTypes.STRING(100),
    description: DataTypes.TEXT,
    category: {
        type: DataTypes.BIGINT(2),
        references: {
            model: Category,
            key: 'id'
        }
    },
    reviews: DataTypes.JSON,
    countInStock: DataTypes.BIGINT(7),
    richDescription: DataTypes.TEXT,
    images: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'products',
      tableName: 'products'
  });
Product.belongsTo(Category, {foreignKey: 'category', as: 'productCategory'});

sequelize.sync().then(() => {
    console.log('Products table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
module.exports = Product

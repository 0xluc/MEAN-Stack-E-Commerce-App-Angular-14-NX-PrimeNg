'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../db');
module.exports = (sequelize, DataTypes) => {
  class product extends Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
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
            model: 'category',
            key: 'id'
        }
    },
    reviews: DataTypes.JSON,
    countInStock: DataTypes.BIGINT(7),
    richDescription: DataTypes.TEXT,
    images: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};

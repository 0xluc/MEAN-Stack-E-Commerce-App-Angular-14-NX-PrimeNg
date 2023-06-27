'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.TEXT
      },
      brand: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      rating: {
        type: Sequelize.DECIMAL
      },
      numReviews: {
        type: Sequelize.BIGINT
      },
      isFeatured: {
        type: Sequelize.BOOLEAN
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      category: {
        type: Sequelize.INTEGER
      },
      reviews: {
        type: Sequelize.JSON
      },
      countInStock: {
        type: Sequelize.BIGINT
      },
      richDescription: {
        type: Sequelize.TEXT
      },
      images: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
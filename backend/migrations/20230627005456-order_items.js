'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('order_items', {
      order_id: {
        type: Sequelize.BIGINT(3),
        allowNull: false,
      },
      product_id: {
        type: Sequelize.BIGINT(2),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.BIGINT(3),
        allowNull: false,
      },
    }, {
      engine: 'InnoDB',
      charset: 'utf8',
      primaryKey: true,
      uniqueKeys: {
        unique_order_product: {
          fields: ['order_id', 'product_id'],
        },
      },
    });

    await queryInterface.addConstraint('order_items', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'fk_order_items_order',
      references: {
        table: 'orders',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('order_items', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_order_items_product',
      references: {
        table: 'products',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    const orderItemsData = [
      {
        order_id: 1,
        product_id: 1,
        quantity: 1
      },
      {
        order_id: 1,
        product_id: 2,
        quantity: 1
      },
        {
          order_id: 2,
          product_id: 1,
          quantity: 4
        },
        {
          order_id: 3,
          product_id: 2,
          quantity: 1
        },
        {
          order_id: 4,
          product_id: 4,
          quantity: 5
        },
        {
          order_id: 5,
          product_id: 3,
          quantity: 1
        },
        {
            order_id: 5,
            product_id: 4,
            quantity: 4
        }
    ]
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('order_items', 'fk_order_items_order');
    await queryInterface.removeConstraint('order_items', 'fk_order_items_product');
    await queryInterface.dropTable('order_items');
  }
};

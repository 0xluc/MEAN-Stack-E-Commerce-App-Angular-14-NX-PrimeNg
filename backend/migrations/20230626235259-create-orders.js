'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.BIGINT(3),
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.STRING(1),
        allowNull: true,
      },
      shippingAddress1: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      shippingAddress2: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      zip: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      totalPrice: {
        type: Sequelize.DECIMAL(14, 2),
        allowNull: true,
      },
      user: {
        type: Sequelize.BIGINT(3),
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      dataOrdered: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    }, {
      engine: 'InnoDB',
      charset: 'utf8',
    });
      
      await queryInterface.addConstraint('orders', {
      fields: ['user'],
      type: 'foreign key',
      name: 'fk_orders_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    const ordersData = [{
      status: "1",
      shippingAddress1: "Flowers Street",
      shippingAddress2: "13",
      city: "Prague",
      zip: "15541",
      country: "Czech Republic",
      phone: "688874451",
      totalPrice: 1240.9,
      user: 1,
      dataOrdered: "2021-04-11 10:52:24.756"
    },{
      status: "0",
      shippingAddress1: "Street 1",
      shippingAddress2: "Apartment1",
      city: "City",
      zip: "151222",
      country: "BR",
      phone: "(123) 456-7899",
      totalPrice: 4161,
      user: 3,
      dataOrdered: "2021-05-13 19:32:58.030"
    },{
      status: "0",
      shippingAddress1: "street2",
      shippingAddress2: "aprtment2",
      city: "city",
      zip: "12222",
      country: "CX",
      phone: "(123) 456-7777",
      totalPrice: 4161,
      user: 1,
      dataOrdered: "2021-05-13 20:08:45.299"
    },{
      status: "0",
      shippingAddress1: "Street 1",
      shippingAddress2: "Apartment 1",
      city: "City 1",
      zip: "155555",
      country: "AT",
      phone: "(123) 456-7888",
      totalPrice: 4161,
      user: 2,
      dataOrdered: "2021-05-13 20:18:21.264"
    },{
      status: "0",
      shippingAddress1: "Street 1",
      shippingAddress2: "Apartment 1",
      city: "City",
      zip: "1111",
      country: "AT",
      phone: "(123) 456-7777",
      totalPrice: 1260,
      user: 1,
      dataOrdered: "2021-05-13 20:20:28.582 ",
    }]
    await queryInterface.bulkInsert('orders', ordersData, {});
  },

  async down (queryInterface, Sequelize) {
        await queryInterface.removeConstraint('orders', 'fk_orders_user');
        await queryInterface.dropTable('orders');
  }
};

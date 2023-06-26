'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT(3),
        primaryKey: true,
        autoIncrement: true,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      passwordHash: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING(3),
        allowNull: true,
      },
      street: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      zip: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      apartment: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
    }, {
      engine: 'InnoDB',
      charset: 'utf8',
    });
    const usersData = [
      {
        isAdmin: true,
        name: "Fadi Nouh",
        email: "fadinoh@gmail.com",
        passwordHash: "$2a$10$hru8p9Xs2sJXfldwn2hJje0xq2Zx4iKRhELH7u3Hnm8/PoMdB757C",
        phone: "420702241333",
        city: "Praha",
        country: "AL",
        street: "Sazovická",
        zip: "15521",
        apartment: "17"
      },{
        isAdmin: true,
        name: "Tiago Pereira",
        email: "tiago@gmail.com",
        passwordHash: "$2a$10$0TZN47PNyhVml7I7B32xtuvbR04dmiAhRKBUUvNE4kQnFS5zCZNZK",
        phone: "7022417777",
        apartment: "",
        city: "",
        country: "DZ",
        street: "",
        zip: ""
      },{
        isAdmin: false,
        name: "dimbon",
        email: "dimbo@gmail.com",
        passwordHash: "$2a$10$XnIJJcvzJsDSsg32eIjNju7wSUTNy/ds3LDKcOjVCJSWimcHS9I5y",
        phone: "(755) 554-5454",
        apartment: "",
        city: "",
        country: "CZ",
        street: "",
        zip: ""
      },{
        isAdmin: false,
        name: "Dima",
        email: "dima@gmail.com",
        passwordHash: "$2a$10$BRwWlWfwDeHdc84G5gJKluuQRU9.gS8xoJgOnChkXOwh7zY7ICiRO",
        phone: "777444222",
        apartment: "",
        city: "",
        country: "AS",
        street: "",
        zip: ""
      },{
        isAdmin: true,
        name: "User",
        email: "user@eml.com",
        passwordHash: "$2a$10$MOJg2xzR.jLYDNWrHHX9DehZckNYSX0P/HID5cD.nAv2apemNdRCq",
        phone: "(545) 454-5445",
        apartment: "asdasd",
        city: "asdasd",
        country: "ES",
        street: "asdasd",
        zip: "asddas"
      },{
        isAdmin: false,
        street: "",
        apartment: "",
        zip: "",
        city: "",
        country: "",
        name: "Guest",
        email: "guest@ngshop.com",
        passwordHash: "$2a$10$WR2FLY8bhH4y5sUNHg7GA.9oZ5xaEBdH54kPhwgeuFUQlX0faGBQm",
        phone: "(123) 456-7899",
      }
    ]
    await queryInterface.bulkInsert('users', usersData, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};

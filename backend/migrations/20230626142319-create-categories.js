'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.BIGINT(2),
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      color: {
        type: Sequelize.STRING(10)
      },
      icon: {
        type: Sequelize.STRING(20)
      }
    }, {
      engine: 'InnoDB',
      charset: 'utf8'
    });

    const categoriesData = [
      {
        name: 'Mobile',
        color: '#F0E4E1',
        icon: 'mobile'
      },{
      
        name: "Beauty",
        color: "#F0E8DE",
        icon: "palette"
      },{
        name: "Computers",
        color: "#E1F0E7",
        icon: "desktop"
      },{
        name: "House",
        color: "#E2E1F0",
        icon: "home"
      },{
        name: "Games",
        color: "#ffb8b8",
        icon: "sun"
      },{
        name: "Cameras",
        icon: "camera",
        color: "#ede4da",
      }
    ]
    await queryInterface.bulkInsert('categories', categoriesData, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.dropTable('categories');
  }
};

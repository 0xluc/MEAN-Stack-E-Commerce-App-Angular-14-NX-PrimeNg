'use strict';
   module.exports = {
     up: async (queryInterface, Sequelize) => {
       const orderItemsData = [
      {
        order_id: 1,
        product_id: 2,
        quantity: 1
      },
        {
          order_id: 2,
          product_id: 5,
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
         // ... rest of the data

       await queryInterface.bulkInsert('order_items', orderItemsData, {});
     },

     down: async (queryInterface, Sequelize) => {
       await queryInterface.bulkDelete('order_items', null, {});
     }
    }

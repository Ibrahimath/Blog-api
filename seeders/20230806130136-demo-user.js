const { uuid } = require('uuidv4');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     */
      await queryInterface.bulkInsert('users', [{
        surname: "aaron",
        othernames: "king",
        email: "aaron@gmail.com",
        user_id: uuid(),
        username: "aar1111",
        about_me: "A good boy",
        password_hash: "yrrhfjfk934834jfifj"
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

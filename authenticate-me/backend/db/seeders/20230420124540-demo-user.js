'use strict';

const bcrypt = require("bcryptjs")
const {Op} = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
    {
      email: 'demouser@demo.com',
      username: 'demo-user',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'demouser2@demo.com',
      username: 'demo-user2',
      hashedPassword: bcrypt.hashSync('password2'),
    },
    {
      email: 'demouser3@demo.com',
      username: 'demo-user3',
      hashedPassword: bcrypt.hashSync('password3')
    }
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {
      username: {
        [Op.in]: ['demo-user', 'demo-user2', 'demo-user3']
      }
    })
  }
};

'use strict';
const fs = require('fs').promises
/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcrypt');


module.exports = {
  async up (queryInterface, Sequelize) {
   let data = JSON.parse(await fs.readFile('./data/users.json', 'utf-8')).map(el => {
    delete el.id
    el.createdAt = el.updatedAt = new Date()

    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(el.password, salt);
    el.password = hash
    
    return el
  })


   await queryInterface.bulkInsert('Users', data, {})
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Users', null, {});
  }
};

'use strict';
const fs = require('fs').promises
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   let data = JSON.parse(await fs.readFile('./data/tagNames.json', 'utf-8')).map(el => {
    delete el.id
    el.createdAt = el.updatedAt = new Date()
    return el
  })


   await queryInterface.bulkInsert('Tags', data, {})
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Tags', null, {});
  }
};

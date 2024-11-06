'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('PostTags', 'TagId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Tags',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('PostTags', 'TagId')
  }
};

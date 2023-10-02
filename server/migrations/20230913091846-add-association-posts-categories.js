'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn("posts", "categoryId",{
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id"
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn("posts", "categoryId");
  }
};

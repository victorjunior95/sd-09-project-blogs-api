'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postscategoryTable = queryInterface.createTable('postscategories', {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
    });

    return postscategoryTable;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('postscategories');
  },
};
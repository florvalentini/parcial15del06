'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DECIMAL
      },
      image: {
        type: Sequelize.STRING
      },
      keywords: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      brand_id: { 
        type: Sequelize.INTEGER, 
        references:{ 
          model:'brands', 
          key:'id' 
        } 
      }, 
      category_id: { 
        type: Sequelize.INTEGER, 
        references:{ 
          model:'categories', 
          key:'id' 
        } 
      }, 
      size_id: { 
        type: Sequelize.INTEGER, 
        references:{ 
          model:'sizes', 
          key:'id' 
        } 
      }, 
      gender_id: { 
        type: Sequelize.INTEGER, 
        references:{ 
          model:'genders', 
          key:'id' 
        } 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};
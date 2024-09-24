// Import the necessary modules using require
const { DataTypes } = require('sequelize');

// Define the up function to create the 'catagories' table
async function up(queryInterface) {
  await queryInterface.createTable('catagories', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
}

// Define the down function to drop the 'catagories' table
async function down(queryInterface) {
  await queryInterface.dropTable('catagories');
}

// Export the functions using module.exports
module.exports = {
  up,
  down,
};

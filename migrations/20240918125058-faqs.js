const { DataTypes } = require('sequelize');

async function up(queryInterface) {
  await queryInterface.createTable('faqs', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement : true,
      allowNull: false,
      primaryKey: true,
    },
    catagory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'catagories',
        key: 'id'
      },
      onDelete : "CASCADE",
      onUpdate : "CASCADE"
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
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

async function down(queryInterface) {
  await queryInterface.dropTable('faq');
}

module.exports = {
  up,
  down,
};

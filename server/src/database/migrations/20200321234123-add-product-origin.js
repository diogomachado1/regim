module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'origin_id', {
      type: Sequelize.INTEGER,
      references: { model: 'products', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('products', 'origin_id');
  },
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'public', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('products', 'public');
  },
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('events', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('events', 'name');
  },
};

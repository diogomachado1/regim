module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('events', 'end_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.changeColumn('events', 'end_date', {
      allowNull: false,
    });
  },
};

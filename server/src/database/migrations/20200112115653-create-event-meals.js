module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('event_meals', {
      amount: {
        type: Sequelize.Sequelize.DECIMAL(10, 2),
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: { model: 'events', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        primaryKey: true,
      },
      meal_id: {
        type: Sequelize.INTEGER,
        references: { model: 'meals', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        primaryKey: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('event-meals');
  },
};

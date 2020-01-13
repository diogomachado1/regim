module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('single_events', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      event_start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: { model: 'events', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
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
    return queryInterface.dropTable('single-events');
  },
};

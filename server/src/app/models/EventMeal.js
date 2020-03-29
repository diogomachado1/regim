import Sequelize, { Model } from 'sequelize';

class EventMeal extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.DECIMAL(10, 2),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Event, {
      foreignKey: { foreignKey: 'event_id', name: 'eventId' },
    });
    this.belongsTo(models.Meal, {
      foreignKey: { foreignKey: 'meal_id', name: 'mealId' },
      as: 'meal',
    });
  }
}

export default EventMeal;

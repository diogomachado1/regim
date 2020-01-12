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
    this.belongsTo(models.Event, { foreignKey: 'event_id' });
    this.belongsTo(models.Meal, {
      foreignKey: 'meal_id',
      as: 'meals',
    });
  }
}

export default EventMeal;

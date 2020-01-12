import Sequelize, { Model } from 'sequelize';

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE,
        duration: Sequelize.INTEGER,
        repeatable: Sequelize.ENUM('daily', 'weekly'),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsToMany(models.Meal, {
      through: {
        model: models.EventMeal,
      },
      foreignKey: 'event_id',
      constraints: false,
    });
    this.hasMany(models.EventMeal, {
      foreignKey: 'event_id',
      as: 'eventMeals',
    });
    this.hasMany(models.SingleEvent, {
      foreignKey: 'event_id',
      as: 'singleEvents',
    });
  }
}

export default Event;

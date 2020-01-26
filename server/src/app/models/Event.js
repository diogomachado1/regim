import Sequelize, { Model, Op } from 'sequelize';
import Meal from './Meal';

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
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

  static async verifyEventMeals(user_id, eventMeals) {
    const eventMealsIds = eventMeals.map(item => item.mealId);
    const meals = await Meal.findAll({
      attributes: ['id'],
      where: {
        id: {
          [Op.in]: eventMealsIds,
        },
        user_id,
      },
    });
    if (meals.length < eventMeals.length) {
      const mealsIds = meals.map(item => item.id);
      const filteredId = eventMealsIds.filter(
        ingredientId => !mealsIds.find(item => ingredientId === item)
      );
      return {
        isError: true,
        error: `Meal(s) ${filteredId} not found`,
      };
    }
    return {
      isError: false,
    };
  }
}

export default Event;

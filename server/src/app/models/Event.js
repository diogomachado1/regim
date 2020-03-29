import Sequelize, { Model } from 'sequelize';
import EventMeal from './EventMeal';
import Meal from './Meal';
import File from './File';

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
  }

  static get attributes() {
    return ['id', 'startDate', 'endDate', 'duration', 'repeatable', 'name'];
  }

  static get includes() {
    return {
      model: EventMeal,
      as: 'eventMeals',
      attributes: [['meal_id', 'mealId'], ['event_id', 'eventId'], 'amount'],
      include: {
        model: Meal,
        as: 'meal',
        attributes: ['id', 'description', 'name', 'imageId'],
        include: {
          model: File,
          as: 'image',
        },
      },
    };
  }

  static async getUserEvents(user_id) {
    const events = await this.findAll({
      where: { user_id },
      attributes: this.attributes,
    });

    return events.map(item => item.get({ plain: true }));
  }

  static async getEventById(id, user_id) {
    const DocEvent = await this.findOne({
      where: { user_id, id },
      attributes: this.attributes,
      include: this.includes,
    });

    return DocEvent && DocEvent.get({ plain: true });
  }

  static async createEvent(data, user_id) {
    const DocEvent = await await this.create(
      {
        ...data,
        user_id,
      },
      {
        include: [
          {
            model: EventMeal,
            as: 'eventMeals',
            attributes: ['amount', ['meal_id', 'mealId']],
          },
        ],
      }
    );

    const { id, name, repeatable, endDate, startDate, duration } =
      DocEvent && DocEvent.get({ plain: true });

    return { id, name, repeatable, endDate, startDate, duration };
  }

  static async updateEventById(data, id, user_id) {
    const event = await this.sequelize.transaction(async t => {
      const [, [DocEvent]] = await this.update(data, {
        where: { user_id, id },
        returning: true,
        include: [
          {
            model: EventMeal,
            as: 'eventMeals',
            attributes: ['amount', ['meal_id', 'mealId']],
          },
        ],
        transaction: t,
      });

      if (data.eventMeals) {
        await EventMeal.destroy({
          transaction: t,
          where: { event_id: id },
        });

        await EventMeal.bulkCreate(
          data.eventMeals.map(item => ({
            ...item,
            event_id: id,
          })),
          {
            transaction: t,
          }
        );
      }

      return {
        ...DocEvent.get({ plain: true }),
        eventMeals: data.eventMeals,
      };
    });
    return event;
  }

  static async deleteEventById(id, user_id) {
    return this.destroy({
      where: { user_id, id },
    });
  }
}

export default Event;

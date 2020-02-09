import Event from '../models/Event';
import database from '../../database';
import EventMeal from '../models/EventMeal';
import Meal from '../models/Meal';

class EventQuery {
  async getUserEvents(user_id) {
    const events = await Event.findAll({
      where: { user_id },
      attributes: [
        'id',
        'startDate',
        'endDate',
        'duration',
        'repeatable',
        'name',
      ],
    });

    return events.map(item => item.get({ plain: true }));
  }

  async getEventById(id, user_id) {
    const DocEvent = await Event.findOne({
      where: { user_id, id },
      attributes: [
        'id',
        'startDate',
        'endDate',
        'duration',
        'repeatable',
        'name',
      ],
      include: {
        model: EventMeal,
        as: 'eventMeals',
        attributes: [['meal_id', 'mealId'], ['event_id', 'eventId'], 'amount'],
        include: {
          model: Meal,
          as: 'meals',
          attributes: ['id', 'description', 'name'],
        },
      },
    });

    return DocEvent && DocEvent.get({ plain: true });
  }

  async createEvent(data, user_id) {
    const DocEvent = await await Event.create(
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

    return DocEvent && DocEvent.get({ plain: true });
  }

  async updateEventById(data, id, user_id) {
    const event = await database.connection.transaction(async t => {
      const [, [DocEvent]] = await Event.update(data, {
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

  async deleteEventById(id, user_id) {
    return Event.destroy({
      where: { user_id, id },
    });
  }
}

export default new EventQuery();

import { addMinutes, isBefore, addDays, addWeeks } from 'date-fns';
import Event from '../models/Event';
import EventMeal from '../models/EventMeal';
import Meal from '../models/Meal';
import SingleEventSchema from '../schemas/SingleEvent';
import Ingredient from '../models/Ingredient';
import Product from '../models/Product';

class EventServices {
  getSingleEvent(event, userId) {
    const singleEvents = [];
    const { startDate, endDate, duration, repeatable, id } = event;
    if (!event.repeatable) {
      singleEvents.push({
        eventStartDate: startDate,
        eventId: id,
        userId,
      });
    } else if (repeatable === 'daily') {
      let currentDate = startDate;
      const finishDate = addMinutes(endDate, duration);
      while (isBefore(currentDate, finishDate)) {
        singleEvents.push({
          eventStartDate: currentDate,
          eventId: id,
          userId,
        });
        currentDate = addDays(currentDate, 1);
      }
    } else if (repeatable === 'weekly') {
      let currentDate = startDate;
      const finishDate = addMinutes(endDate, duration);
      while (isBefore(currentDate, finishDate)) {
        singleEvents.push({
          eventStartDate: currentDate,
          eventId: id,
          userId,
        });
        currentDate = addWeeks(currentDate, 1);
      }
    }
    return singleEvents;
  }

  async getList(fromDate, toDate, userId) {
    const [singleEvents, events] = await Promise.all([
      SingleEventSchema.aggregate([
        {
          $match: {
            userId,
            eventStartDate: {
              $gte: fromDate,
              $lt: toDate,
            },
          },
        },
        {
          $group: {
            _id: '$eventId',
            count: { $sum: 1 },
          },
        },
      ]),
      this.getAllEventsByUserWithAll(userId),
    ]);
    const values = singleEvents.map(({ _id: id, count }) => ({
      eventId: id,
      count,
      event: events.find(event => event.id === id),
    }));
    const ingredients = {};
    values.forEach(event => {
      event.event.eventMeals.forEach(meal => {
        meal.meals.ingredients.forEach(ingredient => {
          if (ingredients[ingredient.product.name]) {
            ingredients[ingredient.product.name].amountTotal +=
              ingredient.amount * meal.amount * event.count;
          } else {
            ingredients[ingredient.product.name] = {
              product: ingredient.product,
              amountTotal: ingredient.amount * meal.amount * event.count,
            };
          }
        });
      });
      // return {
      //   eventId: id,
      //   count,
      //   event: events.find(event => event.id === id),
      // };
    });

    return Object.values(ingredients).map(item => ({
      ...item,
      priceTotal: item.amountTotal * (item.product.price / item.product.amount),
    }));
  }

  async getSingleEventByDate(fromDate, toDate, userId) {
    const [singleEvents, events] = await Promise.all([
      SingleEventSchema.find({
        eventStartDate: {
          $gte: fromDate,
          $lt: toDate,
        },
        userId,
      })
        .sort('eventStartDate')
        .lean(),
      this.getAllEventsByUser(userId),
    ]);

    return singleEvents.map(item => ({
      ...item,
      event: events.find(event => event.id === item.eventId),
    }));
  }

  async getAllEventsByUser(userId) {
    const events = await Event.findAll({
      where: { user_id: userId },
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

  async getAllEventsByUserWithAll(userId) {
    const events = await Event.findAll({
      where: { user_id: userId },
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
        attributes: ['amount', ['meal_id', 'mealId']],
        include: {
          model: Meal,
          as: 'meals',
          attributes: ['id', 'description', 'name'],
          include: {
            model: Ingredient,
            as: 'ingredients',
            attributes: ['amount', ['product_id', 'productId']],
            include: {
              model: Product,
              as: 'product',
              attributes: ['name', 'measure', 'amount', 'price'],
            },
          },
        },
      },
    });

    return events.map(item => item.get({ plain: true }));
  }
}

export default new EventServices();

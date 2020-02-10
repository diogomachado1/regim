import { addMinutes, isBefore, addDays, addWeeks } from 'date-fns';
import Event from '../models/Event';
import EventMeal from '../models/EventMeal';
import Meal from '../models/Meal';
import Ingredient from '../models/Ingredient';
import Product from '../models/Product';
import SingleEventQuery from '../Queries/SingleEventQuery';
import EventQuery from '../Queries/EventQuery';
import ValidationError from '../Error/ValidationError';
import { notFound } from '../Error/TypeErrors';
import EventValidator from '../Validators/EventValidator';
import MealService from './MealService';

class EventServices {
  async verifyAndGetEvent(id, userId) {
    const event = await EventQuery.getEventById(id, userId);
    if (!event) throw new ValidationError(notFound('Event'));
    return event;
  }

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

  // to listService
  async getList(fromDate, toDate, userId) {
    const [singleEvents, events] = await Promise.all([
      SingleEventQuery.getSingleEventGroupByEventId(fromDate, toDate, userId),
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
    });

    return Object.values(ingredients).map(item => ({
      ...item,
      priceTotal: item.amountTotal * (item.product.price / item.product.amount),
    }));
  }

  async getSingleEventsByDate(fromDate, toDate, userId) {
    const [singleEvents, events] = await Promise.all([
      SingleEventQuery.getSingleEventByDate(fromDate, toDate, userId),
      EventQuery.getUserEvents(userId),
    ]);

    return singleEvents.map(item => ({
      ...item,
      event: events.find(event => event.id === item.eventId),
    }));
  }

  async getUserEvents(userId) {
    return EventQuery.getUserEvents(userId);
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

  async create(data, userId) {
    const ValidatedEvent = await EventValidator.createValidator(data);

    if (ValidatedEvent.eventMeals) {
      await this.verifyEventMeals(userId, ValidatedEvent.eventMeals);
    }

    const event = await EventQuery.createEvent(ValidatedEvent, userId);
    const singleEvents = this.getSingleEvent(
      { ...ValidatedEvent, id: event.id },
      userId
    );
    const saves = await SingleEventQuery.createMany(singleEvents);

    return { ...event, events: saves.length };
  }

  async update(data, id, userId) {
    const event = await this.verifyAndGetEvent(id, userId);

    const ValidatedEvent = await EventValidator.updateValidator({
      repeatable: event.repeatable,
      startDate: event.startDate,
      ...data,
    });

    if (data.eventMeals) {
      await this.verifyEventMeals(userId, ValidatedEvent.eventMeals);
    }

    const eventSaved = await EventQuery.updateEventById(
      ValidatedEvent,
      id,
      userId
    );

    const singleEvents = this.getSingleEvent(
      { ...ValidatedEvent, id: eventSaved.id },
      userId
    );
    const saves = await SingleEventQuery.updateMany(singleEvents);

    return { ...eventSaved, events: saves.length };
  }

  async delete(id, userId) {
    const deleteds = await EventQuery.deleteEventById(id, userId);
    if (!deleteds === 0) throw new ValidationError(notFound('Event'));
    await SingleEventQuery.deleteMany(id);
    return true;
  }

  async verifyEventMeals(user_id, eventMeals) {
    const eventMealsIds = eventMeals.map(item => item.mealId);
    const meals = await MealService.getUserMealsByIds(eventMeals, user_id);
    if (meals.length < eventMeals.length) {
      const mealsIds = meals.map(item => item.id);
      const filteredId = eventMealsIds.filter(
        ingredientId => !mealsIds.find(item => ingredientId === item)
      );
      throw new ValidationError(notFound(`Meal(s) :${filteredId}`));
    }
    return true;
  }
}

export default new EventServices();

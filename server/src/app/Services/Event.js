import Event from '../models/Event';
import EventMeal from '../models/EventMeal';
import Meal from '../models/Meal';
import Ingredient from '../models/Ingredient';
import Product from '../models/Product';
import EventValidator from '../Validators/EventValidator';
import MealService from './MealService';
import NotFoundError from '../Error/NotFoundError';
import SingleEventService from './SingleEventService';

class EventServices {
  constructor() {
    this.model = Event;
  }

  async verifyAndGetEvent(id, userId) {
    const event = await this.model.getEventById(id, userId);
    if (!event) throw new NotFoundError('Event');
    return event;
  }

  // to listService
  async getList(fromDate, toDate, userId) {
    const events = await this.getAllEventsByUserWithAll(userId);
    const values = SingleEventService.getEventSingleWithCount(
      events,
      userId,
      fromDate,
      toDate
    );
    const ingredients = {};
    values.forEach(event => {
      event.event.eventMeals.forEach(eventMeal => {
        eventMeal.meal.ingredients.forEach(ingredient => {
          if (ingredients[ingredient.product.name]) {
            ingredients[ingredient.product.name].amountTotal +=
              ingredient.amount * eventMeal.amount * event.count;
          } else {
            ingredients[ingredient.product.name] = {
              product: ingredient.product,
              amountTotal: ingredient.amount * eventMeal.amount * event.count,
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
    const events = await this.model.getUserEvents(userId);
    const singleEvents = SingleEventService.getEventSingleList(
      events,
      userId,
      fromDate,
      toDate
    );

    return singleEvents;
  }

  async getUserEvents(userId) {
    return this.model.getUserEvents(userId);
  }

  async getAllEventsByUserWithAll(userId) {
    const events = await this.model.findAll({
      where: { user_id: userId },
      attributes: this.model.attributes,
      include: {
        model: EventMeal,
        as: 'eventMeals',
        attributes: ['amount', ['meal_id', 'mealId']],
        include: {
          model: Meal,
          as: 'meal',
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

    const event = await this.model.createEvent(ValidatedEvent, userId);

    return { ...event };
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

    const eventSaved = await this.model.updateEventById(
      ValidatedEvent,
      id,
      userId
    );

    return { ...eventSaved };
  }

  async delete(id, userId) {
    const deleteds = await this.model.deleteEventById(id, userId);
    if (!deleteds === 0) throw new NotFoundError('Event');
    return true;
  }

  async verifyEventMeals(user_id, eventMeals) {
    const eventMealsIds = eventMeals.map(item => item.mealId);
    const meals = await MealService.getUserMealsByIds(eventMealsIds, user_id);
    if (meals.length < eventMeals.length) {
      const mealsIds = meals.map(item => item.id);
      const filteredId = eventMealsIds.filter(
        ingredientId => !mealsIds.find(item => ingredientId === item)
      );
      throw new NotFoundError(`Meal(s) :${filteredId}`);
    }
    return true;
  }
}

export default new EventServices();

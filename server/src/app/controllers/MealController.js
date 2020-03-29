import MealService from '../Services/MealService';

class MealsController {
  async index(req, res, next) {
    const { userId } = req;
    const { page, search } = req.query;

    const meals = await MealService.getUserMeals(userId, page, search);

    req.response = meals;
    res.json(meals);
    return next();
  }

  async show(req, res, next) {
    const {
      userId,
      params: { id },
    } = req;

    const meal = await MealService.verifyAndGetMeal(id, userId);

    req.response = meal;
    res.json(meal);
    return next();
  }

  async store(req, res, next) {
    const { userId } = req;

    const meal = await MealService.create(req.body, userId);

    res.status(201).json(meal);
    return next();
  }

  async update(req, res, next) {
    const {
      userId,
      params: { id },
    } = req;

    const meal = await MealService.update(req.body, id, userId);

    res.status(200).json(meal);
    return next();
  }

  async delete(req, res, next) {
    const {
      userId,
      params: { id },
    } = req;

    await MealService.delete(id, userId);

    res.status(204).json();
    return next();
  }
}

export default new MealsController();

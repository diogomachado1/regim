import MealService from '../Services/MealService';

class MealsController {
  async index(req, res) {
    const { userId } = req;
    const { page } = req.query;

    const meals = await MealService.getUserMeals(userId, page);

    return res.json(meals);
  }

  async show(req, res) {
    const {
      userId,
      params: { id },
    } = req;

    const meal = await MealService.verifyAndGetMeal(id, userId);

    return res.json(meal);
  }

  async store(req, res) {
    const { userId } = req;

    const meal = await MealService.create(req.body, userId);

    return res.status(201).json(meal);
  }

  async update(req, res) {
    const {
      userId,
      params: { id },
    } = req;

    const meal = await MealService.update(req.body, id, userId);

    return res.status(200).json(meal);
  }

  async delete(req, res) {
    const {
      userId,
      params: { id },
    } = req;

    await MealService.delete(id, userId);

    return res.status(204).json();
  }
}

export default new MealsController();

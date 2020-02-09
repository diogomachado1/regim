import MealValidator from '../Validators/MealValidator';
import MealService from '../Services/MealService';

class MealsController {
  async index(req, res) {
    const { userId } = req;

    const meals = await MealService.getUserMeals(userId);

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

    const mealReponse = await MealValidator.format(meal);
    return res.status(201).json(mealReponse);
  }

  async update(req, res) {
    const {
      userId,
      params: { id },
    } = req;

    const meal = await MealService.update(req.body, id, userId);

    const mealReponse = await MealValidator.format(meal);
    return res.status(200).json(mealReponse);
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

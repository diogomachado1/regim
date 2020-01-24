import Meal from '../models/Meal';
import Ingredient from '../models/Ingredient';
import Product from '../models/Product';
import database from '../../database';
import MealValidator from '../Validators/MealValidator';

class MealsController {
  async index(req, res) {
    const { userId: user_id } = req;

    const meals = await Meal.findAll({
      attributes: ['id', 'description', 'name'],
      where: { user_id },
      include: [
        {
          model: Ingredient,
          as: 'ingredients',
          attributes: ['amount', ['product_id', 'productId']],
          include: {
            model: Product,
            as: 'product',
            attributes: ['name', 'measure', 'amount', 'price'],
          },
        },
      ],
    });
    return res.json(meals);
  }

  async show(req, res) {
    const {
      userId: user_id,
      params: { id },
    } = req;

    const meal = await Meal.findOne({
      attributes: ['id', 'description', 'name'],
      where: { user_id, id },
      include: [
        {
          model: Ingredient,
          as: 'ingredients',
          attributes: ['amount', ['product_id', 'productId']],
          include: {
            model: Product,
            as: 'product',
            attributes: ['name', 'measure', 'amount', 'price'],
          },
        },
      ],
    });

    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    return res.json(meal);
  }

  async store(req, res) {
    const { userId: user_id } = req;

    const ValidatedMeal = await MealValidator.createValidator(req.body);

    if (ValidatedMeal.isError) {
      return res.status(400).json({ error: ValidatedMeal.error });
    }

    if (ValidatedMeal.ingredients) {
      const verifyIngredient = await Meal.verifyIngredients(
        user_id,
        ValidatedMeal.ingredients
      );
      if (verifyIngredient.isError) {
        return res.status(400).json({ error: verifyIngredient.error });
      }
    }

    const mealSave = await database.connection.transaction(async t => {
      return Meal.create(
        {
          ...ValidatedMeal,
          user_id,
        },
        {
          include: [
            {
              model: Ingredient,
              as: 'ingredients',
            },
          ],
          transaction: t,
        }
      );
    });

    const mealReponse = await MealValidator.format(mealSave.dataValues);
    return res.status(201).json(mealReponse);
  }

  async update(req, res) {
    const {
      userId: user_id,
      params: { id },
    } = req;

    const ValidatedMeal = await MealValidator.updateValidator(req.body);

    if (ValidatedMeal.isError) {
      return res.status(400).json(ValidatedMeal.error);
    }

    const meal = await Meal.findByPk(id, {
      where: { user_id },
      include: [{ model: Ingredient, as: 'ingredients' }],
    });
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    if (ValidatedMeal.ingredients) {
      const verifyIngredient = await Meal.verifyIngredients(
        user_id,
        ValidatedMeal.ingredients
      );
      if (verifyIngredient.isError) {
        return res.status(400).json({ error: verifyIngredient.error });
      }
    }

    const mealUpdated = await database.connection.transaction(async t => {
      // step 1
      if (ValidatedMeal.ingredients) {
        await Ingredient.destroy({
          transaction: t,
          where: { meal_id: meal.id },
        });

        await Ingredient.bulkCreate(
          ValidatedMeal.ingredients.map(item => ({
            ...item,
            meal_id: meal.id,
          })),
          {
            transaction: t,
          }
        );
      }

      // step 2
      return meal.update(
        {
          ...meal,
          ...ValidatedMeal,
          user_id,
        },
        {
          include: [{ model: Ingredient, as: 'ingredients' }],
          transaction: t,
          attributes: ['amount', ['product_id', 'productId']],
        }
      );
    });
    const mealReponse = await MealValidator.format(mealUpdated.dataValues);
    return res.status(200).json(mealReponse);
  }

  async delete(req, res) {
    const {
      userId: user_id,
      params: { id },
    } = req;

    const deleteds = await Meal.destroy({
      where: { user_id, id },
    });

    if (deleteds === 0) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    return res.status(204).json();
  }
}

export default new MealsController();

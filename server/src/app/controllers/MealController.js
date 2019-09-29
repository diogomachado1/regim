import * as Yup from 'yup';

import Meal from '../models/Meal';
import Ingredient from '../models/Ingredient';
import Product from '../models/Product';
import database from '../../database';

class MealsController {
  async index(req, res) {
    const { userId: user_id } = req;

    const meals = await Meal.findAll({
      where: { user_id },
      include: [
        { model: Ingredient, as: 'ingredients', include: { model: Product } },
      ],
    });
    return res.json(meals);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      ingredients: Yup.array().of(
        Yup.object().shape({
          ProductId: Yup.number().required(),
        })
      ),
    });

    const { userId: user_id } = req;

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.errors[0] });
    }

    const meal = await database.connection.transaction(async t => {
      return Meal.create(
        {
          ...req.body,
          user_id,
        },
        { include: [{ model: Ingredient, as: 'ingredients' }], transaction: t }
      );
    });

    return res.status(201).json(meal);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      ingredients: Yup.array().of(
        Yup.object().shape({
          ProductId: Yup.number().required(),
        })
      ),
    });

    const {
      userId: user_id,
      params: { id },
    } = req;

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.errors[0] });
    }

    const meal = await Meal.findByPk(id, {
      where: { user_id },
      include: [{ model: Ingredient, as: 'ingredients' }],
    });
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    const mealUpdated = await database.connection.transaction(async t => {
      // step 1

      await meal.destroy({ transaction: t });

      // step 2
      return Meal.create(
        {
          ...meal,
          ...req.body,
          id: meal.id,
          createdAt: meal.createdAt,
          user_id,
        },
        { include: [{ model: Ingredient, as: 'ingredients' }], transaction: t }
      );
    });
    return res.status(200).json(mealUpdated);
  }

  async delete(req, res) {
    const {
      userId: user_id,
      params: { id },
    } = req;

    const deleteds = await Meal.destroy({
      where: { user_id, id },
    });
    if (deleteds) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    return res.status(204).json();
  }
}

export default new MealsController();

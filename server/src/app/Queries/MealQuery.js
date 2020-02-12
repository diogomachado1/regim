import { Op } from 'sequelize';
import Meal from '../models/Meal';
import Ingredient from '../models/Ingredient';
import Product from '../models/Product';
import database from '../../database';

class MealQuery {
  async getUserMeals(user_id) {
    const DocMeals = await Meal.findAll({
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

    return DocMeals.map(meal => meal.get());
  }

  async getUserMealsByIds(ids, user_id) {
    const DocMeals = Meal.findAll({
      attributes: ['id'],
      where: {
        id: {
          [Op.in]: ids,
        },
        user_id,
      },
    });

    return DocMeals.map(meal => meal.get());
  }

  async getMealById(id, user_id) {
    const DocMeal = await Meal.findOne({
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

    return DocMeal && DocMeal.get();
  }

  async createMeal(data, user_id) {
    const meal = await database.connection.transaction(async t => {
      const { id, name, description } = await Meal.create(
        {
          ...data,
          user_id,
        },
        {
          transaction: t,
        }
      );

      let ingredients = [];
      if (data.ingredients) {
        ingredients = await Ingredient.bulkCreate(
          data.ingredients.map(item => ({
            ...item,
            mealId: id,
          })),
          {
            transaction: t,
          }
        );
      }
      ingredients = ingredients.map(item => item.get({ plain: true }));
      ingredients = ingredients.map(({ productId, amount }) => ({
        productId,
        amount,
      }));

      return {
        name,
        id,
        description,
        ingredients,
      };
    });

    return meal;
  }

  async updateMealById(data, id, user_id) {
    const meal = await database.connection.transaction(async t => {
      // step 1
      let ingredients = [];
      if (data.ingredients) {
        await Ingredient.destroy({
          transaction: t,
          where: { meal_id: id },
        });
        ingredients = await Ingredient.bulkCreate(
          data.ingredients.map(item => ({
            ...item,
            mealId: id,
          })),
          {
            transaction: t,
          }
        );
      }
      const [, [{ name, description }]] = await Meal.update(data, {
        where: { user_id, id },
        returning: true,
        include: [{ model: Ingredient, as: 'ingredients' }],
        transaction: t,
        attributes: ['amount', ['product_id', 'productId']],
      });

      return {
        name,
        id,
        description,
        ingredients,
      };
    });
    return meal;
  }

  async deleteMealById(id, user_id) {
    return Meal.destroy({
      where: { user_id, id },
    });
  }
}

export default new MealQuery();

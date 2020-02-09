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
    const DocMeal = await Meal.create(
      {
        ...data,
        user_id,
      },
      {
        include: [
          {
            model: Ingredient,
            as: 'ingredients',
          },
        ],
      }
    );

    return DocMeal && DocMeal.get();
  }

  async updateMealById(data, id, user_id) {
    const [, [DocMeal]] = await database.connection.transaction(async t => {
      // step 1
      if (data.ingredients) {
        await Ingredient.destroy({
          transaction: t,
          where: { meal_id: id },
        });

        await Ingredient.bulkCreate(
          data.ingredients.map(item => ({
            ...item,
            meal_id: id,
          })),
          {
            transaction: t,
          }
        );
      }

      // step 2
      return Meal.update(data, {
        where: { user_id, id },
        returning: true,
        include: [{ model: Ingredient, as: 'ingredients' }],
        transaction: t,
        attributes: ['amount', ['product_id', 'productId']],
      });
    });
    return DocMeal && DocMeal.get();
  }

  async deleteMealById(id, user_id) {
    return Meal.destroy({
      where: { user_id, id },
    });
  }
}

export default new MealQuery();

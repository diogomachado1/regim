import Sequelize, { Model, Op } from 'sequelize';
import Product from './Product';
import Ingredient from './Ingredient';
import File from './File';

class Meal extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsToMany(models.Product, {
      through: {
        model: models.Ingredient,
      },
      foreignKey: { field: 'product_id', name: 'productId' },
      as: 'product',
      constraints: false,
    });
    this.hasMany(models.Ingredient, {
      foreignKey: 'meal_id',
      as: 'ingredients',
    });
    this.belongsTo(models.File, {
      foreignKey: { field: 'image_id', name: 'imageId' },
      as: 'image',
    });
  }

  static get includes() {
    return [
      {
        model: File,
        as: 'image',
      },
      {
        model: Ingredient,
        as: 'ingredients',
        attributes: ['amount', ['product_id', 'productId']],
        include: {
          model: Product,
          as: 'product',
          attributes: ['name', 'measure', 'amount', 'price'],
          include: {
            model: File,
            as: 'image',
          },
        },
      },
    ];
  }

  static async getUserMeals(user_id, page, search) {
    const DocMeals = await Meal.findAndCountAll({
      attributes: ['id', 'description', 'name', 'imageId'],
      where: { user_id, name: { [Op.iLike]: `%${search}%` } },
      include: this.includes,
      limit: 10,
      offset: (page - 1) * 10,
      order: [['createdAt', 'DESC']],
    });

    return DocMeals;
  }

  static async getUserMealsByIds(ids, user_id) {
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

  static async getMealById(id, user_id) {
    const DocMeal = await Meal.findOne({
      attributes: ['id', 'description', 'name'],
      where: { user_id, id },
      include: this.includes,
    });

    return DocMeal && DocMeal.get();
  }

  static async createMeal(data, user_id) {
    const meal = await this.sequelize.transaction(async t => {
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

  static async updateMealById(data, id, user_id) {
    const meal = await this.sequelize.transaction(async t => {
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

  static async deleteMealById(id, user_id) {
    return Meal.destroy({
      where: { user_id, id },
    });
  }
}

export default Meal;

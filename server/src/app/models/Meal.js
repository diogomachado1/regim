import Sequelize, { Model, Op } from 'sequelize';
import Product from './Product';

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
      foreignKey: 'meal_id',
      constraints: false,
    });
    this.hasMany(models.Ingredient, {
      foreignKey: 'meal_id',
      as: 'ingredients',
    });
  }

  static async verifyIngredients(user_id, ingredients) {
    const ingredientsProductsIds = ingredients.map(item => item.productId);
    const products = await Product.findAll({
      attributes: ['id'],
      where: {
        id: {
          [Op.in]: ingredientsProductsIds,
        },
        user_id,
      },
    });
    if (products.length < ingredients.length) {
      const productsIds = products.map(item => item.id);
      const filteredId = ingredientsProductsIds.filter(
        ingredientId => !productsIds.find(item => ingredientId === item)
      );
      return {
        isError: true,
        error: `Product(s) ${filteredId} not found`,
      };
    }
    return {
      isError: false,
    };
  }
}

export default Meal;

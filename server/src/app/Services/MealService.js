import MealValidator from '../Validators/MealValidator';
import ProductService from './ProductService';
import NotFoundError from '../Error/NotFoundError';
import Meal from '../models/Meal';

class MealServices {
  constructor() {
    this.model = Meal;
  }

  async getUserMeals(userId) {
    return this.model.getUserMeals(userId);
  }

  async getUserMealsByIds(ids, userId) {
    return this.model.getUserMealsByIds(ids, userId);
  }

  async verifyAndGetMeal(id, userId) {
    const meal = await this.model.getMealById(id, userId);
    if (!meal) throw new NotFoundError('Meal');
    return meal;
  }

  async create(data, userId) {
    const ValidatedMeal = await MealValidator.createValidator(data);

    if (ValidatedMeal.ingredients) {
      await this.verifyIngredients(userId, ValidatedMeal.ingredients);
    }

    const meal = await this.model.createMeal(ValidatedMeal, userId);
    return meal;
  }

  async update(data, id, userId) {
    const ValidatedMeal = await MealValidator.updateValidator(data);

    await this.verifyAndGetMeal(id, userId);

    if (ValidatedMeal.ingredients) {
      await this.verifyIngredients(userId, ValidatedMeal.ingredients);
    }

    return this.model.updateMealById(data, id, userId);
  }

  async delete(id, userId) {
    const deleteds = await this.model.deleteMealById(id, userId);
    if (!deleteds === 0) throw new NotFoundError('Meal');
    return true;
  }

  async verifyIngredients(user_id, ingredients) {
    const ingredientsProductsIds = ingredients.map(item => item.productId);
    const products = await ProductService.getUserProductsByIds(
      ingredientsProductsIds,
      user_id
    );
    if (products.length < ingredients.length) {
      const productsIds = products.map(item => item.id);
      const filteredId = ingredientsProductsIds.filter(
        ingredientId => !productsIds.find(item => ingredientId === item)
      );
      throw new NotFoundError(`Products: ${filteredId}`);
    }
    return true;
  }
}

export default new MealServices();

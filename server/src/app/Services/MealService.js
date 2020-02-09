import MealQuery from '../Queries/MealQuery';
import ValidationError from '../Error/ValidationError';
import { notFound } from '../Error/TypeErrors';
import MealValidator from '../Validators/MealValidator';
import ProductService from './ProductService';

class MealServices {
  async getUserMeals(userId) {
    return MealQuery.getUserMeals(userId);
  }

  async verifyAndGetMeal(id, userId) {
    const meal = await MealQuery.getMealById(id, userId);
    if (!meal) throw new ValidationError(notFound('Meal'));
    return meal;
  }

  async create(data, userId) {
    const ValidatedMeal = await MealValidator.createValidator(data);

    if (ValidatedMeal.ingredients) {
      await this.verifyIngredients(userId, ValidatedMeal.ingredients);
    }

    const meal = await MealQuery.createMeal(ValidatedMeal, userId);
    return meal;
  }

  async update(data, id, userId) {
    const ValidatedMeal = await MealValidator.updateValidator(data);

    await this.verifyAndGetMeal(id, userId);

    if (ValidatedMeal.ingredients) {
      await this.verifyIngredients(userId, ValidatedMeal.ingredients);
    }

    return MealQuery.updateMealById(data, id, userId);
  }

  async delete(id, userId) {
    const deleteds = await MealQuery.deleteMealById(id, userId);
    if (!deleteds === 0) throw new ValidationError(notFound('Meal'));
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
      throw new ValidationError(notFound(`Products :${filteredId}`));
    }
    return true;
  }
}

export default new MealServices();

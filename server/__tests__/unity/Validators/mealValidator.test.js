/* eslint-disable no-undef */
// import request from 'supertest';
import MealValidator from '../../../src/app/Validators/MealValidator';

import factory from '../../factories';

describe('MealsValidator', () => {
  // CreateValidator
  // Name
  it('should have name when create a meal', async () => {
    const meal = await factory.attrs('Meal', {
      name: undefined,
    });
    await expect(MealValidator.createValidator(meal)).rejects.toThrow(
      /name is a required field./
    );
  });

  it('should have name trim when create a meal', async () => {
    const meal = await factory.attrs('Meal', {
      name: ' name ',
    });
    const Meal = await MealValidator.createValidator(meal);
    expect(Meal.name).toBe('name');
  });

  // Description
  it('should have description trim when create a meal', async () => {
    const meal = await factory.attrs('Meal', {
      description: ' description ',
    });
    const Meal = await MealValidator.createValidator(meal);
    expect(Meal.description).toBe('description');
  });

  // ingredients
  it('should be ingredients Array when create a meal', async () => {
    const meal = await factory.attrs('Meal', {
      ingredients: 'test',
    });
    await expect(MealValidator.createValidator(meal)).rejects.toThrow(
      /ingredients must be a `array` type/
    );
  });

  // Ingredient/productId
  it('should be ingredients[0].productId is a required field when create a meal', async () => {
    const meal = await factory.attrs('Meal', {
      ingredients: [factory.attrs('Ingredient', { productId: undefined })],
    });
    await expect(MealValidator.createValidator(meal)).rejects.toThrow(
      /productId is a required field/
    );
  });

  it('ingredients[0].productId must be a `number` type when create a meal', async () => {
    const meal = await factory.attrs('Meal', {
      ingredients: [factory.attrs('Ingredient', { productId: 'test' })],
    });
    await expect(MealValidator.createValidator(meal)).rejects.toThrow(
      /productId must be a `number` type/
    );
  });

  it('ingredients[0].productId must be an integer when create a meal', async () => {
    const meal = await factory.attrs('Meal', {
      ingredients: [factory.attrs('Ingredient', { productId: 1.5 })],
    });
    await expect(MealValidator.createValidator(meal)).rejects.toThrow(
      /productId must be an integer/
    );
  });

  it('ingredients[0].productId must be greater than or equal to 0 when create a meal', async () => {
    const meal = await factory.attrs('Meal', {
      ingredients: [factory.attrs('Ingredient', { productId: -1 })],
    });
    await expect(MealValidator.createValidator(meal)).rejects.toThrow(
      /productId must be greater than or equal to 0/
    );
  });
  // Ingredient/Amount

  it('ingredients[0].amount must be a `number` type when create a meal', async () => {
    const meal = await factory.attrs('Meal', {
      ingredients: [factory.attrs('Ingredient', { amount: 'test' })],
    });
    await expect(MealValidator.createValidator(meal)).rejects.toThrow(
      /amount must be a `number` type/
    );
  });

  it('ingredients[0].amount must be greater than or equal to 0 when create a meal', async () => {
    const meal = await factory.attrs('Meal', {
      ingredients: [factory.attrs('Ingredient', { amount: -1 })],
    });
    await expect(MealValidator.createValidator(meal)).rejects.toThrow(
      /amount must be greater than or equal to 0/
    );
  });
  // updateValidator
  // Name

  it('should have name trim when update a meal', async () => {
    const meal = await factory.attrs('Meal', {
      name: ' name ',
    });
    const Meal = await MealValidator.createValidator(meal);
    expect(Meal.name).toBe('name');
  });

  // Description
  it('should have description trim when update a meal', async () => {
    const meal = await factory.attrs('Meal', {
      description: ' description ',
    });
    const Meal = await MealValidator.updateValidator(meal);
    expect(Meal.description).toBe('description');
  });

  // ingredients
  it('should be ingredients Array when update a meal', async () => {
    const meal = await factory.attrs('Meal', {
      ingredients: 'test',
    });
    await expect(MealValidator.updateValidator(meal)).rejects.toThrow(
      /ingredients must be a `array` type/
    );
  });

  // Ingredient/productId
  it('should be ingredients[0].productId is a required field when update a meal', async () => {
    const meal = await factory.attrs('Meal', {
      ingredients: [factory.attrs('Ingredient', { productId: undefined })],
    });
    await expect(MealValidator.updateValidator(meal)).rejects.toThrow(
      /productId is a required field/
    );
  });

  it('ingredients[0].productId must be a `number` type when update a meal', async () => {
    const meal = await factory.attrs('Meal', {
      ingredients: [factory.attrs('Ingredient', { productId: 'test' })],
    });
    await expect(MealValidator.updateValidator(meal)).rejects.toThrow(
      /productId must be a `number` type/
    );
  });

  it('ingredients[0].productId must be an integer when update a meal', async () => {
    const meal = await factory.attrs('Meal', {
      ingredients: [factory.attrs('Ingredient', { productId: 1.5 })],
    });
    await expect(MealValidator.updateValidator(meal)).rejects.toThrow(
      /productId must be an integer/
    );
  });

  it('ingredients[0].productId must be greater than or equal to 0 when update a meal', async () => {
    const meal = await factory.attrs('Meal', {
      ingredients: [factory.attrs('Ingredient', { productId: -1 })],
    });
    await expect(MealValidator.updateValidator(meal)).rejects.toThrow(
      /productId must be greater than or equal to 0/
    );
  });
  // Ingredient/Amount

  it('ingredients[0].amount must be a `number` type when update a meal', async () => {
    const meal = await factory.attrs('Meal', {
      ingredients: [factory.attrs('Ingredient', { amount: 'test' })],
    });
    await expect(MealValidator.updateValidator(meal)).rejects.toThrow(
      /amount must be a `number` type/
    );
  });

  it('ingredients[0].amount must be greater than or equal to 0 when update a meal', async () => {
    const meal = await factory.attrs('Meal', {
      ingredients: [factory.attrs('Ingredient', { amount: -1 })],
    });
    await expect(MealValidator.updateValidator(meal)).rejects.toThrow(
      /amount must be greater than or equal to 0/
    );
  });
});

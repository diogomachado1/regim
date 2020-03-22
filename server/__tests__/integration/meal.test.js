/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import {
  createTokenAndUser,
  createMeals,
  createProducts,
} from '../util/functions';

describe('Meals', () => {
  beforeEach(async () => {
    await truncate();
  });
  afterAll(async () => {
    app.close();
  });

  it('should be able to create a meal', async () => {
    const { token } = await createTokenAndUser();
    const { product } = await createProducts();
    const meal = await factory.attrs('Meal', {
      ingredients: [
        await factory.attrs('Ingredient', { productId: product.id }),
      ],
    });
    const response = await request(app.server)
      .post('/v1/pvt/meals')
      .set('Authorization', `bearer ${token}`)
      .send(meal);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(meal);
  });

  it('should return meals', async () => {
    const { token } = await createMeals();

    const response = await request(app.server)
      .get('/v1/pvt/meals')
      .set('Authorization', `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);
  });

  it('should be able to update a meal', async () => {
    const { meal, token } = await createMeals();
    const { product } = await createProducts();

    const newMeal = await factory.attrs('Meal', {
      ingredients: [
        await factory.attrs('Ingredient', { productId: product.id }),
      ],
    });
    const response = await request(app.server)
      .put(`/v1/pvt/meals/${meal.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newMeal);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(newMeal);
  });

  it('should be able to delete a meal', async () => {
    const { meal, token } = await createMeals();
    const response = await request(app.server)
      .delete(`/v1/pvt/meals/${meal.id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(204);
  });
});

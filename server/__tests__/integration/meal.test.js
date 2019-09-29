/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import { createTokenAndUser } from '../util/functions';

async function createMeals() {
  const { token } = await createTokenAndUser();
  const meal = await factory.attrs('Meal');

  const response = await request(app)
    .post('/meals')
    .set('Authorization', `bearer ${token}`)
    .send(meal);
  return { meal: response.body, token };
}

describe('Meals', () => {
  beforeEach(async () => {
    await truncate();
  });
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  it('should be able to create a meal', async () => {
    const { token } = await createTokenAndUser();
    const meal = await factory.attrs('Meal');

    const response = await request(app)
      .post('/meals')
      .set('Authorization', `bearer ${token}`)
      .send(meal);

    expect(response.body).toMatchObject(meal);
  });

  it('should be validation when create a meal', async () => {
    const { token } = await createTokenAndUser();
    const meal = await factory.attrs('Meal', {
      name: undefined,
    });

    const response = await request(app)
      .post('/meals')
      .set('Authorization', `bearer ${token}`)
      .send(meal);

    expect(response.status).toBe(400);
  });

  it('should return meals', async () => {
    const { meal, token } = await createMeals();

    const response = await request(app)
      .get('/meals')
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toMatchObject([{ ...meal }]);
  });

  it('should be able to update a meal', async () => {
    const { meal, token } = await createMeals();

    const newMeal = await factory.attrs('Meal');
    const response = await request(app)
      .put(`/meals/${meal.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newMeal);

    expect(response.body).toMatchObject(newMeal);
  });

  it('should be validation when update a meal', async () => {
    const { meal, token } = await createMeals();
    const newMeal = await factory.attrs('Meal', {
      ingredients: [
        {
          amount: '101.00',
        },
      ],
    });

    const response = await request(app)
      .put(`/meals/${meal.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newMeal);

    expect(response.status).toBe(400);
  });

  it('should have valid id to update a meal', async () => {
    const { meal, token } = await createMeals();

    const newMeal = await factory.attrs('Meal');

    const response = await request(app)
      .put(`/meals/${meal.id + 1}`)
      .set('Authorization', `bearer ${token}`)
      .send(newMeal);

    expect(response.status).toBe(404);
  });

  it('should be able to delete a meal', async () => {
    const { meal, token } = await createMeals();
    console.log(meal);
    const response = await request(app)
      .delete(`/meals/${meal.id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('should have valid id to delete a meal', async () => {
    const { meal, token } = await createMeals();
    console.log(meal);

    const response = await request(app)
      .delete(`/meals/${meal.id + 1}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(404);
  });
});

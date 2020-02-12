import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';

async function createUser() {
  const user = await factory.attrs('User');

  await request(app.server)
    .post('/users')
    .send(user);
  return user;
}

async function createTokenAndUser(user) {
  user = user || (await createUser());

  const {
    body: { token },
  } = await request(app.server)
    .post('/sessions')
    .send({ email: user.email, password: user.password });
  return { token, user };
}

async function createProducts() {
  const { token } = await createTokenAndUser();
  const product = await factory.attrs('Product');

  const response = await request(app.server)
    .post('/products')
    .set('Authorization', `bearer ${token}`)
    .send(product);
  return { product: response.body, token };
}

async function createMeals() {
  const { token } = await createTokenAndUser();
  const meal = await factory.attrs('Meal');

  const response = await request(app.server)
    .post('/meals')
    .set('Authorization', `bearer ${token}`)
    .send(meal);
  return { meal: response.body, token };
}

async function createEvent() {
  const { token } = await createTokenAndUser();
  const event = await factory.attrs('Event');
  const response = await request(app.server)
    .post('/events')
    .set('Authorization', `bearer ${token}`)
    .send(event);
  return { event: response.body, token };
}

export {
  createUser,
  createTokenAndUser,
  createMeals,
  createProducts,
  createEvent,
};

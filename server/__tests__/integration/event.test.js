/* eslint-disable no-undef */
import request from 'supertest';

import { parseISO } from 'date-fns';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import {
  createTokenAndUser,
  createEvent,
  createMeals,
} from '../util/functions';
import Event from '../../src/app/Services/Event';

describe('Events Create', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    app.close();
  });

  it('should be able to creat event ', async () => {
    const { token, meal } = await createMeals();
    const event = await factory.attrs('Event', {
      eventMeals: [{ mealId: meal.id, amount: 2 }],
    });

    const response = await request(app.server)
      .post('/v1/pvt/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should return not found error when pass invalid mealId', async () => {
    const { token, meal } = await createMeals();
    const event = await factory.attrs('Event', {
      eventMeals: [{ mealId: meal.id + 1, amount: 2 }],
    });

    const response = await request(app.server)
      .post('/v1/pvt/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  it('should return events', async () => {
    const { event, token } = await createEvent();

    const response = await request(app.server)
      .get(`/v1/pvt/events/${event.id}`)
      .set('Authorization', `bearer ${token}`);

    delete event.events;

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(event);
  });

  it('should be able to update a event', async () => {
    const { event, token } = await createEvent();

    const newEvent = await factory.attrs('Event');
    const response = await request(app.server)
      .put(`/v1/pvt/events/${event.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newEvent);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(newEvent);
  });

  it('should be able to delete a event', async () => {
    const { event, token } = await createEvent();

    const response = await request(app.server)
      .delete(`/v1/pvt/events/${event.id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(204);
  });
});

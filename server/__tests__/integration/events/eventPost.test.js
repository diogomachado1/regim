/* eslint-disable no-undef */
import request from 'supertest';
import addYears from 'date-fns/addYears';

import app from '../../../src/app';

import factory from '../../factories';
import truncate from '../../util/truncate';
import { createTokenAndUser, createMeals } from '../../util/functions';

describe('Events Create', () => {
  beforeEach(async () => {
    await truncate();
  });
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 5000)); // avoid jest open handle error
  });

  it('Event must have startDate', async () => {
    const { token } = await createTokenAndUser();
    const event = await factory.attrs('Event', {
      startDate: undefined,
    });
    const response = await request(app)
      .post('/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);
    expect(response.body.error).toBe('startDate is a required field');
  });

  it('Event must have endDate', async () => {
    const { token } = await createTokenAndUser();
    const event = await factory.attrs('Event', {
      endDate: undefined,
    });
    const response = await request(app)
      .post('/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);
    expect(response.body.error).toBe('endDate is a required field');
  });

  it('Event must have endDate max 2 year after startDate', async () => {
    const { token } = await createTokenAndUser();
    const event = await factory.attrs('Event', {
      startDate: new Date(),
      endDate: addYears(new Date(), 3),
    });
    const response = await request(app)
      .post('/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);
    expect(response.body.error).toBe(
      `endDate field must be at earlier than ${addYears(
        event.startDate,
        2
      ).toISOString()}`
    );
  });

  it('Event must have endDate after startDate', async () => {
    const { token } = await createTokenAndUser();
    const event = await factory.attrs('Event', {
      endDate: new Date(),
    });
    const response = await request(app)
      .post('/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);
    expect(response.body.error).toBe(
      `endDate field must be later than ${event.startDate}`
    );
  });

  it('Must have default duration ', async () => {
    const { token } = await createTokenAndUser();
    const event = await factory.attrs('Event', {
      duration: undefined,
    });
    const response = await request(app)
      .post('/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);
    expect(response.body.duration).toBe(30);
  });

  it('Duration must be more greater than or equal to 15', async () => {
    const { token } = await createTokenAndUser();
    const event = await factory.attrs('Event', {
      duration: -1,
    });
    const response = await request(app)
      .post('/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);
    expect(response.body.error).toBe(
      'duration must be greater than or equal to 15'
    );
  });

  it('Repeatable must be undefined, daily or weekly', async () => {
    const { token } = await createTokenAndUser();
    const event = await factory.attrs('Event', {
      repeatable: 'test',
    });
    const response = await request(app)
      .post('/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);
    expect(response.body.error).toBe(
      'repeatable must be one of the following values: daily, weekly'
    );
  });

  it('Repeatable must be undefined, daily or weekly', async () => {
    const { token } = await createTokenAndUser();
    const event = await factory.attrs('Event', {
      repeatable: 'test',
    });
    const response = await request(app)
      .post('/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);
    expect(response.body.error).toBe(
      'repeatable must be one of the following values: daily, weekly'
    );
  });

  it('EventMeals must have mealId', async () => {
    const { token } = await createTokenAndUser();
    const event = await factory.attrs('Event', {
      eventMeals: [await factory.attrs('EventMeal', { mealId: undefined })],
    });
    const response = await request(app)
      .post('/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);
    expect(response.body.error).toBe(
      'eventMeals[0].mealId is a required field'
    );
  });

  it('EventMeals amount must be greater than or equal to 0', async () => {
    const { token } = await createTokenAndUser();
    const event = await factory.attrs('Event', {
      eventMeals: [await factory.attrs('EventMeal', { amount: -1 })],
    });
    const response = await request(app)
      .post('/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);
    expect(response.body.error).toBe(
      'eventMeals[0].amount must be greater than or equal to 0'
    );
  });

  it('EventMeals mealId must have valid Id', async () => {
    const { token } = await createTokenAndUser();
    const event = await factory.attrs('Event', {
      eventMeals: [await factory.attrs('EventMeal', { mealId: 1 })],
    });
    const response = await request(app)
      .post('/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);

    expect(response.body.error).toBe(
      `Meal (${event.eventMeals[0].mealId}) not found`
    );
  });

  it('EventMeals amount must have default equal 0', async () => {
    const { token, meal } = await createMeals();
    const event = await factory.attrs('Event', {
      repeatable: undefined,
      eventMeals: [await factory.attrs('EventMeal', { mealId: meal.id })],
    });
    const response = await request(app)
      .post('/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);
    if (!event.repeatable) {
      delete event.repeatable;
    }
    expect(response.body).toMatchObject(event);
  });

  it('EventMeals must have events', async () => {
    const { token, meal } = await createMeals();
    const event = await factory.attrs('Event', {
      repeatable: undefined,
      eventMeals: [await factory.attrs('EventMeal', { mealId: meal.id })],
    });
    const response = await request(app)
      .post('/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);
    if (!event.repeatable) {
      delete event.repeatable;
    }
    expect(response.body).toMatchObject({ ...event, events: 1 });
  });
});

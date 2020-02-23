/* eslint-disable no-undef */
import request from 'supertest';

import { parseISO } from 'date-fns';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import { createTokenAndUser, createEvent } from '../util/functions';
import Event from '../../src/app/Services/Event';

describe('Events Create', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    app.close();
  });

  it('should be able to creat event ', async () => {
    const { token } = await createTokenAndUser();
    const event = await factory.attrs('Event');

    const response = await request(app.server)
      .post('/v1/pvt/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);

    const events = Event.getSingleEvent(
      {
        ...event,
        startDate: parseISO(event.startDate),
        endDate: parseISO(event.endDate),
      },
      1
    ).length;

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(event, { events });
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

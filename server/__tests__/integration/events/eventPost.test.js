/* eslint-disable no-undef */
import request from 'supertest';

import app from '../../../src/app';

import factory from '../../factories';
import truncate from '../../util/truncate';
import { createTokenAndUser, createEvent } from '../../util/functions';

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
      .post('/events')
      .set('Authorization', `bearer ${token}`)
      .send(event);
    expect(response.body).toMatchObject(event);
  });

  // it('should return events', async () => {
  //   const { event, token } = await createEvent();

  //   const response = await request(app.server)
  //     .get('/events')
  //     .set('Authorization', `bearer ${token}`);

  //   expect(response.body).toMatchObject([{ ...event }]);
  // });

  it('should be able to update a event', async () => {
    const { event, token } = await createEvent();

    const newEvent = await factory.attrs('Event');
    const response = await request(app.server)
      .put(`/events/${event.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newEvent);
    expect(response.body).toMatchObject(newEvent);
  });

  it('should be able to delete a event', async () => {
    const { event, token } = await createEvent();

    const response = await request(app.server)
      .delete(`/events/${event.id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(204);
  });
});

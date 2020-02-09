/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
import { createUser } from '../util/functions';

describe('Session Create', () => {
  beforeEach(async () => {
    await truncate();
  });
  afterAll(async () => {
    app.close();
  });

  it('should be able to create session', async () => {
    const { email, password } = await createUser();

    const response = await request(app.server)
      .post('/sessions')
      .send({ email, password });

    expect(response.body).toHaveProperty('token');
  });

  it('should return a valid token to use API', async () => {
    const { email, password } = await createUser();

    const {
      body: { token },
    } = await request(app.server)
      .post('/sessions')
      .send({ email, password });

    const response = await request(app.server)
      .get('/testAuth')
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should have a valid token to use API', async () => {
    const response = await request(app.server)
      .get('/testAuth')
      .set('Authorization', `bearer testwoken`);
    expect(response.status).toBe(401);
  });

  it('should have a token to use API', async () => {
    const response = await request(app.server).get('/testAuth');

    expect(response.status).toBe(401);
  });
});

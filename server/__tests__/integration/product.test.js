/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import { createTokenAndUser } from '../util/functions';

async function createProducts() {
  const { token } = await createTokenAndUser();
  const product = await factory.attrs('Product');

  const response = await request(app.server)
    .post('/v1/pvt/products')
    .set('Authorization', `bearer ${token}`)
    .send(product);
  return { product: response.body, token };
}

describe('Products', () => {
  beforeEach(async () => {
    await truncate();
  });
  afterAll(async () => {
    app.close();
  });

  it('should be able to create a product', async () => {
    const { token } = await createTokenAndUser();
    const product = await factory.attrs('Product');

    const response = await request(app.server)
      .post('/v1/pvt/products')
      .set('Authorization', `bearer ${token}`)
      .send(product);

    expect(response.body).toMatchObject(product);
  });

  it('should return products', async () => {
    const { token } = await createProducts();

    const response = await request(app.server)
      .get('/v1/pvt/products')
      .set('Authorization', `bearer ${token}`);

    expect(response.body.count).toBe(1);
  });

  it('should be able to update a product', async () => {
    const { product, token } = await createProducts();

    const newProduct = await factory.attrs('Product');
    const response = await request(app.server)
      .put(`/v1/pvt/products/${product.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newProduct);
    expect(response.body).toMatchObject(newProduct);
  });

  it('should be able to delete a product', async () => {
    const { product, token } = await createProducts();

    const response = await request(app.server)
      .delete(`/v1/pvt/products/${product.id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(204);
  });
});

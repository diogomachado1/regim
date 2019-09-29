/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import { createTokenAndUser } from '../util/functions';

async function createProducts() {
  const { token } = await createTokenAndUser();
  const product = await factory.attrs('Product');

  const response = await request(app)
    .post('/products')
    .set('Authorization', `bearer ${token}`)
    .send(product);
  return { product: response.body, token };
}

describe('Products', () => {
  beforeEach(async () => {
    await truncate();
  });
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  it('should be able to create a product', async () => {
    const { token } = await createTokenAndUser();
    const product = await factory.attrs('Product');

    const response = await request(app)
      .post('/products')
      .set('Authorization', `bearer ${token}`)
      .send(product);

    expect(response.body).toMatchObject(product);
  });

  it('should be validation when create a product', async () => {
    const { token } = await createTokenAndUser();
    const product = await factory.attrs('Product', {
      name: undefined,
    });

    const response = await request(app)
      .post('/products')
      .set('Authorization', `bearer ${token}`)
      .send(product);

    expect(response.status).toBe(400);
  });

  it('should return products', async () => {
    const { product, token } = await createProducts();

    const response = await request(app)
      .get('/products')
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toMatchObject([{ ...product }]);
  });

  it('should be able to update a product', async () => {
    const { product, token } = await createProducts();

    const newProduct = await factory.attrs('Product');
    const response = await request(app)
      .put(`/products/${product.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newProduct);

    expect(response.body).toMatchObject(newProduct);
  });

  it('should be validation when update a product', async () => {
    const { product, token } = await createProducts();
    const newProduct = await factory.attrs('Product', {
      price: 'test',
    });

    const response = await request(app)
      .put(`/products/${product.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newProduct);

    expect(response.status).toBe(400);
  });

  it('should have valid id to update a product', async () => {
    const { product, token } = await createProducts();

    const newProduct = await factory.attrs('Product');

    const response = await request(app)
      .put(`/products/${product.id + 1}`)
      .set('Authorization', `bearer ${token}`)
      .send(newProduct);

    expect(response.status).toBe(404);
  });

  it('should be able to delete a product', async () => {
    const { product, token } = await createProducts();

    const response = await request(app)
      .delete(`/products/${product.id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('should have valid id to delete a product', async () => {
    const { product, token } = await createProducts();

    const response = await request(app)
      .delete(`/products/${product.id + 1}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(404);
  });
});

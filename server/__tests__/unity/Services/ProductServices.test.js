// // import request from 'supertest';
import ProductService from '../../../src/app/Services/ProductService';
import factory from '../../factories';

import Product from '../../../src/app/models/Product';

jest.mock('../../../src/app/models/Product');
describe('ProductsValidator', () => {
  it('methods should exist', async () => {
    expect(ProductService.getUserProducts).toBeTruthy();
  });
  it('should return user products', async () => {
    const product = await factory.attrs('Product');
    Product.getUserProducts.mockResolvedValue([product]);
    const products = await ProductService.getUserProducts(1);
    expect(products).toStrictEqual([product]);
  });
});

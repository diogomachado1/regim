// // import request from 'supertest';
import ProductService from '../../../src/app/Services/ProductService';
import factory from '../../factories';

import ProductQuery from '../../../src/app/Queries/ProductQuery';

jest.mock('../../../src/app/Queries/ProductQuery.js');
describe('ProductsValidator', () => {
  it('methods should exist', async () => {
    expect(ProductService.getUserProducts).toBeTruthy();
  });
  it('should return user products', async () => {
    const product = await factory.attrs('Product');
    ProductQuery.getUserProducts.mockResolvedValue([product]);
    const products = await ProductService.getUserProducts(1);
    expect(products).toStrictEqual([product]);
  });
});

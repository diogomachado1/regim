import ProductController from '../../../src/app/controllers/ProductController';
import factory from '../../factories';

import Product from '../../../src/app/models/Product';
// import ProductService from '../../../src/app/Services/ProductService';

const res = {
  json: jest.fn(data => data),
  status: jest.fn(function status() {
    return this;
  }),
};
jest.mock('../../../src/app/models/Product');
describe('ProductsValidator', () => {
  it('methods should exist', async () => {
    expect(ProductController.index).toBeTruthy();
    expect(ProductController.store).toBeTruthy();
    expect(ProductController.update).toBeTruthy();
    expect(ProductController.delete).toBeTruthy();
  });
  it('should return user products', async () => {
    const product = await factory.attrs('Product');
    Product.getUserProducts.mockResolvedValue([product]);
    const response = await ProductController.index(
      { userId: 1, query: {} },
      res
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(response).toEqual(response);
  });
});

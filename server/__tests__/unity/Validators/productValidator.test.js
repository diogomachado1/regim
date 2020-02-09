/* eslint-disable no-undef */
// import request from 'supertest';
import ProductValidator from '../../../src/app/Validators/ProductValidator';

import factory from '../../factories';

describe('ProductsValidator', () => {
  it('should have name when create a product', async () => {
    const product = await factory.attrs('Product', {
      name: undefined,
    });
    await expect(ProductValidator.createValidator(product)).rejects.toThrow(
      /name is a required field./
    );
  });

  it('should have name trim when create a product', async () => {
    const product = await factory.attrs('Product', {
      name: ' name ',
    });
    const Product = await ProductValidator.createValidator(product);
    expect(Product.name).toBe('name');
  });

  it('should have amount when create a product', async () => {
    const product = await factory.attrs('Product', {
      amount: undefined,
    });
    await expect(ProductValidator.createValidator(product)).rejects.toThrow(
      /amount is a required field/
    );
  });

  it('amount should be number when create a product', async () => {
    const product = await factory.attrs('Product', {
      amount: ' ',
    });
    await expect(ProductValidator.createValidator(product)).rejects.toThrow(
      /amount must be a `number` type/
    );
  });

  it('amount should be positive when create a product', async () => {
    const product = await factory.attrs('Product', {
      amount: -1,
    });
    await expect(ProductValidator.createValidator(product)).rejects.toThrow(
      /amount must be greater than or equal to 0/
    );
  });

  it('price should be number when create a product', async () => {
    const product = await factory.attrs('Product', {
      price: ' ',
    });
    await expect(ProductValidator.createValidator(product)).rejects.toThrow(
      /price must be a `number` type/
    );
  });

  it('price should be positive when create a product', async () => {
    const product = await factory.attrs('Product', {
      price: -1,
    });
    await expect(ProductValidator.createValidator(product)).rejects.toThrow(
      /price must be greater than or equal to 0/
    );
  });

  it('measure should be number when create a product', async () => {
    const product = await factory.attrs('Product', {
      measure: undefined,
    });
    await expect(ProductValidator.createValidator(product)).rejects.toThrow(
      /measure is a required field/
    );
  });

  it('measure should be positive when create a product', async () => {
    const product = await factory.attrs('Product', {
      measure: 'test',
    });
    await expect(ProductValidator.createValidator(product)).rejects.toThrow(
      /measure must be one of the following values: g, ml, unity/
    );
  });

  it('should have name trim when create a product', async () => {
    const product = await factory.attrs('Product', {
      name: ' name ',
    });
    const Product = await ProductValidator.createValidator(product);
    expect(Product.name).toBe('name');
  });

  it('amount should be number when update a product', async () => {
    const product = await factory.attrs('Product', {
      amount: ' ',
    });
    await expect(ProductValidator.createValidator(product)).rejects.toThrow(
      /amount must be a `number` type/
    );
  });

  it('amount should be positive when update a product', async () => {
    const product = await factory.attrs('Product', {
      amount: -1,
    });
    await expect(ProductValidator.updateValidator(product)).rejects.toThrow(
      /amount must be greater than or equal to 0/
    );
  });

  it('price should be number when update a product', async () => {
    const product = await factory.attrs('Product', {
      price: ' ',
    });
    await expect(ProductValidator.updateValidator(product)).rejects.toThrow(
      /price must be a `number` type/
    );
  });

  it('price should be positive when update a product', async () => {
    const product = await factory.attrs('Product', {
      price: -1,
    });
    await expect(ProductValidator.updateValidator(product)).rejects.toThrow(
      /price must be greater than or equal to 0/
    );
  });

  it('measure should be positive when update a product', async () => {
    const product = await factory.attrs('Product', {
      measure: 'test',
    });
    await expect(ProductValidator.updateValidator(product)).rejects.toThrow(
      /measure must be one of the following values: g, ml, unity/
    );
  });
});

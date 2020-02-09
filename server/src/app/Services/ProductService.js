import ProductQuery from '../Queries/ProductQuery';
import ValidationError from '../Error/ValidationError';
import { notFound } from '../Error/TypeErrors';
import ProductValidator from '../Validators/ProductValidator';

class ProductServices {
  async getUserProducts(userId) {
    return ProductQuery.getUserProducts(userId);
  }

  async getUserProductsByIds(ids, userId) {
    return ProductQuery.getUserProductByIds(ids, userId);
  }

  async verifyAndGetProduct(id, userId) {
    const product = await ProductQuery.getProductById(id, userId);
    if (!product) throw new ValidationError(notFound('Product'));
    return product;
  }

  async create(data, userId) {
    const ValidatedProduct = await ProductValidator.createValidator(data);
    const product = await ProductQuery.createProduct(ValidatedProduct, userId);
    return product;
  }

  async update(data, id, userId) {
    const ValidatedProduct = await ProductValidator.updateValidator(data);

    await this.verifyAndGetProduct(id, userId);
    return ProductQuery.updateProductById(ValidatedProduct, id, userId);
  }

  async delete(id, userId) {
    const deleteds = await ProductQuery.deleteProductById(id, userId);
    if (!deleteds === 0) throw new ValidationError(notFound('Product'));
    return true;
  }
}

export default new ProductServices();

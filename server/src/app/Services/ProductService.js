import ProductValidator from '../Validators/ProductValidator';
import NotFoundError from '../Error/NotFoundError';
import Product from '../models/Product';

class ProductServices {
  constructor() {
    this.model = Product;
  }

  async getUserProducts(userId) {
    return this.model.getUserProducts(userId);
  }

  async getUserProductsByIds(ids, userId) {
    return this.model.getUserProductsByIds(ids, userId);
  }

  async verifyAndGetProduct(id, userId) {
    const product = await this.model.getProductById(id, userId);
    if (!product) throw new NotFoundError('Product');
    return product;
  }

  async create(data, userId) {
    const ValidatedProduct = await ProductValidator.createValidator(data);
    const product = await this.model.createProduct(ValidatedProduct, userId);
    return product;
  }

  async update(data, id, userId) {
    const ValidatedProduct = await ProductValidator.updateValidator(data);

    await this.verifyAndGetProduct(id, userId);
    return this.model.updateProductById(ValidatedProduct, id, userId);
  }

  async delete(id, userId) {
    const deleteds = await this.model.deleteProductById(id, userId);
    if (!deleteds === 0) throw new NotFoundError('Product');
    return true;
  }
}

export default new ProductServices();

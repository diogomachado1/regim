import ProductValidator from '../Validators/ProductValidator';
import NotFoundError from '../Error/NotFoundError';
import Product from '../models/Product';
import FileService from './FileService';
import PaginationValidator from '../Validators/PaginationValidator';

class ProductServices {
  constructor() {
    this.model = Product;
  }

  async getPublicProducts(page, search) {
    const pageValidated = await PaginationValidator.paginationValidate({
      page,
    });
    return this.model.getPublicProducts(pageValidated.page, search);
  }

  async getUserProducts(userId, page, search) {
    const pageValidated = await PaginationValidator.paginationValidate({
      page,
    });
    return this.model.getUserProducts(userId, pageValidated.page, search);
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
    if (ValidatedProduct.imageId)
      await FileService.verifyAndGetFile(ValidatedProduct.imageId, userId);
    const product = await this.model.createProduct(ValidatedProduct, userId);
    return product;
  }

  async update(data, id, userId) {
    const ValidatedProduct = await ProductValidator.updateValidator(data);
    if (ValidatedProduct.imageId)
      await FileService.verifyAndGetFile(ValidatedProduct.imageId, userId);
    await this.verifyAndGetProduct(id, userId);
    return this.model.updateProductById(ValidatedProduct, id, userId);
  }

  async delete(id, userId) {
    const deleteds = await this.model.deleteProductById(id, userId);
    if (!deleteds === 0) throw new NotFoundError('Product');
    return true;
  }

  async duplicatedProducts(id, userId) {
    const product = await this.verifyAndGetProduct(id);
    if (product.public === false && product.user_id !== userId)
      throw new NotFoundError('Product');
    const ValidatedProduct = await ProductValidator.createValidator(product);

    return this.model.createProduct(
      { ...ValidatedProduct, public: false, originId: product.id },
      userId
    );
  }
}

export default new ProductServices();

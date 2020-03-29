import ProductService from '../Services/ProductService';

class ProductController {
  async index(req, res, next) {
    const { userId } = req;
    const { page, search } = req.query;

    const products = await ProductService.getUserProducts(userId, page, search);

    req.response = products;
    res.status(200).json(products);
    return next();
  }

  async show(req, res, next) {
    const {
      userId,
      params: { id },
    } = req;

    const product = await ProductService.verifyAndGetProduct(id, userId);

    req.response = product;
    res.status(200).json(product);
    return next();
  }

  async store(req, res, next) {
    const { userId } = req;

    const product = await ProductService.create(req.body, userId);

    res.status(201).json(product);
    return next();
  }

  async update(req, res, next) {
    const {
      userId: user_id,
      params: { id },
    } = req;

    const value = await ProductService.update(req.body, id, user_id);

    req.public = value.changePublic;
    res.status(200).json(value.product);
    return next();
  }

  async delete(req, res, next) {
    const {
      userId,
      params: { id },
    } = req;

    const product = await ProductService.delete(id, userId);

    req.public = product.public;
    res.status(204).json();
    return next();
  }
}

export default new ProductController();

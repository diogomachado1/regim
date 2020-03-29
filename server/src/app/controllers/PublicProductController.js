import ProductService from '../Services/ProductService';

class ProductController {
  async index(req, res, next) {
    const { page, search } = req.query;

    const products = await ProductService.getPublicProducts(page, search);

    req.response = products;
    res.status(200).json(products);
    return next();
  }
}

export default new ProductController();

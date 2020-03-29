import ProductService from '../Services/ProductService';

class ProductController {
  async store(req, res, next) {
    const { productId } = req.params;
    const { userId } = req;

    const products = await ProductService.duplicatedProducts(productId, userId);

    res.status(200).json(products);
    return next();
  }
}

export default new ProductController();

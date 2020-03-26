import ProductService from '../Services/ProductService';

class ProductController {
  async index(req, res) {
    const { page, search } = req.query;

    const products = await ProductService.getPublicProducts(page, search);

    return res.status(200).json(products);
  }
}

export default new ProductController();

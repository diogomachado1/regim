import ProductService from '../Services/ProductService';

class ProductController {
  async index(req, res) {
    const { page } = req.query;
    const products = await ProductService.getPublicProducts(page);

    return res.status(200).json(products);
  }
}

export default new ProductController();

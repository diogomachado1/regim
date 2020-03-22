import ProductService from '../Services/ProductService';

class ProductController {
  async store(req, res) {
    const { productId } = req.params;
    const { userId } = req;

    const products = await ProductService.duplicatedProducts(productId, userId);

    return res.status(200).json(products);
  }
}

export default new ProductController();

import ProductValidator from '../Validators/ProductValidator';
import ProductService from '../Services/ProductService';

class ProductController {
  async index(req, res) {
    const { userId } = req;

    const products = await ProductService.getUserProducts(userId);

    const formatedProduct = await ProductValidator.formatArray(products);
    return res.status(200).json(formatedProduct);
  }

  async store(req, res) {
    const { userId } = req;

    const product = await ProductService.create(req.body, userId);

    const formatedProduct = await ProductValidator.format(product);
    return res.status(201).json(formatedProduct);
  }

  async update(req, res) {
    const {
      userId: user_id,
      params: { id },
    } = req;

    const product = await ProductService.update(req.body, id, user_id);

    const formatedProduct = await ProductValidator.format(product);
    return res.status(200).json(formatedProduct);
  }

  async delete(req, res) {
    const {
      userId,
      params: { id },
    } = req;

    await ProductService.delete(id, userId);

    return res.status(204).json();
  }
}

export default new ProductController();

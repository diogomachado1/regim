import ProductService from '../Services/ProductService';

class ProductController {
  async index(req, res) {
    const { userId } = req;

    const products = await ProductService.getUserProducts(userId);

    return res.status(200).json(products);
  }

  async store(req, res) {
    const { userId } = req;

    const product = await ProductService.create(req.body, userId);

    return res.status(201).json(product);
  }

  async update(req, res) {
    const {
      userId: user_id,
      params: { id },
    } = req;

    const product = await ProductService.update(req.body, id, user_id);

    return res.status(200).json(product);
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

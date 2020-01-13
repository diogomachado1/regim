import Product from '../models/Product';
import ProductValidator from '../Validators/ProductValidator';

class ProductController {
  async index(req, res) {
    const { userId: user_id } = req;

    const seqProducts = await Product.findAll({ where: { user_id } });

    const productsValue = seqProducts.map(product => product.get());

    const formatedProduct = await ProductValidator.formatArray(productsValue);
    return res.status(200).json(formatedProduct);
  }

  async store(req, res) {
    const { userId: user_id } = req;

    const ValidatedProduct = await ProductValidator.createValidator(req.body);

    if (ValidatedProduct.isError) {
      return res.status(400).json({ error: ValidatedProduct.error });
    }

    const product = await Product.create({
      ...ValidatedProduct,
      user_id,
    });
    const formatedProduct = await ProductValidator.format(product.dataValues);
    return res.status(201).json(formatedProduct);
  }

  async update(req, res) {
    const {
      userId: user_id,
      params: { id },
    } = req;
    const ValidatedProduct = await ProductValidator.updateValidator(req.body);

    if (ValidatedProduct.isError) {
      return res.status(400).json({ error: ValidatedProduct.error });
    }

    const product = await Product.findByPk(id, { where: { user_id } });
    if (!product) {
      return res.status(404).send();
    }
    const productUpdated = await product.update(req.body);
    const formatedProduct = await ProductValidator.format(
      productUpdated.dataValues
    );
    return res.status(200).json(formatedProduct);
  }

  async delete(req, res) {
    const {
      userId: user_id,
      params: { id },
    } = req;

    const deleteds = await Product.destroy({
      where: { user_id, id },
    });

    if (deleteds === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(204).json();
  }
}

export default new ProductController();

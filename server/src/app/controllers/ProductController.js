import * as Yup from 'yup';

import Product from '../models/Product';

class ToolsController {
  async index(req, res) {
    const { userId: user_id } = req;

    const products = await Product.findAll({ where: { user_id } });
    return res.json(products);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      amount: Yup.number().required(),
      price: Yup.string(),
      measure: Yup.mixed()
        .oneOf(['g', 'ml', 'unity'])
        .required(),
    });

    const { userId: user_id } = req;

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.errors[0] });
    }

    const product = await Product.create({
      ...req.body,
      user_id,
    });

    return res.status(201).json(product);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      amount: Yup.number(),
      price: Yup.string(),
      measure: Yup.mixed().oneOf(['g', 'ml', 'unity']),
    });

    const {
      userId: user_id,
      params: { id },
    } = req;

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.errors[0] });
    }

    const product = await Product.findByPk(id, { where: { user_id } });
    if (!product) {
      return res.status(404).send();
    }
    const productUpdated = await product.update(req.body);

    return res.status(201).json(productUpdated);
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

export default new ToolsController();

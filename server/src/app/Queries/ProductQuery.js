import { Op } from 'sequelize';
import Product from '../models/Product';
import File from '../models/File';

class ProductQuery {
  async getUserProducts(user_id) {
    const DocProducts = await Product.findAll({
      where: { user_id },
      include: [
        {
          model: File,
          as: 'file',
        },
      ],
    });

    return DocProducts.map(product => product.get());
  }

  async getUserProductsByIds(ingredientsProductsIds, user_id) {
    return Product.findAll({
      attributes: ['id'],
      where: {
        id: {
          [Op.in]: ingredientsProductsIds,
        },
        user_id,
      },
    });
  }

  async getProductById(id, user_id) {
    const DocProduct = await Product.findByPk(id, {
      where: { user_id },
      include: [
        {
          model: File,
          as: 'file',
        },
      ],
    });

    return DocProduct && DocProduct.get();
  }

  async createProduct(data, user_id) {
    const DocProduct = await Product.create({
      ...data,
      user_id,
    });

    return DocProduct && DocProduct.get();
  }

  async updateProductById(data, id, user_id) {
    const [, [DocProduct]] = await Product.update(data, {
      where: { user_id, id },
      returning: true,
    });

    return DocProduct && DocProduct.get();
  }

  async deleteProductById(id, user_id) {
    return Product.destroy({
      where: { user_id, id },
    });
  }
}

export default new ProductQuery();

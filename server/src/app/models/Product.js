import Sequelize, { Model, Op } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        measure: Sequelize.ENUM('g', 'ml', 'unity'),
        amount: Sequelize.DECIMAL(10, 2),
        price: Sequelize.DECIMAL(10, 2),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }

  static async getUserProducts(user_id) {
    const DocProducts = await Product.findAll({ where: { user_id } });

    return DocProducts.map(product => product.get());
  }

  static async getUserProductsByIds(ingredientsProductsIds, user_id) {
    return this.findAll({
      attributes: ['id'],
      where: {
        id: {
          [Op.in]: ingredientsProductsIds,
        },
        user_id,
      },
    });
  }

  static async getProductById(id, user_id) {
    const DocProduct = await this.findByPk(id, { where: { user_id } });

    return DocProduct && DocProduct.get();
  }

  static async createProduct(data, user_id) {
    const DocProduct = await this.create({
      ...data,
      user_id,
    });

    return DocProduct && DocProduct.get();
  }

  static async updateProductById(data, id, user_id) {
    const [, [DocProduct]] = await this.update(data, {
      where: { user_id, id },
      returning: true,
    });

    return DocProduct && DocProduct.get();
  }

  static async deleteProductById(id, user_id) {
    return this.destroy({
      where: { user_id, id },
    });
  }
}

export default Product;

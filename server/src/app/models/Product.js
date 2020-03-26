import Sequelize, { Model, Op } from 'sequelize';
import File from './File';
import User from './User';

class Product extends Model {
  static get include() {
    return [
      {
        model: File,
        as: 'image',
      },
    ];
  }

  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        measure: Sequelize.ENUM('g', 'ml', 'unity'),
        amount: Sequelize.DECIMAL(10, 2),
        price: Sequelize.DECIMAL(10, 2),
        public: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.File, {
      foreignKey: { field: 'file_id', name: 'imageId' },
      as: 'image',
    });
    this.belongsTo(models.Product, {
      foreignKey: { field: 'origin_id', name: 'originId' },
      as: 'origin',
    });
  }

  static async getUserProducts(user_id, page, search) {
    const DocProducts = await this.findAndCountAll({
      where: { user_id, name: { [Op.iLike]: `%${search}%` } },
      limit: 10,
      offset: (page - 1) * 10,
      include: this.include,
      order: [['createdAt', 'DESC']],
    });

    return DocProducts;
  }

  static async getPublicProducts(page, search) {
    const DocProducts = await this.findAndCountAll({
      where: { public: true, name: { [Op.iLike]: `%${search}%` } },
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        ...this.include,
        {
          model: User,
          as: 'user',
          attributes: ['name', 'id', 'imageId'],
          include: {
            model: File,
            as: 'image',
          },
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return DocProducts;
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
    const DocProduct = await this.findByPk(id, {
      where: { user_id },
      include: this.include,
    });

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

import Sequelize, { Model } from 'sequelize';

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
    this.belongsTo(models.File, {
      foreignKey: { field: 'file_id', name: 'fileId' },
      as: 'file',
    });
  }
}

export default Product;

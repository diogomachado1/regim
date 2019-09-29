import Sequelize, { Model } from 'sequelize';

class Ingredient extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.DECIMAL(10, 2),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Meal, { foreignKey: 'meal_id' });
    this.belongsTo(models.Product, { foreignKey: 'product_id' });
  }
}

export default Ingredient;

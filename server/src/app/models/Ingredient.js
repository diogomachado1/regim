import Sequelize, { Model } from 'sequelize';

class Ingredient extends Model {
  static init(sequelize) {
    super.init(
      {
        meal_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        product_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        amount: Sequelize.DECIMAL(10, 2),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Meal, {
      foreignKey: { foreignKey: 'meal_id', name: 'mealId' },
    });
    this.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
    });
  }
}

export default Ingredient;

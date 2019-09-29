import Sequelize, { Model } from 'sequelize';

class Meal extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
        createdAt: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsToMany(models.Product, {
      through: {
        model: models.Ingredient,
      },
      foreignKey: 'meal_id',
      constraints: false,
    });
    this.hasMany(models.Ingredient, {
      foreignKey: 'meal_id',
      as: 'ingredients',
    });
  }
}

export default Meal;

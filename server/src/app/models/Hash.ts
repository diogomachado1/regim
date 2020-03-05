import Sequelize, { Model } from 'sequelize';

class Hash extends Model {
  static init(sequelize) {
    super.init(
      {
        hash: Sequelize.STRING,
        type: Sequelize.ENUM('CONFIRM_EMAIL', 'CHANGE_PASSWORD'),
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
}

export default Hash;

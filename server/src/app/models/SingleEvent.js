import Sequelize, { Model } from 'sequelize';

class SingleEvent extends Model {
  static init(sequelize) {
    super.init(
      {
        eventStartDate: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Event, { foreignKey: 'event_id', as: 'event' });
  }
}

export default SingleEvent;

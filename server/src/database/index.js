import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';
import Product from '../app/models/Product';
import Meal from '../app/models/Meal';
import Ingredient from '../app/models/Ingredient';
import Event from '../app/models/Event';
import EventMeal from '../app/models/EventMeal';
import Hash from '../app/models/Hash';
import File from '../app/models/File';

const models = [User, Product, Ingredient, Meal, Event, EventMeal, Hash, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  close() {
    this.connection.close();
  }
}

export default new Database();

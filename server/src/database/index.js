import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';

import databaseConfig from '../config/database';
import Product from '../app/models/Product';
import Meal from '../app/models/Meal';
import Ingredient from '../app/models/Ingredient';
import Event from '../app/models/Event';
import EventMeal from '../app/models/EventMeal';
import Hash from '../app/models/Hash';

const models = [User, Product, Ingredient, Meal, Event, EventMeal, Hash];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }

  close() {
    this.connection.close();
    mongoose.disconnect();
  }
}

export default new Database();

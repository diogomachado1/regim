import Sequelize from 'sequelize';
import { connect, disconnect } from 'mongoose';

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
    this.mongo();
  }

  init(): void {
    console.log(databaseConfig);
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo(): void {
    this.mongoConnection = connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }

  close() {
    this.connection.close();
    disconnect();
  }
}

export default new Database();

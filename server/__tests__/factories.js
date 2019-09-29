import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Product from '../src/app/models/Product';
import Meal from '../src/app/models/Meal';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Product', Product, {
  name: faker.name.findName(),
  amount: faker.random.number({ min: 10, max: 1000 }),
  price: faker.random.number({ min: 0, max: 50 }),
  measure: faker.random.arrayElement(['g', 'ml', 'unity']),
});

factory.define('Meal', Meal, {
  name: faker.name.findName(),
  description: faker.lorem.paragraph(),
});

export default factory;

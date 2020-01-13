import faker from 'faker';
import { factory } from 'factory-girl';

import addYears from 'date-fns/addYears';
import User from '../src/app/models/User';
import Product from '../src/app/models/Product';
import Meal from '../src/app/models/Meal';
import Event from '../src/app/models/Event';
import EventMeal from '../src/app/models/EventMeal';

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

factory.define('Event', Event, {
  startDate: faker.date.future(0, new Date()).toISOString(),
  endDate: faker.date.future(0, addYears(new Date(), 1)).toISOString(),
  duration: parseInt(faker.random.number({ min: 15, max: 300 }), 10),
  repeatable: faker.random.arrayElement(['daily', 'weekly', undefined]),
});

factory.define('EventMeal', EventMeal, {
  mealId: faker.random.number({ min: 0, max: 1000 }),
  amount: faker.random.number({ min: 0, max: 1000 }),
});

export default factory;

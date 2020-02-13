import faker from 'faker';
import { factory } from 'factory-girl';
import { addDays } from 'date-fns';
import User from '../src/app/models/User';
import Product from '../src/app/models/Product';
import Meal from '../src/app/models/Meal';
import Ingredient from '../src/app/models/Ingredient';
import Event from '../src/app/models/Event';
import EventMeal from '../src/app/models/EventMeal';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Product', Product, {
  name: faker.name.findName(),
  amount: faker.random.number({ min: 10, max: 1000 }).toFixed(2),
  price: faker.random.number({ min: 0, max: 50 }).toFixed(2),
  measure: faker.random.arrayElement(['g', 'ml', 'unity']),
});

factory.define('Meal', Meal, {
  name: faker.name.findName(),
  description: faker.lorem.paragraph(),
});

factory.define('Ingredient', Ingredient, {
  productId: faker.random.number({ min: 0, max: 1000 }),
  amount: faker.random.number({ min: 0, max: 1000 }).toFixed(2),
});

factory.define('Event', Event, {
  name: faker.name.findName(),
  startDate: new Date().toISOString(),
  endDate: addDays(
    new Date(),
    faker.random.number({ min: 0, max: 300 })
  ).toISOString(),
  duration: parseInt(faker.random.number({ min: 15, max: 300 }), 10),
  repeatable: faker.random.arrayElement(['daily', 'weekly', 'not']),
});

factory.define('EventMeal', EventMeal, {
  mealId: faker.random.number({ min: 0, max: 1000 }),
  amount: faker.random.number({ min: 0, max: 1000 }).toFixed(2),
});

export default factory;

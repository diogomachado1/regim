import { Router } from 'express';

import testpvt from './testpvt.routes';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import mealRoutes from './meal.routes';
import eventRoutes from './event.routes';
import listRoutes from './list.routes';

const routes = new Router();

routes.use(testpvt);
routes.use(userRoutes);
routes.use(productRoutes);
routes.use(mealRoutes);
routes.use(eventRoutes);
routes.use(listRoutes);

export default routes;

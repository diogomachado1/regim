import { Router } from 'express';

import testpvt from './testpvt.routes';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import publicProduct from './publicProduct.routes';
import duplicateProduct from './duplicateProduct.routes';
import mealRoutes from './meal.routes';
import eventRoutes from './event.routes';
import listRoutes from './list.routes';
import files from './files.routes';
import importMasive from './importMasive.routes';

const routes = new Router();

routes.use(testpvt);
routes.use(userRoutes);
routes.use(productRoutes);
routes.use(publicProduct);
routes.use(duplicateProduct);
routes.use(mealRoutes);
routes.use(eventRoutes);
routes.use(listRoutes);
routes.use(files);
routes.use(importMasive);

export default routes;

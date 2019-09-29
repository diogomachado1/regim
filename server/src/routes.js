import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import ProductController from './app/controllers/ProductController';
import MealController from './app/controllers/MealController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/', (req, res) => res.send('ok Regim'));

routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.get('/testAuth', (req, res) => res.send('Test Auth'));
routes.put('/users', UserController.update);

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

routes.get('/meals', MealController.index);
routes.post('/meals', MealController.store);
routes.put('/meals/:id', MealController.update);
routes.delete('/meals/:id', MealController.delete);

export default routes;

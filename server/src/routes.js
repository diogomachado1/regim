import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/', (req, res) => res.send('ok Test'));

routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.get('/testAuth', (req, res) => res.send('Test Auth'));
routes.put('/users', UserController.update);

export default routes;

import { Router } from 'express';

import ListController from '../../../controllers/ListController';

const routes = new Router();

routes.get('/list', ListController.index);

export default routes;

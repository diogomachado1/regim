import { Router } from 'express';

import ListController from '../../../controllers/ListController';

const routes = Router();

routes.get('/list', ListController.index);

export default routes;

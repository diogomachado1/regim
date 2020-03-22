import { Router } from 'express';

import DuplicateProductController from '../../../controllers/DuplicateProductController';

const routes = new Router();

routes.post('/:productId', DuplicateProductController.store);

export default new Router().use('/duplicate_product', routes);

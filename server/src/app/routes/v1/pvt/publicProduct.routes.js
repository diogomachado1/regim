import { Router } from 'express';

import PublicProductController from '../../../controllers/PublicProductController';

const routes = new Router();

routes.get('/', PublicProductController.index);

export default new Router().use('/public_products', routes);

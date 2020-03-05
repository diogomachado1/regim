import { Router } from 'express';

import ProductController from '../../../controllers/ProductController';

const routes = Router();

routes.get('/', ProductController.index);
routes.get('/:id', ProductController.show);
routes.post('/', ProductController.store);
routes.put('/:id', ProductController.update);
routes.delete('/:id', ProductController.delete);

export default Router().use('/products', routes);

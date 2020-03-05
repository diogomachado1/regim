import { Router } from 'express';

import EventController from '../../../controllers/EventController';

const routes = new Router();

routes.get('/', EventController.index);
routes.get('/:id', EventController.show);
routes.post('/', EventController.store);
routes.put('/:id', EventController.update);
routes.delete('/:id', EventController.delete);

export default new Router().use('/events', routes);

import { Router } from 'express';

import MealController from '../../../controllers/MealController';

const routes = Router();

routes.get('/', MealController.index);
routes.get('/:id', MealController.show);
routes.post('/', MealController.store);
routes.put('/:id', MealController.update);
routes.delete('/:id', MealController.delete);

export default Router().use('/meals', routes);

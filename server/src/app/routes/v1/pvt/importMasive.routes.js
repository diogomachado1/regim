import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../../../../config/multer';

import ImportMasiveController from '../../../controllers/ImportMasiveController';

const upload = multer(multerConfig);
const routes = new Router();

routes.post(
  '/import_products',
  upload.single('file'),
  ImportMasiveController.products
);

export default routes;

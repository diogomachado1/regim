import './bootstrap';

import Youch from 'youch';
import path from 'path';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import routesV1 from './app/routes';

// Uncomment this line to enable database access
// --------
import db from './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routesV1);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const { type, message } = err;
      const error = {
        status: 'error',
        message,
      };
      if (err.name === 'RegimValidationError') {
        return res.status(type === 'notFound' ? 404 : 400).json(error);
      }
      if (err.name === 'MulterError') {
        return res.status(400).json(error);
      }
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }

  close() {
    db.close();
  }
}

export default new App();

import './bootstrap';

import Youch from 'youch';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';

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
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (err.name === 'RegimValidationError') {
        const { type, message } = err;
        const error = {
          status: 'error',
          message,
        };
        return res.status(type === 'notFound' ? 404 : 400).json(error);
      }
      if (process.env.NODE_ENV !== 'development') {
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

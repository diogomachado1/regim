import './bootstrap';

import Youch from 'youch';
import path from 'path';
import express, { Express, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routesV1 from './app/routes';

// Uncomment this line to enable database access
// --------
import db from './database';

class App {
  server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes(): void {
    this.server.use(routesV1);
  }

  exceptionHandler(): void {
    this.server.use(
      async (
        err: RegimError,
        req: Request,
        res: Response,
        _next: NextFunction
      ) => {
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
      }
    );
  }

  close(): void {
    db.close();
  }
}

export default new App();

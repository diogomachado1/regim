import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
import ValidationError from '../app/Error/ValidationError';
import { badRequest } from '../app/Error/TypeErrors';

export default {
  limits: { fileSize: 3 * 1000 * 1000 },
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
  fileFilter: (req, file, cb) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find(
      format => format === file.mimetype
    );
    if (!isAccepted) cb(new ValidationError(badRequest('Format invalid')));

    return cb(null, true);
  },
};

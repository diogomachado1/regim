import crypto from 'crypto';
import HashQuery from '../Queries/HashQuery';
import { badRequest } from '../Error/TypeErrors';
import ValidationError from '../Error/ValidationError';
// import HashValidator from '../Validators/MealValidator';
// import { notFound } from '../Error/TypeErrors';
// import ProductService from './ProductService';

class HashServices {
  async verifyAndGetHash(hash) {
    const hashDb = await HashQuery.getHashByHash(hash);
    if (!hashDb) throw new ValidationError(badRequest('Invalid token'));
    return hashDb;
  }

  async create(userId, type = 'CONFIRM_EMAIL') {
    // const ValidatedHash = await HashValidator.createValidator(data);

    const payload = {
      type,
      hash: crypto.randomBytes(40).toString('hex'),
    };

    const hash = await HashQuery.createHash(payload, userId);
    return hash;
  }

  async delete(id) {
    const deleteds = await HashQuery.deleteHashById(id);
    if (!deleteds === 0) throw new ValidationError(badRequest('Invalid token'));
    return true;
  }
}

export default new HashServices();

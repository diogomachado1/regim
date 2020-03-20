import RegimError from './RegimError';

export default class NotFoundError extends RegimError {
  constructor(entity) {
    super(`${entity} not found`, 'notFound', 404);
  }
}

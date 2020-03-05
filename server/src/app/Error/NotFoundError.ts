import RegimError from './RegimError';

export default class NotFoundError extends RegimError {
  constructor(entity: string) {
    super(`${entity} not found`, 'notFound', 404);
  }
}

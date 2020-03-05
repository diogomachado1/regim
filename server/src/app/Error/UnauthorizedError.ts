import RegimError from './RegimError';

export default class UnauthorizedError extends RegimError {
  constructor() {
    super('Unauthorized', 'unauthorized', 401);
  }
}

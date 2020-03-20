export default class RegimError extends Error {
  constructor(message, type, status) {
    super();
    this.message = message;
    this.type = type;
    this.status = status;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RegimError);
    }

    this.name = 'RegimValidationError';
    this.body = {
      status: 'error',
      message: this.message,
    };
  }
}

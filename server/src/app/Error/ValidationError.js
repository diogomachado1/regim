export default class ValidationError extends Error {
  constructor(validation, ...params) {
    super(params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    this.name = 'RegimValidationError';
    this.message = validation.message;
    this.type = validation.type;
  }
}

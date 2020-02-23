import { badRequest } from '../Error/TypeErrors';
import ValidationError from '../Error/ValidationError';

export default async function validateSchema(schema, data) {
  try {
    const response = await schema.validate(data, {
      stripUnknown: true,
    });

    return response;
  } catch (err) {
    throw new ValidationError(badRequest(err.errors[0]));
  }
}

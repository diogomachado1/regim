import * as Yup from 'yup';
import ValidationError from '../Error/ValidationError';
import { badRequest } from '../Error/TypeErrors';

class ProductValidator {
  async createValidator(payload) {
    const validator = Yup.object().shape({
      name: Yup.string()
        .required()
        .trim(),
      amount: Yup.number()
        .required()
        .min(0),
      price: Yup.number().min(0),
      measure: Yup.mixed()
        .oneOf(['g', 'ml', 'unity'])
        .required(),
    });

    try {
      const response = await validator.validate(payload);
      return response;
    } catch (err) {
      throw new ValidationError(badRequest(err.errors[0]));
    }
  }

  async updateValidator(payload) {
    const schema = Yup.object().shape({
      name: Yup.string().trim(),
      amount: Yup.number().min(0),
      price: Yup.number().min(0),
      measure: Yup.mixed().oneOf(['g', 'ml', 'unity']),
    });

    try {
      const response = await schema.validate(payload);
      return response;
    } catch (err) {
      throw new ValidationError(badRequest(err.errors[0]));
    }
  }
}

export default new ProductValidator();

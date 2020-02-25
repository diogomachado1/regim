import * as Yup from 'yup';
import validateSchema from '.';

class ProductValidator {
  async createValidator(payload) {
    const validator = Yup.object().shape({
      name: Yup.string()
        .required()
        .trim(),
      fileId: Yup.number()
        .integer()
        .min(1),
      amount: Yup.number()
        .required()
        .min(0),
      price: Yup.number().min(0),
      measure: Yup.mixed()
        .oneOf(['g', 'ml', 'unity'])
        .required(),
    });

    return validateSchema(validator, payload);
  }

  async updateValidator(payload) {
    const validator = Yup.object().shape({
      name: Yup.string().trim(),
      fileId: Yup.number()
        .integer()
        .min(1),
      amount: Yup.number().min(0),
      price: Yup.number().min(0),
      measure: Yup.mixed().oneOf(['g', 'ml', 'unity']),
    });

    return validateSchema(validator, payload);
  }
}

export default new ProductValidator();

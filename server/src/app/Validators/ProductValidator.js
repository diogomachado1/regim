import * as Yup from 'yup';
import Validator from './Validator';

class ProductValidator extends Validator {
  constructor() {
    super();
    this.createSchema = Yup.object().shape({
      name: Yup.string()
        .required()
        .trim(),
      imageId: Yup.number()
        .integer()
        .nullable()
        .min(1),
      amount: Yup.number()
        .required()
        .min(0),
      price: Yup.number().min(0),
      measure: Yup.mixed()
        .oneOf(['g', 'ml', 'unity'])
        .required(),
    });

    this.updateSchema = Yup.object().shape({
      name: Yup.string().trim(),
      imageId: Yup.number()
        .integer()
        .nullable()
        .min(1),
      amount: Yup.number().min(0),
      price: Yup.number().min(0),
      public: Yup.boolean(),
      measure: Yup.mixed().oneOf(['g', 'ml', 'unity']),
    });
  }

  async createValidator(payload) {
    return this.validate(this.createSchema, payload);
  }

  async updateValidator(payload) {
    return this.validate(this.updateSchema, payload);
  }
}

export default new ProductValidator();

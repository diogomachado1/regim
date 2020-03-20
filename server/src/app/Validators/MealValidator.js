import * as Yup from 'yup';
import Validator from './Validator';

class MealValidator extends Validator {
  constructor() {
    super();
    this.createSchema = Yup.object().shape({
      name: Yup.string()
        .required()
        .trim(),
      imageId: Yup.number()
        .integer()
        .min(1),
      description: Yup.string().trim(),
      ingredients: Yup.array().of(
        Yup.object().shape({
          productId: Yup.number()
            .min(0)
            .integer()
            .required(),
          amount: Yup.number()
            .min(0)
            .default(0),
        })
      ),
    });

    this.updateSchema = Yup.object().shape({
      name: Yup.string().trim(),
      imageId: Yup.number()
        .integer()
        .min(1),
      description: Yup.string().trim(),
      ingredients: Yup.array().of(
        Yup.object().shape({
          productId: Yup.number()
            .min(0)
            .integer()
            .required(),
          amount: Yup.number()
            .min(0)
            .default(0),
        })
      ),
    });
  }

  async createValidator(payload) {
    return this.validate(this.createSchema, payload);
  }

  async updateValidator(payload) {
    return this.validate(this.updateSchema, payload);
  }
}

export default new MealValidator();

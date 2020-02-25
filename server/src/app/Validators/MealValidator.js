import * as Yup from 'yup';
import validateSchema from '.';

class MealValidator {
  async createValidator(payload) {
    const validator = Yup.object().shape({
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

    return validateSchema(validator, payload);
  }

  async updateValidator(payload) {
    const validator = Yup.object().shape({
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

    return validateSchema(validator, payload);
  }
}

export default new MealValidator();

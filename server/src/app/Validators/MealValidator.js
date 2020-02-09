import * as Yup from 'yup';
import ValidationError from '../Error/ValidationError';
import { badRequest } from '../Error/TypeErrors';

class MealValidator {
  async createValidator(meal) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .trim(),
      description: Yup.string().trim(),
      ingredients: Yup.array().of(
        Yup.object()
          .shape({
            productId: Yup.number()
              .min(0)
              .integer()
              .required(),
            amount: Yup.number()
              .min(0)
              .default(0),
          })
          .from('productId', 'ProductId', true)
      ),
    });

    try {
      const response = await schema.validate(meal);

      return response;
    } catch (err) {
      throw new ValidationError(badRequest(err.errors[0]));
    }
  }

  async updateValidator(meal) {
    const schema = Yup.object().shape({
      name: Yup.string().trim(),
      description: Yup.string().trim(),
      ingredients: Yup.array().of(
        Yup.object()
          .shape({
            productId: Yup.number()
              .min(0)
              .integer()
              .required(),
            amount: Yup.number()
              .min(0)
              .default(0),
          })
          .from('productId', 'ProductId', true)
      ),
    });

    try {
      const response = await schema.validate(meal);

      return response;
    } catch (err) {
      throw new ValidationError(badRequest(err.errors[0]));
    }
  }

  async format(meal) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string().nullable(),
      ingredients: Yup.array().of(
        Yup.object()
          .shape({
            productId: Yup.number(),
          })
          .transform(({ amount, ProductId }) => ({
            amount,
            productId: ProductId,
          }))
      ),
    });
    try {
      const { id, name, description, ingredients } = await schema.validate(
        meal
      );

      return {
        id,
        name,
        description,
        ingredients,
      };
    } catch (err) {
      throw new ValidationError(badRequest(err.errors[0]));
    }
  }
}

export default new MealValidator();

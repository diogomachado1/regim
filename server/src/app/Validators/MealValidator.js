const Yup = require('yup');

class MealValidator {
  async createValidator(meal) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      ingredients: Yup.array().of(
        Yup.object()
          .shape({
            productId: Yup.number().required(),
          })
          .from('productId', 'ProductId', true)
      ),
    });

    try {
      const response = await schema.validate(meal);

      return response;
    } catch (err) {
      return {
        isError: true,
        error: err.errors[0],
      };
    }
  }

  async updateValidator(meal) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      ingredients: Yup.array().of(
        Yup.object()
          .shape({
            productId: Yup.number().required(),
          })
          .from('productId', 'ProductId', true)
      ),
    });

    try {
      const response = await schema.validate(meal);

      return response;
    } catch (err) {
      return {
        isError: true,
        error: err.errors[0],
      };
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
      return {
        isError: true,
        error: err.errors[0],
      };
    }
  }
}

module.exports = new MealValidator();

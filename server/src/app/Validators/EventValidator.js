import addYears from 'date-fns/addYears';

const Yup = require('yup');

class EventValidator {
  async createValidator(payload) {
    const validator = Yup.object().shape({
      startDate: Yup.date().required(),
      endDate: Yup.date()
        .required()
        .when(
          'startDate',
          (startDate, schema) => startDate && schema.min(startDate)
        )
        .when(
          'startDate',
          (startDate, schema) => startDate && schema.max(addYears(startDate, 2))
        ),
      duration: Yup.number()
        .default(30)
        .min(15)
        .required(),
      repeatable: Yup.mixed().oneOf(['daily', 'weekly']),
      eventMeals: Yup.array().of(
        Yup.object()
          .shape({
            mealId: Yup.number().required(),
            amount: Yup.number()
              .default(0)
              .min(0),
          })
          .from('mealId', 'MealId', true)
      ),
    });

    try {
      const response = await validator.validate(payload);
      return response;
    } catch (err) {
      return {
        isError: true,
        error: err.errors[0],
      };
    }
  }

  async updateValidator(payload) {
    const validator = Yup.object().shape({
      startDate: Yup.date(),
      endDate: Yup.date()
        .when(
          'startDate',
          (startDate, schema) => startDate && schema.min(startDate)
        )
        .when(
          'startDate',
          (startDate, schema) => startDate && schema.max(addYears(startDate, 2))
        ),
      duration: Yup.number()
        .default(30)
        .min(15),
      repeatable: Yup.mixed().oneOf(['daily', 'weekly']),
      eventMeals: Yup.array().of(
        Yup.object()
          .shape({
            mealId: Yup.number().required(),
            amount: Yup.number()
              .default(0)
              .min(0),
          })
          .from('mealId', 'MealId', true)
      ),
    });
    try {
      const {
        startDate,
        endDate,
        duration,
        repeatable,
        eventMeals,
      } = await validator.validate(payload);

      return { startDate, endDate, duration, repeatable, eventMeals };
    } catch (err) {
      return {
        isError: true,
        error: err.errors[0],
      };
    }
  }

  async format(meal) {
    const validator = Yup.object().shape({
      startDate: Yup.date().required(),
      endDate: Yup.date()
        .required()
        .when(
          'startDate',
          (startDate, schema) => startDate && schema.min(startDate)
        )
        .when(
          'startDate',
          (startDate, schema) => startDate && schema.max(addYears(startDate, 2))
        ),
      duration: Yup.number()
        .default(30)
        .min(15)
        .required(),
      events: Yup.number().required(),
      repeatable: Yup.mixed()
        .oneOf(['daily', 'weekly'])
        .transform(repeatable => repeatable || undefined),
      eventMeals: Yup.array().of(
        Yup.object()
          .shape({
            mealId: Yup.number().required(),
            amount: Yup.number()
              .default(0)
              .min(0),
          })
          .transform(({ amount, MealId }) => ({
            amount: parseFloat(amount),
            mealId: MealId,
          }))
      ),
    });
    try {
      const {
        id,
        startDate,
        endDate,
        duration,
        repeatable,
        events,
        eventMeals,
      } = await validator.validate(meal);
      return {
        id,
        startDate,
        endDate,
        duration,
        repeatable,
        events,
        eventMeals,
      };
    } catch (err) {
      return {
        isError: true,
        error: err.errors[0],
      };
    }
  }
}

module.exports = new EventValidator();

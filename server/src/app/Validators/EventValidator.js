import addYears from 'date-fns/addYears';
import * as Yup from 'yup';
import ValidationError from '../Error/ValidationError';
import { badRequest } from '../Error/TypeErrors';

class EventValidator {
  async createValidator(payload) {
    const validator = Yup.object().shape({
      name: Yup.string()
        .required()
        .trim(),
      duration: Yup.number()
        .default(30)
        .min(0),
      startDate: Yup.date().required(),
      repeatable: Yup.mixed()
        .oneOf(['daily', 'weekly', 'not'])
        .default('not'),
      endDate: Yup.date()
        .required()
        .when(
          'startDate',
          (startDate, schema) => startDate && schema.min(startDate)
        )
        .when(
          'startDate',
          (startDate, schema) =>
            startDate && schema.max(addYears(startDate, 1)).required()
        )
        .when('repeatable', (repeatable, schema) => {
          if (repeatable !== 'not') return schema.required();
          return schema;
        }),
      eventMeals: Yup.array().of(
        Yup.object()
          .shape({
            mealId: Yup.number()
              .min(0)
              .integer()
              .required(),
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
      throw new ValidationError(badRequest(err.errors[0]));
    }
  }

  async updateValidator(payload) {
    const validator = Yup.object().shape({
      name: Yup.string().trim(),
      duration: Yup.number().min(0),
      startDate: Yup.date(),
      repeatable: Yup.mixed().oneOf(['daily', 'weekly', 'not']),
      endDate: Yup.date()
        .when(
          'startDate',
          (startDate, schema) => startDate && schema.min(startDate)
        )
        .when(
          'startDate',
          (startDate, schema) => startDate && schema.max(addYears(startDate, 1))
        )
        .when('repeatable', (repeatable, schema) => {
          if (repeatable !== 'not') return schema.required();
          return schema;
        }),
      eventMeals: Yup.array().of(
        Yup.object()
          .shape({
            mealId: Yup.number()
              .min(0)
              .integer()
              .required(),
            amount: Yup.number()
              .default(0)
              .min(0),
          })
          .from('mealId', 'MealId', true)
          .from('eventId', 'EventId', true)
      ),
    });
    try {
      const {
        name,
        startDate,
        endDate,
        duration,
        repeatable,
        eventMeals,
      } = await validator.validate(payload);

      return { name, startDate, endDate, duration, repeatable, eventMeals };
    } catch (err) {
      throw new ValidationError(badRequest(err.errors[0]));
    }
  }

  async format(meal) {
    const validator = Yup.object().shape({
      name: Yup.string().required(),
      startDate: Yup.date().required(),
      endDate: Yup.date()
        .required()
        .when(
          'startDate',
          (startDate, schema) => startDate && schema.min(startDate)
        )
        .when(
          'startDate',
          (startDate, schema) => startDate && schema.max(addYears(startDate, 1))
        ),
      duration: Yup.number()
        .default(30)
        .min(15)
        .required(),
      events: Yup.number().required(),
      repeatable: Yup.mixed().oneOf(['daily', 'weekly', 'not']),
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
        name,
        startDate,
        endDate,
        duration,
        repeatable,
        events,
        eventMeals,
      } = await validator.validate(meal);
      return {
        id,
        name,
        startDate,
        endDate,
        duration,
        repeatable,
        events,
        eventMeals,
      };
    } catch (err) {
      throw new ValidationError(badRequest(err.errors[0]));
    }
  }
}

export default new EventValidator();

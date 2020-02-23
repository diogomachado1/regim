import addYears from 'date-fns/addYears';
import * as Yup from 'yup';
import validateSchema from '.';

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
        Yup.object().shape({
          mealId: Yup.number()
            .min(0)
            .integer()
            .required(),
          amount: Yup.number()
            .default(0)
            .min(0),
        })
      ),
    });

    return validateSchema(validator, payload);
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
        Yup.object().shape({
          mealId: Yup.number()
            .min(0)
            .integer()
            .required(),
          amount: Yup.number()
            .default(0)
            .min(0),
        })
      ),
    });
    return validateSchema(validator, payload);
  }
}

export default new EventValidator();

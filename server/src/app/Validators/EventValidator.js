import * as Yup from 'yup';
import Validator from './Validator';

class EventValidator extends Validator {
  constructor() {
    super();
    this.createSchema = Yup.object().shape({
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
      endDate: Yup.date().when(
        'startDate',
        (startDate, schema) => startDate && schema.min(startDate)
      ),
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

    this.updateSchema = Yup.object().shape({
      name: Yup.string().trim(),
      duration: Yup.number().min(0),
      startDate: Yup.date(),
      repeatable: Yup.mixed().oneOf(['daily', 'weekly', 'not']),
      endDate: Yup.date().when(
        'startDate',
        (startDate, schema) => startDate && schema.min(startDate)
      ),
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
  }

  async createValidator(payload) {
    return this.validate(this.createSchema, payload);
  }

  async updateValidator(payload) {
    return this.validate(this.updateSchema, payload);
  }
}

export default new EventValidator();

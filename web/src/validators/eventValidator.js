import * as Yup from 'yup';
import { addYears } from 'date-fns';

export const EventSchema = Yup.object().shape({
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
      (startDate, schema) =>
        startDate &&
        schema.max(addYears(startDate, 2), 'Periodo maximo de 2 anos')
    ),
  duration: Yup.number()
    .default(30)
    .min(15)
    .required(),
  repeatable: Yup.mixed().oneOf(['daily', 'weekly', null]),
  eventMeals: Yup.array().of(
    Yup.object()
      .shape({
        mealId: Yup.number().required(),
        amount: Yup.number()
          .default(0)
          .min(0)
          .transform(value => (isNaN(value) ? undefined : value))
          .required('Quantidade é obrigatória'),
      })
      .from('mealId', 'MealId', true)
  ),
});

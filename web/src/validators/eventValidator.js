import * as Yup from 'yup';

export const EventSchema = Yup.object().shape({
  name: Yup.string().required(),
  startDate: Yup.date()
    .typeError('Valor invalido')
    .required('Obrigatória'),
  endDate: Yup.date()
    .typeError('Valor invalido')
    .nullable()
    .when(
      'startDate',
      (startDate, schema) => startDate && schema.min(startDate)
    ),
  duration: Yup.number()
    .transform((value, originalValue) => value || originalValue || undefined)
    .default(30)
    .min(15)
    .nullable(),
  repeatable: Yup.mixed()
    .oneOf(['daily', 'weekly', 'not'])
    .required(),
  eventMeals: Yup.array().of(
    Yup.object().shape({
      mealId: Yup.number().required(),
      amount: Yup.number()
        .transform((value, originalValue) =>
          Number(originalValue.replace(',', '.'))
        )
        .transform(
          (value, originalValue) => value || originalValue || undefined
        )
        .required('Obrigatória')
        .typeError('Valor invalido'),
    })
  ),
});

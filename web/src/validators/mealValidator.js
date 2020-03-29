import * as Yup from 'yup';

export const MealSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string(),
  ingredients: Yup.array().of(
    Yup.object().shape({
      productId: Yup.number().required(),
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

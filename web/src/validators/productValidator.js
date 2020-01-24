import * as Yup from 'yup';

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('Quantidade é obrigatório e tem que ser númerico'),
  price: Yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('Price é obrigatório e tem que ser númerico'),

  measure: Yup.mixed()
    .oneOf(['g', 'ml', 'unity'])
    .default('g')
    .required('Unidade de medida'),
});

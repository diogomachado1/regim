import * as Yup from 'yup';

const toUndefined = value => (value === '' ? undefined : value);

export const ProfileSchema = Yup.object().shape({
  name: Yup.string(),
  imageId: Yup.number()
    .integer()
    .min(1),
  oldPassword: Yup.string()
    .transform(toUndefined)
    .when('password', (password, field) =>
      password ? field.required('Obrigatório').min(6) : field
    ),
  password: Yup.string()
    .transform(toUndefined)
    .min(6),
  confirmPassword: Yup.string()
    .transform(toUndefined)
    .when('password', (password, field) =>
      password
        ? field
            .required('Obrigatório')
            .oneOf([Yup.ref('password')], 'Senhas não conferem')
        : field
    ),
});

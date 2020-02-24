import * as Yup from 'yup';
import validateSchema from '.';

class UserValidator {
  async createValidator(payload) {
    const validator = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    return validateSchema(validator, payload);
  }

  async updateValidator(payload) {
    const validator = Yup.object().shape({
      name: Yup.string(),
      oldPassword: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required() : field
        ),
      password: Yup.string().min(6),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    return validateSchema(validator, payload);
  }

  async updatePassword(payload) {
    const validator = Yup.object().shape({
      password: Yup.string()
        .min(6)
        .required(),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    return validateSchema(validator, payload);
  }
}

export default new UserValidator();

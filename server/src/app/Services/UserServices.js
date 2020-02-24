import HashService from './HashService';
import UserQuery from '../Queries/UserQuery';
import UserValidator from '../Validators/UserValidator';
import { notFound, badRequest } from '../Error/TypeErrors';
import ValidationError from '../Error/ValidationError';
import Queue from '../../lib/Queue';
import ConfirmEmail from '../jobs/ConfirmEmail';
import ForgetPassword from '../jobs/ForgetPassword';

class UserServices {
  async confirmEmail(hash) {
    const hashDb = await HashService.verifyAndGetHash(hash);
    await UserQuery.update({ active: true }, hashDb.user_id);
    await HashService.delete(hashDb.id);
  }

  async forgetPassword(hash, data) {
    const { password } = await UserValidator.updatePassword(data);
    const hashDb = await HashService.verifyAndGetHash(hash);

    await UserQuery.update({ password }, hashDb.user_id);
    await HashService.delete(hashDb.id);
  }

  async verifyAndGetUserByEmail(email) {
    const user = await UserQuery.getUserByEmail(email);
    if (!user) throw new ValidationError(notFound('User'));
    return user;
  }

  async verifyAndGetUserById(email) {
    const user = await UserQuery.getUserById(email);
    if (!user) throw new ValidationError(notFound('User'));
    return user;
  }

  async verifyIfUniqueEmail(email) {
    const user = await UserQuery.getUserByEmail(email);
    if (user) throw new ValidationError(badRequest('User already exists'));
    return user;
  }

  async createForgetPasswordHash(email) {
    if (!email) throw new ValidationError(badRequest('Email is required'));
    const { id, name, active } = await this.verifyAndGetUserByEmail(email);
    if (!active) throw new ValidationError(badRequest('Email need confirmed'));

    const { hash } = await HashService.create(id, 'CHANGE_PASSWORD');
    await Queue.add(ForgetPassword.key, { name, email, hash });
  }

  async createConfirmEmailHash(email, user) {
    const { id, name, active } =
      user || (await this.verifyAndGetUserByEmail(email));
    if (active)
      throw new ValidationError(badRequest('Email already confirmed'));
    const { hash } = await HashService.create(id);

    await Queue.add(ConfirmEmail.key, { name, email, hash });
  }

  async create(data) {
    const ValidatedUser = await UserValidator.createValidator(data);

    await this.verifyIfUniqueEmail(ValidatedUser.email);

    const user = await UserQuery.create(ValidatedUser);

    await this.createConfirmEmailHash(user.email, user);

    return user;
  }

  async update(data, userId) {
    const ValidatedUser = await UserValidator.updateValidator(data);

    const { oldPassword } = ValidatedUser;

    const user = await this.verifyAndGetUserById(userId);

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      throw new ValidationError(badRequest('Password does not match'));
    }

    const userSaved = await UserQuery.update(ValidatedUser, userId);

    return userSaved;
  }
}

export default new UserServices();

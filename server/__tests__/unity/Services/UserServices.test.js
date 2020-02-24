// // import request from 'supertest';
import UserServices from '../../../src/app/Services/UserServices';
import UserValidator from '../../../src/app/Validators/UserValidator';
import HashService from '../../../src/app/Services/HashService';
import Queue from '../../../src/lib/Queue';
import factory from '../../factories';
import UserQuery from '../../../src/app/Queries/UserQuery';

// import ProductQuery from '../../../src/app/Queries/ProductQuery';

// jest.mock('../../../src/app/Queries/ProductQuery.js');
jest.mock('../../../src/app/Queries/UserQuery', () => ({
  getUserByEmail: jest.fn(),
}));
UserServices.verifyAndGetUserByEmail = jest.fn(
  UserServices.verifyAndGetUserByEmail
);
HashService.create = jest.fn(HashService.create);
HashService.verifyAndGetHash = jest.fn();
HashService.delete = jest.fn();
UserQuery.update = jest.fn();
UserValidator.updatePassword = jest.fn(UserValidator.updatePassword);
jest.mock('../../../src/lib/Queue', () => ({
  add: jest.fn(),
}));
describe('UserServices', () => {
  it('methods should exist', async () => {
    expect(UserServices.createForgetPasswordHash).toBeTruthy();
    expect(UserServices.forgetPassword).toBeTruthy();
  });
  it('should get user in createForgetPasswordHash', async () => {
    const user = await factory.attrs('User', { active: true });
    UserQuery.getUserByEmail.mockResolvedValue(user);
    HashService.create.mockResolvedValue('hash');
    await UserServices.createForgetPasswordHash(user.email);
    expect(UserServices.verifyAndGetUserByEmail).toHaveBeenCalledTimes(1);
  });
  it('should get error if user not active', async () => {
    const user = await factory.attrs('User', { active: false });
    UserQuery.getUserByEmail.mockResolvedValue(user);
    await expect(
      UserServices.createForgetPasswordHash(user.email)
    ).rejects.toThrow(/Email need confirmed./);
  });
  it('should create hash', async () => {
    const user = await factory.attrs('User', { active: true });
    UserQuery.getUserByEmail.mockResolvedValue(user);
    HashService.create.mockResolvedValue('hash');
    await UserServices.createForgetPasswordHash(user.email);
    expect(HashService.create).toHaveBeenCalledTimes(1);
  });
  it('should add to queue', async () => {
    const user = await factory.attrs('User', { active: true });
    UserQuery.getUserByEmail.mockResolvedValue(user);
    HashService.create.mockResolvedValue('hash');
    await UserServices.createForgetPasswordHash(user.email);
    expect(Queue.add).toHaveBeenCalledTimes(1);
  });
  // it('should validate body in forgetPassword', async () => {
  //   const body = { password: '123456', confirmPassword: '123456' };
  //   HashService.create.mockResolvedValue('hash');
  //   await UserServices.forgetPassword('hash', body);
  //   expect(UserValidator.updatePassword).toHaveBeenCalledTimes(1);
  // });
  it('should validate body in forgetPassword', async () => {
    const body = { password: '123456', confirmPassword: '123456' };
    HashService.verifyAndGetHash.mockResolvedValue({ user_id: 1 });
    UserQuery.update.mockResolvedValue(true);
    HashService.delete.mockResolvedValue(true);
    await UserServices.forgetPassword('hash', body);
    expect(UserValidator.updatePassword).toHaveBeenCalledTimes(1);
    expect(HashService.verifyAndGetHash).toHaveBeenCalledTimes(1);
    expect(UserQuery.update).toHaveBeenCalledTimes(1);
    expect(HashService.delete).toHaveBeenCalledTimes(1);
  });
  // it('should get hash in forgetPassword', async () => {
  //   const user = await factory.attrs('User', { active: true });
  //   UserQuery.getUserByEmail.mockResolvedValue(user);
  //   HashService.create.mockResolvedValue('hash');
  //   await UserServices.forgetPassword(user.email);
  //   expect(UserServices.verifyAndGetUserByEmail).toHaveBeenCalledTimes(1);
  // });
});

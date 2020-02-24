import forgetPasswordContoller from '../../../src/app/controllers/forgetPasswordContoller';
import factory from '../../factories';

import UserServices from '../../../src/app/Services/UserServices';
// import ProductService from '../../../src/app/Services/ProductService';

jest.mock('../../../src/app/Services/UserServices.js', () => ({
  createForgetPasswordHash: jest.fn(),
  forgetPassword: jest.fn(),
}));

const res = {
  json: jest.fn(data => data),
  status: jest.fn(function status() {
    return this;
  }),
};

describe('forgetPasswordContoller', () => {
  it('methods should exist', async () => {
    expect(forgetPasswordContoller.store).toBeTruthy();
    expect(forgetPasswordContoller.update).toBeTruthy();
  });
  it('should create forgetPassword', async () => {
    const user = await factory.attrs('User');
    UserServices.createForgetPasswordHash.mockResolvedValue(true);
    await forgetPasswordContoller.store(
      { userId: 1, body: { email: user.email } },
      res
    );
    expect(UserServices.createForgetPasswordHash).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(204);
  });
  it('should forgetPassword', async () => {
    const user = await factory.attrs('User');
    UserServices.forgetPassword.mockResolvedValue(true);
    await forgetPasswordContoller.update(
      {
        userId: 1,
        params: { hash: 'testhash' },
        body: { password: user.password, confirmPassword: user.password },
      },
      res
    );
    expect(UserServices.forgetPassword).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});

import HashService from './HashService';
import UserQuery from '../Queries/UserQuery';

class UserServices {
  async confirmEmail(hash) {
    const hashDb = await HashService.verifyAndGetHash(hash);
    await UserQuery.update({ active: true }, hashDb.user_id);
    await HashService.delete(hashDb.id);
  }
}

export default new UserServices();

import User from '../models/User';

class UserQuery {
  // async getUserByUser(hash) {
  //   const DocUser = await User.findOne({ where: { hash });

  //   return DocUser && DocUser.get();
  // }

  // async createUser(data, user_id) {
  //   const DocUser = await User.create({
  //     ...data,
  //     user_id,
  //   });

  //   return DocUser && DocUser.get();
  // }

  async update(data, id) {
    const [, [DocProduct]] = await User.update(data, {
      where: { id },
      returning: true,
    });

    return DocProduct && DocProduct.get();
  }

  // async deleteUserById(id, user_id) {
  //   return User.destroy({
  //     where: { user_id, id },
  //   });
  // }
}

export default new UserQuery();

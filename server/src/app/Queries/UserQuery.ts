import User from '../models/User';

class UserQuery {
  async getUserById(id) {
    const DocUser = await User.findOne({ where: { id } });

    return DocUser && DocUser.get();
  }

  async getUserByEmail(email) {
    const DocUser = await User.findOne({ where: { email } });

    return DocUser && DocUser.get();
  }

  async create(data) {
    const DocUser = await User.create({
      ...data,
      active: false,
    });
    return DocUser && DocUser.get();
  }

  async update(data, id) {
    const DocUser = await User.findOne({ where: { id } });
    DocUser.set(data);
    const user = await DocUser.save(data);

    return user && user.get();
  }

  // async deleteUserById(id, user_id) {
  //   return User.destroy({
  //     where: { user_id, id },
  //   });
  // }
}

export default new UserQuery();

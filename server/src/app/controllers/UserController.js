import UserServices from '../Services/UserServices';

class UserController {
  async store(req, res) {
    const { id, name, email } = await UserServices.create(req.body);
    return res.status(201).json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { id, name, email, imageId } = await UserServices.update(
      req.body,
      req.userId
    );
    return res.json({
      id,
      name,
      email,
      imageId,
    });
  }
}

export default new UserController();

import UserServices from '../Services/UserServices';

class ConfirmEmailController {
  async update(req, res) {
    const {
      params: { hash },
    } = req;
    await UserServices.confirmEmail(hash);

    return res.status(204).json();
  }
}

export default new ConfirmEmailController();

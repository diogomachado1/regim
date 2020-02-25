import FileService from '../Services/FileService';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await FileService.create({ name, path }, req.userId);

    return res.json(file);
  }
}

export default new FileController();

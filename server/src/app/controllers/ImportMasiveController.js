import FileService from '../Services/FileService';
import ImportMassiveService from '../Services/ImportMassiveService';

class ImportMassiveController {
  async products(req, res) {
    const {
      originalname: name,
      filename: path,
      key: keyS3,
      mimetype,
    } = req.file;
    const key = path || keyS3;
    const file = await FileService.create({ name, path: key }, req.userId);

    if (
      mimetype ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      await ImportMassiveService.processProductXlsx(file.url, req.userId);
    }

    return res.json(file);
  }
}

export default new ImportMassiveController();

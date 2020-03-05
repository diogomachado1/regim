import FileQuery from '../Queries/FileQuery';
import { badRequest } from '../Error/TypeErrors';
import ValidationError from '../Error/ValidationError';
// import FileValidator from '../Validators/MealValidator';
// import { notFound } from '../Error/TypeErrors';
// import ProductService from './ProductService';

class FileServices {
  async verifyAndGetFile(id, userId) {
    const file = await FileQuery.getFileById(id, userId);
    if (!file) throw new ValidationError(badRequest('Image not found'));
    return file;
  }

  async create(data, userId) {
    return FileQuery.create(data, userId);
  }

  // async delete(id) {
  //   const deleteds = await FileQuery.deleteFileById(id);
  //   if (!deleteds === 0) throw new ValidationError(badRequest('Invalid token'));
  //   return true;
  // }
}

export default new FileServices();

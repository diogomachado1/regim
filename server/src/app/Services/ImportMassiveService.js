import XLSX from 'xlsx';
import axios from 'axios';
import Rabbit from '../../lib/Rabbit';
// import FileValidator from '../Validators/MealValidator';
// import { notFound } from '../Error/TypeErrors';
// import ProductService from './ProductService';

class ImportMassiveService {
  async processProductXlsx(url, userId) {
    const excel = await axios.get(url, { responseType: 'arraybuffer' });

    const workbook = XLSX.read(excel.data.buffer, {
      type: 'array',
    });

    const objects = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]],
      { raw: true }
    );

    await Promise.all(
      objects.map(async item =>
        Rabbit.sendMessage('import-product', {
          payload: item,
          userId,
        })
      )
    );
  }
}

export default new ImportMassiveService();

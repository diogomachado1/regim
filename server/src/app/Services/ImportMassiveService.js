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

    const rabbit = new Rabbit();

    await rabbit.getChannel();
    await Promise.all(
      objects.map(async item =>
        rabbit.sendMessage('import-product', {
          payload: item,
          userId,
        })
      )
    );
    await rabbit.closeConnection();
  }
}

export default new ImportMassiveService();

import { addMonths, parseISO } from 'date-fns';
import EventServices from '../Services/Event';

class ListController {
  async index(req, res) {
    const { userId } = req;
    const { fromDate, toDate } = req.query;
    const fromDateQuery = fromDate ? parseISO(fromDate) : new Date();
    const toDateQuery = toDate ? parseISO(toDate) : addMonths(new Date(), 1);

    return res
      .status(200)
      .json(await EventServices.getList(fromDateQuery, toDateQuery, userId));
  }
}

export default new ListController();

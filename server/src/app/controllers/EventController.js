import { parseISO, addMonths } from 'date-fns';
import EventValidator from '../Validators/EventValidator';
import EventServices from '../Services/Event';

class EventController {
  async index(req, res) {
    const { userId } = req;
    const { fromDate, toDate } = req.query;
    const fromDateQuery = fromDate ? parseISO(fromDate) : new Date();

    const toDateQuery = toDate ? parseISO(toDate) : addMonths(new Date(), 1);

    const events = await EventServices.getSingleEventsByDate(
      fromDateQuery,
      toDateQuery,
      userId
    );

    return res.json(events);
  }

  async show(req, res) {
    const {
      userId,
      params: { id },
    } = req;

    const event = await EventServices.verifyAndGetEvent(id, userId);

    return res.json(event);
  }

  async store(req, res) {
    const { userId } = req;

    const event = await EventServices.create(req.body, userId);

    const eventFomated = await EventValidator.format(event);

    return res.status(201).json(eventFomated);
  }

  async update(req, res) {
    const {
      userId,
      params: { id },
    } = req;

    const event = await EventServices.update(req.body, id, userId);

    return res.status(200).json(await EventValidator.format(event));
  }

  async delete(req, res) {
    const {
      userId: user_id,
      params: { id },
    } = req;

    await EventServices.delete(id, user_id);
    return res.status(204).json();
  }
}

export default new EventController();

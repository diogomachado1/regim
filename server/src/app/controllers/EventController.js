import { parseISO, addMonths } from 'date-fns';
import EventServices from '../Services/Event';

class EventController {
  async index(req, res, next) {
    const { userId } = req;
    const { fromDate, toDate } = req.query;
    const fromDateQuery = fromDate ? parseISO(fromDate) : new Date();

    const toDateQuery = toDate ? parseISO(toDate) : addMonths(new Date(), 1);

    const events = await EventServices.getSingleEventsByDate(
      fromDateQuery,
      toDateQuery,
      userId
    );

    req.response = events;
    res.json(events);
    return next();
  }

  async show(req, res, next) {
    const {
      userId,
      params: { id },
    } = req;

    const event = await EventServices.verifyAndGetEvent(id, userId);

    req.response = event;
    res.json(event);
    return next();
  }

  async store(req, res, next) {
    const { userId } = req;

    const event = await EventServices.create(req.body, userId);

    res.status(201).json(event);
    return next();
  }

  async update(req, res, next) {
    const {
      userId,
      params: { id },
    } = req;

    const event = await EventServices.update(req.body, id, userId);

    res.status(200).json(event);
    return next();
  }

  async delete(req, res, next) {
    const {
      userId: user_id,
      params: { id },
    } = req;

    await EventServices.delete(id, user_id);
    res.status(204).json();
    return next();
  }
}

export default new EventController();

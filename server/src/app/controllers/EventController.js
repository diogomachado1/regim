import { parseISO, addMonths } from 'date-fns';
import Meal from '../models/Meal';
import database from '../../database';
import EventValidator from '../Validators/EventValidator';
import Event from '../models/Event';
import EventMeal from '../models/EventMeal';
import SingleEventSchema from '../schemas/SingleEvent';
import EventServices from '../Services/Event';

class EventController {
  async index(req, res) {
    const { userId } = req;
    const { fromDate, toDate } = req.query;
    const fromDateQuery = fromDate ? parseISO(fromDate) : new Date();

    const toDateQuery = toDate ? parseISO(toDate) : addMonths(new Date(), 1);

    const events = await EventServices.getSingleEventByDate(
      fromDateQuery,
      toDateQuery,
      userId
    );

    return res.json(events);
  }

  async show(req, res) {
    const {
      userId: user_id,
      params: { id },
    } = req;

    const event = await Event.findOne({
      where: { user_id, id },
      attributes: [
        'id',
        'startDate',
        'endDate',
        'duration',
        'repeatable',
        'name',
      ],
      include: {
        model: EventMeal,
        as: 'eventMeals',
        attributes: ['amount', ['meal_id', 'mealId']],
        include: {
          model: Meal,
          as: 'meals',
          attributes: ['id', 'description', 'name'],
        },
      },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    return res.json(event);
  }

  async store(req, res) {
    const { userId: user_id } = req;
    const ValidatedEvent = await EventValidator.createValidator(req.body);

    if (ValidatedEvent.isError) {
      return res.status(400).json({ error: ValidatedEvent.error });
    }

    if (ValidatedEvent.eventMeals) {
      const verifyEventMeals = await Event.verifyEventMeals(
        user_id,
        ValidatedEvent.eventMeals
      );
      if (verifyEventMeals.isError) {
        return res.status(400).json({ error: verifyEventMeals.error });
      }
    }

    try {
      const eventSave = await Event.create(
        {
          ...ValidatedEvent,
          user_id,
        },
        {
          include: [
            {
              model: EventMeal,
              as: 'eventMeals',
            },
          ],
          attributes: ['amount', ['meal_id', 'mealId']],
        }
      );

      const saves = await SingleEventSchema.insertMany(
        EventServices.getSingleEvent(
          { ...ValidatedEvent, id: eventSave.id },
          user_id
        )
      );

      const event = await EventValidator.format({
        ...eventSave.dataValues,
        events: saves.length,
      });
      return res.status(201).json(event);
    } catch (error) {
      if (
        error.name === 'SequelizeForeignKeyConstraintError' &&
        error.table === 'event_meals'
      ) {
        return res.status(400).json({
          error: `Meal ${error.original.detail.match(
            /\([0-9]*\)/gi
          )} not found`,
        });
      }
      return res.status(400).json({
        error,
      });
    }
  }

  async update(req, res) {
    const {
      userId: user_id,
      params: { id },
    } = req;

    const eventDoc = await Event.findByPk(id, {
      where: { user_id },
      include: [
        {
          model: EventMeal,
          as: 'eventMeals',
          attributes: [
            ['meal_id', 'mealId'],
            ['event_id', 'eventId'],
            'amount',
          ],
        },
      ],
    });

    const event = eventDoc.get({ plain: true });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    const ValidatedEvent = await EventValidator.updateValidator({
      ...event,
      ...req.body,
    });

    if (ValidatedEvent.isError) {
      return res.status(400).json({ error: ValidatedEvent.error });
    }

    if (ValidatedEvent.eventMeals) {
      const verifyEventMeals = await Event.verifyEventMeals(
        user_id,
        ValidatedEvent.eventMeals
      );
      if (verifyEventMeals.isError) {
        return res.status(400).json({ error: verifyEventMeals.error });
      }
    }

    try {
      const eventSave = await database.connection.transaction(async t => {
        const seqEvent = await eventDoc.update({
          ...ValidatedEvent,
          user_id,
        });

        if (ValidatedEvent.eventMeals) {
          await EventMeal.destroy({
            transaction: t,
            where: { event_id: event.id },
          });

          await EventMeal.bulkCreate(
            ValidatedEvent.eventMeals.map(item => ({
              ...item,
              event_id: event.id,
            })),
            {
              transaction: t,
            }
          );
        }

        return {
          ...seqEvent.get({ plain: true }),
          eventMeals: ValidatedEvent.eventMeals,
        };
      });

      await SingleEventSchema.deleteMany({ eventId: eventSave.id });

      const saves = await SingleEventSchema.insertMany(
        EventServices.getSingleEvent(
          { ...ValidatedEvent, id: eventSave.id },
          user_id
        )
      );

      return res.status(200).json(
        await EventValidator.format({
          ...eventSave,
          events: saves.length,
        })
      );
    } catch (error) {
      if (
        error.name === 'SequelizeForeignKeyConstraintError' &&
        error.table === 'event_meals'
      ) {
        return res.status(400).json({
          error: `Meal ${error.original.detail.match(
            /\([0-9]*\)/gi
          )} not found`,
        });
      }

      return res.status(400).json({
        error,
      });
    }
  }

  async delete(req, res) {
    const {
      userId: user_id,
      params: { id },
    } = req;

    const deleteds = await Event.destroy({
      where: { user_id, id },
    });

    await SingleEventSchema.deleteMany({ eventId: id });

    if (deleteds === 0) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    return res.status(204).json();
  }
}

export default new EventController();

import Meal from '../models/Meal';
import database from '../../database';
import EventValidator from '../Validators/EventValidator';
import Event from '../models/Event';
import EventMeal from '../models/EventMeal';
import SingleEvent from '../models/SingleEvent';
import getSingleEventArray from '../Funcs/EventMeal';

class EventController {
  async index(req, res) {
    const { userId: user_id } = req;

    const events = await SingleEvent.findAll({
      attributes: ['eventStartDate'],
      order: [['eventStartDate', 'ASC']],
      include: [
        {
          model: Event,
          as: 'event',
          where: { user_id },

          attributes: ['id', 'startDate', 'endDate', 'duration', 'repeatable'],
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
        },
      ],
    });
    return res.json(events);
  }

  async store(req, res) {
    const { userId: user_id } = req;
    const ValidatedEvent = await EventValidator.createValidator(req.body);

    if (ValidatedEvent.isError) {
      return res.status(400).json({ error: ValidatedEvent.error });
    }

    const singleEvents = getSingleEventArray(ValidatedEvent);

    if (ValidatedEvent.eventMeals) {
      const verifyEventMeals = await Event.verifyEventMeals(
        user_id,
        ValidatedEvent.eventMeals
      );
      if (verifyEventMeals.isError) {
        return res.status(400).json({ error: verifyEventMeals.error });
      }
    }

    let singleEventCount;

    try {
      const eventSave = await database.connection.transaction(async t => {
        const event = await Event.create(
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
            transaction: t,
          }
        );

        const singleEventsSaves = await SingleEvent.bulkCreate(
          singleEvents.map(item => ({ ...item, event_id: event.id })),
          {
            transaction: t,
          }
        );
        singleEventCount = singleEventsSaves.length;
        return event;
      });
      const event = await EventValidator.format({
        ...eventSave.dataValues,
        events: singleEventCount,
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

    const event = await Event.findByPk(id, {
      where: { user_id },
      include: [{ model: EventMeal, as: 'eventMeals' }],
    });

    const ValidatedEvent = await EventValidator.updateValidator({
      ...event.get(),
      ...req.body,
    });

    if (ValidatedEvent.isError) {
      return res.status(400).json({ error: ValidatedEvent.error });
    }

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
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

    const singleEvents = getSingleEventArray(ValidatedEvent);

    let singleEventCount;

    try {
      const eventSave = await database.connection.transaction(async t => {
        const seqEvent = await event.update(
          {
            ...event.get(),
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
            transaction: t,
          }
        );

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

        await SingleEvent.destroy({
          transaction: t,
          where: { event_id: event.id },
        });

        const singleEventsSaves = await SingleEvent.bulkCreate(
          singleEvents.map(item => ({ ...item, event_id: seqEvent.id })),
          {
            transaction: t,
          }
        );
        singleEventCount = singleEventsSaves.length;

        return seqEvent;
      });

      return res.status(200).json(
        await EventValidator.format({
          ...eventSave.dataValues,
          events: singleEventCount,
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

    if (deleteds === 0) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    return res.status(204).json();
  }
}

export default new EventController();
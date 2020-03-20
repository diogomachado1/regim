import SingleEventSchema from '../schemas/SingleEvent';

class SingleEvent {
  async getSingleEventByDate(fromDate, toDate, userId) {
    const DocSingleEvents = await SingleEventSchema.find({
      eventStartDate: {
        $gte: fromDate,
        $lt: toDate,
      },
      userId,
    })
      .sort('eventStartDate')
      .lean();

    return DocSingleEvents;
  }

  async getSingleEventGroupByEventId(fromDate, toDate, userId) {
    const DocSingleEvents = await SingleEventSchema.aggregate([
      {
        $match: {
          userId,
          eventStartDate: {
            $gte: fromDate,
            $lt: toDate,
          },
        },
      },
      {
        $group: {
          _id: '$eventId',
          count: { $sum: 1 },
        },
      },
    ]);

    return DocSingleEvents;
  }

  async createMany(singleEvents) {
    return SingleEventSchema.insertMany(singleEvents);
  }

  async updateMany(singleEvents, id) {
    await SingleEventSchema.deleteMany({ eventId: id });

    return SingleEventSchema.insertMany(singleEvents);
  }

  async deleteMany(id) {
    return SingleEventSchema.deleteMany({ eventId: id });
  }
}

export default new SingleEvent();

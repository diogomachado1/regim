import { addMinutes, isBefore, addDays, addWeeks, isAfter } from 'date-fns';

class SingleEventServices {
  getSingleEvent(event, userId) {
    const singleEvents = [];
    const { startDate, endDate, duration, repeatable, id } = event;
    if (!event.repeatable) {
      singleEvents.push({
        eventStartDate: startDate,
        eventId: id,
        userId,
      });
    } else if (repeatable === 'daily') {
      let currentDate = startDate;
      const finishDate = addMinutes(endDate, duration);
      while (isBefore(currentDate, finishDate)) {
        singleEvents.push({
          eventStartDate: currentDate,
          eventId: id,
          userId,
        });
        currentDate = addDays(currentDate, 1);
      }
    } else if (repeatable === 'weekly') {
      let currentDate = startDate;
      const finishDate = addMinutes(endDate, duration);
      while (isBefore(currentDate, finishDate)) {
        singleEvents.push({
          eventStartDate: currentDate,
          eventId: id,
          userId,
        });
        currentDate = addWeeks(currentDate, 1);
      }
    }
    return singleEvents;
  }

  getSingleEventWithTime(event, userId, fromDate, toDate) {
    const singleEvents = [];
    const { startDate, endDate, duration, repeatable, id } = event;
    let currentDate = startDate;
    const finishDate = addMinutes(endDate, duration);
    const finishSearchDate = addMinutes(toDate, duration);
    if (!event.repeatable) {
      if (
        isAfter(currentDate, fromDate) &&
        isBefore(startDate, finishSearchDate)
      ) {
        singleEvents.push({
          eventStartDate: startDate,
          eventId: id,
          userId,
          event,
        });
      }
    } else if (repeatable === 'daily') {
      while (
        isBefore(currentDate, finishDate) &&
        isBefore(currentDate, finishSearchDate)
      ) {
        if (isAfter(currentDate, fromDate)) {
          singleEvents.push({
            eventStartDate: currentDate,
            eventId: id,
            userId,
            event,
          });
        }
        currentDate = addDays(currentDate, 1);
      }
    } else if (repeatable === 'weekly') {
      while (
        isBefore(currentDate, finishDate) &&
        isBefore(currentDate, finishSearchDate)
      ) {
        if (isAfter(currentDate, fromDate)) {
          singleEvents.push({
            eventStartDate: currentDate,
            eventId: id,
            userId,
            event,
          });
        }
        currentDate = addWeeks(currentDate, 1);
      }
    }
    return singleEvents;
  }

  getEventSingleList(events, userId, fromDate, toDate) {
    const singlesEvents = events.map(event =>
      this.getSingleEventWithTime(event, userId, fromDate, toDate)
    );
    const oneSinglesEventsArray = singlesEvents.reduce(
      (finalArray, currentArray) => finalArray.concat(currentArray),
      []
    );
    const orderedSingleEvent = oneSinglesEventsArray.sort((itemA, itemB) => {
      if (isAfter(itemA.eventStartDate, itemB.eventStartDate)) return 1;
      return -1;
    });

    return orderedSingleEvent;
  }

  getEventSingleWithCount(events, userId, fromDate, toDate) {
    const singlesEvents = events.map(event =>
      this.getSingleEventWithTime(event, userId, fromDate, toDate)
    );
    const oneSinglesEventsArray = singlesEvents.reduce(
      (finalArray, currentArray) =>
        finalArray.concat([
          {
            eventId: currentArray[0].event.id,
            count: currentArray.length,
            event: currentArray[0].event,
          },
        ]),
      []
    );

    return oneSinglesEventsArray;
  }

  // to listService
}

export default new SingleEventServices();

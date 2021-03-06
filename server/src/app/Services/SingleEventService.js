import { addMinutes, isBefore, addDays, addWeeks, isAfter } from 'date-fns';

class SingleEventServices {
  getSingleEventWithTime(event, userId, fromDate, toDate) {
    const singleEvents = [];
    const { startDate, endDate, duration, repeatable, id } = event;
    let currentDate = startDate;
    const finishDate = endDate && addMinutes(endDate, duration);
    const finishSearchDate = addMinutes(toDate, duration);
    if (event.repeatable === 'not') {
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
      while (this.verifyBefore(currentDate, finishDate, finishSearchDate)) {
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
      while (this.verifyBefore(currentDate, finishDate, finishSearchDate)) {
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

  verifyBefore(currentDate, finishDate, finishSearchDate) {
    if (finishDate) {
      return (
        isBefore(currentDate, finishDate) &&
        isBefore(currentDate, finishSearchDate)
      );
    }
    return isBefore(currentDate, finishSearchDate);
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
      (finalArray, currentArray) => {
        if (currentArray.length > 0) {
          return finalArray.concat([
            {
              eventId: currentArray[0].event.id,
              count: currentArray.length,
              event: currentArray[0].event,
            },
          ]);
        }
        return finalArray;
      },
      []
    );

    return oneSinglesEventsArray;
  }

  // to listService
}

export default new SingleEventServices();

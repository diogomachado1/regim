import { addMinutes, isBefore, addDays, addWeeks } from 'date-fns';

function getSingleEventArray(ValidatedEvent) {
  const singleEvents = [];
  const { startDate, endDate, duration, repeatable } = ValidatedEvent;
  if (!ValidatedEvent.repeatable) {
    singleEvents.push({ eventStartDate: startDate });
  } else if (repeatable === 'daily') {
    let currentDate = startDate;
    const finishDate = addMinutes(endDate, duration);
    while (isBefore(currentDate, finishDate)) {
      singleEvents.push({ eventStartDate: currentDate });
      currentDate = addDays(currentDate, 1);
    }
  } else if (repeatable === 'weekly') {
    let currentDate = startDate;
    const finishDate = addMinutes(endDate, duration);
    while (isBefore(currentDate, finishDate)) {
      singleEvents.push({ eventStartDate: currentDate });
      currentDate = addWeeks(currentDate, 1);
    }
  }
  return singleEvents;
}

export default getSingleEventArray;

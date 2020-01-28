export function saveEventRequest(event) {
  return {
    type: '@event/SAVE_IN_RESQUEST',
    payload: { event },
  };
}

export function saveEventInSuccess() {
  return {
    type: '@event/SAVE_IN_SUCCESS',
    payload: {},
  };
}

export function saveEventInFailure() {
  return {
    type: '@event/SAVE_IN_FAILURE',
    payload: {},
  };
}

export function getEventRequest(fromDate, toDate) {
  return {
    type: '@event/GET_IN_RESQUEST',
    payload: { fromDate, toDate },
  };
}

export function getEventInSuccess(events) {
  return {
    type: '@event/GET_IN_SUCCESS',
    payload: { events },
  };
}

export function getEventInFailure() {
  return {
    type: '@event/GET_IN_FAILURE',
    payload: {},
  };
}

export function getOneEventRequest(id) {
  return {
    type: '@event/GETONE_IN_RESQUEST',
    payload: { id },
  };
}

export function getOneEventInSuccess(event) {
  return {
    type: '@event/GETONE_IN_SUCCESS',
    payload: { event },
  };
}

export function getOneEventInFailure() {
  return {
    type: '@event/GETONE_IN_FAILURE',
    payload: {},
  };
}

export function deleteEventRequest(event) {
  return {
    type: '@event/DELETE_IN_RESQUEST',
    payload: { event },
  };
}

export function deleteEventInSuccess() {
  return {
    type: '@event/DELETE_IN_SUCCESS',
    payload: {},
  };
}

export function deleteEventInFailure() {
  return {
    type: '@event/DELETE_IN_FAILURE',
    payload: {},
  };
}

export function saveMealRequest(meal) {
  return {
    type: '@meal/SAVE_IN_RESQUEST',
    payload: { meal },
  };
}

export function saveMealInSuccess() {
  return {
    type: '@meal/SAVE_IN_SUCCESS',
    payload: {},
  };
}

export function saveMealInFailure() {
  return {
    type: '@meal/SAVE_IN_FAILURE',
    payload: {},
  };
}

export function getMealRequest(page, search, debounce) {
  if (debounce) {
    return {
      type: '@meal/GET_IN_RESQUEST_DEBOUNCE',
      payload: { page, search },
    };
  }
  return {
    type: '@meal/GET_IN_RESQUEST',
    payload: { page, search },
  };
}

export function getMealInSuccess(data) {
  return {
    type: '@meal/GET_IN_SUCCESS',
    payload: { data },
  };
}

export function getMealInFailure() {
  return {
    type: '@meal/GET_IN_FAILURE',
    payload: {},
  };
}

export function getOneMealRequest(id) {
  return {
    type: '@meal/GETONE_IN_RESQUEST',
    payload: { id },
  };
}

export function getOneMealInSuccess(meal) {
  return {
    type: '@meal/GETONE_IN_SUCCESS',
    payload: { meal },
  };
}

export function getOneMealInFailure() {
  return {
    type: '@meal/GETONE_IN_FAILURE',
    payload: {},
  };
}

export function deleteMealRequest(meal, page, search) {
  return {
    type: '@meal/DELETE_IN_RESQUEST',
    payload: { meal, page, search },
  };
}

export function deleteMealInSuccess() {
  return {
    type: '@meal/DELETE_IN_SUCCESS',
    payload: {},
  };
}

export function deleteMealInFailure() {
  return {
    type: '@meal/DELETE_IN_FAILURE',
    payload: {},
  };
}

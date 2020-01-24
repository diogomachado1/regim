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

export function getMealRequest() {
  return {
    type: '@meal/GET_IN_RESQUEST',
    payload: {},
  };
}

export function getMealInSuccess(meals) {
  return {
    type: '@meal/GET_IN_SUCCESS',
    payload: { meals },
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

export function deleteMealRequest(meal) {
  return {
    type: '@meal/DELETE_IN_RESQUEST',
    payload: { meal },
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

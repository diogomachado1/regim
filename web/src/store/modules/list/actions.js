export function getListRequest(fromDate, toDate) {
  return {
    type: '@list/GET_IN_RESQUEST',
    payload: { fromDate, toDate },
  };
}

export function getListInSuccess(list) {
  return {
    type: '@list/GET_IN_SUCCESS',
    payload: { list },
  };
}

export function getListInFailure() {
  return {
    type: '@list/GET_IN_FAILURE',
    payload: {},
  };
}

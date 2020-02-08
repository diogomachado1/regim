import produce from 'immer';

const INITIAL_STATE = {
  list: [],
};

export default function list(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@list/GET_IN_RESQUEST': {
        draft.loading = true;
        break;
      }
      case '@list/GET_IN_SUCCESS': {
        draft.loading = false;
        draft.list = action.payload.list;
        break;
      }
      case '@list/GET_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

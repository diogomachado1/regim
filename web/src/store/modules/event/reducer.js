import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  editEvent: {},
  events: [],
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@event/SAVE_IN_RESQUEST': {
        draft.loading = true;
        break;
      }
      case '@event/SAVE_IN_SUCCESS': {
        draft.loading = false;
        draft.editEvent = {};
        break;
      }
      case '@event/SAVE_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@event/GET_IN_RESQUEST': {
        draft.loading = true;
        break;
      }
      case '@event/GET_IN_SUCCESS': {
        draft.loading = false;
        draft.events = action.payload.events;
        break;
      }
      case '@event/GET_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@event/GETONE_IN_RESQUEST': {
        draft.loading = true;
        break;
      }
      case '@event/GETONE_IN_SUCCESS': {
        draft.loading = false;
        draft.editEvent = action.payload.event;
        break;
      }
      case '@event/GETONE_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@event/DELETE_IN_RESQUEST': {
        draft.loading = true;
        break;
      }
      case '@event/DELETE_IN_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@event/DELETE_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

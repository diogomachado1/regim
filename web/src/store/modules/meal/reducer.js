import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  editMeal: {},
  meals: [],
  count: 0,
};

export default function meal(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meal/SAVE_IN_RESQUEST': {
        draft.loading = true;
        break;
      }
      case '@meal/SAVE_IN_SUCCESS': {
        draft.loading = false;
        draft.editMeal = {};
        break;
      }
      case '@meal/SAVE_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@meal/GET_IN_RESQUEST': {
        draft.loading = true;
        break;
      }
      case '@meal/GET_IN_SUCCESS': {
        draft.loading = false;
        draft.meals = action.payload.data.rows;
        draft.count = action.payload.data.count;
        break;
      }
      case '@meal/GET_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@meal/GETONE_IN_RESQUEST': {
        draft.loading = true;
        break;
      }
      case '@meal/GETONE_IN_SUCCESS': {
        draft.loading = false;
        draft.editMeal = action.payload.meal;
        break;
      }
      case '@meal/GETONE_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@meal/DELETE_IN_RESQUEST': {
        draft.loading = true;
        break;
      }
      case '@meal/DELETE_IN_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@meal/DELETE_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

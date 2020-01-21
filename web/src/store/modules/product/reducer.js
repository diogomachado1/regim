import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  openForm: false,
  products: [],
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@product/SAVE_IN_RESQUEST': {
        draft.loading = true;
        break;
      }
      case '@product/SAVE_IN_SUCCESS': {
        draft.loading = false;
        draft.openForm = false;
        break;
      }
      case '@product/SAVE_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@product/GET_IN_RESQUEST': {
        draft.loading = true;
        break;
      }
      case '@product/GET_IN_SUCCESS': {
        draft.loading = false;
        draft.products = action.payload.products;
        break;
      }
      case '@product/GET_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@product/GET_IN_RESQUEST': {
        draft.loading = true;
        break;
      }
      case '@product/GET_IN_SUCCESS': {
        draft.loading = false;
        draft.products = action.payload.products;
        break;
      }
      case '@product/GET_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@product/OPEN_FORM': {
        draft.openForm = true;
        break;
      }
      case '@product/CLOSE_FORM': {
        draft.openForm = false;
        break;
      }
      default:
    }
  });
}

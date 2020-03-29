import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  openForm: false,
  editProduct: {},
  products: [],
  publicProducts: [],
  count: 0,
  countPublic: 0,
};

export default function product(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@product/SAVE_IN_SUCCESS': {
        draft.loading = false;
        draft.openForm = false;
        break;
      }
      case '@product/GET_IN_SUCCESS': {
        draft.loading = false;
        draft.products = action.payload.data.rows;
        draft.count = action.payload.data.count;
        break;
      }
      case '@product/GET_PUBLIC_IN_SUCCESS': {
        draft.loading = false;
        draft.publicProducts = action.payload.data.rows;
        draft.countPublic = action.payload.data.count;
        break;
      }
      case '@product/GETONE_IN_SUCCESS': {
        draft.loading = false;
        draft.editProduct = action.payload.product;
        break;
      }
      case '@product/SAVE_IN_RESQUEST':
      case '@product/GET_IN_RESQUEST':
      case '@product/GET_IN_RESQUEST_DEBOUNCE':
      case '@product/GET_PUBLIC_IN_RESQUEST':
      case '@product/GETONE_IN_RESQUEST':
      case '@product/DUPLICATE_IN_RESQUEST':
      case '@product/DELETE_IN_RESQUEST': {
        draft.loading = true;
        break;
      }
      case '@product/SAVE_IN_FAILURE':
      case '@product/GET_IN_FAILURE':
      case '@product/GET_PUBLIC_IN_FAILURE':
      case '@product/GETONE_IN_FAILURE':
      case '@product/DUPLICATE_IN_SUCCESS':
      case '@product/DUPLICATE_IN_FAILURE':
      case '@product/DELETE_IN_SUCCESS':
      case '@product/DELETE_IN_FAILURE': {
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

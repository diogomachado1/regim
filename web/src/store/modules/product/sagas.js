import { takeLatest, call, put, all, debounce } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  saveProductInSuccess,
  saveProductInFailure,
  getProductRequest,
  getProductInSuccess,
  getProductInFailure,
  deleteProductInSuccess,
  deleteProductInFailure,
  getOneProductInSuccess,
  getOneProductInFailure,
  duplicateProductInSuccess,
  duplicateProductInFailure,
  getPublicProductInSuccess,
  getPublicProductInFailure,
} from './actions';

export function* saveProduct({ payload }) {
  try {
    const { product, navigate } = payload;
    const { page = 1, search = '' } = payload;

    if (!product.id) {
      yield call(api.post, '/products/', product);
    } else {
      yield call(api.put, `/products/${product.id}`, product);
    }

    yield put(saveProductInSuccess());
    toast.success('Produto Salvo');
    if (navigate) {
      history.push('/products');
    } else {
      yield put(getProductRequest(page, search));
    }
  } catch (err) {
    toast.error('Falha ao salvar produto, verifique seus dados!');
    yield put(saveProductInFailure());
  }
}

export function* getProducts({ payload }) {
  try {
    const { page = 1, search = '' } = payload;
    const response = yield call(api.get, `/products`, {
      params: {
        page,
        search,
      },
    });

    yield put(getProductInSuccess(response.data));
  } catch (err) {
    toast.error('Falha ao obter produtos!');
    yield put(getProductInFailure());
  }
}

export function* getPublicProducts({ payload }) {
  try {
    const { page = 1, search = '' } = payload;
    const response = yield call(api.get, `/public_products`, {
      params: {
        page,
        search,
      },
    });

    yield put(getPublicProductInSuccess(response.data));
  } catch (err) {
    toast.error('Falha ao obter produtos!');
    yield put(getPublicProductInFailure());
  }
}

export function* getProduct({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, `/products/${id}`);

    yield put(getOneProductInSuccess(response.data));
  } catch (err) {
    toast.error('Falha ao obter a refeição!');
    yield put(getOneProductInFailure());
  }
}

export function* duplicateProduct({ payload }) {
  const { id } = payload;
  const { page = 1, search = '' } = payload;

  try {
    const response = yield call(api.post, `/duplicate_product/${id}`);

    yield put(duplicateProductInSuccess(response.data));
    toast.success('Produto duplicado');
    yield put(getProductRequest(page, search));
  } catch (err) {
    toast.error('Falha ao duplicar o produto!');
    yield put(duplicateProductInFailure());
  }
}

export function* deleteProduct({ payload }) {
  try {
    const { product } = payload;
    const { page = 1, search = '' } = payload;

    yield call(api.delete, `/products/${product.id}`);

    yield put(deleteProductInSuccess());
    yield put(getProductRequest(page, search));
    toast.success('Produto excluído');
  } catch (err) {
    toast.error('Falha ao excluir produto, verifique seus dados!');
    yield put(deleteProductInFailure());
  }
}

export default all([
  takeLatest('@product/SAVE_IN_RESQUEST', saveProduct),
  debounce(600, '@product/GET_IN_RESQUEST_DEBOUNCE', getProducts),
  takeLatest('@product/GET_IN_RESQUEST', getProducts),
  takeLatest('@product/GET_PUBLIC_IN_RESQUEST', getPublicProducts),
  takeLatest('@product/GETONE_IN_RESQUEST', getProduct),
  takeLatest('@product/DUPLICATE_IN_RESQUEST', duplicateProduct),
  takeLatest('@product/DELETE_IN_RESQUEST', deleteProduct),
]);

import { takeLatest, call, put, all } from 'redux-saga/effects';
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
      yield put(getProductRequest());
    }
  } catch (err) {
    toast.error('Falha ao salvar produto, verifique seus dados!');
    yield put(saveProductInFailure());
  }
}

export function* getProducts() {
  try {
    const response = yield call(api.get, `/products`);

    yield put(getProductInSuccess(response.data.rows));
  } catch (err) {
    toast.error('Falha ao obter produtos!');
    yield put(getProductInFailure());
  }
}

export function* getPublicProducts() {
  try {
    const response = yield call(api.get, `/public_products`);

    yield put(getPublicProductInSuccess(response.data.rows));
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

  try {
    const response = yield call(api.post, `/duplicate_product/${id}`);

    yield put(duplicateProductInSuccess(response.data));
    toast.success('Produto duplicado');
    yield put(getProductRequest());
  } catch (err) {
    toast.error('Falha ao duplicar o produto!');
    yield put(duplicateProductInFailure());
  }
}

export function* deleteProduct({ payload }) {
  try {
    const { product } = payload;

    yield call(api.delete, `/products/${product.id}`);

    yield put(deleteProductInSuccess());
    yield put(getProductRequest());
    toast.success('Produto excluído');
  } catch (err) {
    toast.error('Falha ao excluir produto, verifique seus dados!');
    yield put(deleteProductInFailure());
  }
}

export default all([
  takeLatest('@product/SAVE_IN_RESQUEST', saveProduct),
  takeLatest('@product/GET_IN_RESQUEST', getProducts),
  takeLatest('@product/GET_PUBLIC_IN_RESQUEST', getPublicProducts),
  takeLatest('@product/GETONE_IN_RESQUEST', getProduct),
  takeLatest('@product/DUPLICATE_IN_RESQUEST', duplicateProduct),
  takeLatest('@product/DELETE_IN_RESQUEST', deleteProduct),
]);

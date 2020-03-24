import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  saveProductInSuccess,
  saveProductInFailure,
  getProductRequest,
  getProductInSuccess,
  getProductInFailure,
  deleteProductInSuccess,
  deleteProductInFailure,
} from './actions';

export function* saveProduct({ payload }) {
  try {
    const { product } = payload;
    if (!product.id) {
      yield call(api.post, '/products/', product);
    } else {
      yield call(api.put, `/products/${product.id}`, product);
    }

    yield put(saveProductInSuccess());
    yield put(getProductRequest());
    toast.success('Produto Salvo');
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
  takeLatest('@product/DELETE_IN_RESQUEST', deleteProduct),
]);

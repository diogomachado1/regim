import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  saveProductInSuccess,
  saveProductInFailure,
  getProductRequest,
  getProductInSuccess,
  getProductInFailure,
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
  } catch (err) {
    toast.error('Falha ao salvar produto, verifique seus dados!');
    yield put(saveProductInFailure());
  }
}

export function* getProducts() {
  try {
    const response = yield call(api.get, `/products`);
    console.log(response);
    yield put(getProductInSuccess(response.data));
  } catch (err) {
    toast.error('Falha ao obter produtos!');
    yield put(getProductInFailure());
  }
}

// export function* signUp({ payload }) {
//   try {
//     const { name, email, password } = payload;

//     yield call(api.post, 'users', {
//       name,
//       email,
//       password,
//       provider: true,
//     });

//     history.push('/');
//   } catch (err) {
//     toast.error('Falha no cadastro, verifique seus dados!');

//     yield put(signFailure());
//   }
// }

export default all([
  takeLatest('@product/SAVE_IN_RESQUEST', saveProduct),
  takeLatest('@product/GET_IN_RESQUEST', getProducts),
]);

import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getListInSuccess, getListInFailure } from './actions';

export function* getList({ payload }) {
  const { fromDate, toDate } = payload;

  try {
    const response = yield call(api.get, `/list`, {
      params: { fromDate, toDate },
    });

    yield put(getListInSuccess(response.data));
  } catch (err) {
    toast.error('Falha ao obter a lista!');
    yield put(getListInFailure());
  }
}

export default all([takeLatest('@list/GET_IN_RESQUEST', getList)]);

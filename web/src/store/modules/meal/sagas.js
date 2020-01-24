import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  saveMealInSuccess,
  saveMealInFailure,
  getMealRequest,
  getMealInSuccess,
  getMealInFailure,
  getOneMealInSuccess,
  getOneMealInFailure,
  deleteMealInSuccess,
  deleteMealInFailure,
} from './actions';
import history from '~/services/history';

export function* saveMeal({ payload }) {
  try {
    const { meal } = payload;
    if (!meal.id) {
      yield call(api.post, '/meals/', meal);
    } else {
      yield call(api.put, `/meals/${meal.id}`, meal);
    }

    yield put(saveMealInSuccess());
    yield put(getMealRequest());
    toast.success('Refeição Salva');
    history.push('/meals');
  } catch (err) {
    toast.error('Falha ao salvar refeição, verifique seus dados!');
    yield put(saveMealInFailure());
  }
}

export function* getMeals() {
  try {
    const response = yield call(api.get, `/meals`);

    yield put(getMealInSuccess(response.data));
  } catch (err) {
    toast.error('Falha ao obter refeições!');
    yield put(getMealInFailure());
  }
}

export function* getMeal({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, `/meals/${id}`);

    yield put(getOneMealInSuccess(response.data));
  } catch (err) {
    toast.error('Falha ao obter a refeição!');
    yield put(getOneMealInFailure());
  }
}

export function* deleteMeal({ payload }) {
  try {
    const { meal } = payload;

    yield call(api.delete, `/meals/${meal.id}`);

    yield put(deleteMealInSuccess());
    yield put(getMealRequest());
    toast.success('Refeição excluída');
  } catch (err) {
    toast.error('Falha ao excluir refeição, verifique seus dados!');
    yield put(deleteMealInFailure());
  }
}

export default all([
  takeLatest('@meal/SAVE_IN_RESQUEST', saveMeal),
  takeLatest('@meal/GET_IN_RESQUEST', getMeals),
  takeLatest('@meal/GETONE_IN_RESQUEST', getMeal),
  takeLatest('@meal/DELETE_IN_RESQUEST', deleteMeal),
]);

import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  saveEventInSuccess,
  saveEventInFailure,
  getEventRequest,
  getEventInSuccess,
  getEventInFailure,
  getOneEventInSuccess,
  getOneEventInFailure,
  deleteEventInSuccess,
  deleteEventInFailure,
} from './actions';
import history from '~/services/history';

export function* saveEvent({ payload }) {
  try {
    const { event } = payload;

    if (!event.ingredients) {
      event.ingredients = [];
    }

    if (!event.id) {
      yield call(api.post, '/events', event);
    } else {
      yield call(api.put, `/events/${event.id}`, event);
    }

    yield put(saveEventInSuccess());
    yield put(getEventRequest());
    toast.success('Refeição Salva');
    history.push('/events');
  } catch (err) {
    toast.error('Falha ao salvar evento, verifique seus dados!');
    yield put(saveEventInFailure());
  }
}

export function* getEvents({ payload }) {
  const { fromDate, toDate } = payload;

  try {
    const response = yield call(api.get, `/events`, {
      params: { fromDate, toDate },
    });

    yield put(getEventInSuccess(response.data));
  } catch (err) {
    toast.error('Falha ao obter os eventos!');
    yield put(getEventInFailure());
  }
}

export function* getEvent({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, `/events/${id}`);

    yield put(getOneEventInSuccess(response.data));
  } catch (err) {
    toast.error('Falha ao obter a evento!');
    yield put(getOneEventInFailure());
  }
}

export function* deleteEvent({ payload }) {
  try {
    const { event } = payload;

    yield call(api.delete, `/events/${event.id}`);

    yield put(deleteEventInSuccess());
    yield put(getEventRequest());
    toast.success('Refeição excluída');
  } catch (err) {
    toast.error('Falha ao excluir evento, verifique seus dados!');
    yield put(deleteEventInFailure());
  }
}

export default all([
  takeLatest('@event/SAVE_IN_RESQUEST', saveEvent),
  takeLatest('@event/GET_IN_RESQUEST', getEvents),
  takeLatest('@event/GETONE_IN_RESQUEST', getEvent),
  takeLatest('@event/DELETE_IN_RESQUEST', deleteEvent),
]);

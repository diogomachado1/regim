import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import product from './product/sagas';
import meal from './meal/sagas';
import event from './event/sagas';

export default function* rootSaga() {
  return yield all([auth, user, product, meal, event]);
}

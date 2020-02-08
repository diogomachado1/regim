import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import product from './product/reducer';
import meal from './meal/reducer';
import event from './event/reducer';
import list from './list/reducer';

export default combineReducers({
  auth,
  user,
  product,
  meal,
  event,
  list,
});

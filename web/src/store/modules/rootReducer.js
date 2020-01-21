import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import product from './product/reducer';

export default combineReducers({
  auth,
  user,
  product,
});

import { combineReducers } from 'redux';

import { authentication } from './authReducer';
import { registration } from './registrationReducer';
import { users } from './userReducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
});

export default rootReducer;

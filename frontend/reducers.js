import { combineReducers } from 'redux';

import authReducer from './containers/auth/reducers';
import lendReducer from './containers/lend/reducers';
import loanReducer from './containers/loan/reducers';

const reducers = {
  auth: authReducer,
  lend: lendReducer,
  loan: loanReducer,
};

export default combineReducers(reducers);

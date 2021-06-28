import { combineReducers } from '@reduxjs/toolkit';
import { reducer as balenceReducer } from 'src/slices/balance';
import { reducer as historyReducer } from 'src/slices/history';

const rootReducer = combineReducers({
  balance: balenceReducer,
  history: historyReducer
});

export default rootReducer;

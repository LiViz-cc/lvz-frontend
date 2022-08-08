import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './slices/userSlice';

const reducer = {
  user: userReducer,
};

const preloadedState = {
  user: { loggedIn: false },
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

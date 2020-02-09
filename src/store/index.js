import thunk from 'redux-thunk';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

import authReducer from './slices/auth';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const authPersistConfig = {
  key: 'auth',
  storage: sessionStorage,
};

export default () => {
  const store = configureStore({
    reducer: {
      auth: persistReducer(authPersistConfig, authReducer),
    },
    middleware: [...getDefaultMiddleware(), ...middlewares],
  });
  const persistor = persistStore(store);

  return { store, persistor };
};

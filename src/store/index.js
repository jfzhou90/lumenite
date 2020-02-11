import thunk from 'redux-thunk';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

import authReducer from './slices/auth';

const logger =
  process.env.NODE_ENV === 'development'
    ? require('redux-logger').createLogger({
        diff: true,
        duration: true,
        collapsed: true,
      })
    : null;

const middlewares = [thunk];
if (logger) {
  middlewares.push(logger);
}

// if (process.env.NODE_ENV === 'development') {
//   const { createLogger } = require('redux-logger');
//   const logger = createLogger({
//     diff: true,
//     duration: true,
//     collapsed: true,
//   });
//   middlewares.push(logger);
// }

const authPersistConfig = {
  key: 'auth',
  storage: sessionStorage,
};

export default () => {
  const store = configureStore({
    reducer: {
      auth: persistReducer(authPersistConfig, authReducer),
    },
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      ...middlewares,
    ],
  });
  const persistor = persistStore(store);

  return { store, persistor };
};

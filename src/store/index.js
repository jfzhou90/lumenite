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
import displayReducer from './slices/display';
import workspaceReducer from './slices/workspace';

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

const authPersistConfig = {
  key: 'auth',
  storage: sessionStorage,
};

export default () => {
  const store = configureStore({
    reducer: {
      auth: persistReducer(authPersistConfig, authReducer),
      display: displayReducer,
      workspace: workspaceReducer,
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

import React, { createContext } from 'react';
import thunk from 'redux-thunk';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider, createStoreHook, createDispatchHook, createSelectorHook } from 'react-redux';
import PropTypes from 'prop-types';

import collectionReducer from './slices/collection';

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

const collectionStore = configureStore({
  reducer: {
    collection: collectionReducer,
  },
  middleware: [...getDefaultMiddleware(), ...middlewares],
});

const collectionContext = createContext(null);

// Export your custom hooks if you wish to use them in other files.
export const useCollectionStore = createStoreHook(collectionContext);
export const useCollectionDispatch = createDispatchHook(collectionContext);
export const useCollectionSelector = createSelectorHook(collectionContext);

export const CollectionProvider = ({ children }) => (
  <Provider content={collectionContext} store={collectionStore}>
    {children}
  </Provider>
);

CollectionProvider.propTypes = {
  children: PropTypes.elementType.isRequired,
};

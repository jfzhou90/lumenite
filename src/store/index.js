import thunk from 'redux-thunk';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './slices/auth';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [...getDefaultMiddleware(), thunk],
});

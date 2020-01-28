import { toast } from 'react-toastify';

import initialState from './initialState';
import * as types from '../actions/actionTypes';
import { saveConnection } from '../utils/authStorage';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.CONNECTING_TO_AWS:
      return { ...state, isConnecting: true };

    case types.LOGOUT:
      return initialState.auth;

    case types.CONNECTED_TO_AWS:
      toast.success('You have been successfully authenticated!');

      const connection = saveConnection(action.payload.connectionDetails);
      return {
        ...state,
        ...connection,
        user: action.payload.authUser,
        isConnecting: false,
        isAuthenticated: true,
      };

    case types.DISPLAY_ERROR:
      toast.error(`Error: ${action.payload.message}`);
      return { ...state, isConnecting: false };

    default:
      return state;
  }
}

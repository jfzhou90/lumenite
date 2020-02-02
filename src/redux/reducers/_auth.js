import { toast } from 'react-toastify';

import initialState from './initialState';
import * as types from '../actions/actionTypes';
import { saveCognitoConnection, saveApiConnection } from '../utils/authStorage';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.CONNECTING_TO_GRAPHQL:
      return { ...state, isConnecting: true };

    case types.CONNECTED_TO_COGNITO:
      toast.success('You have been successfully authenticated!');

      const cognitoConnection = saveCognitoConnection(action.payload.connectionDetails);
      return {
        ...state,
        ...cognitoConnection,
        user: action.payload.authUser,
        isConnecting: false,
        isAuthenticated: true,
      };

    case types.CONNECTED_VIA_APIKEY:
      toast.success('You have been successfully authenticated!');

      const apiConnection = saveApiConnection(action.payload.connectionDetails);
      return { ...state, ...apiConnection, isConnecting: false, isAuthenticated: true };

    case types.CONNECT_ERROR:
      toast.error(`Error: ${action.payload.message}`);
      return { ...state, isConnecting: false };

    case types.LOGOUT:
      return initialState.auth;

    default:
      return state;
  }
}

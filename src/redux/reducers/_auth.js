import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.CONNECTING_TO_AWS:
      return { ...state, isConnecting: true };
    case types.CONNECTED_TO_AWS:
      const payload = {
        user: action.payload.authUser,
        userpoolId: action.payload.connectionDetails.userpoolId,
        userpoolClientId: action.payload.connectionDetails.userpoolClientId,
        graphqlEndpoint: action.payload.connectionDetails.graphqlEndpoint,
      };
      return {
        ...state,
        ...payload,
        isConnecting: false,
        isAuthenticated: true,
        user: action.payload,
      };
    default:
      return state;
  }
}

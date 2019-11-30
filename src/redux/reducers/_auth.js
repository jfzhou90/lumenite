import { toast } from 'react-toastify';
import encryptor from '../../common/utils/encryptor';

import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.CONNECTING_TO_AWS:
      return { ...state, isConnecting: true };

    case types.LOGOUT:
      return initialState.auth;

    case types.CONNECTED_TO_AWS:
      toast.success('You have been successfully authenticated!');
      const {
        name,
        userpoolId,
        userpoolClientId,
        graphqlEndpoint,
        username,
        password,
      } = action.payload.connectionDetails;

      const storedConnections = localStorage.getItem('connections');

      const connection = {
        userpoolId: encryptor.encrypt(userpoolId),
        userpoolClientId: encryptor.encrypt(userpoolClientId),
        graphqlEndpoint: encryptor.encrypt(graphqlEndpoint),
        username: encryptor.encrypt(username),
        password: encryptor.encrypt(password),
      };

      if (!storedConnections) {
        localStorage.setItem(
          'connections',
          JSON.stringify({
            [name]: connection,
          })
        );
      } else {
        const parsedStored = JSON.parse(storedConnections);
        parsedStored[name] = connection;

        localStorage.setItem('connections', JSON.stringify(parsedStored));
      }

      return {
        ...state,
        userpoolId,
        userpoolClientId,
        graphqlEndpoint,
        currentEnv: name,
        isConnecting: false,
        isAuthenticated: true,
        user: action.payload.authUser,
      };

    case types.DISPLAY_ERROR:
      toast.error(`Error: ${action.payload.message}`);
      return { ...state, isConnecting: false };

    default:
      return state;
  }
}

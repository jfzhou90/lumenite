import { toast } from 'react-toastify';
import produce from 'immer';

import initialState from './initialState';
import * as types from '../actions/actionTypes';

const authReducer = (state = initialState.auth, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CONNECTING_TO_GRAPHQL:
        draft.isConnecting = true;
        break;

      case types.CONNECT_ERROR:
        toast.error(`Error: ${action.payload.message}`);
        draft.isConnecting = false;
        break;

      case types.CONNECTED_TO_COGNITO:
        const { user, cognitoConnection } = action.payload;
        toast.success('You have been successfully authenticated!');
        Object.assign(draft, {
          isConnecting: false,
          isAuthenticated: true,
          ...cognitoConnection,
          user,
        });
        break;

      case types.CONNECTED_VIA_APIKEY:
        const { apiConnection } = action.payload;
        toast.success('You have been successfully authenticated!');
        Object.assign(draft, { isConnecting: false, isAuthenticated: true, ...apiConnection });
        break;

      case types.LOGOUT:
        Object.assign(draft, { ...initialState.auth });
        break;

      default:
        return draft;
    }
  });

export default authReducer;

import * as types from './actionTypes';
import { authenticateViaCognito, buildAuthUserFromCognitoSession } from '../../lib/auth/cognito';
import { authenticateViaApikey } from '../../lib/auth/restApi';
import { saveCognitoConnection, saveApiConnection } from '../utils/authStorage';

export const connectToCognito = connectionDetails => dispatch => {
  dispatch({ type: types.CONNECTING_TO_GRAPHQL });

  authenticateViaCognito(connectionDetails)
    .then(session => buildAuthUserFromCognitoSession(session))
    .then(user => {
      const cognitoConnection = saveCognitoConnection(connectionDetails);
      dispatch({ type: types.CONNECTED_TO_COGNITO, payload: { user, cognitoConnection } });
    })
    .catch(error => {
      dispatch({ type: types.CONNECT_ERROR, payload: error });
    });
};

export const connectViaApiKey = connectionDetails => dispatch => {
  dispatch({ type: types.CONNECTING_TO_GRAPHQL });

  authenticateViaApikey(connectionDetails)
    .then(response => {
      if (response.data?.__schema) {
        const apiConnection = saveApiConnection(connectionDetails);
        dispatch({ type: types.CONNECTED_VIA_APIKEY, payload: { apiConnection } });
      } else {
        throw new Error('Something went wrong, please try again.');
      }
    })
    .catch(error => {
      dispatch({ type: types.CONNECT_ERROR, payload: error });
    });
};

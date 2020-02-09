import { authenticateViaCognito, buildAuthUserFromCognitoSession } from '../../lib/auth/cognito';
import { authenticateViaApikey } from '../../lib/auth/restApi';
import { saveCognitoConnection, saveApiConnection } from '../utils/authStorage';
import { authActions } from '../slices/auth';

export const connectToCognito = connectionDetails => dispatch => {
  dispatch(authActions.CONNECTING());

  authenticateViaCognito(connectionDetails)
    .then(session => buildAuthUserFromCognitoSession(session))
    .then(user => {
      const cognitoConnection = saveCognitoConnection(connectionDetails);
      dispatch(authActions.CONNECTED_TO_COGNITO({ user, cognitoConnection }));
    })
    .catch(error => {
      dispatch(authActions.CONNECT_ERROR(error));
    });
};

export const connectViaApiKey = connectionDetails => dispatch => {
  dispatch(authActions.CONNECTING());

  authenticateViaApikey(connectionDetails)
    .then(response => {
      if (response.data?.__schema) {
        const apiConnection = saveApiConnection(connectionDetails);
        dispatch(authActions.CONNECTED_VIA_APIKEY({ apiConnection }));
      } else {
        throw new Error('Something went wrong, please try again.');
      }
    })
    .catch(error => {
      dispatch(authActions.CONNECT_ERROR(error));
    });
};

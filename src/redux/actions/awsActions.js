import * as types from './actionTypes';
import { authenticateViaCognito, buildAuthUserFromCognitoSession } from '../../common/cognito/auth';

export const connectToAws = connectionDetails => dispatch => {
  dispatch({ type: types.CONNECTING_TO_AWS });

  authenticateViaCognito(connectionDetails)
    .then(session => buildAuthUserFromCognitoSession(session))
    .then(authUser => {
      dispatch({ type: types.CONNECTED_TO_AWS, payload: { authUser, connectionDetails } });
    });
};

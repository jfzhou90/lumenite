import * as types from './actionTypes';
import { authenticateViaCognito, buildAuthUserFromCognitoSession } from '../../lib/cognito/auth';

export const connectToCognito = connectionDetails => dispatch => {
  dispatch({ type: types.CONNECTING_TO_GRAPHQL });

  authenticateViaCognito(connectionDetails)
    .then(session => buildAuthUserFromCognitoSession(session))
    .then(authUser => {
      dispatch({ type: types.CONNECTED_TO_COGNITO, payload: { authUser, connectionDetails } });
    })
    .catch(error => {
      dispatch({ type: types.CONNECT_ERROR, payload: error });
    });
};

export const connectViaApiKey = connectionDetails => dispatch => {
  const { graphqlEndpoint, apiKey } = connectionDetails;
  dispatch({ type: types.CONNECTING_TO_GRAPHQL });
  fetch(graphqlEndpoint, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      query: 'query IntrospectionQuery { __schema { queryType { name } } }',
    }),
  })
    .then(response => response.json())
    .then(response => {
      if (response.data?.__schema) {
        dispatch({ type: types.CONNECTED_VIA_APIKEY, payload: { connectionDetails } });
      } else {
        throw new Error('Something went wrong, please try again.');
      }
    })
    .catch(error => {
      dispatch({ type: types.CONNECT_ERROR, payload: error });
    });
};

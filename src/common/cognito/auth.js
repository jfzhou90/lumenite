import * as AWSCognito from 'amazon-cognito-identity-js';
import { split } from 'lodash';

export const authenticateViaCognito = ({ userpoolId, userpoolClientId, username, password }) => {
  const userPool = new AWSCognito.CognitoUserPool({
    UserPoolId: userpoolId,
    ClientId: userpoolClientId,
  });

  const authenticationDetails = new AWSCognito.AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const cognitoUser = new AWSCognito.CognitoUser({
    Username: username,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: session => {
        resolve(session);
      },
      onFailure: error => {
        reject(error);
      },
    });
  });
};

export const buildAuthUserFromCognitoSession = session => {
  const userKeyToken = session.getIdToken().decodePayload().UserId;
  const idToken = session.getIdToken().decodePayload();
  const accessToken = session.getAccessToken().decodePayload();
  return {
    pk: split(userKeyToken, ':')[1],
    sk: null,
    tn: 'User',
    subscriberPk: idToken['custom:SubscriberId'],
    userType: idToken['custom:UserType'],
    permGroups: [],
    firstName: null,
    lastName: null,
    email: idToken.email,
    initials: null,
    username: accessToken.username,
    permissions: [],
    auth: {
      accessToken: session.getAccessToken().getJwtToken(),
      idToken: session.getIdToken().getJwtToken(),
      refreshToken: session.getRefreshToken().getToken(),
      expiry: session.getIdToken().getExpiration(),
    },
  };
};

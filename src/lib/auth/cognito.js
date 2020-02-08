import * as AWSCognito from 'amazon-cognito-identity-js';
import split from 'lodash/split';
import toLower from 'lodash/toLower';

export const authenticateViaCognito = ({ userpoolId, userpoolClientId, username, password }) => {
  const userPool = new AWSCognito.CognitoUserPool({
    UserPoolId: userpoolId,
    ClientId: userpoolClientId,
  });

  const authenticationDetails = new AWSCognito.AuthenticationDetails({
    Username: toLower(username),
    Password: password,
  });

  const cognitoUser = new AWSCognito.CognitoUser({
    Username: toLower(username),
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

  return {
    pk: split(userKeyToken, ':')[1],
    subscriberPk: idToken['custom:SubscriberId'],
    userType: idToken['custom:UserType'],
    email: idToken.email,
    username: idToken.preferred_username,
    auth: {
      accessToken: session.getAccessToken().getJwtToken(),
      idToken: session.getIdToken().getJwtToken(),
      refreshToken: session.getRefreshToken().getToken(),
      expiry: session.getIdToken().getExpiration(),
    },
  };
};

export const getAccessToken = ({ userpoolId, userpoolClientId }) => {
  return new Promise((resolve, reject) => {
    const poolData = {
      UserPoolId: userpoolId,
      ClientId: userpoolClientId,
    };

    const userPool = new AWSCognito.CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    cognitoUser.getSession((err, session) => {
      if (err) {
        reject(401);
      } else {
        const idToken = session.getIdToken().jwtToken;

        resolve(idToken);
      }
    });
  });
};

import encryptor from '../../common/utils/encryptor';
import toLower from 'lodash/toLower';

const encryptCognitoConnection = ({
  userpoolId,
  userpoolClientId,
  graphqlEndpoint,
  username,
  password,
}) => ({
  userpoolId: encryptor.encrypt(userpoolId),
  userpoolClientId: encryptor.encrypt(userpoolClientId),
  graphqlEndpoint: encryptor.encrypt(graphqlEndpoint),
  username: encryptor.encrypt(username),
  password: encryptor.encrypt(password),
  users: {
    [toLower(username)]: encryptor.encrypt(password),
  },
  authType: 'cognito',
});

const encryptApiConnection = ({ graphqlEndpoint, apiKey }) => ({
  graphqlEndpoint: encryptor.encrypt(graphqlEndpoint),
  apiKey: encryptor.encrypt(apiKey),
  authType: 'apiKey',
});

const createConnectionsStore = (name, currentConnection) => {
  localStorage.setItem(
    'connections',
    JSON.stringify({
      [name]: currentConnection,
    })
  );
  return currentConnection;
};

const updateConnection = (storedConnections, name, currentConnection) => {
  const parsedStored = JSON.parse(storedConnections);

  if (!parsedStored[name]) {
    parsedStored[name] = currentConnection;
  } else {
    const combinedUsers = { ...parsedStored[name].users, ...currentConnection.users };
    parsedStored[name].users = combinedUsers;
    // TODO: REMOVE THIS LINE IN THE FUTURE, need it to save older connections
    parsedStored[name].authType = 'cognito';
  }

  localStorage.setItem('connections', JSON.stringify(parsedStored));

  return parsedStored[name];
};

export const saveCognitoConnection = connectionDetails => {
  const { name, userpoolId, userpoolClientId, graphqlEndpoint } = connectionDetails;
  const storedConnections = localStorage.getItem('connections');
  const currentConnection = encryptCognitoConnection(connectionDetails);
  const users = storedConnections
    ? updateConnection(storedConnections, name, currentConnection).users
    : createConnectionsStore(name, currentConnection).users;

  return {
    userpoolId,
    userpoolClientId,
    graphqlEndpoint,
    currentEnv: name,
    users: users,
    authType: 'cognito',
  };
};

export const saveApiConnection = connectionDetails => {
  const { name, graphqlEndpoint, apiKey } = connectionDetails;
  const storedConnections = JSON.parse(localStorage.getItem('connections'));
  const currentConnection = encryptApiConnection(connectionDetails);

  const updatedConnection = { ...storedConnections, [name]: currentConnection };

  localStorage.setItem('connections', JSON.stringify(updatedConnection));

  return {
    graphqlEndpoint,
    apiKey,
    authType: 'apiKey',
  };
};

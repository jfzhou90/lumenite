import encryptor from '../../common/utils/encryptor';
import toLower from 'lodash/toLower';

const excryptConnection = ({
  userpoolId,
  userpoolClientId,
  graphqlEndpoint,
  username,
  password,
}) => {
  return {
    userpoolId: encryptor.encrypt(userpoolId),
    userpoolClientId: encryptor.encrypt(userpoolClientId),
    graphqlEndpoint: encryptor.encrypt(graphqlEndpoint),
    username: encryptor.encrypt(username),
    password: encryptor.encrypt(password),
    users: {
      [toLower(username)]: encryptor.encrypt(password),
    },
  };
};

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
  }

  localStorage.setItem('connections', JSON.stringify(parsedStored));

  return parsedStored[name];
};

export const saveConnection = connectionDetails => {
  const { name, userpoolId, userpoolClientId, graphqlEndpoint } = connectionDetails;
  const storedConnections = localStorage.getItem('connections');
  const currentConnection = excryptConnection(connectionDetails);
  const users = storedConnections
    ? updateConnection(storedConnections, name, currentConnection).users
    : createConnectionsStore(name, currentConnection).users;

  return {
    userpoolId,
    userpoolClientId,
    graphqlEndpoint,
    currentEnv: name,
    users: users,
  };
};

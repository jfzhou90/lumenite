export const authenticateViaApikey = ({ graphqlEndpoint, apiKey }) =>
  fetch(graphqlEndpoint, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      query: 'query IntrospectionQuery { __schema { queryType { name } } }',
    }),
  }).then(response => response.json());

export const fetchIntrospectionQuery = ({ graphqlEndpoint, apiKey, token, graphQLParams }) => {
  const authorization = apiKey ? { 'x-api-key': apiKey } : token ? { authorization: token } : {};
  return fetch(graphqlEndpoint, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...authorization,
    },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
};

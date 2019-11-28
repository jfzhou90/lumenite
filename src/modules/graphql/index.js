import React from 'react';
import GraphiQL from 'graphiql';
import { useSelector } from 'react-redux';

import { getAccessToken } from '../../common/cognito/auth';

const GraphQLEditor = () => {
  const { userpoolId, userpoolClientId } = useSelector(state => state.auth);

  const graphQLFetcher = graphQLParams => {
    return getAccessToken({ userpoolId, userpoolClientId })
      .then(token =>
        fetch('https://buquld7c4ra3rozcij62smq2uu.appsync-api.us-east-1.amazonaws.com/graphql', {
          method: 'post',
          headers: { 'Content-Type': 'application/json', authorization: token },
          body: JSON.stringify(graphQLParams),
        })
      )
      .then(response => response.json());
  };
  return <GraphiQL fetcher={graphQLFetcher} />;
};

export default GraphQLEditor;

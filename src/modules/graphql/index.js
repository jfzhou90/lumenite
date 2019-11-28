import React from 'react';
import GraphiQL from 'graphiql';

function graphQLFetcher(graphQLParams) {
  return fetch('https://buquld7c4ra3rozcij62smq2uu.appsync-api.us-east-1.amazonaws.com/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

function GraphQLEditor() {
  return <GraphiQL fetcher={graphQLFetcher} />;
}

export default GraphQLEditor;

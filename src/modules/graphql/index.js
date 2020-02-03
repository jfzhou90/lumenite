import React from 'react';
import GraphiQL from 'graphiql';
import { useSelector, shallowEqual } from 'react-redux';

import { getAccessToken } from '../../lib/cognito/auth';

import GraphQlFooter from './components/footer';

const defaultQuery = `# Welcome to Lumenite
#
# Lumenite is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that starts
# with a # are ignored.
#
# An example GraphQL query might look like:
#
#     {
#       field(arg: "value") {
#         subField
#       }
#     }
#
# Keyboard shortcuts:
#
#  Prettify Query:  Shift-Ctrl-P
#
#     Merge Query:  Shift-Ctrl-M
#
#       Run Query:  Ctrl-Enter
#
#   Auto Complete:  Ctrl-Space
#
`;

const GraphQLEditor = () => {
  const { authType, apiKey, userpoolId, userpoolClientId, graphqlEndpoint } = useSelector(
    state => ({
      authType: state.auth.authType,
      apiKey: state.auth.apiKey,
      userpoolId: state.auth.userpoolId,
      userpoolClientId: state.auth.userpoolClientId,
      graphqlEndpoint: state.auth.graphqlEndpoint,
    }),
    shallowEqual
  );

  const graphQLFetcher = graphQLParams => {
    if (authType === 'cognito') {
      return getAccessToken({ userpoolId, userpoolClientId })
        .then(token =>
          fetch(graphqlEndpoint, {
            method: 'post',
            headers: { 'Content-Type': 'application/json', authorization: token },
            body: JSON.stringify(graphQLParams),
          })
        )
        .then(response => response.json());
    }

    if (authType === 'apiKey') {
      return fetch(graphqlEndpoint, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(graphQLParams),
      }).then(response => response.json());
    }
  };

  return (
    <div className='editor_div'>
      {/* TODO: ADD COLLECTION FEATURE*/}
      <GraphiQL fetcher={graphQLFetcher} defaultQuery={defaultQuery} editorTheme='orion'>
        {/* <GraphiQL.Toolbar></GraphiQL.Toolbar> */}
        <GraphiQL.Logo>
          <span className='editor_div--lumenite_title'>Lumenite</span>
        </GraphiQL.Logo>
        <GraphiQL.Footer>
          <GraphQlFooter />
        </GraphiQL.Footer>
      </GraphiQL>
    </div>
  );
};

export default GraphQLEditor;

import React from 'react';
import GraphiQL from 'graphiql';
import { useSelector, shallowEqual } from 'react-redux';

import { getAccessToken } from '../../common/cognito/auth';

import GraphQlFooter from './_footer';

const defaultQuery = `
# Welcome to Lumenite
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
#  Prettify Query:  Shift-Ctrl-P (or press the prettify button above)
#
#     Merge Query:  Shift-Ctrl-M (or press the merge button above)
#
#       Run Query:  Ctrl-Enter (or press the play button above)
#
#   Auto Complete:  Ctrl-Space (or just start typing)
#
`;

const GraphQLEditor = () => {
  const { userpoolId, userpoolClientId, graphqlEndpoint } = useSelector(
    state => ({
      userpoolId: state.auth.userpoolId,
      userpoolClientId: state.auth.userpoolClientId,
      graphqlEndpoint: state.auth.graphqlEndpoint,
    }),
    shallowEqual
  );

  const graphQLFetcher = graphQLParams => {
    return getAccessToken({ userpoolId, userpoolClientId })
      .then(token =>
        fetch(graphqlEndpoint, {
          method: 'post',
          headers: { 'Content-Type': 'application/json', authorization: token },
          body: JSON.stringify(graphQLParams),
        })
      )
      .then(response => response.json());
  };

  return (
    <GraphiQL fetcher={graphQLFetcher} defaultQuery={defaultQuery} editorTheme='orion'>
      <GraphiQL.Logo>
        <span className='editor--lumenite-title'>Lumenite</span>
      </GraphiQL.Logo>
      <GraphiQL.Footer>
        <GraphQlFooter />
      </GraphiQL.Footer>
    </GraphiQL>
  );
};

export default GraphQLEditor;

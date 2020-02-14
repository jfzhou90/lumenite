import React, { useRef, useCallback } from 'react';
import GraphiQL from 'graphiql';
import { useSelector, shallowEqual } from 'react-redux';

import { getAccessToken } from '../../lib/auth/cognito';
import { fetchIntrospectionQuery } from '../../lib/auth/restApi';
import { tryFunction } from '../../lib/utils/qol';

import GraphQlFooter from './components/footer';
import CustomToolbar from './components/toolbar';
import CollectionSidebar from './components/collection';
import CustomDialogs from './dialogs';

import './graphiql.scss';

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
  const graphiql = useRef(null);
  const { authType, apiKey, userpoolId, userpoolClientId, graphqlEndpoint } = useSelector(
    ({ auth }) => auth,
    shallowEqual
  );

  const graphQLFetcher = useCallback(
    async graphQLParams => {
      const token =
        authType === 'cognito' && (await getAccessToken({ userpoolId, userpoolClientId }));

      const params = token ? { token } : apiKey && { apiKey };
      return fetchIntrospectionQuery({ graphqlEndpoint, graphQLParams, ...params });
    },
    [apiKey, authType, graphqlEndpoint, userpoolClientId, userpoolId]
  );

  const prettify = () => tryFunction(graphiql.current.handlePrettifyQuery);
  const mergeQuery = () => tryFunction(graphiql.current.handleMergeQuery);
  const copyQuery = () => tryFunction(graphiql.current.handleCopyQuery);
  const toggleHistory = () => tryFunction(graphiql.current.handleToggleHistory);

  return (
    <div className='editor_div'>
      <CustomDialogs />
      <CollectionSidebar />
      <GraphiQL
        ref={graphiql}
        fetcher={graphQLFetcher}
        defaultQuery={defaultQuery}
        editorTheme='orion'
      >
        <GraphiQL.Logo>
          <span className='editor_div--lumenite_title'>Lumenite</span>
        </GraphiQL.Logo>
        <GraphiQL.Toolbar>
          <CustomToolbar
            prettify={prettify}
            merge={mergeQuery}
            copy={copyQuery}
            toggleHistory={toggleHistory}
          />
        </GraphiQL.Toolbar>
        <GraphiQL.Footer>
          <GraphQlFooter />
        </GraphiQL.Footer>
      </GraphiQL>
    </div>
  );
};

export default GraphQLEditor;

import React, { useRef, useState, useCallback } from 'react';
import GraphiQL from 'graphiql';
import { useSelector, shallowEqual } from 'react-redux';

import { toast } from 'react-toastify';
import { getAccessToken } from '../../lib/auth/cognito';
import { fetchIntrospectionQuery } from '../../lib/auth/restApi';

import GraphQlFooter from './components/footer';
import CustomToolbar from './components/toolbar';
import CollectionSidebar from './components/collection';

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
  const [showCollection, setShowCollection] = useState(false);
  const graphiql = useRef(null);
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

  const graphQLFetcher = useCallback(
    async graphQLParams => {
      const token =
        authType === 'cognito' && (await getAccessToken({ userpoolId, userpoolClientId }));

      const params = token ? { token } : apiKey && { apiKey };
      return fetchIntrospectionQuery({ graphqlEndpoint, graphQLParams, ...params });
    },
    [apiKey, authType, graphqlEndpoint, userpoolClientId, userpoolId]
  );

  const tryFunction = func => {
    try {
      func();
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  const prettify = () => tryFunction(graphiql.current.handlePrettifyQuery);
  const mergeQuery = () => tryFunction(graphiql.current.handleMergeQuery);
  const copyQuery = () => tryFunction(graphiql.current.handleCopyQuery);
  const toggleHistory = () => tryFunction(graphiql.current.handleToggleHistory);
  const toggleCollection = () => setShowCollection(!showCollection);

  return (
    <div className='editor_div'>
      <CollectionSidebar open={showCollection} toggle={toggleCollection} />
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
            toggleCollection={toggleCollection}
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

import React from 'react';
import GraphiQL from 'graphiql';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import uuid from 'uuid/v4';

import { getAccessToken } from '../../common/cognito/auth';
import { connectToAws } from '../../redux/actions/awsActions';
import { LOGOUT } from '../../redux/actions/actionTypes';

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
  const {
    currentEnv,
    userpoolId,
    userpoolClientId,
    graphqlEndpoint,
    user,
    isConnecting,
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const changeUser = newUserData => {
    dispatch(
      connectToAws({
        ...newUserData,
        name: currentEnv,
        userpoolId,
        userpoolClientId,
        graphqlEndpoint,
      })
    );
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

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

  const copyUuid = () => {
    const el = document.createElement('textarea');
    el.value = uuid();
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <GraphiQL fetcher={graphQLFetcher} defaultQuery={defaultQuery} editorTheme='orion'>
      <GraphiQL.Logo>
        <span className='editor--lumenite-title'>Lumenite</span>
      </GraphiQL.Logo>
      <GraphiQL.Footer>
        <div className='footer_toolbar'>
          <button title='Copy UUID to clipboard' onClick={copyUuid}>
            UUID
          </button>
          <Form
            onSubmit={changeUser}
            validate={({ username, password }) => {
              const error = {};
              if (!username) {
                error.username = 'Required';
              }
              if (!password) {
                error.password = 'Required';
              }
              return error;
            }}
            render={({ handleSubmit, invalid, form }) => (
              <form
                onSubmit={event => {
                  handleSubmit(event);
                  form.reset();
                }}
              >
                <Field
                  name='username'
                  component='input'
                  type='text'
                  placeholder='Username'
                  autoComplete='off'
                />
                <Field
                  name='password'
                  component='input'
                  type='password'
                  placeholder='Password'
                  autoComplete='off'
                />

                <button disabled={invalid || isConnecting} type='submit'>
                  Login
                </button>
              </form>
            )}
          />

          <span>
            Logged in as <strong>{user.username}</strong>
          </span>
          <button className='logout-button' onClick={logout}>
            Logout
          </button>
        </div>
      </GraphiQL.Footer>
    </GraphiQL>
  );
};

export default GraphQLEditor;

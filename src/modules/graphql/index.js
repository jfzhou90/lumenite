import React from 'react';
import GraphiQL from 'graphiql';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { getAccessToken } from '../../common/cognito/auth';
import { connectToAws } from '../../redux/actions/awsActions';
import { LOGOUT } from '../../redux/actions/actionTypes';

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
  return (
    <>
      <GraphiQL fetcher={graphQLFetcher} editorTheme='orion'>
        <GraphiQL.Logo>
          <span className='editor--lumenite-title'>Lumenite</span>
        </GraphiQL.Logo>
        <GraphiQL.Footer>
          <div className='footer_toolbar'>
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
            <span>Logged in as {user.username}</span>
            <button className='logout-button' onClick={logout}>
              Logout
            </button>
          </div>
        </GraphiQL.Footer>
      </GraphiQL>
    </>
  );
};

export default GraphQLEditor;

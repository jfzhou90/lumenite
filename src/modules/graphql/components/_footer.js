import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import uuid from 'uuid/v4';

import { connectToAws } from '../../../redux/actions/awsActions';
import { LOGOUT } from '../../../redux/actions/actionTypes';

const GraphQLFooter = () => {
  const {
    currentEnv,
    user,
    isConnecting,
    userpoolId,
    userpoolClientId,
    graphqlEndpoint,
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

  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  return (
    <div className='footer_toolbar'>
      <button className='toolbar-button' title='Copy UUID to clipboard' onClick={copyUuid}>
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

            <button disabled={invalid || isConnecting} className='toolbar-button' type='submit'>
              Login
            </button>
          </form>
        )}
      />

      <span>
        Logged in as <strong>{user.username}</strong>
      </span>
      <button className='logout-button toolbar-button' onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default GraphQLFooter;

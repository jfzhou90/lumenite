import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import map from 'lodash/map';

import { connectToCognito } from '../../../../store/asyncActions/auth';
import { authActions } from '../../../../store/slices/auth';
import encryptor from '../../../../lib/utils/encryptor';

const GraphQLFooter = () => {
  const {
    currentEnv,
    user,
    users,
    isConnecting,
    userpoolId,
    userpoolClientId,
    graphqlEndpoint,
    authType,
  } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const changeUser = newUserData => {
    if (newUserData.username === user.username) return;

    dispatch(
      connectToCognito({
        ...newUserData,
        name: currentEnv,
        userpoolId,
        userpoolClientId,
        graphqlEndpoint,
      })
    );
  };

  const selectUser = ({ target: { value: username } }) =>
    changeUser({
      username,
      password: encryptor.decrypt(users[username]),
    });

  const logout = () => dispatch(authActions.LOGOUT());

  return (
    <div className='footer_toolbar'>
      {authType === 'cognito' && (
        <>
          <Form
            onSubmit={changeUser}
            validate={({ username, password }) =>
              !username || !password ? { params: 'required' } : {}
            }
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

                <span>
                  Logged in as &nbsp;
                  <select
                    className='toolbar-select'
                    disabled={isConnecting}
                    value={user.username}
                    onChange={selectUser}
                    onBlur={selectUser}
                  >
                    {map(users, (_, key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </span>
              </form>
            )}
          />
        </>
      )}
      <button type='button' className='logout-button toolbar-button' onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default GraphQLFooter;

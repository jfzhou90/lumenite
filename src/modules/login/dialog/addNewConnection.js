import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { forEach } from 'lodash';
import { useSelector } from 'react-redux';

const NewConnectionDialog = ({ open, onClose, connect }) => {
  const isConnecting = useSelector(state => state.auth.isConnecting);

  const onSubmit = data => {
    connect(data);
  };

  const validate = values => {
    const requiredFields = [
      'name',
      'graphqlEndpoint',
      'userpoolId',
      'userpoolClientId',
      'username',
      'password',
    ];
    const errors = {};

    forEach(requiredFields, field => {
      if (!values[field]) {
        errors[field] = 'Required';
      } else if (field === 'userpoolId' && !/^[\w-]+_.+$/.test(values.userpoolId)) {
        errors[field] = 'Invalid userpool id';
      }
    });

    return errors;
  };

  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='new_connection_form'>
      <DialogTitle id='new_connection_form'>New connection</DialogTitle>

      <DialogContent id='new_connection_form--content'>
        <DialogContentText>
          To add a new connection, please enter the required fields.
        </DialogContentText>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Field
                name='name'
                id='name'
                type='text'
                render={({ input, meta }) => {
                  const showError = !!meta.error && !!meta.touched;
                  return (
                    <TextField
                      label='Connection Name'
                      autoFocus
                      fullWidth
                      required
                      error={showError}
                      InputProps={{
                        inputProps: {
                          maxLength: 30,
                          autoComplete: 'off',
                          'aria-required': true,
                        },
                      }}
                      {...input}
                    />
                  );
                }}
              />

              <Field
                name='graphqlEndpoint'
                id='graphqlEndpoint'
                type='text'
                render={({ input, meta }) => {
                  const showError = !!meta.error && !!meta.touched;
                  return (
                    <TextField
                      label='GraphQL Endpoint'
                      fullWidth
                      required
                      error={showError}
                      InputProps={{
                        inputProps: {
                          maxLength: 200,
                          autoComplete: 'off',
                          'aria-required': true,
                        },
                      }}
                      {...input}
                    />
                  );
                }}
              />

              <Field
                name='userpoolId'
                id='userpoolId'
                type='text'
                render={({ input, meta }) => {
                  const showError = !!meta.error && !!meta.touched;
                  return (
                    <TextField
                      label='Cognito Userpool Id'
                      fullWidth
                      required
                      error={showError}
                      InputProps={{
                        inputProps: {
                          maxLength: 30,
                          autoComplete: 'off',
                          'aria-required': true,
                        },
                      }}
                      {...input}
                    />
                  );
                }}
              />

              <Field
                name='userpoolClientId'
                id='userpoolClientId'
                type='text'
                render={({ input, meta }) => {
                  const showError = !!meta.error && !!meta.touched;
                  return (
                    <TextField
                      label='Cognito Userpool Client Id'
                      fullWidth
                      required
                      error={showError}
                      InputProps={{
                        inputProps: {
                          maxLength: 30,
                          autoComplete: 'off',
                          'aria-required': true,
                        },
                      }}
                      {...input}
                    />
                  );
                }}
              />

              <Field
                name='username'
                id='username'
                type='text'
                render={({ input, meta }) => {
                  const showError = !!meta.error && !!meta.touched;
                  return (
                    <TextField
                      label='Username'
                      fullWidth
                      required
                      error={showError}
                      InputProps={{
                        inputProps: {
                          maxLength: 30,
                          autoComplete: 'off',
                          'aria-required': true,
                        },
                      }}
                      {...input}
                    />
                  );
                }}
              />

              <Field
                name='password'
                id='password'
                type='password'
                render={({ input, meta }) => {
                  const showError = !!meta.error && !!meta.touched;
                  return (
                    <TextField
                      label='Password'
                      fullWidth
                      required
                      error={showError}
                      InputProps={{
                        inputProps: {
                          maxLength: 30,
                          'aria-required': true,
                        },
                      }}
                      {...input}
                    />
                  );
                }}
              />
              <DialogActions>
                <Button onClick={onClose} color='secondary'>
                  Cancel
                </Button>

                <Button type='submit' color='primary' disabled={invalid || isConnecting}>
                  Connect
                  {isConnecting ? (
                    <CircularProgress size='1rem' className='circular_progress' />
                  ) : null}
                </Button>
              </DialogActions>
            </form>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewConnectionDialog;

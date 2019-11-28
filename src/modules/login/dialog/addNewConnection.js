import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { forEach } from 'lodash';

const NewConnectionDialog = ({ open, onClose }) => {
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='new_connection_form'>
      <DialogTitle id='new_connection_form'>New connection</DialogTitle>

      <DialogContent id='new_connection_form--content'>
        <DialogContentText>
          To add a new connection, please enter the required fields.
        </DialogContentText>
        <Form
          onSubmit={onSubmit}
          validate={values => {
            const requiredFields = ['name', 'graphql', 'userpoolId', 'username', 'password'];
            const errors = {};

            forEach(requiredFields, field => {
              if (!values[field]) {
                errors[field] = 'Required';
              }
            });

            return errors;
          }}
          render={({ handleSubmit, submitting, invalid }) => (
            <form onSubmit={handleSubmit}>
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
                name='graphql'
                id='graphql'
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
                <Button onClick={onClose} color='primary'>
                  Cancel
                </Button>
                <Button onClick={onClose} color='primary' disabled={invalid || submitting}>
                  Connect
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

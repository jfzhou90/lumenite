import React, { useState } from 'react';
import includes from 'lodash/includes';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { Form } from 'react-final-form';
import { useSelector } from 'react-redux';

import FormField from '../components/formField';

const NewConnectionDialog = ({ open, onClose, connect }) => {
  const isConnecting = useSelector(state => state.auth.isConnecting);
  const [authType, setAuthType] = useState('cognito');
  const storedConnections = localStorage.getItem('connections');
  const connectionsKeys = storedConnections ? Object.keys(JSON.parse(storedConnections)) : [];

  const required = value => (value ? undefined : 'Required');
  const isValidName = value => (includes(connectionsKeys, value) ? 'invalid' : undefined);
  const isValidUserPoolId = value => (/^[\w-]+_.+$/.test(value) ? undefined : 'Invalid');
  const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);

  const updateAuthType = event => setAuthType(event.currentTarget.value);

  const onSubmit = data => connect(authType, data);

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='new_connection_form'>
      <DialogTitle id='new_connection_form'>New connection</DialogTitle>

      <DialogContent id='new_connection_form--content'>
        <DialogContentText>
          To add a new connection, please enter the required fields.
        </DialogContentText>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Authentication Method</FormLabel>
          <RadioGroup
            aria-label='Authentication Method'
            name='authenticationMethod'
            value={authType}
            onChange={updateAuthType}
          >
            <FormControlLabel value='cognito' control={<Radio color='primary' />} label='Cognito' />
            <FormControlLabel value='apiKey' control={<Radio color='primary' />} label='API Key' />
          </RadioGroup>
        </FormControl>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} noValidate>
              <FormField
                name='name'
                id='name'
                label='Connection Name'
                validate={composeValidators(isValidName, required)}
                autoFocus
              />

              <FormField
                name='graphqlEndpoint'
                id='graphqlEndpoint'
                label='GraphQL Endpoint'
                validate={required}
                maxLength={200}
              />

              {authType === 'cognito' && (
                <>
                  <FormField
                    name='userpoolId'
                    id='userpoolId'
                    label='Cognito Userpool Id'
                    validate={composeValidators(required, isValidUserPoolId)}
                  />

                  <FormField
                    name='userpoolClientId'
                    id='userpoolClientId'
                    label='Cognito Userpool Client Id'
                    validate={required}
                  />

                  <FormField name='username' id='username' label='Username' validate={required} />

                  <FormField
                    name='password'
                    id='password'
                    label='Password'
                    type='password'
                    validate={required}
                  />
                </>
              )}

              {authType === 'apiKey' && (
                <FormField name='apiKey' id='apiKey' label='API Key' validate={required} />
              )}

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

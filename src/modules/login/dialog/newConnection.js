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
import PropTypes from 'prop-types';

import FormField from '../../../lib/components/form/formField';
import { isValidUserPoolId, required, composeValidators } from '../../../lib/utils/form';

const NewConnectionDialog = ({ open, onClose, connect }) => {
  const isConnecting = useSelector(state => state.auth.isConnecting);
  const [authType, setAuthType] = useState('apiKey');
  const storedConnections = localStorage.getItem('connections');
  const connectionsKeys = storedConnections ? Object.keys(JSON.parse(storedConnections)) : [];

  const isValidName = value => (includes(connectionsKeys, value) ? 'invalid' : undefined);

  const updateAuthType = event => setAuthType(event.currentTarget.value);

  const onSubmit = data => connect(authType, data);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='new_connection_form'
      maxWidth='sm'
      disableBackdropClick
    >
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
            <FormControlLabel value='apiKey' control={<Radio color='primary' />} label='API Key' />
            <FormControlLabel value='cognito' control={<Radio color='primary' />} label='Cognito' />
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
                required
              />

              <FormField
                name='graphqlEndpoint'
                id='graphqlEndpoint'
                label='GraphQL Endpoint'
                validate={required}
                maxLength={200}
                required
                submitOnEnter
              />

              {authType === 'apiKey' && (
                <FormField
                  name='apiKey'
                  id='apiKey'
                  label='API Key'
                  required={false}
                  submitOnEnter
                />
              )}

              {authType === 'cognito' && (
                <>
                  <FormField
                    name='userpoolId'
                    id='userpoolId'
                    label='Cognito Userpool Id'
                    validate={composeValidators(required, isValidUserPoolId)}
                    required
                  />

                  <FormField
                    name='userpoolClientId'
                    id='userpoolClientId'
                    label='Cognito Userpool Client Id'
                    validate={required}
                    required
                  />

                  <FormField
                    name='username'
                    id='username'
                    label='Username'
                    validate={required}
                    required
                  />

                  <FormField
                    name='password'
                    id='password'
                    label='Password'
                    type='password'
                    validate={required}
                    required
                    submitOnEnter
                  />
                </>
              )}

              <DialogActions>
                <Button onClick={onClose} color='secondary'>
                  Cancel
                </Button>

                <Button type='submit' color='primary' disabled={invalid || isConnecting}>
                  Connect
                  {isConnecting && <CircularProgress size='1rem' className='circular_progress' />}
                </Button>
              </DialogActions>
            </form>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};

NewConnectionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  connect: PropTypes.func.isRequired,
};

export default NewConnectionDialog;

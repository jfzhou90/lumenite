import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import map from 'lodash/map';
import keys from 'lodash/keys';
import PropTypes from 'prop-types';

import encryptor from '../../../lib/utils/encryptor';

const ExistingConnectionDialog = ({ open, onClose, connect, connections }) => {
  const isConnecting = useSelector(state => state.auth.isConnecting);
  const [connection, selectConnection] = useState('');

  const onSelect = event => event && selectConnection(event.target.value);

  const onSubmit = () => {
    const auth = connections[connection];
    if (auth.authType === 'apiKey' || auth.apiKey) {
      connect('apiKey', {
        name: connection,
        graphqlEndpoint: encryptor.decrypt(auth.graphqlEndpoint),
        apiKey: encryptor.decrypt(auth.apiKey),
      });
    } else {
      connect('cognito', {
        name: connection,
        userpoolId: encryptor.decrypt(auth.userpoolId),
        userpoolClientId: encryptor.decrypt(auth.userpoolClientId),
        graphqlEndpoint: encryptor.decrypt(auth.graphqlEndpoint),
        username: encryptor.decrypt(auth.username),
        password: encryptor.decrypt(auth.password),
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='existing_connection_form'>
      <DialogTitle id='existing_connection_form'>Connect to existing connections</DialogTitle>

      <DialogContent id='existing_connection_form--content'>
        <DialogContentText>Select a previously saved connection.</DialogContentText>

        <FormControl variant='outlined'>
          <Select
            labelId='demo-simple-select-outlined-label'
            id='demo-simple-select-outlined'
            onChange={onSelect}
            value={connection}
          >
            {map(keys(connections).sort(), connectionItem => (
              <MenuItem value={connectionItem} key={connectionItem}>
                {connectionItem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DialogActions>
          <Button onClick={onClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={onSubmit} color='primary' disabled={!connection || isConnecting}>
            Connect
            {isConnecting && <CircularProgress size='1rem' className='circular_progress' />}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

ExistingConnectionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  connect: PropTypes.func.isRequired,
  connections: PropTypes.objectOf(
    PropTypes.shape({
      authType: PropTypes.string,
      apiKey: PropTypes.string,
      graphqlEndpoint: PropTypes.string,
      userpoolId: PropTypes.string,
      userpoolClientId: PropTypes.string,
      username: PropTypes.string,
      password: PropTypes.string,
    })
  ).isRequired,
};

export default ExistingConnectionDialog;

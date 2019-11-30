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
import { map, keys } from 'lodash';

import encryptor from '../../../common/utils/encryptor';

const ExistingConnectionDialog = ({ open, onClose, connect, connections }) => {
  const isConnecting = useSelector(state => state.auth.isConnecting);
  const [connection, selectConnection] = useState('');

  const onSelect = event => {
    if (event) {
      selectConnection(event.target.value);
    }
  };

  const onSubmit = () => {
    connect({
      name: connection,
      userpoolId: encryptor.decrypt(connections[connection].userpoolId),
      userpoolClientId: encryptor.decrypt(connections[connection].userpoolClientId),
      graphqlEndpoint: encryptor.decrypt(connections[connection].graphqlEndpoint),
      username: encryptor.decrypt(connections[connection].username),
      password: encryptor.decrypt(connections[connection].password),
    });
  };

  if (!open) {
    return null;
  }

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
            {map(keys(connections), connection => (
              <MenuItem value={connection} key={connection}>
                {connection}
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
            {isConnecting ? <CircularProgress size='1rem' className='circular_progress' /> : null}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ExistingConnectionDialog;

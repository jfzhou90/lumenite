import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

import snorlaxPicture from '../../assets/img/snorlaxClipart.png';
import NewConnectionDialog from './dialog/addNewConnection';
import ExistingConnectionDialog from './dialog/connectExistingConnection';
import StorageButton from './components/storageSpeedDial';

import { connectToAws } from '../../redux/actions/awsActions';

const LoginPage = () => {
  const [openNewConnectionDialog, setNewConnectionDialog] = useState(false);
  const [openExistingConnectionDialog, setExistingConnectionDialog] = useState(false);
  const [storedConnections, setStoredConnections] = useState(
    JSON.parse(localStorage.getItem('connections'))
  );
  const dispatch = useDispatch();

  const resetConnection = () => {
    setStoredConnections(null);
  };
  const toggleNewConnectionDialog = () => {
    setNewConnectionDialog(!openNewConnectionDialog);
  };

  const toggleExistingConnectionDialog = () => {
    setExistingConnectionDialog(!openExistingConnectionDialog);
  };

  const newConnect = connectionDetails => {
    return dispatch(connectToAws(connectionDetails));
  };

  return (
    <div id='login-page__main'>
      <NewConnectionDialog
        open={openNewConnectionDialog}
        onClose={toggleNewConnectionDialog}
        connect={newConnect}
      />

      <ExistingConnectionDialog
        open={openExistingConnectionDialog}
        onClose={toggleExistingConnectionDialog}
        connect={newConnect}
        connections={storedConnections}
      />

      <img id='main--img__snorlax' src={snorlaxPicture} alt='Snorlax' />
      <div id='main--div__connection-container'>
        <h1 id='connection-container--h1__title'>Lumenite</h1>
        <div id='connection-container--div__button-group'>
          <Button
            id='button-group--button__add'
            variant='contained'
            color='primary'
            onClick={toggleNewConnectionDialog}
          >
            New
          </Button>
          {storedConnections ? (
            <Button
              id='button-group--button__connect'
              variant='contained'
              color='primary'
              onClick={toggleExistingConnectionDialog}
            >
              Connect
            </Button>
          ) : null}
        </div>
      </div>
      <StorageButton resetApp={resetConnection} />
    </div>
  );
};

export default LoginPage;

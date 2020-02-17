import React, { useState, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import NewConnectionDialog from './dialog/newConnection';
import ExistingConnectionDialog from './dialog/existingConnection';
import StorageButton from './components/storageSpeedDial';

import { connectToCognito, connectViaApiKey } from '../../store/asyncActions/auth';
import { getStoredConnections } from '../../store/utils/authStorage';

import snorlaxPicture from '../../assets/img/snorlaxClipart.png';
import './login.scss';

const LoginPage = () => {
  const [openNewConnectionDialog, setNewConnectionDialog] = useState(false);
  const [openExistingConnectionDialog, setExistingConnectionDialog] = useState(false);
  const [storedConnections, setStoredConnections] = useState(getStoredConnections());
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirect = useCallback(() => {
    history.replace({ pathname: location.state.from?.pathname || '/' });
  }, [history, location.state.from]);

  useEffect(() => {
    if (isAuthenticated) {
      redirect();
    }
  }, [isAuthenticated, redirect]);

  const resetConnection = () => setStoredConnections(null);

  const toggleNewConnectionDialog = () => setNewConnectionDialog(!openNewConnectionDialog);

  const toggleExistingConnectionDialog = () =>
    setExistingConnectionDialog(!openExistingConnectionDialog);

  const connect = (authType, connectionDetails) => {
    if (authType === 'cognito') return dispatch(connectToCognito(connectionDetails));
    if (authType === 'apiKey') return dispatch(connectViaApiKey(connectionDetails));
    return null;
  };

  return (
    <div id='login_page--main'>
      <NewConnectionDialog
        open={openNewConnectionDialog}
        onClose={toggleNewConnectionDialog}
        connect={connect}
      />

      <ExistingConnectionDialog
        open={openExistingConnectionDialog}
        onClose={toggleExistingConnectionDialog}
        connect={connect}
        connections={storedConnections}
      />

      <img id='main_img--snorlax' src={snorlaxPicture} alt='Snorlax' />
      <div id='main_div--connection_container'>
        <h1 id='connection_container--h1_title'>Lumenite</h1>
        <div id='connection_container--button_group'>
          <Button
            id='button_group--add'
            variant='contained'
            color='primary'
            onClick={toggleNewConnectionDialog}
          >
            New
          </Button>
          {storedConnections && (
            <Button
              id='button_group--connect'
              variant='contained'
              color='primary'
              onClick={toggleExistingConnectionDialog}
            >
              Connect
            </Button>
          )}
        </div>
      </div>
      <StorageButton resetApp={resetConnection} />
      <div id='login_page--version'>v1.2.0</div>
    </div>
  );
};

export default LoginPage;

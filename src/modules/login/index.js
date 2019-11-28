import React, { useState, useCallback } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import snorlaxPicture from '../../assets/img/snorlaxClipart.png';
import NewConnectionDialog from './dialog/addNewConnection';

import { connectToAws } from '../../redux/actions/awsActions';

const LoginPage = () => {
  const [openNewConnectionDialog, setNewConnectionDialog] = useState(false);
  const dispatch = useDispatch();

  const toggleNewConnectionDialog = () => {
    setNewConnectionDialog(!openNewConnectionDialog);
  };

  const connect = async data => {
    return dispatch(connectToAws(data));
  };

  return (
    <div id='login-page__main'>
      <NewConnectionDialog
        open={openNewConnectionDialog}
        onClose={toggleNewConnectionDialog}
        connect={connect}
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
          <Button id='button-group--button__connect' variant='contained' color='primary'>
            Connect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import snorlaxPicture from '../../assets/img/snorlaxClipart.png';
import { Button } from '@material-ui/core';
import NewConnectionDialog from './dialog/addNewConnection';

const LoginPage = () => {
  const [openNewConnectionDialog, setNewConnectionDialog] = useState(false);

  const toggleNewConnectionDialog = () => {
    setNewConnectionDialog(!openNewConnectionDialog);
  };

  return (
    <div id='login-page__main'>
      <NewConnectionDialog open={openNewConnectionDialog} onClose={toggleNewConnectionDialog} />
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

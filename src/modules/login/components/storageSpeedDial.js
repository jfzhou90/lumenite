import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import {
  Storage as StorageIcon,
  History as HistoryIcon,
  DeleteForever as DeleteAllIcon,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

import { DeleteHistoryDialog, ResetAppDialog } from '../dialog/confirmationDialogs';

const StorageButton = ({ resetApp }) => {
  const [speedDial, setSpeedDial] = useState(false);
  const [resetHistoryDialog, setResetHistoryDialog] = useState(false);
  const [resetAppDialog, setResetAppDialog] = useState(false);

  const toggleResetHistoryDialog = () => setResetHistoryDialog(!resetHistoryDialog);

  const toggleResetAppDialog = () => setResetAppDialog(!resetAppDialog);

  const closeSpeedDial = () => setSpeedDial(false);

  const openSpeedDial = () => setSpeedDial(true);

  const clearHistory = () => {
    toggleResetHistoryDialog();
    localStorage.removeItem('graphiql:query');
    localStorage.removeItem('graphiql:operationName');
    localStorage.removeItem('graphiql:queries');
    closeSpeedDial();
  };

  const resetApplication = () => {
    toggleResetAppDialog();
    const seed = localStorage.getItem('halfSeed');
    localStorage.clear();
    localStorage.setItem('halfSeed', seed);
    resetApp();
    closeSpeedDial();
  };

  return (
    <div id='main_div--storage_button'>
      <DeleteHistoryDialog
        open={resetHistoryDialog}
        onClose={toggleResetHistoryDialog}
        onConfirm={clearHistory}
      />

      <ResetAppDialog
        open={resetAppDialog}
        onClose={toggleResetAppDialog}
        onConfirm={resetApplication}
      />

      <SpeedDial
        ariaLabel='Storage Options'
        icon={<StorageIcon />}
        onClose={closeSpeedDial}
        onOpen={openSpeedDial}
        open={speedDial}
        direction='up'
      >
        <SpeedDialAction
          key='Reset App'
          icon={<DeleteAllIcon />}
          tooltipTitle='Reset App'
          onClick={toggleResetAppDialog}
        />
        <SpeedDialAction
          key='Clear Query History'
          icon={<HistoryIcon />}
          tooltipTitle='Clear History'
          onClick={toggleResetHistoryDialog}
        />
      </SpeedDial>
    </div>
  );
};

StorageButton.propTypes = {
  resetApp: PropTypes.func.isRequired,
};

export default StorageButton;

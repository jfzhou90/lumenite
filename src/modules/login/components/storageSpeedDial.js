import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import {
  Storage as StorageIcon,
  History as HistoryIcon,
  DeleteForever as DeleteAllIcon,
} from '@material-ui/icons';

import { DeleteHistoryDialog, ResetAppDialog } from '../dialog/confirmationDialogs';

const StorageButton = ({ resetApp }) => {
  const [open, setOpen] = useState(false);
  const [resetHistoryDialog, setResetHistoryDialog] = useState(false);
  const [resetAppDialog, setResetAppDialog] = useState(false);

  const toggleResetHistoryDialog = () => setResetHistoryDialog(!resetHistoryDialog);

  const toggleResetAppDialog = () => setResetAppDialog(!resetAppDialog);

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  const clearHistory = () => {
    toggleResetHistoryDialog();
    localStorage.removeItem('graphiql:query');
    localStorage.removeItem('graphiql:operationName');
    localStorage.removeItem('graphiql:queries');
    handleClose();
  };

  const resetApplication = () => {
    toggleResetAppDialog();
    const seed = localStorage.getItem('halfSeed');
    localStorage.clear();
    localStorage.setItem('halfSeed', seed);
    resetApp();
    handleClose();
  };

  return (
    <div id='main--div__storage-button'>
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
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
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

export default StorageButton;

import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

export const DeleteHistoryDialog = ({ open, onClose, resetHistory }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='reset_history_dialog'>
      <DialogTitle>Delete all query histories</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Warning: This permanently deletes all query histories, while keeping favorites intact.
        </DialogContentText>

        <DialogActions>
          <Button className='Danger-Button' color='primary' onClick={resetHistory}>
            Confirm
          </Button>
          <Button color='secondary' onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export const ResetAppDialog = ({ open, onClose, resetApp }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='reset_history_dialog'>
      <DialogTitle>Reset Application Data</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Warning: This will reset all application data, you will have to re-enter all connection
          details if you want to continue to use this application.
        </DialogContentText>

        <DialogActions>
          <Button className='Danger-Button' color='primary' onClick={resetApp}>
            Confirm
          </Button>
          <Button color='secondary' onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

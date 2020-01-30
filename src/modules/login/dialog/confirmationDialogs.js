import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

const ConfirmationDialog = ({ open, onClose, onConfirm, labelBy, title, content }) => (
  <Dialog open={open} onClose={onClose} aria-labelledby={labelBy}>
    <DialogTitle>{title}</DialogTitle>

    <DialogContent>
      <DialogContentText>{content}</DialogContentText>

      <DialogActions>
        <Button className='Danger-Button' color='primary' onClick={onConfirm}>
          Confirm
        </Button>
        <Button color='secondary' onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
);

export const DeleteHistoryDialog = props => (
  <ConfirmationDialog
    {...props}
    title='Delete all query histories'
    content='Warning: This permanently deletes all query histories, while keeping favorites intact.'
    labelBy='reset_history_dialog'
  />
);

export const ResetAppDialog = props => (
  <ConfirmationDialog
    {...props}
    title='Reset Application Data'
    content='Warning: This will reset all application data, you will have to re-enter all connection
    details if you want to continue to use this application.'
    labelBy='reset_app_dialog'
  />
);

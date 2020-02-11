import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import PropTypes from 'prop-types';

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

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  labelBy: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export const DeleteHistoryDialog = ({ open, onClose, onConfirm }) => (
  <ConfirmationDialog
    title='Delete all query histories'
    content='Warning: This permanently deletes all query histories, while keeping favorites intact.'
    labelBy='reset_history_dialog'
    open={open}
    onClose={onClose}
    onConfirm={onConfirm}
  />
);

DeleteHistoryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export const ResetAppDialog = ({ open, onClose, onConfirm }) => (
  <ConfirmationDialog
    title='Reset Application Data'
    content='Warning: This will reset all application data, you will have to re-enter all connection
    details if you want to continue to use this application.'
    labelBy='reset_app_dialog'
    open={open}
    onClose={onClose}
    onConfirm={onConfirm}
  />
);

ResetAppDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

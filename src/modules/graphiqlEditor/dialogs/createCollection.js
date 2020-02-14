import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

import { displayActions } from '../../../store/slices/display';

const CreateCollectionDialog = () => {
  const dispatch = useDispatch();
  const open = useSelector(({ display }) => display.createCollectionDialog);

  const toggleCreateCollectionDialog = () =>
    dispatch(displayActions.TOGGLE_CREATE_COLLECTION_DIALOG());

  return (
    <Dialog
      open={open}
      onClose={toggleCreateCollectionDialog}
      aria-labelledby='Create Collection Dialog'
    >
      <DialogTitle>Create collection</DialogTitle>

      <DialogContent>
        <DialogContentText>Coming soon 2020</DialogContentText>

        <DialogActions>
          <Button color='secondary' onClick={toggleCreateCollectionDialog}>
            Cancel
          </Button>
          <Button color='primary' onClick={toggleCreateCollectionDialog}>
            Create
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionDialog;

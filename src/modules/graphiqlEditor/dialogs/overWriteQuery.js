import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { displayActions } from '../../../store/slices/display';
import { editQuery } from '../../../store/asyncActions/collection';

import './editQuery.scss';

const OverwriteQueryDialog = ({ getQueryData }) => {
  const dispatch = useDispatch();
  const query = useSelector(({ display }) => display.overwriteQueryDialog);
  const isSubmitting = useSelector(({ workspace }) => workspace.isSubmitting);

  const toggleOverwriteQueryDialog = () => {
    dispatch(displayActions.TOGGLE_OVERWRITE_QUERY_DIALOG(null));
  };

  const overwriteQuery = () => {
    const newQueryData = getQueryData();
    dispatch(editQuery({ ...query, ...newQueryData }));
  };

  if (!query) return null;

  return (
    <Dialog
      maxWidth='sm'
      open={!!query}
      onClose={toggleOverwriteQueryDialog}
      aria-labelledby='Edit Query Dialog'
      id='edit_query_dialog'
    >
      <DialogTitle>Overwrite {query.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to overwrite this query with the one on the editor?
        </DialogContentText>
        <DialogActions>
          <Button
            className='Danger-Button'
            color='primary'
            disabled={isSubmitting}
            onClick={overwriteQuery}
          >
            Overwrite
          </Button>

          <Button color='secondary' disabled={isSubmitting} onClick={toggleOverwriteQueryDialog}>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

OverwriteQueryDialog.propTypes = {
  getQueryData: PropTypes.func.isRequired,
};

export default OverwriteQueryDialog;

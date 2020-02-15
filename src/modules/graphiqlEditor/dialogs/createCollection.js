import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Form } from 'react-final-form';

import FormField from '../../../lib/components/form/formField';
import { displayActions } from '../../../store/slices/display';

import './createCollection.scss';

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
      id='create_collection_dialog'
    >
      <DialogTitle>Create collection</DialogTitle>

      <DialogContent>
        <Form
          onSubmit={null}
          render={({ handleSubmit, invalid, submitting }) => (
            <form onSubmit={handleSubmit} noValidate>
              <FormField name='name' id='name' label='Name' required />
              <FormField name='link' id='link' label='Link' />
              <FormField
                name='notes'
                id='notes'
                label='Notes'
                rowsMax={5}
                multiline
                maxLength={300}
              />
              <DialogActions>
                <Button color='secondary' onClick={toggleCreateCollectionDialog}>
                  Cancel
                </Button>
                <Button color='primary' disabled={invalid || submitting} onClick={handleSubmit}>
                  Create
                </Button>
              </DialogActions>
            </form>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionDialog;

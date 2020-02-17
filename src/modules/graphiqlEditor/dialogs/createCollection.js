import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Form } from 'react-final-form';

import { displayActions } from '../../../store/slices/display';
import { createCollection } from '../../../store/asyncActions/workspace';
import FormField from '../../../lib/components/form/formField';
import { required } from '../../../lib/utils/form';

import './createCollection.scss';

const CreateCollectionDialog = () => {
  const dispatch = useDispatch();
  const open = useSelector(({ display }) => display.createCollectionDialog);
  const { isSubmitting, workspaceId } = useSelector(
    ({ workspace }) => ({
      isSubmitting: workspace.isSubmitting,
      workspaceId: workspace.workspaceId,
    }),
    shallowEqual
  );

  const toggleCreateCollectionDialog = () =>
    dispatch(displayActions.TOGGLE_CREATE_COLLECTION_DIALOG());

  const submitForm = formData => dispatch(createCollection({ workspaceId, ...formData }));

  return (
    <Dialog
      disableBackdropClick
      open={open}
      onClose={toggleCreateCollectionDialog}
      aria-labelledby='Create Collection Dialog'
      id='create_collection_dialog'
    >
      <DialogTitle>Create collection</DialogTitle>

      <DialogContent>
        <Form
          onSubmit={submitForm}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} noValidate>
              <FormField name='name' id='name' label='Name' required validate={required} />
              <FormField name='link' id='link' label='Link' maxLength={100} />
              <FormField
                name='notes'
                id='notes'
                label='Notes'
                rowsMax={7}
                multiline
                maxLength={500}
              />
              <DialogActions>
                <Button color='secondary' onClick={toggleCreateCollectionDialog}>
                  Cancel
                </Button>
                <Button color='primary' disabled={invalid || isSubmitting} onClick={handleSubmit}>
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

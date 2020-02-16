import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';
import { Form } from 'react-final-form';
import reduce from 'lodash/reduce';
import keys from 'lodash/keys';

import { displayActions } from '../../../store/slices/display';
import FormField from '../../../lib/components/form/formField';
import FormDropDown from '../../../lib/components/form/formDropDown';
import { required } from '../../../lib/utils/form';

import './saveQuery.scss';

const SaveQueryDialog = ({ save }) => {
  const dispatch = useDispatch();
  const open = useSelector(({ display }) => display.saveQueryDialog);
  const isSubmitting = useSelector(({ workspace }) => workspace.isSubmitting);
  const collections = useSelector(
    ({ workspace }) =>
      reduce(
        workspace.collections,
        (result, collection) => ({ [collection.id]: collection.name, ...result }),
        {}
      ),
    shallowEqual
  );

  const toggleSaveQueryDialog = () => {
    dispatch(displayActions.TOGGLE_SAVE_QUERY_DIALOG());
  };

  const isEmpty = !keys(collections).length;
  return (
    <Dialog
      open={open}
      onClose={toggleSaveQueryDialog}
      aria-labelledby='Save Query Dialog'
      id='save_query_dialog'
    >
      <DialogTitle>Save Query</DialogTitle>
      <DialogContent>
        {isEmpty && (
          <DialogContentText>Please create a collection before trying to save!</DialogContentText>
        )}

        <Form
          onSubmit={save}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} noValidate>
              {!isEmpty && (
                <FormDropDown
                  name='collectionId'
                  id='collectionId'
                  label='Collection'
                  required
                  validate={required}
                  keyPair={collections}
                />
              )}

              <FormField name='name' id='name' label='Name' required validate={required} />

              <FormField name='link' id='link' label='Link' />

              <FormField name='notes' id='notes' label='Notes' />

              <DialogActions>
                <Button color='secondary' onClick={toggleSaveQueryDialog}>
                  Cancel
                </Button>
                <Button color='primary' disabled={invalid || isSubmitting} onClick={handleSubmit}>
                  Save
                </Button>
              </DialogActions>
            </form>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};

SaveQueryDialog.propTypes = {
  save: PropTypes.func.isRequired,
};

export default SaveQueryDialog;

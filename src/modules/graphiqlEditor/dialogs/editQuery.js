/* eslint max-lines: [2, {"max": 150, "skipComments": true, "skipBlankLines": true}] */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';
import { Form } from 'react-final-form';

import { displayActions } from '../../../store/slices/display';
import { editQuery, deleteQuery } from '../../../store/asyncActions/collection';
import FormField from '../../../lib/components/form/formField';
import { required } from '../../../lib/utils/form';

import './editQuery.scss';

const EditQueryDialog = () => {
  const dispatch = useDispatch();
  const query = useSelector(({ display }) => display.editQueryDialog);
  const isSubmitting = useSelector(({ workspace }) => workspace.isSubmitting);
  const [inputValue, setInputValue] = useState('');

  const toggleEditQueryDialog = () => {
    dispatch(displayActions.TOGGLE_EDIT_QUERY_DIALOG(null));
  };

  const handleUpdate = formData => {
    dispatch(editQuery(formData));
  };

  const handleDelete = () => {
    if (!query) return;
    dispatch(deleteQuery(query));
  };

  const inputOnChange = event => {
    setInputValue(event.currentTarget?.value);
  };

  useEffect(() => {
    if (!query) {
      setInputValue('');
    }
  }, [query]);

  if (!query) return null;

  return (
    <Dialog
      maxWidth='sm'
      open={!!query}
      onClose={toggleEditQueryDialog}
      aria-labelledby='Edit Query Dialog'
      id='edit_query_dialog'
    >
      <DialogTitle>Edit Query</DialogTitle>
      <DialogContent>
        <Form
          onSubmit={handleUpdate}
          initialValues={query}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} noValidate>
              <FormField
                name='name'
                id='name'
                label='Name'
                required
                validate={required}
                maxLength={25}
              />

              <div id='delete_query'>
                <TextField
                  id='delete_query--input'
                  label='Type in the query name to delete'
                  fullWidth
                  onChange={inputOnChange}
                  value={inputValue}
                  InputProps={{
                    inputProps: {
                      autoComplete: 'off',
                    },
                  }}
                />
                <Button
                  color='primary'
                  className='Danger-Button'
                  onClick={handleDelete}
                  disabled={inputValue !== query.name || isSubmitting}
                >
                  Delete
                </Button>
              </div>

              <DialogActions>
                <Button color='secondary' onClick={toggleEditQueryDialog}>
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

export default EditQueryDialog;

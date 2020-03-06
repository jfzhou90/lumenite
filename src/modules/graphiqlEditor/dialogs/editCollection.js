/* eslint max-lines: [2, {"max": 150, "skipComments": true, "skipBlankLines": true}] */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
} from '@material-ui/core';
import { Form } from 'react-final-form';

import { displayActions } from '../../../store/slices/display';
import { editCollectionInfo, deleteCollection } from '../../../store/asyncActions/collection';
import FormField from '../../../lib/components/form/formField';
import { required } from '../../../lib/utils/form';

import './editCollection.scss';

const EditCollectionDialog = () => {
  const [isEditing, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const collection = useSelector(({ display }) => display.editCollectionDialog);
  const isSubmitting = useSelector(({ workspace }) => workspace.isSubmitting);

  const closeDialog = () => {
    dispatch(displayActions.TOGGLE_EDIT_COLLECTION_DIALOG(null));
    setEdit(false);
  };

  const toggleEdit = () => setEdit(!isEditing);

  const editCollection = formData => {
    dispatch(editCollectionInfo(formData));
  };

  const handleDelete = () => {
    dispatch(deleteCollection(collection.id));
  };

  const inputOnChange = event => {
    setInputValue(event.currentTarget?.value);
  };

  useEffect(() => {
    if (!collection) {
      setInputValue('');
      setEdit(false);
    }
  }, [collection]);

  if (!collection) return null;

  return (
    <Dialog
      open={!!collection}
      onClose={closeDialog}
      id='edit_collection_dialog'
      aria-labelledby='Edit Collection Dialog'
    >
      <DialogTitle>Collection Info</DialogTitle>

      <DialogContent>
        {!isEditing && (
          <>
            <DialogContentText>Name: {collection.name}</DialogContentText>
            <DialogContentText>
              Link:{' '}
              {collection.link && (
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={/http/.test(collection.link) ? collection.link : `//${collection.link}`}
                >
                  {collection.link}
                </a>
              )}
            </DialogContentText>
            <DialogContentText>Notes:</DialogContentText>
            <DialogContentText component='pre'>{collection.notes}</DialogContentText>

            <DialogActions>
              <Button color='secondary' onClick={closeDialog}>
                Close
              </Button>
              <Button color='primary' onClick={toggleEdit}>
                Edit
              </Button>
            </DialogActions>
          </>
        )}

        {isEditing && (
          <Form
            onSubmit={editCollection}
            initialValues={collection}
            render={({ handleSubmit, invalid }) => {
              return (
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

                  <div id='delete_collection'>
                    <TextField
                      id='delete_collection--input'
                      label='Type in the collection name to delete'
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
                      disabled={inputValue !== collection.name || isSubmitting}
                    >
                      Delete
                    </Button>
                  </div>

                  <DialogActions>
                    <Button color='secondary' onClick={closeDialog}>
                      Cancel
                    </Button>
                    <Button
                      color='primary'
                      disabled={invalid || isSubmitting}
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
                  </DialogActions>
                </form>
              );
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditCollectionDialog;

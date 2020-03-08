import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

import { displayActions } from '../../../../store/slices/display';
import { getCollectionsDetails } from '../../../../store/asyncActions/workspace';
import { importCollection } from '../../../../lib/utils/qol';

import ArmsWide from '../../../../assets/svg/armsWide';

const EmptyCollection = () => {
  const dispatch = useDispatch();
  const workspaceId = useSelector(({ workspace }) => workspace.id);

  const toggleCreateCollectionDialog = () =>
    dispatch(displayActions.TOGGLE_CREATE_COLLECTION_DIALOG());

  const refreshCollectionList = () => {
    dispatch(getCollectionsDetails(workspaceId));
  };

  const handleFileUpload = event => {
    importCollection(event.target?.files[0], refreshCollectionList);
  };

  return (
    <div className='workspace_div--empty'>
      <ArmsWide />
      <Button color='primary' onClick={toggleCreateCollectionDialog}>
        Create a collection
      </Button>
      <div>
        <label htmlFor='import_collection_input'>
          <Button component='span' color='primary' disableRipple disableFocusRipple>
            Import
          </Button>
          <input
            id='import_collection_input'
            style={{ display: 'none' }}
            type='file'
            multiple={false}
            onChange={handleFileUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default EmptyCollection;

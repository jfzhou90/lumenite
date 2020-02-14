import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import { displayActions } from '../../../../store/slices/display';

import ArmsWide from '../../../../assets/svg/armsWide';

const EmptyCollection = () => {
  const dispatch = useDispatch();
  const toggleCreateCollectionDialog = () =>
    dispatch(displayActions.TOGGLE_CREATE_COLLECTION_DIALOG());

  return (
    <div className='collection_div--empty'>
      <ArmsWide />
      <Button color='primary' onClick={toggleCreateCollectionDialog}>
        Create a collection
      </Button>
    </div>
  );
};

export default EmptyCollection;

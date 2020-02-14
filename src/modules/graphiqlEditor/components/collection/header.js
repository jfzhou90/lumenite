import React from 'react';
import { useDispatch } from 'react-redux';

import { displayActions } from '../../../../store/slices/display';

const CollectionHeader = () => {
  const dispatch = useDispatch();

  const toggleCollectionsSidebar = () => dispatch(displayActions.TOGGLE_COLLECTIONS_SIDEBAR());

  return (
    <div className='collection_div--header'>
      <span>Collections</span>
      <button
        className='docExplorerHide'
        onClick={toggleCollectionsSidebar}
        aria-label='Close History'
        type='button'
      >
        {'\u2715'}
      </button>
    </div>
  );
};

export default CollectionHeader;

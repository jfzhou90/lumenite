import React, { memo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import { displayActions } from '../../../../store/slices/display';

import CollectionItem from './collectionItem';

const CollectionList = ({ setQuery }) => {
  const dispatch = useDispatch();
  const collections = useSelector(
    ({ workspace }) => sortBy(workspace.collections, collection => collection.name),
    shallowEqual
  );

  const toggleCreateCollectionDialog = () =>
    dispatch(displayActions.TOGGLE_CREATE_COLLECTION_DIALOG());

  return (
    <div className='collection_list_div'>
      <Button color='primary' onClick={toggleCreateCollectionDialog}>
        New
      </Button>
      <div className='collection_list_div--list'>
        {map(collections, ({ name, id, link }) => (
          <CollectionItem key={id} name={name} id={id} link={link} setQuery={setQuery} />
        ))}
      </div>
    </div>
  );
};

CollectionList.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default memo(CollectionList);

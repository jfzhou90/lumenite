import React, { memo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import { displayActions } from '../../../../store/slices/display';
import { getCollectionsDetails } from '../../../../store/asyncActions/workspace';
import { importCollection } from '../../../../lib/utils/qol';

import CollectionItem from './collectionItem';

const CollectionList = ({ setQuery }) => {
  const dispatch = useDispatch();
  const collections = useSelector(
    ({ workspace }) => sortBy(workspace.collections, collection => collection.name),
    shallowEqual
  );
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
    <div className='collection_list_div'>
      <div className='collection_list_div--actions'>
        <div>
          <label htmlFor='import_collection_input'>
            <Button component='span' color='primary'>
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
        <Button color='primary' onClick={toggleCreateCollectionDialog}>
          New
        </Button>
      </div>
      <div className='collection_list_div--list'>
        {map(collections, ({ name, id, link, notes }) => (
          <CollectionItem
            key={id}
            name={name}
            id={id}
            link={link}
            notes={notes}
            setQuery={setQuery}
          />
        ))}
      </div>
    </div>
  );
};

CollectionList.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default memo(CollectionList);

import React, { useEffect, useCallback, memo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import { List, ListItem, IconButton } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';

import { getQueries, toggleEditQueryDialog } from '../../../../store/asyncActions/collection';

const QueryItem = ({ name, variable, query, id, setQuery }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    setQuery({ variable, query });
  };

  const toggleEdit = event => {
    event.stopPropagation();
    dispatch(toggleEditQueryDialog(id));
  };

  return (
    <ListItem id={id} button onClick={onClick}>
      {name}
      <IconButton
        size='small'
        onClick={toggleEdit}
        className='edit_button'
        disableFocusRipple
        disableRipple
      >
        <EditIcon />
      </IconButton>
    </ListItem>
  );
};

QueryItem.propTypes = {
  setQuery: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  variable: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};

const QueryList = ({ collectionId, setQuery }) => {
  const dispatch = useDispatch();
  const queries = useSelector(({ workspace }) => workspace.queries[collectionId], shallowEqual);

  const fetchQueryDetails = useCallback(() => {
    dispatch(getQueries(collectionId));
  }, [dispatch, collectionId]);

  useEffect(() => {
    fetchQueryDetails();
  }, [fetchQueryDetails]);

  return (
    <List className='query_list'>
      {map(sortBy(queries, 'name'), ({ name, query, variable, id }) => (
        <QueryItem
          name={name}
          key={id}
          query={query}
          variable={variable}
          id={id}
          setQuery={setQuery}
        />
      ))}
    </List>
  );
};

QueryList.propTypes = {
  collectionId: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default memo(QueryList);

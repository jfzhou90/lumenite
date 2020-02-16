import React, { memo, useEffect, useState, useCallback } from 'react';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getQueries } from '../../../../store/asyncActions/collection';

const CollectionItem = ({ name, link, id, setQuery }) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const formattedLink = /http/.test(link) ? link : `//${link}`;
  const queryIdList = useSelector(({ workspace }) => workspace.collections[id]?.queries);
  const queries = useSelector(({ workspace }) => workspace.queries[id], shallowEqual);

  const toggleExpansion = () => setExpanded(!expanded);

  const fetchQueryDetails = useCallback(() => {
    dispatch(getQueries(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (expanded) fetchQueryDetails();
  }, [queryIdList, expanded, fetchQueryDetails]);

  return (
    <MuiExpansionPanel square expanded={expanded}>
      {/* eslint-disable-next-line no-console */}
      {console.log(queries, setQuery)}
      <MuiExpansionPanelSummary aria-controls={`${id}-content`} id={id} onClick={toggleExpansion}>
        <Typography>{name}</Typography>
      </MuiExpansionPanelSummary>
      <MuiExpansionPanelDetails>
        {link && (
          <Typography variant='subtitle2'>
            <a rel='noopener noreferrer' target='_blank' href={formattedLink}>
              {link}
            </a>
          </Typography>
        )}
        {!queryIdList.length && <div>you got nothing</div>}
      </MuiExpansionPanelDetails>
    </MuiExpansionPanel>
  );
};

CollectionItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  link: PropTypes.string,
};

CollectionItem.defaultProps = {
  link: undefined,
};

export default memo(CollectionItem);

import React, { memo, useState } from 'react';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import QueryList from './queryList';

import CookieMan from '../../../../assets/illustrations/cookie';

const CollectionItem = ({ name, link, id, setQuery }) => {
  const [expanded, setExpanded] = useState(false);
  const formattedLink = /http/.test(link) ? link : `//${link}`;
  const isEmpty = useSelector(({ workspace }) => !workspace.collections[id]?.queries?.length);

  const toggleExpansion = () => setExpanded(!expanded);

  return (
    <MuiExpansionPanel square expanded={expanded}>
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
        {isEmpty && (
          <div className='query_list--empty'>
            <CookieMan />
            <span>This is not the gingerbread you are looking for, please save a query</span>
          </div>
        )}
        {!isEmpty && expanded && <QueryList collectionId={id} setQuery={setQuery} />}
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

import React, { memo, useState } from 'react';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Info as InfoIcon, Link as LinkIcon } from '@material-ui/icons';

import { viewCollectionInfo } from '../../../../store/asyncActions/collection';

import QueryList from './queryList';

import CookieMan from '../../../../assets/illustrations/cookie';

const CollectionItem = ({ name, link, id, notes, setQuery }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const formattedLink = /http/.test(link) ? link : `//${link}`;
  const isEmpty = useSelector(({ workspace }) => !workspace.collections[id]?.queries?.length);

  const toggleExpansion = () => setExpanded(!expanded);
  const toggleEditDialog = event => {
    if (expanded) event.stopPropagation();
    dispatch(viewCollectionInfo(id));
  };

  return (
    <MuiExpansionPanel square expanded={expanded}>
      <MuiExpansionPanelSummary aria-controls={`${id}-content`} id={id} onClick={toggleExpansion}>
        <Typography>{name}</Typography>
        <span>
          {link && (
            <IconButton
              size='small'
              className='collection_link'
              onClick={event => event.stopPropagation()}
            >
              <a href={formattedLink} target='_blank' rel='noopener noreferrer'>
                <LinkIcon />
              </a>
            </IconButton>
          )}
          <IconButton size='small' className='info_button' onClick={toggleEditDialog}>
            <InfoIcon />
          </IconButton>
        </span>
      </MuiExpansionPanelSummary>
      <MuiExpansionPanelDetails>
        {notes && <Typography variant='subtitle2'>{notes}</Typography>}
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
  notes: PropTypes.string,
};

CollectionItem.defaultProps = {
  link: undefined,
  notes: undefined,
};

export default memo(CollectionItem);

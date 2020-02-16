import React from 'react';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const CollectionItem = ({ name, link, id }) => {
  const formattedLink = /http/.test(link) ? link : `//${link}`;
  return (
    <MuiExpansionPanel square>
      <MuiExpansionPanelSummary aria-controls={`${id}-content`} id={id}>
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
      </MuiExpansionPanelDetails>
    </MuiExpansionPanel>
  );
};

CollectionItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  link: PropTypes.string,
};

CollectionItem.defaultProps = {
  link: undefined,
};

export default CollectionItem;

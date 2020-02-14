import React from 'react';
import PropTypes from 'prop-types';

const CollectionHeader = ({ toggle }) => (
  <div className='collection_div--header'>
    <span>Collections</span>
    <button className='docExplorerHide' onClick={toggle} aria-label='Close History' type='button'>
      {'\u2715'}
    </button>
  </div>
);

CollectionHeader.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default CollectionHeader;

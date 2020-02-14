import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import CollectionHeader from './header';
import EmptyCollection from './emptyCollection';

import './collection.scss';

const CollectionSidebar = ({ open, toggle }) => {
  const [createDialog, setCreateDialog] = useState(false);
  const mainClasses = classnames('collection_div', { hidden: open });

  const toggleCreateDialog = () => setCreateDialog(!createDialog);

  return (
    <>
      <section className={mainClasses} aria-label='Collections'>
        <CollectionHeader toggle={toggle} />
        <EmptyCollection toggleCreate={toggleCreateDialog} />
      </section>
    </>
  );
};

CollectionSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default CollectionSidebar;

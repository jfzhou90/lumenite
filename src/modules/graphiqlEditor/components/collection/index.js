import React, { useState } from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

import CollectionHeader from './header';
import EmptyCollection from './emptyCollection';

import './collection.scss';

const CollectionSidebar = () => {
  const [createDialog, setCreateDialog] = useState(false);
  const open = useSelector(({ display }) => display.collectionsSidebar);
  const mainClasses = classnames('collection_div', { hidden: open });

  const toggleCreateDialog = () => setCreateDialog(!createDialog);

  return (
    <div className={mainClasses} aria-label='Collections'>
      <CollectionHeader />
      <EmptyCollection toggleCreate={toggleCreateDialog} />
    </div>
  );
};

export default CollectionSidebar;

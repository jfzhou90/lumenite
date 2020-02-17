import React, { useEffect, useCallback, memo } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import keys from 'lodash/keys';
import PropTypes from 'prop-types';

import { getCollectionsDetails } from '../../../../store/asyncActions/workspace';

import WorkspaceHeader from './header';
import EmptyWorkspace from './emptyWorkspace';
import CollectionList from './collectionList';

import HourGlass from '../../../../assets/illustrations/hourGlass';
import './workspace.scss';

const WorkspaceSidebar = ({ setQuery }) => {
  const dispatch = useDispatch();
  const hidden = useSelector(({ display }) => !display.workspaceSidebar);
  const { workspaceId, isEmpty, isLoading } = useSelector(
    ({ workspace }) => ({
      workspaceId: workspace.workspaceId,
      isEmpty: !keys(workspace.collections).length,
      isLoading: workspace.isLoading,
    }),
    shallowEqual
  );
  const mainClasses = classnames('workspace_div', { hidden });

  const fetchCollections = useCallback(() => {
    dispatch(getCollectionsDetails(workspaceId));
  }, [dispatch, workspaceId]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return (
    <div className={mainClasses} aria-label='Workspace'>
      <WorkspaceHeader />
      {isLoading && <HourGlass />}
      {isEmpty && !isLoading && <EmptyWorkspace />}
      {!isEmpty && !isLoading && <CollectionList setQuery={setQuery} />}
    </div>
  );
};

WorkspaceSidebar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default memo(WorkspaceSidebar);

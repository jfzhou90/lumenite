import React, { useEffect, useCallback } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { getGqlCollectionsDetails } from '../../../../store/asyncActions/workspace';

import WorkspaceHeader from './header';
import EmptyWorkspace from './emptyWorkspace';
import CollectionList from './collectionList';

import HourGlass from '../../../../assets/illustrations/hourGlass';
import './workspace.scss';

const WorkspaceSidebar = () => {
  const dispatch = useDispatch();
  const open = useSelector(({ display }) => display.workspaceSidebar);
  const { workspaceId, isEmpty, isLoading } = useSelector(
    ({ workspace }) => ({
      workspaceId: workspace.workspaceId,
      isEmpty: !workspace.collections?.length,
      isLoading: workspace.isLoading,
    }),
    shallowEqual
  );
  const mainClasses = classnames('workspace_div', { hidden: open });

  const fetchCollections = useCallback(() => {
    dispatch(getGqlCollectionsDetails(workspaceId));
  }, [dispatch, workspaceId]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return (
    <div className={mainClasses} aria-label='Workspace'>
      <WorkspaceHeader />
      {isLoading && <HourGlass />}
      {isEmpty && !isLoading && <EmptyWorkspace />}
      {!isEmpty && !isLoading && <CollectionList />}
    </div>
  );
};

export default WorkspaceSidebar;

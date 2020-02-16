import React from 'react';
import { useDispatch } from 'react-redux';

import { displayActions } from '../../../../store/slices/display';

const WorkspaceHeader = () => {
  const dispatch = useDispatch();

  const toggleWorkspaceSidebar = () => dispatch(displayActions.TOGGLE_WORKSPACE_SIDEBAR());

  return (
    <div className='workspace_div--header'>
      <span>Workspace</span>
      <button
        className='docExplorerHide'
        onClick={toggleWorkspaceSidebar}
        aria-label='Close History'
        type='button'
      >
        {'\u2715'}
      </button>
    </div>
  );
};

export default WorkspaceHeader;

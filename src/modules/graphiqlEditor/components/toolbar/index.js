import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { generateUuid } from '../../../../lib/utils/qol';
import { displayActions } from '../../../../store/slices/display';

import { SaveIcon } from '../../../../assets/icons';

import './toolbar.scss';

const GraphiQLToolbar = ({ prettify, merge, copy, toggleHistory }) => {
  const dispatch = useDispatch();

  const toggleWorkspaceSidebar = () => dispatch(displayActions.TOGGLE_WORKSPACE_SIDEBAR());
  const toggleSaveQueryDialog = () => dispatch(displayActions.TOGGLE_SAVE_QUERY_DIALOG());

  return (
    <div id='editor_toolbar' className='editor_toolbar'>
      <Button
        variant='contained'
        color='primary'
        onClick={prettify}
        title='Prettify Query (Shift-Ctrl-P)'
        aria-label='Prettify'
        size='small'
      >
        Prettify
      </Button>

      <Button
        variant='contained'
        color='primary'
        onClick={merge}
        title='Merge Query (Shift-Ctrl-M)'
        aria-label='Merge'
        size='small'
      >
        Merge
      </Button>

      <Button
        variant='contained'
        color='primary'
        onClick={copy}
        title='Copy Query (Shift-Ctrl-C)'
        aria-label='Copy'
        size='small'
      >
        Copy
      </Button>

      <Button
        variant='contained'
        color='primary'
        onClick={generateUuid}
        title='Generate UUID'
        aria-label='UUID'
        size='small'
      >
        UUID
      </Button>

      <Button
        variant='contained'
        color='primary'
        onClick={toggleHistory}
        title='Show History'
        aria-label='Show History'
        size='small'
      >
        History
      </Button>

      <ButtonGroup variant='contained' color='primary' aria-label='split button'>
        <Button
          color='primary'
          onClick={toggleWorkspaceSidebar}
          title='Show Workspace'
          aria-label='Show Workspace '
          size='small'
        >
          Collection
        </Button>
        <Button
          color='primary'
          size='small'
          aria-label='Add to collection'
          onClick={toggleSaveQueryDialog}
        >
          <SaveIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
};

GraphiQLToolbar.propTypes = {
  prettify: PropTypes.func.isRequired,
  merge: PropTypes.func.isRequired,
  copy: PropTypes.func.isRequired,
  toggleHistory: PropTypes.func.isRequired,
};

export default memo(GraphiQLToolbar);

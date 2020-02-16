// import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workspaceSidebar: false,
  createCollectionDialog: false,
  saveQueryDialog: false,
};

/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    TOGGLE_WORKSPACE_SIDEBAR(state) {
      state.workspaceSidebar = !state.workspaceSidebar;
    },
    TOGGLE_CREATE_COLLECTION_DIALOG(state) {
      state.createCollectionDialog = !state.createCollectionDialog;
    },
    TOGGLE_SAVE_QUERY_DIALOG(state) {
      state.saveQueryDialog = !state.saveQueryDialog;
    },
  },
});

export const displayActions = displaySlice.actions;
export default displaySlice.reducer;

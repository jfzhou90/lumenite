// import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workspaceSidebar: false,
  createCollectionDialog: false,
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
  },
});

export const displayActions = displaySlice.actions;
export default displaySlice.reducer;

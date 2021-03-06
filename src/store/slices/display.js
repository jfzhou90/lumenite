import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workspaceSidebar: false,
  createCollectionDialog: false,
  editCollectionDialog: null,
  saveQueryDialog: false,
  editQueryDialog: null,
  overwriteQueryDialog: null,
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
    TOGGLE_EDIT_COLLECTION_DIALOG(state, action) {
      state.editCollectionDialog = action.payload;
    },
    TOGGLE_SAVE_QUERY_DIALOG(state) {
      state.saveQueryDialog = !state.saveQueryDialog;
    },
    TOGGLE_EDIT_QUERY_DIALOG(state, action) {
      state.editQueryDialog = action.payload;
    },
    TOGGLE_OVERWRITE_QUERY_DIALOG(state, action) {
      state.overwriteQueryDialog = action.payload;
    },
    CLOSE_QUERY_DIALOG(state) {
      state.editQueryDialog = null;
      state.overwriteQueryDialog = null;
    },
  },
});

export const displayActions = displaySlice.actions;
export default displaySlice.reducer;

import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workspace: 'Local Storage',
  collections: [],
  queries: [],
};

/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    CREATE_COLLECTION(state, action) {
      toast.success('New collection created!');
      state.collections = action.payload;
    },
  },
});

export const collectionActions = collectionSlice.actions;
export default collectionSlice.reducer;

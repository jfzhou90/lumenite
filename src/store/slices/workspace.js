/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';

import { defaultWorkspace } from '../../lib/gqlDB/workspace';

const initialState = {
  workspaceId: defaultWorkspace,
  isSubmitting: false,
  isLoading: true,
  collections: {},
  queries: {},
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    LOADING_COLLECTION_LIST(state) {
      state.isLoading = true;
    },
    COLLECTION_LIST_LOADED(state, action) {
      state.isLoading = false;
      state.collections = { ...state.collections, ...action.payload };
    },
    SUBMITTING_DATA(state) {
      state.isSubmitting = true;
    },
    CREATE_GQL_COLLECTION(state, action) {
      toast.success('New collection created!');
      state.collections = { ...state.collections, ...action.payload };
      state.isSubmitting = false;
    },
    ADD_QUERY(state, action) {
      toast.success('Query saved!');
      const { query, collectionId } = action.payload;
      state.collections[collectionId].queries.push(query.id);
      const previousQueries = state.queries[collectionId] || {};
      state.queries[collectionId] = { ...previousQueries, [query.id]: query };
      state.isSubmitting = false;
    },
    GET_QUERIES(state, action) {
      const { collectionId, queries } = action.payload;
      const queryObj = state.queries[collectionId] || {};
      state.queries[collectionId] = { ...queryObj, ...queries };
    },
    ACTION_ERROR(state, action) {
      toast.error(`Error: ${action.payload}`);
      state.isSubmitting = false;
      state.isLoading = false;
    },
  },
});

export const workspaceActions = workspaceSlice.actions;
export default workspaceSlice.reducer;

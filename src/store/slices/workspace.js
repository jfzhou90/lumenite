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

/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
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
    CREATE_COLLECTION(state, action) {
      toast.success('New collection created!');
      state.collections = { ...state.collections, ...action.payload };
      state.isSubmitting = false;
    },
    UPDATE_COLLECTION(state, action) {
      toast.success('Collection info updated!');
      state.collections[action.payload.id] = action.payload;
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
    UPDATE_QUERY(state, action) {
      toast.success('Query updated!!');
      const { collectionId, id } = action.payload;
      state.queries[collectionId][id] = action.payload;
      state.isSubmitting = false;
    },
    GET_QUERIES(state, action) {
      const { collectionId, queries } = action.payload;
      const queryObj = state.queries[collectionId] || {};
      state.queries[collectionId] = { ...queryObj, ...queries };
    },
    REMOVE_COLLECTION(state, action) {
      toast.success('Collection deleted!');
      const collectionId = action.payload;
      delete state.collections[collectionId];
      state.isSubmitting = false;
    },
    REMOVE_QUERY(state, action) {
      toast.success('Query Deleted!');
      const { collection, query } = action.payload;
      state.collections[collection.id] = collection;
      delete state.queries[collection.id][query.id];
      state.isSubmitting = false;
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

import reduce from 'lodash/reduce';

import collectionDB from '../../lib/gqlDB/collection';
import queryDB from '../../lib/gqlDB/query';
import { displayActions } from '../slices/display';
import { workspaceActions } from '../slices/workspace';

export const saveGqlQueries = queryProps => dispatch => {
  const { collectionId, name } = queryProps;
  if (!collectionId || !name) {
    return dispatch(
      workspaceActions.ACTION_ERROR(new Error('Missing collection ID / query name!'))
    );
  }

  dispatch(workspaceActions.SUBMITTING_DATA());
  return queryDB
    .createQuery(queryProps)
    .then(query => {
      collectionDB.addQueryToCollection({ collectionId, queryId: query.id });
      return query;
    })
    .then(query => {
      dispatch(workspaceActions.ADD_QUERY({ query, collectionId }));
      dispatch(displayActions.TOGGLE_SAVE_QUERY_DIALOG());
    })
    .catch(error => dispatch(workspaceActions.ACTION_ERROR(error)));
};

export const getQueries = collectionId => dispatch => {
  if (!collectionId) {
    return dispatch(workspaceActions.ACTION_ERROR(new Error('Missing Collection Id!')));
  }

  return collectionDB
    .getAllQueries(collectionId)
    .then(queryIds => queryDB.getAllQueryDetails(queryIds))
    .then(queries => {
      const queryMap = reduce(
        queries,
        (result, query) => ({ ...result, [query.id]: { ...query, collectionId } }),
        {}
      );
      dispatch(workspaceActions.GET_QUERIES({ collectionId, queries: queryMap }));
    })
    .catch(error => dispatch(workspaceActions.ACTION_ERROR(error)));
};

export const viewCollectionInfo = collectionId => dispatch => {
  if (!collectionId) {
    return dispatch(workspaceActions.ACTION_ERROR(new Error('Missing Collection Id!')));
  }

  return collectionDB
    .getCollection(collectionId)
    .then(collection => {
      dispatch(displayActions.TOGGLE_EDIT_COLLECTION_DIALOG(collection));
    })
    .catch(error => dispatch(workspaceActions.ACTION_ERROR(error)));
};

export const editCollectionInfo = collectionDetails => dispatch => {
  dispatch(workspaceActions.SUBMITTING_DATA());
  collectionDB
    .updateCollection(collectionDetails)
    .then(updatedCollection => {
      dispatch(workspaceActions.UPDATE_COLLECTION(updatedCollection));
      dispatch(displayActions.TOGGLE_EDIT_COLLECTION_DIALOG(null));
    })
    .catch(error => dispatch(workspaceActions.ACTION_ERROR(error)));
};

export const deleteCollection = collectionId => dispatch => {
  if (!collectionId) {
    return dispatch(workspaceActions.ACTION_ERROR(new Error('Missing Collection Id!')));
  }

  dispatch(workspaceActions.SUBMITTING_DATA());

  return collectionDB
    .getAllQueries(collectionId)
    .then(queryIds => queryDB.deleteQueries(queryIds))
    .then(() => collectionDB.removeCollection(collectionId))
    .then(() => {
      dispatch(workspaceActions.REMOVE_COLLECTION(collectionId));
      dispatch(displayActions.TOGGLE_EDIT_COLLECTION_DIALOG(null));
    })
    .catch(error => dispatch(workspaceActions.ACTION_ERROR(error)));
};

export const toggleEditQueryDialog = queryId => dispatch => {
  if (!queryId) {
    return dispatch(workspaceActions.ACTION_ERROR(new Error('Missing Query Id!')));
  }

  return queryDB
    .getQueryDetails(queryId)
    .then(queryDetails => {
      dispatch(displayActions.TOGGLE_EDIT_QUERY_DIALOG(queryDetails));
    })
    .catch(error => dispatch(workspaceActions.ACTION_ERROR(error)));
};

export const editQuery = queryDetails => dispatch => {
  if (!queryDetails) {
    return dispatch(workspaceActions.ACTION_ERROR(new Error('Unable to update Query')));
  }

  dispatch(workspaceActions.SUBMITTING_DATA());
  return queryDB
    .updateQuery(queryDetails)
    .then(updatedQuery => {
      dispatch(workspaceActions.UPDATE_QUERY(updatedQuery));
      dispatch(displayActions.TOGGLE_EDIT_QUERY_DIALOG(null));
    })
    .catch(error => dispatch(workspaceActions.ACTION_ERROR(error)));
};

export const deleteQuery = query => dispatch => {
  if (!query.id) {
    return dispatch(workspaceActions.ACTION_ERROR(new Error('Unable to delete Query')));
  }

  dispatch(workspaceActions.SUBMITTING_DATA());

  return queryDB
    .deleteQuery(query.id)
    .then(() => collectionDB.removeQuery(query))
    .then(collection => {
      dispatch(workspaceActions.REMOVE_QUERY({ collection, query }));
      dispatch(displayActions.TOGGLE_EDIT_QUERY_DIALOG(null));
    })
    .catch(error => dispatch(workspaceActions.ACTION_ERROR(error)));
};

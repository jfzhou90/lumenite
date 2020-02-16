import collectionDB from '../../lib/db/collection';
import queryDB from '../../lib/db/query';
import { displayActions } from '../slices/display';
import { workspaceActions } from '../slices/workspace';

export const saveGqlQueries = ({ collectionId, ...queryProps }) => dispatch => {
  if (!collectionId || !queryProps.name)
    return dispatch(workspaceActions.ACTION_ERROR(new Error('Missing Parameters')));

  dispatch(workspaceActions.SUBMITTING_DATA());

  return queryDB
    .createQuery(queryProps)
    .then(queryId => collectionDB.addGqlQueryToCollection({ collectionId, queryId }))
    .then(queries => {
      dispatch(workspaceActions.ADD_QUERY(queries));
      dispatch(displayActions.TOGGLE_SAVE_QUERY_DIALOG());
    });
};

export const something = 'test';

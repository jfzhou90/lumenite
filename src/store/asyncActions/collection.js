import reduce from 'lodash/reduce';

import collectionDB from '../../lib/gqlDB/collection';
import queryDB from '../../lib/gqlDB/query';
import { displayActions } from '../slices/display';
import { workspaceActions } from '../slices/workspace';

export const saveGqlQueries = ({ collectionId, ...queryProps }) => dispatch => {
  if (!collectionId || !queryProps.name)
    return dispatch(
      workspaceActions.ACTION_ERROR(new Error('Collection ID or Query Name is missing'))
    );

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
    });
};

export const getQueries = collectionId => dispatch => {
  if (!collectionId)
    return dispatch(workspaceActions.ACTION_ERROR(new Error('Missing Collection Id')));

  return collectionDB
    .getAllQueries(collectionId)
    .then(queryIds => queryDB.getAllQueryDetails(queryIds))
    .then(queries => {
      const queryMap = reduce(queries, (result, query) => ({ ...result, [query.id]: query }), {});
      dispatch(workspaceActions.GET_QUERIES({ collectionId, queries: queryMap }));
    });
};

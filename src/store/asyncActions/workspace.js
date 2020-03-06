import reduce from 'lodash/reduce';

import workspaceDB, { defaultWorkspace } from '../../lib/gqlDB/workspace';
import collectionDB from '../../lib/gqlDB/collection';
import { workspaceActions } from '../slices/workspace';
import { displayActions } from '../slices/display';

export const getWorkspace = (key = defaultWorkspace) =>
  workspaceDB.getItem(key).then(workspace => workspace || workspaceDB.getItem(defaultWorkspace));

export const getCollectionsDetails = workspaceId => dispatch => {
  workspaceDB
    .getAllCollectionsIds(workspaceId)
    .then(collectionIds => collectionDB.getAllCollectionsDetails(collectionIds))
    .then(collectionDetails => {
      const collectionMap = reduce(
        collectionDetails,
        (result, collection) => ({ ...result, [collection.id]: collection }),
        {}
      );
      dispatch(workspaceActions.COLLECTION_LIST_LOADED(collectionMap));
    })
    .catch(error => dispatch(workspaceActions.ACTION_ERROR(error)));
};

export const createCollection = ({ workspaceId, ...collectionDetails }) => dispatch => {
  dispatch(workspaceActions.SUBMITTING_DATA());

  collectionDB
    .createCollection(collectionDetails)
    .then(collection => {
      workspaceDB.addCollectionToWorkspace({ workspaceId, collectionId: collection.id });
      return { [collection.id]: collection };
    })
    .then(collection => {
      dispatch(workspaceActions.CREATE_COLLECTION(collection));
      dispatch(displayActions.TOGGLE_CREATE_COLLECTION_DIALOG());
    })
    .catch(error => dispatch(workspaceActions.ACTION_ERROR(error)));
};

import workspaceDB, { defaultWorkspace } from '../../lib/db/workspace';
import collectionDB from '../../lib/db/collection';
import { workspaceActions } from '../slices/workspace';
import { displayActions } from '../slices/display';

export const getWorkspace = (key = defaultWorkspace) =>
  workspaceDB.getItem(key).then(workspace => workspace || workspaceDB.getItem(defaultWorkspace));

export const getGqlCollectionsDetails = workspaceId => dispatch => {
  return workspaceDB
    .getAllGqlCollectionsIds(workspaceId)
    .then(gqlCollectionIds => collectionDB.getAllCollectionsDetails(gqlCollectionIds))
    .then(gqlCollectionDetails =>
      dispatch(workspaceActions.COLLECTION_LIST_LOADED(gqlCollectionDetails))
    );
};

export const createGqlCollection = ({ workspaceId, ...collectionDetails }) => dispatch => {
  dispatch(workspaceActions.SUBMITTING_DATA());

  collectionDB
    .createCollection(collectionDetails)
    .then(collectionId => workspaceDB.addGqlCollectionToWorkspace({ workspaceId, collectionId }))
    .then(collectionIds => collectionDB.getAllCollectionsDetails(collectionIds))
    .then(collections => {
      dispatch(workspaceActions.CREATE_GQL_COLLECTION(collections));
      dispatch(displayActions.TOGGLE_CREATE_COLLECTION_DIALOG());
    })
    .catch(error => dispatch(workspaceActions.ACTION_ERROR(error)));
};

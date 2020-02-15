import DB from './localForage';

const workspaceDB = new DB('workspace');

const defaultWorkspace = 'default_workspace';

if (workspaceDB.getItem(defaultWorkspace)) {
  workspaceDB.setItem(defaultWorkspace, {
    name: 'Ny Workspace',
    description: '',
    link: '',
    storage: 'localForage',
    dateCreated: new Date().toISOString(),
    gqlCollections: [],
    restApiCollection: [],
  });
}

export const getWorkSpace = (key = defaultWorkspace) =>
  workspaceDB.getItem(key).then(workspace => workspace || workspaceDB.getItem(defaultWorkspace));

export default workspaceDB;

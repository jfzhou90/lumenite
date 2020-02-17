import localForage from 'localforage';

export const defaultWorkspace = 'default_workspace';

class WorkspaceDB {
  constructor(storeName) {
    this.storage = localForage.createInstance();
    this.storage.config({
      name: 'Lumenite-GQL',
      storeName,
    });
  }

  getItem(key) {
    return this.storage.getItem(key);
  }

  getAllCollectionsIds(workspaceId = defaultWorkspace) {
    return this.storage.getItem(workspaceId).then(workspace => workspace?.collections || []);
  }

  addCollectionToWorkspace({ workspaceId, collectionId }) {
    return this.storage.getItem(workspaceId).then(workspace => {
      if (!workspace) throw new Error('Workspace does not exist');
      const clone = { ...workspace };
      clone.collections = [collectionId, ...workspace.collections];
      return this.storage.setItem(workspaceId, clone).then(({ collections }) => collections);
    });
  }

  setItem(key, value) {
    return this.storage.setItem(key, value);
  }

  removeItem(key) {
    return this.storage.removeItem(key);
  }
}

const workspaceDB = new WorkspaceDB('workspace');

workspaceDB.getItem(defaultWorkspace).then(workspace => {
  if (!workspace) {
    workspaceDB.setItem(defaultWorkspace, {
      name: 'My Workspace',
      description: '',
      link: '',
      storage: 'localForage',
      dateCreated: new Date().toISOString(),
      collections: [],
    });
  }
});

export default workspaceDB;

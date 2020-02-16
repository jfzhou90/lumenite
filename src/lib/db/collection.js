import localForage from 'localforage';
import uuid from 'uuid/v4';
import map from 'lodash/map';
import compact from 'lodash/compact';

const defaultCollectionProps = {
  id: `collection.${uuid()}`,
  name: 'ERROR',
  link: '',
  notes: '',
  queries: [],
};
class CollectionDB {
  constructor(storeName) {
    this.storage = localForage.createInstance();
    this.storage.config({
      name: 'Lumenite',
      storeName,
    });
  }

  createCollection(value) {
    const collectionId = value && `collection.${uuid()}`;
    return this.storage
      .setItem(collectionId, { ...defaultCollectionProps, id: collectionId, queries: [], ...value })
      .then(() => collectionId);
  }

  getAllCollectionsDetails(collectionIds = []) {
    const promises = map(collectionIds, collectionId => this.storage.getItem(collectionId));
    return Promise.all(promises).then(result => compact(result));
  }

  addGqlQueryToCollection({ collectionId, queryId }) {
    return this.storage.getItem(collectionId).then(collection => {
      if (!collection) throw new Error('Invalid collection');
      const clone = { ...collection };
      clone.queries = [queryId, ...collection.queries];
      this.storage
        .setItem(collectionId, clone)
        .then(({ queries }) => ({ [collectionId]: queries }));
    });
  }
}

const collectionDB = new CollectionDB('collection');

export default collectionDB;

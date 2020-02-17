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
      name: 'Lumenite-GQL',
      storeName,
    });
  }

  getCollection(collectionId) {
    return this.storage.getItem(collectionId);
  }

  updateCollection(collectionDetails) {
    return this.storage.setItem(collectionDetails.id, collectionDetails);
  }

  createCollection(value) {
    const collectionId = value && `collection.${uuid()}`;
    return this.storage.setItem(collectionId, {
      ...defaultCollectionProps,
      id: collectionId,
      queries: [],
      ...value,
    });
  }

  getAllCollectionsDetails(collectionIds = []) {
    const promises = map(collectionIds, collectionId => this.storage.getItem(collectionId));
    return Promise.all(promises).then(result => compact(result));
  }

  addQueryToCollection({ collectionId, queryId }) {
    return this.storage.getItem(collectionId).then(collection => {
      if (!collection) throw new Error('Invalid collection');
      const clone = { ...collection };
      clone.queries = [queryId, ...collection.queries];
      return this.storage
        .setItem(collectionId, clone)
        .then(({ queries }) => ({ collectionId, queries }));
    });
  }

  getAllQueries(collectionId) {
    return this.storage.getItem(collectionId).then(collection => collection.queries);
  }
}

const collectionDB = new CollectionDB('collection');

export default collectionDB;

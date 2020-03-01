import localForage from 'localforage';
import uuid from 'uuid/v4';
import map from 'lodash/map';
import filter from 'lodash/filter';
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

  addCollection(collection) {
    return this.storage.setItem(collection.id, collection);
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

  removeCollection(collectionId) {
    return this.storage.removeItem(collectionId);
  }

  removeQuery(query) {
    return this.storage.getItem(query.collectionId).then(collection => {
      if (!collection) return null;
      const queries = filter(collection.queries, queryId => queryId !== query.id);
      return this.storage.setItem(collection.id, { ...collection, queries });
    });
  }
}

const collectionDB = new CollectionDB('collection');

export default collectionDB;

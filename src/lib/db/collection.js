/* eslint-disable import/prefer-default-export */
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

  async getAllCollectionsDetails(collectionIds = []) {
    const promises = map(collectionIds, collectionId => this.storage.getItem(collectionId));
    return Promise.all(promises).then(result => compact(result));
  }
}

const collectionDB = new CollectionDB('collection');

export default collectionDB;

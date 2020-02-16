/* eslint-disable import/prefer-default-export */
import localForage from 'localforage';
import uuid from 'uuid/v4';
import map from 'lodash/map';

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
      .setItem(collectionId, { id: collectionId, ...value })
      .then(() => collectionId);
  }

  getAllCollectionsDetails(collectionIds = []) {
    const promises = map(collectionIds, collectionId => this.storage.getItem(collectionId));
    return Promise.all(promises);
  }
}

const collectionDB = new CollectionDB('collection');

export default collectionDB;

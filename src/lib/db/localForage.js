import localForage from 'localforage';

export default class DB {
  constructor(storeName) {
    this.storage = localForage.createInstance();
    this.storage.config({
      name: 'Lumenite',
      storeName,
    });
  }

  getItem(key) {
    return this.storage.getItem(key);
  }

  setItem(key, value) {
    return this.storage.setItem(key, value);
  }

  removeItem(key) {
    return this.storage.removeItem(key);
  }
}

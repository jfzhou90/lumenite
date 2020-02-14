import localForage from 'localforage';

export default class DB {
  constructor(storeName) {
    this.storage = localForage.createInstance();
    this.storage.config({
      name: 'Lumenite',
      storeName,
    });
    this.storage.getItem('connections', (_, connection) => {
      if (!connection && storeName === 'connections') {
        this.storage.setItem('connections', JSON.parse(localStorage.getItem('connections')));
      }
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

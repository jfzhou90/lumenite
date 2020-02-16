import localForage from 'localforage';
import uuid from 'uuid/v4';
import map from 'lodash/map';
import compact from 'lodash/compact';

const defaultQueryProps = {
  id: `query.${uuid()}`,
  name: 'ERROR',
  link: '',
  notes: '',
  query: '',
  variable: '',
};

class QueryDB {
  constructor(storeName) {
    this.storage = localForage.createInstance();
    this.storage.config({
      name: 'Lumenite-GQL',
      storeName,
    });
  }

  createQuery(value) {
    const queryId = value && `query.${uuid()}`;
    return this.storage
      .setItem(queryId, { ...defaultQueryProps, id: queryId, ...value })
      .then(() => queryId);
  }

  async getAllQueryDetails(queryIds = []) {
    const promises = map(queryIds, queryId => this.storage.getItem(queryId));
    return Promise.all(promises).then(result => compact(result));
  }
}

const queryDB = new QueryDB('query');

export default queryDB;

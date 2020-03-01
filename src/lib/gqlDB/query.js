import localForage from 'localforage';
import uuid from 'uuid/v4';
import map from 'lodash/map';
import compact from 'lodash/compact';

const defaultQueryProps = {
  id: `query.${uuid()}`,
  name: 'ERROR',
  query: '',
  variable: '',
  collectionId: '',
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
    return this.storage.setItem(queryId, { ...defaultQueryProps, id: queryId, ...value });
  }

  getAllQueryDetails(queryIds = []) {
    const promises = map(queryIds, queryId => this.storage.getItem(queryId));
    return Promise.all(promises).then(result => compact(result));
  }

  deleteQueries(queryIds = []) {
    const promises = map(queryIds, queryId => this.storage.removeItem(queryId));
    return Promise.all(promises);
  }

  getQueryDetails(queryId) {
    return this.storage.getItem(queryId);
  }

  updateQuery(queryDetails) {
    return this.storage.setItem(queryDetails.id, queryDetails);
  }

  deleteQuery(queryId) {
    return this.storage.removeItem(queryId);
  }
}

const queryDB = new QueryDB('query');

export default queryDB;

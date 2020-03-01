/* eslint-disable import/prefer-default-export */
import uuid from 'uuid/v4';
import { toast } from 'react-toastify';

import collectionDB from '../gqlDB/collection';
import queryDB from '../gqlDB/query';

export const generateUuid = () => {
  const el = document.createElement('textarea');
  el.value = uuid();
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const tryFunction = func => {
  try {
    func();
  } catch (error) {
    toast.error(`Error: ${error}`);
  }
};

export const exportCollection = async collectionId => {
  const data = {};

  await collectionDB
    .getCollection(collectionId)
    .then(collection => {
      data.collection = collection;
      return queryDB.getAllQueryDetails(collection.queries);
    })
    .then(queries => {
      data.queries = queries;
    });

  const element = document.createElement('a');
  element.setAttribute(
    'href',
    `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`
  );
  element.setAttribute('download', `${data.collection.name}.json`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

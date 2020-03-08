import uuid from 'uuid/v4';
import { toast } from 'react-toastify';

import collectionDB from '../gqlDB/collection';
import queryDB from '../gqlDB/query';
import workspaceDB, { defaultWorkspace } from '../gqlDB/workspace';

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

const addCollectionJsonToDB = async (jsonData, callback) => {
  try {
    const data = JSON.parse(jsonData);
    await queryDB.addQueries(data.queries);
    await collectionDB.addCollection(data.collection);
    await workspaceDB.addCollectionToWorkspace({
      workspaceId: defaultWorkspace,
      collectionId: data.collection.id,
    });
    toast.success('Collection has been imported successfully!');
    callback();
  } catch (error) {
    toast.error('Error: Unable to parse file');
  }
};

export const importCollection = (file, callback) => {
  if (!file) {
    return;
  }

  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    addCollectionJsonToDB(fileReader.result, callback);
  };

  fileReader.readAsText(file);
};

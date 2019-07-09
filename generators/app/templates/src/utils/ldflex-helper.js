import auth from 'solid-auth-client';
import ldflex from '@solid/query-ldflex';

export const existDocument = async documentUri =>
  auth.fetch(documentUri, {
    headers: {
      'Content-Type': 'text/turtle'
    }
  });

const createDoc = async (documentUri, options) => {
  try {
    console.log(documentUri);
    return await auth.fetch(documentUri, options);
  } catch (e) {
    throw e;
  }
};

export const createDocument = async (documentUri, body = '') => {
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/turtle'
      },
      body
    };
    return await createDoc(documentUri, options);
  } catch (e) {
    throw e;
  }
};

export const createDocumentWithTurtle = async (documentUri, body = '') => {
  try {
    return createDoc(documentUri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/turtle'
      },
      body
    });
  } catch (e) {
    throw e;
  }
};

export const createNonExistentDocument = async (documentUri, body = '') => {
  try {
    const result = await existDocument(documentUri);

    return result.status === 404 ? createDocument(documentUri, body) : null;
  } catch (e) {
    throw e;
  }
};

export const fetchLdflexDocument = async documentUri => {
  try {
    const result = await existDocument(documentUri);
    if (result.status === 404) return null;
    const document = await ldflex[documentUri];
    return document;
  } catch (e) {
    throw e;
  }
};

export const existFolder = async folderPath => {
  const result = await auth.fetch(folderPath);
  console.log('result', result);
  return result.ok;
};

export const discoveryInbox = async webId => {
  try {
    const user = await ldflex[webId];
    const inbox = await user['ldp:inbox'];

    return inbox && inbox.value;
  } catch (error) {
    throw error;
  }
};

export const createContainer = async folderPath => {
  try {
    const existContainer = await existFolder(folderPath);
    console.log('exist ', existContainer, folderPath);
    const dummyPath = `${folderPath}.dummy`;
    if (existContainer) return folderPath;
    await createDoc(dummyPath, { method: 'PUT'});
    await createDoc(dummyPath, { method: 'DELETE' });

    return folderPath;
  } catch (error) {
    throw new Error(error);
  }
};

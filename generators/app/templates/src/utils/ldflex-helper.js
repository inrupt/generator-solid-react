import auth from 'solid-auth-client';
import ldflex from '@solid/query-ldflex';

export const existDocument = async documentUri => {
  return await auth.fetch(documentUri, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const createDoc = async (documentUri, options) => {
  try {
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
        'Content-Type': 'application/sparql-update'
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
    return await createDoc(documentUri, {
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
    if (result.status === 404) throw new Error('404: Document not found');
    const document = await ldflex[documentUri];
    return document;
  } catch (e) {
    throw e;
  }
};

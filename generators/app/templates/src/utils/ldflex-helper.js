import auth from 'solid-auth-client';
import ldflex from '@solid/query-ldflex';
import { errorToaster } from '@utils';

export const documentExists = async documentUri =>
  auth.fetch(documentUri, {
    headers: {
      'Content-Type': 'text/turtle'
    }
  });

export const createDoc = async (documentUri, options) => {
  try {
    return await auth.fetch(documentUri, options);
  } catch (e) {
    throw e;
  }
};

export const deleteFile = async url => {
  try {
    return await auth.fetch(url, { method: 'DELETE' });
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
    const result = await documentExists(documentUri);

    return result.status === 404 ? createDocument(documentUri, body) : null;
  } catch (e) {
    throw e;
  }
};

export const fetchLdflexDocument = async documentUri => {
  try {
    const result = await documentExists(documentUri);
    if (result.status === 404) return null;
    const document = await ldflex[documentUri];
    return document;
  } catch (e) {
    throw e;
  }
};

export const resourceExists = async resourcePath => {
  try {
    const result = await auth.fetch(resourcePath);
    return result.status === 403 || result.status === 200;
  } catch (e) {
    errorToaster(e.message, 'Error');
  }
};

export const discoverInbox = async document => {
  try {
    const documentExists = await resourceExists(document);
    if (!documentExists) return false;

    const inboxDocument = await ldflex[document]['ldp:inbox'];
    const inbox = inboxDocument ? await inboxDocument.value : false;
    return inbox;
  } catch (error) {
    throw error;
  }
};

/**
 * Given a resource link, find an inbox linked from it, if any exist
 * @param resourcePath
 * @returns {Promise<string|*>}
 */
export const getLinkedInbox = async resourcePath => {
  try {
    const inboxLinkedPath = await ldflex[resourcePath].inbox;
    if (inboxLinkedPath) {
      return inboxLinkedPath.value;
    }
    return '';
  } catch (error) {
    throw error;
  }
};

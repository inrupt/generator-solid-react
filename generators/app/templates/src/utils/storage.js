import data from '@solid/query-ldflex';
import { folderExists } from './ldflex-helper';
import { storageHelper, ldflexHelper } from '@utils';

const appPath = process.env.REACT_APP_TICTAC_PATH;

/**
 * Creates a valid string that represents the application path. This is the
 * default value if no storage predicate is discovered
 * @param webId
 * @param path
 * @returns {*}
 */
export const buildPathFromWebId = (webId, path) => {
  if (!webId) return false;
  const domain = new URL(typeof webId === 'object' ? webId.webId : webId).origin;
  return `${domain}/${path}`;
};

/**
 * Helper function to check for the user's pod storage value. If it doesn't exist, we assume root of the pod
 * @returns {Promise<string>}
 */
export const getAppStorage = async webId => {
  const podStoragePath = await data[webId].storage;
  let podStoragePathValue =
    podStoragePath && podStoragePath.value.trim().length > 0 ? podStoragePath.value : '';

  // Make sure that the path ends in a / so it is recognized as a folder path
  if (podStoragePathValue && !podStoragePathValue.endsWith('/')) {
    podStoragePathValue = `${podStoragePathValue}/`;
  }

  // If there is no storage value from the pod, use webId as the backup, and append the application path from env
  if (!podStoragePathValue || podStoragePathValue.trim().length === 0) {
    return buildPathFromWebId(webId, appPath);
  }

  return `${podStoragePathValue}${appPath}`;
};

/**
 *  Check and create the initial app files and folders
 * @param folderPath
 * @returns {Promise<*>}
 */
export const createInitialFiles = async (webId) => {
  const gameUrl = await storageHelper.getAppStorage(webId);
  //const gamePath = await ldflexHelper.createContainer(gameUrl);

  try {
    const existContainer = await folderExists(folderPath);
    const data = `${folderPath}data.ttl`;
    const settings = `${folderPath}settings.ttl`;
    if (existContainer) return folderPath;

    await createDoc(data, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/turtle'
      }
    });

    if (gamePath) {
      await createInbox(`${gamePath}inbox/`, gamePath);
      setGamePath(gamePath);
    }
  } catch (error) {
    throw new Error(error);
  }
};

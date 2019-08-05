import { media } from './styledComponents';
import { expandedProperty } from './context';
import { successToaster, errorToaster } from './toaster';
import * as ldflexHelper from './ldflex-helper';
import * as notification from './notification';

function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

function buildPathFromWebId(webid, path) {
  if (!webid) return false;
  const domain = new URL(typeof webid === 'object' ? webid.webId : webid).origin;
  return `${domain}/${path}`;
}

function checkAppPermissions(userAppPermissions, appPermissions) {
  const userAppPermission = userAppPermissions.sort().toString();
  const appPermission = appPermissions.sort().toString();
  return userAppPermission === appPermission;
}

export {
  media,
  expandedProperty,
  entries,
  ldflexHelper,
  successToaster,
  errorToaster,
  buildPathFromWebId,
  checkAppPermissions,
  notification
};

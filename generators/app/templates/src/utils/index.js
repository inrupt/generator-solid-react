import { media } from './styledComponents';
import { expandedProperty } from './context';
import { successToaster, errorToaster } from './toaster';
import * as ldflexHelper from './ldflex-helper';
import * as notification from './notification';
import * as storageHelper from './storage';

function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
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
  storageHelper,
  successToaster,
  errorToaster,
  checkAppPermissions,
  notification
};

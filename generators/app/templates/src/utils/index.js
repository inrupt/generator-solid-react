import { media } from './styledComponents';
import { expandedProperty } from './context';
import { successToaster, errorToaster } from './toaster';
import * as ldflexHelper from './ldflex-helper';
import * as notification from './notification';
import * as storageHelper from './storage';
import * as permissionHelper from './permissions';

function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

export {
  media,
  expandedProperty,
  entries,
  ldflexHelper,
  storageHelper,
  successToaster,
  errorToaster,
  notification,
  permissionHelper
};

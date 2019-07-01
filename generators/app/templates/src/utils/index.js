import { media } from './styledComponents';
import { expandedProperty } from './context';
import { successToaster, errorToaster } from './toaster';
import * as ldflexHelper from './ldflex-helper';

function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

function buildPathFromWebId(webid, path) {
  if (!webid) return false;

  const domain = new URL(webid).origin;
  return `${domain}/${path}`;
}

export {
  media,
  expandedProperty,
  entries,
  ldflexHelper,
  successToaster,
  errorToaster,
  buildPathFromWebId
};

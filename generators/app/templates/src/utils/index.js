import { media } from './styledComponents';
import { expandedProperty } from './context';

function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

export { media, expandedProperty, entries };

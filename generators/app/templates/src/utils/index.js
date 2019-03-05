import { media } from './styledComponents';
import { expandedProperty } from './context';

function* entries(obj) {
    for (let key of Object.keys(obj)) {
      yield [key, obj[key]];
    }
 }

export { media, expandedProperty, entries };

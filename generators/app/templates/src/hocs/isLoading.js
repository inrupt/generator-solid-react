import React from 'react';
import { Loader } from '@util-components';

function isLoading(HOComponent) {
  return props => {
    const { isLoading, ...rest } = props;
    return isLoading ? <Loader /> : <HOComponent {...rest} />;
  };
}

export default isLoading;

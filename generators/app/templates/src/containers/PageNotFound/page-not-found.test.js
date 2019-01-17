import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from './page-not-found.component';

import './utils/enzymeSetup';

it('App renders without crashing', () => {
  const wrapper = shallow(<PageNotFound />);
  expect(wrapper).toBeTruthy();
});

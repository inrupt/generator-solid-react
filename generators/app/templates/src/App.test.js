import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

import './utils/enzymeSetup';

it('App renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toBeTruthy();
});

import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from './page-not-found.component';
import { Link } from 'react-router-dom';
import '../../utils/enzymeSetup';

it('App renders without crashing', () => {
  const wrapper = shallow(<PageNotFound />);
  expect(wrapper).toBeTruthy();
});

it('includes link to homepage', () => {
  const home = shallow(<PageNotFound/>);
  expect(home.find(Link)).toHaveLength(1);
});

import React from 'react';
import Loader from './';
import { render, cleanup } from 'react-testing-library';

afterAll(cleanup);

it('renders without crashing', () => {
    const { container } = render(<Loader />);

    expect(container).toBeTruthy();
});

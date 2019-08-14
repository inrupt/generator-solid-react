import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import PageNotFound from './page-not-found.component';

describe('Page Not Found', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <PageNotFound />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('includes link to homepage', () => {
    const idsLink = document.querySelector('.ids-link');

    expect(idsLink).toBeTruthy();
  });
});

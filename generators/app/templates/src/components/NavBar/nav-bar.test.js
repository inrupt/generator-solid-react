import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './nav-bar.component';

afterAll(cleanup);

describe.only('Nav Bar', () => {
  const { container, rerender } = render(
    <Router>
      <NavBar />
    </Router>
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  it('renders with Navigation', () => {
    rerender(
      <Router>
        <NavBar navigation={[]} />
      </Router>
    );
    expect(document.querySelector('.nav__primary')).toBeTruthy();
  });

  it('renders with Toolbar', () => {
    rerender(
      <Router>
        <NavBar toolbar={[]} />
      </Router>
    );
    expect(document.querySelector('.nav__toolbar')).toBeTruthy();
  });
});

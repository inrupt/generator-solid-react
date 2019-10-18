import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import TextEditor from './text-editor.component';

describe('Text Editor', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <TextEditor />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});

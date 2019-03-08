import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Panel from './panel.component';

afterAll(cleanup);

const { container } = render(<Panel />);

describe('Panel', () => {
    it('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});

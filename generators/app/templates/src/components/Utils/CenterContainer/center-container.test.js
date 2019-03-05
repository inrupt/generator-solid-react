import React from 'react';
import { render, cleanup } from 'react-testing-library';
import CenterContainer from './center-container.component';

afterAll(cleanup)

describe.only('CenterContainer', () => {
    const { container } = render(
        <CenterContainer className={'centerContainerWrapper'} />
    )

    it('renders without crashing', () => {
        expect(container).toBeTruthy()
    })
    it('renders styled components', () => {
        expect(document.querySelector('.centerContainerWrapper')).toBeTruthy()
    })
    it('renders properly', () => {
        expect(document.querySelector('div.wrapper')).toBeTruthy()
    })
})

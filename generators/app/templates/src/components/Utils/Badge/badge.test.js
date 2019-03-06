import React from 'react'
import { render, cleanup } from 'react-testing-library'
import Badge from './badge.component'

import 'jest-dom/extend-expect';

afterAll(cleanup)

describe.only('Badge', () => {
    const { container } = render(<Badge badge={2} />)

    it('renders without crashing', () => {
        expect(container).toBeTruthy()
    })
    it('renders styled components', () => {
        expect(document.querySelector('.badgeWrapper')).toBeTruthy()
    })
    it('renders properly', () => {
        expect(document.querySelector('.badgeWrapper')).toHaveTextContent('2')
    })
})

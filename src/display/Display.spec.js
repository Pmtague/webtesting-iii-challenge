import React from 'react';
import Display from './Display.js';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup);

describe('<Display />', () => {
	it('renders without crashing', () => {
		render(<Display />);
	});
	it('open and unlocked', () => {
		const { getByText, queryByText } = render(<Display closed={ false } locked={ false } />);
		// Check for correct text
		const unlock = getByText(/unlocked/i);
		const open = getByText(/open/i);
		// Check for correct colors
		expect(unlock).toHaveClass('green-led')
		// Check that incorrect text does not show up in document
		expect(queryByText(/closed/i)).toBeFalsy();
		expect(queryByText(/open/i)).toBeTruthy();
	});
	it('closed and unlocked', () => {
		const { getByText } = render(<Display closed={ true } locked={ false } />);
		// Check for correct text
		getByText(/unlocked/i);
		const closed = getByText(/closed/i);
		// Check for correct colors
		expect(closed).toHaveClass('red-led')
	});
	it('closed and locked', () => {
		const { getByText } = render(<Display closed={ true } locked={ true } />);
		// Check for correct text
		const locked = getByText(/^locked$/i);
		getByText(/closed/i);
		// Check for correct colors
		expect(locked).toHaveClass('red-led')
	});
});


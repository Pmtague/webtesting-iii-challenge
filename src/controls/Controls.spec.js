import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Controls from './Controls.js';
import { notDeepEqual } from 'assert';

afterEach(cleanup);

describe('<Controls />', () => {
	it('renders without crashing', () => {
		render(<Controls />);
	});
	it('open and unlocked', () => {
		const closeSpy = jest.fn();
		const lockSpy = jest.fn();

		const { getByText } = render(<Controls 
									closed={ false } locked={ false } 
									toggleClosed={closeSpy}
									toggleLocked={lockSpy}
								/>);
		const closeBtn = getByText(/close gate/i);
		const lockBtn = getByText(/^lock gate$/i);

		// Check button disabled status
		expect(closeBtn.disabled).toBeFalsy();
		expect(lockBtn.disabled).toBeTruthy();

		// Check button click events
		fireEvent.click(closeBtn);
		expect(closeSpy).toBeCalled();
		fireEvent.click(lockBtn);
		expect(lockSpy).not.toBeCalled();
	});
	it('closed and unlocked', () => {
		const closeSpy = jest.fn();
		const lockSpy = jest.fn();

		const { getByText } = render(<Controls 
									closed={ true } 
									locked={ false } 
									toggleClosed={closeSpy}
									toggleLocked={lockSpy}
								/>);
		const closeBtn = getByText(/open gate/i);
		const lockBtn = getByText(/^lock gate$/i);

		// Check button disabled status
		expect(closeBtn.disabled).toBeFalsy();
		expect(lockBtn.disabled).toBeFalsy();

		// Check button click events
		fireEvent.click(closeBtn);
		expect(closeSpy).toBeCalled();
		fireEvent.click(lockBtn);
		expect(lockSpy).toBeCalled();
	});
	it('closed and locked', () => {
		const closeSpy = jest.fn();
		const lockSpy = jest.fn();

		const { getByText } = render(<Controls 
									closed={ true }  locked={ true } 
									toggleClosed={closeSpy}
									toggleLocked={lockSpy}
								/>);
		const closeBtn = getByText(/open gate/i);
		const lockBtn = getByText(/unlock gate/i);

		// Check button disabled status
		expect(closeBtn.disabled).toBeTruthy();
		expect(lockBtn.disabled).toBeFalsy();

		// Check button click events
		fireEvent.click(closeBtn);
		expect(closeSpy).not.toBeCalled();
		fireEvent.click(lockBtn);
		expect(lockSpy).toBeCalled();
	});
});
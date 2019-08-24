import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react/pure';

import Dashboard from './Dashboard';



describe('<Dashboard />', () => {
  beforeEach(cleanup);
  it('matches snapshot', () => {
    const tree = renderer.create(<Dashboard />).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('renders without crashing', () => {
    render(<Dashboard />);
  });
})
describe('<Dashboard /> state transitions', () => {
  const { getByText } = render(<Dashboard />);
  it('default state open and unlocked', () => {
    //Verify open and unlocked
    getByText(/^open$/i);
    getByText(/^unlocked$/i);

    const lockBtn = getByText(/^lock gate$/i);
    const closeBtn = getByText(/^close gate$/i);
  });
  it('open and unlocked to closed and unlocked', () => {
    const closeBtn = getByText(/^close gate$/i);
    fireEvent.click(closeBtn);
    // Check display text
    getByText(/^closed$/i);
    getByText(/^unlocked$/i);
    // Check button text
    getByText(/^lock gate$/i);
    getByText(/^open gate$/i);
  });
  it('closed and unlocked to closed and locked', () => {
    const lockBtn = getByText(/^lock gate$/i);
    fireEvent.click(lockBtn)
    //Verify closed and locked
    getByText(/^closed$/i);
    getByText(/^locked$/i);

    getByText(/^unlock gate$/i);
    getByText(/^open gate$/i);
  });
});
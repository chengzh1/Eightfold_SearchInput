import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pill from './index';

test('renders Pill component', () => {
  render(<Pill text="test" onDelete={() => {}} />);
  const pillElement = screen.getByText('test');
  expect(pillElement).toBeInTheDocument();
  const deleteElement = screen.queryAllByTitle(/delete/)[0];
  expect(deleteElement).toBeInTheDocument();
});

test('trigger Pill\'s delete button', () => {
  let cnt = 1;
  render(<Pill text="test" onDelete={() => cnt++ } />);
  userEvent.click(screen.queryAllByTitle(/delete/)[0]);
  expect(cnt).toBe(2);
});

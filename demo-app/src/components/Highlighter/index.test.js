import { screen, render } from '@testing-library/react';
import Highlighter from './index';

test('renders Highlighter component', () => {
  render(<Highlighter text="test" keyword="T" />);
  expect(screen.getByText('est')).toBeInTheDocument();
  expect(screen.getByText('t')).toBeInTheDocument();
});
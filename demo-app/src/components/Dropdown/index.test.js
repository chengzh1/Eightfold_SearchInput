import { screen, render } from '@testing-library/react';
import Dropdown from './index';

test('renders Dropdown component', () => {
  render(<Dropdown>{<li>test</li>}</Dropdown>);
  expect(screen.getByText('test')).toBeInTheDocument();
});
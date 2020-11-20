import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AutocompleteInput from './index';

test('renders AutocompleteInput component', () => {
  render(<AutocompleteInput />);
  expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();
});

test('auto complete dropdown is hidden by default', () => {
  render(<AutocompleteInput />);
  const dropdown = screen.getByTestId('dropdown');
  expect(dropdown).toHaveClass('hidden');
});

test('input to autocomplete', async () => {
    render(<AutocompleteInput />);
    const input = screen.getByPlaceholderText('Type here...');
    const dropdown = screen.getByTestId('dropdown');
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
    userEvent.type(input, 'iron');
    await waitFor(() => screen.getAllByText('Jon Favreau')); // valid search result
    expect(dropdown).not.toHaveClass('hidden');
    userEvent.click(input); // click to close dropdown
    expect(dropdown).toHaveClass('hidden');
});
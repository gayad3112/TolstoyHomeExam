import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Form } from '../components/Form';

describe('Form Component', () => {
  test('renders form with initial URL fields', () => {
    render(<Form onSubmit={() => {}} />);
    const urlInputs = screen.getAllByPlaceholderText('Enter a URL');
    expect(urlInputs).toHaveLength(3); // Initial 3 URL fields
  });

  test('adds a new URL field when add button is clicked', () => {
    render(<Form onSubmit={() => {}} />);
    const addButton = screen.getByText('+');
    fireEvent.click(addButton);
    const urlInputs = screen.getAllByPlaceholderText('Enter a URL');
    expect(urlInputs).toHaveLength(4); // One additional URL field
  });

  test('removes an optional URL field when remove button is clicked', () => {
    render(<Form onSubmit={() => {}} />);
    const addButton = screen.getByText('+');
    fireEvent.click(addButton);
    const removeButtons = screen.getAllByText('X');
    fireEvent.click(removeButtons[0]); // Remove the newly added optional URL field
    const urlInputs = screen.getAllByPlaceholderText('Enter a URL');
    expect(urlInputs).toHaveLength(3); // Back to the initial 3 URL fields
  });

  test('calls onSubmit with correct URL values when form is submitted', () => {
    const mockOnSubmit = jest.fn();
    render(<Form onSubmit={mockOnSubmit} />);
    const urlInputs = screen.getAllByPlaceholderText('Enter a URL');
    fireEvent.change(urlInputs[0], { target: { value: 'http://example1.com' } });
    fireEvent.change(urlInputs[1], { target: { value: 'http://example2.com' } });
    fireEvent.change(urlInputs[2], { target: { value: 'http://example3.com' } });
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledWith(['http://example1.com', 'http://example2.com', 'http://example3.com']);
  });

  test('updates URL state correctly when input value changes', () => {
    render(<Form onSubmit={() => {}} />);
    const urlInputs = screen.getAllByPlaceholderText('Enter a URL');
    fireEvent.change(urlInputs[0], { target: { value: 'http://example1.com' } });
    expect(urlInputs[0]).toHaveValue('http://example1.com');
  });


});

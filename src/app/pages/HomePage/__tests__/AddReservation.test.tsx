import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Addreservations from '../AddReservation';

describe('AddReservation component', () => {
  test('renders without crashing', () => {
    render(
      <Addreservations
        selectedReservation={null}
        updateSelectedReservation={() => {}}
      />,
    );
  });

  test('initial state values', () => {
    render(
      <Addreservations
        selectedReservation={null}
        updateSelectedReservation={() => {}}
      />,
    );
    expect(screen.getByLabelText('First Name')).toHaveValue('');
    expect(screen.getByLabelText('Last Name')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');
    // Add similar assertions for other input fields
  });

  test('form submission', () => {
    render(
      <Addreservations
        selectedReservation={null}
        updateSelectedReservation={() => {}}
      />,
    );
    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'John' },
    });
    // Simulate user input in other fields
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    // Add assertions for form submission logic, e.g., check if onSubmit function is called
  });

  test('input validations', () => {
    render(
      <Addreservations
        selectedReservation={null}
        updateSelectedReservation={() => {}}
      />,
    );
    // Simulate invalid inputs and check if error messages appear, e.g., for invalid email or phone number
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'invalid-email' },
    });
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  test('adding and removing tags', () => {
    render(
      <Addreservations
        selectedReservation={null}
        updateSelectedReservation={() => {}}
      />,
    );
    fireEvent.change(screen.getByLabelText('Tags'), {
      target: { value: 'tag1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    // Add assertion to check if the tag appears as a chip
    expect(screen.getByText('tag1')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    // Add assertion to check if the tag is removed from the chips
    expect(screen.queryByText('tag1')).not.toBeInTheDocument();
  });

  test('toggle buttons', () => {
    render(
      <Addreservations
        selectedReservation={null}
        updateSelectedReservation={() => {}}
      />,
    );
    fireEvent.click(screen.getByLabelText('Send me a reminder'));
    // Add assertion to check if the "Send me a reminder" toggle is checked
    expect(screen.getByLabelText('Send me a reminder')).toBeChecked();

    fireEvent.click(screen.getByLabelText('Send me a reminder'));
    // Add assertion to check if the "Send me a reminder" toggle is unchecked
    expect(screen.getByLabelText('Send me a reminder')).not.toBeChecked();
  });

  test('word count for first name and last name fields', () => {
    render(
      <Addreservations
        selectedReservation={null}
        updateSelectedReservation={() => {}}
      />,
    );
    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'John Doe' },
    });
    // Add assertion to check if the word count is displayed correctly for the first name field
    expect(screen.getByText('2 / 25 words')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'Last Name with more than 25 words in it' },
    });
    // Add assertion to check if the word count is displayed correctly for the last name field
    expect(screen.getByText('5 / 25 words')).toBeInTheDocument();
  });

  // Add more unit test cases for other scenarios based on the outlined test cases
});

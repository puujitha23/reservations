import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    const tagsInput = screen.getByLabelText('Tags');
    fireEvent.change(tagsInput, {
      target: { value: 'tag1' },
    });
    fireEvent.keyDown(tagsInput, { key: 'Enter', code: 13 });
    waitFor(async () => {
      // Add assertion to check if the tag appears as a chip
      await expect(screen.getByText('tag1')).toBeInTheDocument();
      const deleteButton = screen.getByLabelText('delete');

      fireEvent.click(deleteButton);
      // Add assertion to check if the tag is removed from the chips
      expect(screen.queryByText('tag1')).not.toBeInTheDocument();
    });
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
    expect(screen.getByText('9 / 25 words')).toBeInTheDocument();
  });
});

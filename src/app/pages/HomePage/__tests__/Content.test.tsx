import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For custom Jest matchers
import Content from '../Content';

describe('Content Component', () => {
  test('renders the Reservation List title', () => {
    render(<Content />);
    const titleElement = screen.getByText('Reservation List');
    expect(titleElement).toBeInTheDocument();
  });

  test('shows the reservation details in the modal when clicked on a row', () => {
    render(<Content />);
    const row = screen.getByText('John Doe'); // Assuming John Doe is present in the reservations data
    fireEvent.click(row);

    const modalTitle = screen.getByText('Reservation Details');
    const firstName = screen.getByText('First Name: John');
    const lastName = screen.getByText('Last Name: Doe');

    expect(modalTitle).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
  });

  test('adds a new reservation to the table when "Add Reservation" button is clicked', () => {
    render(<Content />);
    const addReservationButton = screen.getByText('Add Reservation');
    fireEvent.click(addReservationButton);

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const addButton = screen.getByText('Add');

    fireEvent.change(firstNameInput, { target: { value: 'New' } });
    fireEvent.change(lastNameInput, { target: { value: 'Reservation' } });
    fireEvent.change(emailInput, {
      target: { value: 'new.reservation@example.com' },
    });
    fireEvent.click(addButton);

    const newReservationRow = screen.getByText('New Reservation');
    expect(newReservationRow).toBeInTheDocument();
  });

  test('deletes a reservation from the table when delete button is clicked', () => {
    render(<Content />);
    const deleteButton = screen.getAllByLabelText('Delete')[0]; // Assuming there is at least one reservation in the table
    fireEvent.click(deleteButton);

    const deletedRow = screen.queryByText('John Doe'); // Assuming John Doe was deleted
    expect(deletedRow).not.toBeInTheDocument();
  });

  test('filters the reservations based on search term', () => {
    render(<Content />);
    const searchInput = screen.getByLabelText(
      'Search by Email, First Name, or Last Name',
    );

    fireEvent.change(searchInput, { target: { value: 'john' } });

    const firstNameColumn = screen.getByText('John');
    const lastNameColumn = screen.getByText('Doe');
    const emailColumn = screen.getByText('john.doe@example.com');

    expect(firstNameColumn).toBeInTheDocument();
    expect(lastNameColumn).toBeInTheDocument();
    expect(emailColumn).toBeInTheDocument();

    const unrelatedRow = screen.queryByText('Jane Smith');
    expect(unrelatedRow).not.toBeInTheDocument();
  });
});

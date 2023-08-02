import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
} from '@mui/material';
import { Add, Close, Delete, Edit, Search } from '@mui/icons-material';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Reservation } from 'types/Reservation';
import { reservations } from 'utils/data/reservation';
import styled from 'styled-components/macro';
import Addreservations from './AddReservation';

const Title = styled.div`
  font-size: 1.25rem;
  color: ${p => p.theme.text};
  font-weight: bold;
  margin-right: 1rem;
`;

const initialReservations: Reservation[] = reservations;

const Content: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dialogTitle, setDialogTitle] = useState<string>(
    'Reservations Details',
  );
  const [dialogActionButtonText, setDialogActionButtonText] =
    useState<string>('Close');
  const [isView, setIsView] = useState<boolean>(false);
  // Create an observable BehaviorSubject to store the reservations in memory cache
  const reservationsSubject = useMemo(
    () => new BehaviorSubject<Reservation[]>(initialReservations),
    [],
  );

  // Subscribe to the observable to get the latest reservations and update the state
  useEffect(() => {
    const subscription: Subscription = reservationsSubject.subscribe(
      reservations => {
        setReservations(reservations);
      },
    );

    // Unsubscribe on component unmount to avoid memory leaks
    return () => {
      subscription.unsubscribe();
    };
  }, [reservationsSubject]);

  // Update the cache whenever a new reservation is added
  const addReservationToCache = (newReservation: Reservation) => {
    const updatedReservations = [
      ...reservationsSubject.getValue(),
      newReservation,
    ];
    reservationsSubject.next(updatedReservations);
  };

  const updateReservationToCache = (newReservation: Reservation) => {
    const updatedReservations = [
      ...reservationsSubject.getValue(),
      newReservation,
    ];
    reservationsSubject.next(updatedReservations);
  };

  const updateSelectedReservation = (updatedReservation: Reservation) => {
    setSelectedReservation(reservation => ({
      ...reservation,
      ...updatedReservation,
    }));
  };

  const handleRowClick = (reservation: Reservation) => {
    setIsView(true);
    setDialogTitle('Reservations Details');
    setDialogActionButtonText('Close');
    setSelectedReservation(reservation);
    setOpenModal(true);
  };

  const handleDelete = (id: number | undefined) => {
    if (id) {
      const updatedReservations = reservationsSubject
        .getValue()
        .filter(res => res.id !== id);
      reservationsSubject.next(updatedReservations);
    }
  };

  const handleCloseModal = () => {
    setIsView(false);
    setOpenModal(false);
    setSelectedReservation(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filteredReservations = initialReservations.filter(
      reservation =>
        (reservation?.email &&
          reservation.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (reservation?.firstName &&
          reservation.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (reservation?.lastName &&
          reservation.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())),
    );
    event.target.value &&
      event.target.value.length > 0 &&
      setReservations(filteredReservations);
    if (event.target.value === '') {
      setReservations(initialReservations);
    }
  };

  return (
    <Container maxWidth="md">
      <h1>Reservation List</h1>

      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            label="Search by Email, First Name, or Last Name"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginBottom: '20px' }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => {
              setSelectedReservation(null);
              setDialogTitle('Add Reservations');
              setDialogActionButtonText('Save Changes');
              setOpenModal(true);
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date of Arrival</TableCell>
              <TableCell>Date of Departure</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map(reservation => (
              <TableRow
                key={reservation.id}
                onClick={e => handleRowClick(reservation)}
              >
                <TableCell>{reservation?.stay?.arrivalDate}</TableCell>
                <TableCell>{reservation?.stay?.departureDate}</TableCell>
                <TableCell>{reservation?.firstName}</TableCell>
                <TableCell>{reservation?.lastName}</TableCell>
                <TableCell>{reservation?.email}</TableCell>
                <TableCell>{reservation?.phone}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label="Edit"
                    onClick={e => {
                      e.stopPropagation();
                      setDialogTitle('Edit Reservations');
                      setDialogActionButtonText('Save Changes');
                      setSelectedReservation(reservation);
                      setOpenModal(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="Delete"
                    onClick={e => {
                      e.stopPropagation();
                      handleDelete(reservation?.id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <>
          <DialogTitle sx={{ m: 0, p: 2 }}>
            <Title>{dialogTitle}</Title>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Addreservations
              selectedReservation={selectedReservation}
              updateSelectedReservation={updateSelectedReservation}
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                if (isView) {
                  handleCloseModal();
                } else {
                  if (selectedReservation && selectedReservation?.id) {
                    updateReservationToCache(selectedReservation);
                  } else if (selectedReservation) {
                    selectedReservation.id =
                      reservationsSubject.getValue().length + 1;
                    addReservationToCache(selectedReservation);
                  }
                  handleCloseModal();
                }
              }}
            >
              {dialogActionButtonText}
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </Container>
  );
};

export default Content;

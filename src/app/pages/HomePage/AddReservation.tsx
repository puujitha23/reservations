import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Chip,
  Switch,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import DatePickerInput from 'app/components/DatePicker/Datepicker';
import { Reservation } from 'types/Reservation';
import ValidationTextFields from 'app/components/TextField/Textfield';
import styled from 'styled-components';
interface AddReservationProps {
  selectedReservation: Reservation | null;
  updateSelectedReservation: Function;
}

const ControlledSwitch = styled(Switch)`
  color: ${p => p.theme.primary};
`;

const Addreservations: React.FC<AddReservationProps> = props => {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    // Check if dateOfArrival is greater than dateOfDeparture
    if (
      reservation?.stay?.arrivalDate &&
      reservation?.stay?.departureDate &&
      reservation?.stay?.arrivalDate > reservation?.stay?.departureDate
    ) {
      setDateError(
        'Date of Arrival should be less than or equal to Date of Departure',
      );
    } else {
      setDateError('');
    }
  }, [reservation?.stay?.arrivalDate, reservation?.stay?.departureDate]);

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = { ...reservation, payment: event.target.value };
    setReservation({ ...updatedValue });
  };

  const handlePersonalNoteChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setReservation({
      ...reservation,
      note: event.target.value,
    });
    // setPersonalNote(event.target.value);
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (
      tagInput.trim() !== '' &&
      reservation?.tags &&
      !reservation.tags.includes(tagInput.trim())
    ) {
      setReservation({
        ...reservation,
        tags: [...reservation.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setReservation({
      ...reservation,
      tags:
        reservation?.tags &&
        reservation.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleSendReminderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setReservation({ ...reservation, reminder: event.target.checked });
    // setSendReminder(event.target.checked);
  };

  const handleSubscribeNewsletterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setReservation({ ...reservation, newsletter: event.target.checked });
    // setSubscribeNewsletter(event.target.checked);
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const words = event.target.value.split(' ');
    const firstName = words.slice(0, 25).join(' ');
    setReservation({ ...reservation, firstName });
    // setFirstName(firstName);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const words = event.target.value.split(' ');
    const lastName = words.slice(0, 25).join(' ');
    setReservation({ ...reservation, lastName });
    // setLastName(lastName);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReservation({ ...reservation, email: event.target.value });
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // Basic validation to allow only numeric values and limit the length to 15 characters
    const phoneNumber = event.target.value.replace(/\D/g, '').slice(0, 15);
    setPhoneNumber(phoneNumber);
    setReservation({ ...reservation, phone: parseInt(phoneNumber) });
  };

  const handleStreetNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setReservation({
      ...reservation,
      addressStreet: {
        ...reservation?.addressStreet,
        streetName: event.target.value,
      },
    });
    // setStreetName(event.target.value);
  };

  const handleRoomQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setReservation({
      ...reservation,
      room: {
        ...reservation?.room,
        roomQuantity: parseInt(event.target.value),
      },
    });
    // setStreetName(event.target.value);
  };

  const handleRoomSizeChange = (event: SelectChangeEvent) => {
    setReservation({
      ...reservation,
      room: {
        ...reservation?.room,
        roomSize: event.target.value,
      },
    });
    // setStreetName(event.target.value);
  };

  const handleStreetNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setReservation({
      ...reservation,
      addressStreet: {
        ...reservation?.addressStreet,
        streetNumber: event.target.value,
      },
    });
    // setStreetNumber(event.target.value);
  };

  const handleDateOfArrivalChange = (newValue: Date | null) => {
    setReservation({
      ...reservation,
      stay: { ...reservation?.stay, arrivalDate: newValue?.toISOString() },
    });
    // setDateOfArrival(newValue);
  };

  const handleDateOfDepartureChange = (newValue: Date | null) => {
    setReservation({
      ...reservation,
      stay: { ...reservation?.stay, departureDate: newValue?.toISOString() },
    });
    // setDateOfDeparture(newValue);
  };

  useEffect(() => {
    if (props.selectedReservation) {
      setReservation({ ...props.selectedReservation });
      setEmail(props.selectedReservation.email || '');
      setPhoneNumber(props.selectedReservation.phone?.toString() || '');
    }
  }, [props.selectedReservation]);

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReservation({
      ...reservation,
      addressLocation: {
        ...reservation?.addressLocation,
        zipCode: event.target.value,
      },
    });
    // setStreetNumber(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReservation({
      ...reservation,
      addressLocation: {
        ...reservation?.addressLocation,
        state: event.target.value,
      },
    });
    // setStreetNumber(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReservation({
      ...reservation,
      addressLocation: {
        ...reservation?.addressLocation,
        city: event.target.value,
      },
    });
    // setStreetNumber(event.target.value);
  };

  useEffect(() => {
    props.updateSelectedReservation({ ...reservation });
  }, [reservation]);

  return (
    <Container
      maxWidth="sm"
      style={{ marginRight: 'unset', marginLeft: 'unset' }}
    >
      <Box mt={5}>
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={6}>
            <DatePickerInput
              inputLabel="Date of Arrival"
              inputFormat="dd/MM/yyyy"
              inputValue={reservation?.stay?.arrivalDate}
              onChangeHandler={handleDateOfArrivalChange}
              error={dateError !== ''}
              helperText={dateError}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePickerInput
              inputLabel="Date of Departure"
              fullWidth
              inputFormat="dd/MM/yyyy"
              inputValue={reservation?.stay?.departureDate}
              onChangeHandler={handleDateOfDepartureChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          {/* Room Size */}
          <Grid item xs={6}>
            <FormControl
              fullWidth
              variant="outlined"
              margin="normal"
              sx={{ maxWidth: 140 }}
            >
              <InputLabel sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                Room Size
              </InputLabel>
              <Select
                label="Room Size"
                defaultValue={reservation?.room?.roomSize}
                value={reservation?.room?.roomSize}
                onChange={handleRoomSizeChange}
                variant="standard"
                sx={{ fontSize: '0.9rem', fontWeight: 500 }}
              >
                <MenuItem value="business-suite" sx={{ fontSize: '0.9rem' }}>
                  Business Suite
                </MenuItem>
                <MenuItem
                  value="presidential-suite"
                  sx={{ fontSize: '0.9rem' }}
                >
                  Presidential Suite
                </MenuItem>
              </Select>
              <FormHelperText>Select Room Size</FormHelperText>
            </FormControl>
          </Grid>

          {/* Room Quantity */}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <ValidationTextFields
                inputLabel="Room Size"
                inputValue={reservation?.room?.roomQuantity}
                onChangeHandler={handleRoomQuantityChange}
                error={
                  reservation?.room?.roomQuantity &&
                  reservation.room.roomQuantity <= 5
                    ? false
                    : true
                }
                helperText={'Maximum 5'}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={6}>
            <ValidationTextFields
              inputLabel="First Name"
              inputValue={reservation?.firstName}
              onChangeHandler={handleFirstNameChange}
              children={
                <Typography variant="body2" color="textSecondary">
                  {reservation?.firstName &&
                    reservation.firstName.split(' ').length}{' '}
                  / 25 words
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={6}>
            <ValidationTextFields
              inputLabel="Last Name"
              inputValue={reservation?.lastName}
              onChangeHandler={handleLastNameChange}
              children={
                <Typography variant="body2" color="textSecondary">
                  {reservation?.lastName &&
                    reservation.lastName.split(' ').length}{' '}
                  / 25 words
                </Typography>
              }
            />
          </Grid>
        </Grid>

        <Grid container style={{ marginBottom: '20px' }}>
          <Grid item>
            <ValidationTextFields
              inputLabel="Email"
              inputValue={email}
              onChangeHandler={handleEmailChange}
              error={!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}
              helperText={
                !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
                  ? 'Invalid email address'
                  : ''
              }
            />
          </Grid>
        </Grid>

        <Grid container style={{ marginBottom: '20px' }}>
          <Grid item>
            <ValidationTextFields
              inputLabel="Phone Number"
              inputValue={phoneNumber}
              onChangeHandler={handlePhoneNumberChange}
              error={!/^\d{1,15}$/.test(phoneNumber)}
              helperText={
                !/^\d{1,15}$/.test(phoneNumber)
                  ? 'Add the country code first'
                  : ''
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={6}>
            <ValidationTextFields
              inputLabel="Street Name"
              inputValue={reservation?.addressStreet?.streetName}
              onChangeHandler={handleStreetNameChange}
            />
          </Grid>
          <Grid item xs={6}>
            <ValidationTextFields
              inputLabel="Street Number"
              inputValue={reservation?.addressStreet?.streetNumber}
              onChangeHandler={handleStreetNumberChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={4}>
            <ValidationTextFields
              inputLabel="Zip"
              inputValue={reservation?.addressLocation?.zipCode}
              onChangeHandler={handleZipCodeChange}
            />
          </Grid>
          <Grid item xs={4}>
            <ValidationTextFields
              inputLabel="State"
              inputValue={reservation?.addressLocation?.state}
              onChangeHandler={handleStateChange}
            />
          </Grid>
          <Grid item xs={4}>
            <ValidationTextFields
              inputLabel="City"
              inputValue={reservation?.addressLocation?.city}
              onChangeHandler={handleCityChange}
            />
          </Grid>
        </Grid>

        {/* Payment Method */}
        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">Payment Method</FormLabel>
          <RadioGroup
            row
            value={reservation?.payment}
            onChange={handlePaymentChange}
          >
            <FormControlLabel
              value="creditCard"
              control={<Radio />}
              label="Credit Card"
            />
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label="PayPal"
            />
            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
            <FormControlLabel
              value="bitcoin"
              control={<Radio />}
              label="Bitcoin"
            />
          </RadioGroup>
        </FormControl>

        {/* Personal Note */}
        <ValidationTextFields
          inputLabel="Personal Note"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          value={reservation?.note}
          onChangeHandler={handlePersonalNoteChange}
        />

        {/* Tags as Chips */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <ValidationTextFields
            inputLabel={'Tags'}
            inputValue={tagInput}
            onChangeHandler={handleTagInputChange}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleAddTag();
              }
            }}
          />
        </FormControl>
        <Box mt={1}>
          {reservation?.tags &&
            reservation.tags.map(tag => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                style={{ margin: 4 }}
              />
            ))}
        </Box>

        {/* Toggle buttons */}
        <FormControlLabel
          control={
            <ControlledSwitch
              checked={reservation?.reminder}
              onChange={handleSendReminderChange}
            />
          }
          label="Send me a reminder"
        />
        <FormControlLabel
          control={
            <ControlledSwitch
              checked={reservation?.newsletter}
              onChange={handleSubscribeNewsletterChange}
            />
          }
          label="Subscribe to newsletter"
        />
      </Box>
    </Container>
  );
};

export default Addreservations;

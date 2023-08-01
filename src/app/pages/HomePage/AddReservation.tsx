import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
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
} from '@mui/material';
import DatePickerInput from 'app/components/DatePicker/Datepicker';

const Addreservations: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [personalNote, setPersonalNote] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [sendReminder, setSendReminder] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [dateOfArrival, setDateOfArrival] = useState<Date | null>(null);
  const [dateOfDeparture, setDateOfDeparture] = useState<Date | null>(null);
  const [dateError, setDateError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted!');
  };

  useEffect(() => {
    // Check if dateOfArrival is greater than dateOfDeparture
    if (dateOfArrival && dateOfDeparture && dateOfArrival > dateOfDeparture) {
      setDateError(
        'Date of Arrival should be less than or equal to Date of Departure',
      );
    } else {
      setDateError('');
    }
  }, [dateOfArrival, dateOfDeparture]);

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handlePersonalNoteChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPersonalNote(event.target.value);
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSendReminderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSendReminder(event.target.checked);
  };

  const handleSubscribeNewsletterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSubscribeNewsletter(event.target.checked);
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const words = event.target.value.split(' ');
    const firstName = words.slice(0, 25).join(' ');
    setFirstName(firstName);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const words = event.target.value.split(' ');
    const lastName = words.slice(0, 25).join(' ');
    setLastName(lastName);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // Basic validation to allow only numeric values and limit the length to 15 characters
    const phoneNumber = event.target.value.replace(/\D/g, '').slice(0, 15);
    setPhoneNumber(phoneNumber);
  };

  const handleStreetNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStreetName(event.target.value);
  };

  const handleStreetNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStreetNumber(event.target.value);
  };

  const handleDateOfArrivalChange = (newValue: Date | null) => {
    setDateOfArrival(newValue);
  };

  const handleDateOfDepartureChange = (newValue: Date | null) => {
    setDateOfDeparture(newValue);
  };

  return (
    <Container
      maxWidth="sm"
      style={{ marginRight: 'unset', marginLeft: 'unset' }}
    >
      <Box mt={5}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DatePickerInput
                label="Date of Arrival"
                inputFormat="dd/MM/yyyy"
                value={dateOfArrival}
                onChange={handleDateOfArrivalChange}
                error={dateError !== ''}
                helperText={dateError}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePickerInput
                label="Date of Departure"
                fullWidth
                inputFormat="dd/MM/yyyy"
                value={dateOfDeparture}
                onChange={handleDateOfDepartureChange}
                renderInput={params => <TextField {...params} />}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <Typography variant="body2" color="textSecondary">
                {firstName.split(' ').length} / 25 words
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                fullWidth
                variant="outlined"
                margin="normal"
                value={lastName}
                onChange={handleLastNameChange}
              />
              <Typography variant="body2" color="textSecondary">
                {lastName.split(' ').length} / 25 words
              </Typography>
            </Grid>
          </Grid>

          <TextField
            label="Email"
            value={email}
            onChange={handleEmailChange}
            error={!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}
            helperText={
              !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
                ? 'Invalid email address'
                : ''
            }
          />

          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            error={!/^\d{1,15}$/.test(phoneNumber)}
            helperText={
              !/^\d{1,15}$/.test(phoneNumber)
                ? 'Add the country code first'
                : ''
            }
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Street Name"
                value={streetName}
                onChange={handleStreetNameChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Street Number"
                value={streetNumber}
                onChange={handleStreetNumberChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {/* Room Size */}
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Room Size</InputLabel>
                <Select label="Room Size">
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="double">Double</MenuItem>
                  <MenuItem value="family">Family</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Room Quantity */}
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Room Quantity</InputLabel>
                <Select label="Room Quantity">
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Payment Method */}
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">Payment Method</FormLabel>
            <RadioGroup
              row
              value={paymentMethod}
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
          <TextField
            label="Personal Note"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            value={personalNote}
            onChange={handlePersonalNoteChange}
          />

          {/* Tags as Chips */}
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Tags</InputLabel>
            <TextField
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  handleAddTag();
                }
              }}
            />
          </FormControl>
          <Box mt={1}>
            {tags.map(tag => (
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
              <Switch
                checked={sendReminder}
                onChange={handleSendReminderChange}
              />
            }
            label="Send me a reminder"
          />
          <FormControlLabel
            control={
              <Switch
                checked={subscribeNewsletter}
                onChange={handleSubscribeNewsletterChange}
              />
            }
            label="Subscribe to newsletter"
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Addreservations;

import { Reservation } from 'types/Reservation';

export const reservations: Reservation[] = [
  {
    id: 1,
    stay: {
      arrivalDate: '2021-11-18T05:00:00.000Z',
      departureDate: '2021-11-25T05:00:00.000Z',
    },
    room: {
      roomSize: 'business-suite',
      roomQuantity: 3,
    },
    firstName: 'IDM',
    lastName: 'ENG',
    email: 'idm.test@idm.com',
    phone: 9999999999,
    addressStreet: {
      streetName: 'IDM Street',
      streetNumber: '1234',
    },
    addressLocation: {
      zipCode: '123456',
      state: 'Arizona',
      city: 'OAKVILLE',
    },
    extras: [
      'extraBreakfast',
      'extraTV',
      'extraWiFi',
      'extraParking',
      'extraBalcony',
    ],
    payment: 'creditCard',
    note: 'idm lab test',
    tags: ['hotel', 'booking', 'labtest'],
    reminder: true,
    newsletter: true,
    confirm: false,
  },
  {
    id: 2,
    stay: {
      arrivalDate: '2021-11-01T04:00:00.000Z',
      departureDate: '2021-11-04T04:00:00.000Z',
    },
    room: {
      roomSize: 'presidential-suite',
      roomQuantity: 2,
    },
    firstName: 'IDM',
    lastName: 'PM',
    email: 'idm.op@idm.com',
    phone: 123456789,
    addressStreet: {
      streetName: 'IDM',
      streetNumber: '1234',
    },
    addressLocation: {
      zipCode: '123456',
      state: 'Arkansas',
      city: 'OAK',
    },
    extras: ['extraParking', 'extraBalcony'],
    payment: 'cash',
    note: 'lab test',
    tags: ['angular', 'material', 'labtest'],
    reminder: true,
    newsletter: false,
    confirm: true,
  },
  {
    id: 3,
    stay: {
      arrivalDate: '2021-11-01T04:00:00.000Z',
      departureDate: '2021-11-04T04:00:00.000Z',
    },
    room: {
      roomSize: 'presidential-suite',
      roomQuantity: 2,
    },
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: 123456789,
    addressStreet: {
      streetName: 'IDM',
      streetNumber: '1234',
    },
    addressLocation: {
      zipCode: '123456',
      state: 'Arkansas',
      city: 'OAK',
    },
    extras: ['extraParking', 'extraBalcony'],
    payment: 'cash',
    note: 'lab test',
    tags: ['angular', 'material', 'labtest'],
    reminder: true,
    newsletter: false,
    confirm: true,
  },
];

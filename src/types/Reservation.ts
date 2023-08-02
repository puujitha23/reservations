export interface Reservation {
  id?: number;
  stay?: Stay;
  room?: Room;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: number;
  addressStreet?: Address;
  addressLocation?: AddressLocation;
  extras?: string[];
  payment?: string;
  note?: string;
  tags?: string[];
  reminder?: boolean;
  newsletter?: boolean;
  confirm?: boolean;
}

interface Stay {
  arrivalDate?: string;
  departureDate?: string;
}

interface Room {
  roomSize?: string;
  roomQuantity?: number;
}

interface Address {
  streetName?: string;
  streetNumber?: string;
}
interface AddressLocation {
  zipCode?: string;
  state?: string;
  city?: string;
}

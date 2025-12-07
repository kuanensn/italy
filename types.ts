export enum ItineraryType {
  ATTRACTION = 'ATTRACTION',
  RESTAURANT = 'RESTAURANT',
  TRANSPORT = 'TRANSPORT',
}

export interface ItineraryItem {
  id: string;
  type: ItineraryType;
  time: string;
  name: string;
  location: string;
  description: string;
  // Guide specific fields
  mustEat?: string[];
  mustBuy?: string[];
  tips?: string[];
  reservationCode?: string;
  externalLinks?: { label: string; url: string }[];
}

export interface DayPlan {
  day: number;
  date?: string; // e.g., "12/21"
  location: string;
  weather: {
    temp: string;
    condition: string;
    icon: string; // emoji
  };
  items: ItineraryItem[];
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  days: DayPlan[];
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  currency: string;
  category: 'FOOD' | 'TRANSPORT' | 'SHOPPING' | 'STAY' | 'OTHER';
  paidBy: 'ME' | 'GROUP';
}

export interface Flight {
  airline: string;
  flightNumber: string;
  departureTime: string;
  origin: string;
  destination: string;
  date: string;
  notes?: string;
}

export interface Accommodation {
  name: string;
  address: string;
  checkIn: string;
}

export interface TravelEssentials {
  flights: Flight[];
  accommodation: Accommodation[];
  emergencyContacts: { name: string; number: string }[];
}
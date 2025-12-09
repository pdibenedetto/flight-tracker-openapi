
export interface Flight {
  icao24: string;           // Unique transponder code, primary key
  callsign: string;         // Flight number (e.g. "UAL123")   
  latitude: number;
  longitude: number;
  altitude: number;         // in meters
  velocity: number;         // in m/s
  heading: number;
}

export interface FlightListProps {
    flights: Flight[];
    onFlightSelect: (icao24: string) => void;
    selectedFlightIcao?: string | null;
}
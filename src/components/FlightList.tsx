import type { FlightListProps } from "../types";

function FlightList({ flights }: FlightListProps) {
  return (
    <aside className="flight-sidebar">
      <h3>Active Flights ({flights.length})</h3>
      <ul>
        {flights.map((flight) => (
          <li key={flight.icao24}>{flight.callsign || "N/A"}</li>
        ))}
      </ul>
    </aside>
  );
}

export default FlightList;

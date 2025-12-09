import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Flight } from "../types";
import FlightMarker from "./FlightMarker";

interface MapComponentProps {
  flights: Flight[];
  selectedFlightIcao?: string | null;
}

function MapComponent({ flights, selectedFlightIcao }: MapComponentProps) {
  const initialPosition: [number, number] = [42.36, -71.06]; // 
  const initialZoom: number = 9;

  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <MapContainer
        center={initialPosition}
        zoom={initialZoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {flights.map((flight) => (
          <FlightMarker 
            key={flight.icao24}
            flight={flight}
            isSelected={flight.icao24 === selectedFlightIcao}
            >
              <Popup>
                **Callsign:** {flight.callsign}
                <br />
                **Altitude:** {Math.round(flight.altitude * 328084)} ft
                <br />
                **Speed:** {Math.round(flight.velocity * 1.94384)} knots                
              </Popup>
            </FlightMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;

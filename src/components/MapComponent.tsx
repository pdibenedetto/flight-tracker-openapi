import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Flight } from "../types";
import L from "leaflet";

interface MapComponentProps {
  flights: Flight[];
}

const planeIcon = L.icon({
  iconUrl: 'https://www.shutterstock.com/shutterstock/photos/1974284840/display_1500/stock-vector-transparent-plane-icon-png-vector-illustration-of-an-plane-icon-in-dark-color-and-transparent-1974284840.jpg',
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [0, -10],
})

function MapComponent({ flights }: MapComponentProps) {
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
          <Marker 
            key={flight.icao24}
            position={[flight.latitude, flight.longitude]}
            icon={planeIcon}
            >
              <Popup>
                **Callsign:** {flight.callsign}
                <br />
                **Altitude:** {Math.round(flight.altitude * 328084)} ft
                <br />
                **Speed:** {Math.round(flight.velocity * 1.94384)} knots                
              </Popup>
            </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;

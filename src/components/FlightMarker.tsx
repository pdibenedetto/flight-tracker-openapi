import { Marker, Popup } from "react-leaflet";
import type { Flight } from "../types";
import L from "leaflet";

interface FlightMarkerProps {
  flight: Flight;
  isSelected: boolean;
}

const baseIcon = L.icon({
  iconUrl: 'https://www.shutterstock.com/shutterstock/photos/1974284840/display_1500/stock-vector-transparent-plane-icon-png-vector-illustration-of-an-plane-icon-in-dark-color-and-transparent-1974284840.jpg',
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [0, -10],
  className: 'plane-icon',
});

function FlightMarker({ flight, isSelected }: FlightMarkerProps) {

    const rotatedIcon = L.divIcon({
        html: `<div style="transform: rotate(${flight.heading}deg);">${baseIcon.createIcon().outerHTML}</div>`,
        iconSize: baseIcon.options.iconSize as L.PointExpression,
        iconAnchor: baseIcon.options.iconAnchor as L.PointExpression,
        popupAnchor: baseIcon.options.popupAnchor as L.PointExpression,
        className: isSelected ? 'selected-plane-icon' : baseIcon.options.className || '',
    });

    const altitudeFeet = Math.round(flight.altitude * 3.28084);
    const speedKnots = Math.round(flight.velocity * 1.94384);

    return (
        <Marker
            key={flight.icao24}
            position={[flight.latitude, flight.longitude]}
            icon={rotatedIcon}>
            <Popup>
                <strong>Callsign:</strong> {flight.callsign}
                <br />
                <strong>Altitude:</strong> {altitudeFeet} ft
                <br />
                <strong>Speed:</strong> {speedKnots} knots
                <br />
                <strong>Heading:</strong> {Math.round(flight.heading)} degrees
            </Popup>
        </Marker>
    );
}

export default FlightMarker;
import { useEffect, useState } from "react";
import type { Flight } from "../types";
import MapComponent from "./MapComponent";
import FlightList from "./FlightList";
import { convertOpenSkyData } from "../utils/data-conversion";

const MOCK_FLIGHTS: Flight[] = [
  {
    icao24: "a1b2c3",
    callsign: "UAL987",
    latitude: 40.7,
    longitude: -74.0,
    altitude: 10000,
    velocity: 250,
  },
  {
    icao24: "d4e5f6",
    callsign: "AAL123",
    latitude: 34.0,
    longitude: -118.2,
    altitude: 8500,
    velocity: 200,
  },
];

function FlightTracker() {
  const [flights, setFlights] = useState<Flight[]>(MOCK_FLIGHTS);
  const [selectedFlightIcao, setSelectedFlightIcao] = useState<string | null>(null);

  const BBOX_URL_PRAMS = "lamin=40.86&lomin=-73.56&lamax=43.86&lomax=-68.56";
  const API_URL = `https://opensky-network.org/api/states/all?${BBOX_URL_PRAMS}`;

  const fetchFlightData = async () => {
    console.log(`[${new Date().toLocaleTimeString()}] Fetching live data...`);
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const cleanFlights = convertOpenSkyData(data);

      setFlights(cleanFlights);
    } catch (error) {
      console.error("Failed to fetch flight data:", error);
    }
  };

  // API -> useEffect -> state -> props -> {MapComponent, FLightList>}

  useEffect(() => {
    fetchFlightData();

    const intervalId = setInterval(fetchFlightData, 30000);

    return () => {
      console.log("Clearing interval...");
      clearInterval(intervalId);
    };
  }, []);

  function handleFlightSelect(icao24: string): void {
    setSelectedFlightIcao(icao24);
  }

  return (
    <main className="tracker-layout">      
      <MapComponent 
        flights={flights} 
        selectedFlightIcao={selectedFlightIcao}
      />
      <FlightList 
        flights={flights}
        selectedFlightIcao={selectedFlightIcao}
        onFlightSelect={handleFlightSelect}
      />
    </main>
  );
}
export default FlightTracker;

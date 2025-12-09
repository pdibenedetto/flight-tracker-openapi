/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Flight } from "../types";

const TRUE_TRACK_INDEX = 10;

export function convertOpenSkyData(data: any): Flight[] {

    // [0] = icao24
    // [1] = callsign
    // [5] = longitude
    // [6] = latitude
    // [9] = velocity
    // [13] = altitude

    const LONGITUDE_INDEX = 5;
    const LATITUDE_INDEX = 6;
    const ICAO24_INDEX = 0;
    const CALLSIGN_INDEX = 1;
    const VELOCITY_INDEX = 9;
    const ALTITUDE_INDEX = 13;

    if (!data || !data.states) return [];

    return data
            .states
            .map((stateVector: any[]): Flight | null => {
                if (stateVector[LATITUDE_INDEX] === null || 
                    stateVector[LONGITUDE_INDEX] === null) {
                
                    return null;
                }
                return {
                    icao24: stateVector[ICAO24_INDEX],
                    callsign: stateVector[CALLSIGN_INDEX]?.trim() || 'N/A',
                    latitude: stateVector[LATITUDE_INDEX],
                    longitude: stateVector[LONGITUDE_INDEX],
                    altitude: stateVector[ALTITUDE_INDEX] || 0,
                    velocity: stateVector[VELOCITY_INDEX] || 0,
                    heading: stateVector[TRUE_TRACK_INDEX] || 0,
                };
            })
            .filter((flight: Flight | null): flight is Flight => flight !== null);      
};

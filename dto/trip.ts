import type {StationDTO} from './location.js';
import type {LineDTO} from './line.js';
import type {StopoverDTO} from './journey.js';
import type {FeatureCollectionDTO} from './journey.js';

export interface TripDTO {
	id: string;
	origin: StationDTO | null;
	destination: StationDTO | null;
	departure: string | null;
	plannedDeparture: string | null;
	departureDelay: number | null;
	arrival: string | null;
	plannedArrival: string | null;
	arrivalDelay: number | null;
	line?: LineDTO | null;
	direction?: string | null;
	stopovers?: StopoverDTO[];
	scheduledDays?: Record<string, boolean>;
	cancelled?: boolean;
}

export interface MovementDTO {
	direction: string | null;
	tripId: string | null;
	line: LineDTO | null;
	location: {latitude: number; longitude: number} | null;
	nextStopovers: StopoverDTO[];
	frames: Array<{
		origin: StationDTO | null;
		destination: StationDTO | null;
		t: number;
	}>;
	polyline?: FeatureCollectionDTO | null;
}

import type {Station} from './location.js';
import type {Line} from './line.js';
import type {Stopover} from './journey.js';
import type {FeatureCollection} from './journey.js';

export interface Trip {
	id: string;
	origin: Station | null;
	destination: Station | null;
	departure: string | null;
	plannedDeparture: string | null;
	departureDelay: number | null;
	arrival: string | null;
	plannedArrival: string | null;
	arrivalDelay: number | null;
	line?: Line | null;
	direction?: string | null;
	stopovers?: Stopover[];
	scheduledDays?: Record<string, boolean>;
	cancelled?: boolean;
	canceled?: boolean;
}

export interface Movement {
	direction: string | null;
	tripId: string | null;
	line: Line | null;
	location: {type: 'location'; latitude: number; longitude: number} | null;
	nextStopovers: Stopover[];
	frames: Array<{
		origin: Station | null;
		destination: Station | null;
		t: number;
	}>;
	polyline?: FeatureCollection | null;
}

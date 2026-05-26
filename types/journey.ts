import type {Station} from './location.js';
import type {Line} from './line.js';
import type {Remark} from './remark.js';

export interface Stopover {
	stop: Station | null;
	arrival: string | null;
	plannedArrival: string | null;
	arrivalDelay: number | null;
	arrivalPlatform: string | null;
	arrivalPrognosisType: string | null;
	plannedArrivalPlatform: string | null;
	departure: string | null;
	plannedDeparture: string | null;
	departureDelay: number | null;
	departurePlatform: string | null;
	departurePrognosisType: string | null;
	plannedDeparturePlatform: string | null;
	prognosedArrival?: string;
	prognosedArrivalPlatform?: string;
	prognosedDeparture?: string;
	prognosedDeparturePlatform?: string;
	passBy?: boolean;
	cancelled?: boolean;
	canceled?: boolean;
	additional?: boolean;
	remarks?: Remark[];
}

export interface JourneyLeg {
	origin: Station | null;
	destination: Station | null;
	departure: string | null;
	plannedDeparture: string | null;
	departureDelay: number | null;
	prognosedDeparture?: string;
	arrival: string | null;
	plannedArrival: string | null;
	arrivalDelay: number | null;
	prognosedArrival?: string;
	tripId?: string;
	line?: Line | null;
	direction?: string | null;
	walking?: boolean;
	transfer?: boolean;
	checkin?: boolean;
	public?: boolean;
	distance?: number | null;
	reachable?: boolean;
	stopovers?: Stopover[];
	arrivalPlatform?: string | null;
	plannedArrivalPlatform?: string | null;
	prognosedArrivalPlatform?: string | null;
	arrivalPrognosisType?: string | null;
	departurePlatform?: string | null;
	plannedDeparturePlatform?: string | null;
	prognosedDeparturePlatform?: string | null;
	departurePrognosisType?: string | null;
	polyline?: FeatureCollection | null;
	currentLocation?: {type: 'location'; latitude: number; longitude: number};
	cancelled?: boolean;
	canceled?: boolean;
	cycle?: {min: number; max: number; nr?: number};
	alternatives?: Array<{tripId: string; line: Line | null; direction: string | null; when: string | null; plannedWhen: string | null; delay: number | null}>;
	remarks?: Remark[];
	// DB-specific
	loadFactor?: string;
	price?: {amount: number; currency: string; hint: string | null};
	tickets?: Record<string, unknown>[];
}

export interface Journey {
	type: 'journey';
	legs: JourneyLeg[];
	refreshToken: string | null;
	cycle?: {min: number; max: number; nr?: number};
	remarks?: Remark[];
	scheduledDays?: Record<string, boolean>;
	// DB-specific
	price?: {amount: number; currency: string; hint: string | null};
	tickets?: Record<string, unknown>[];
}

export interface FeatureCollection {
	type: 'FeatureCollection';
	features: Array<{
		type: 'Feature';
		properties: Record<string, unknown>;
		geometry: {type: 'Point'; coordinates: [number, number]};
	}>;
}

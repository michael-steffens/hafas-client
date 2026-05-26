import type {StationDTO} from './location.js';
import type {LineDTO} from './line.js';
import type {RemarkDTO} from './remark.js';

export interface StopoverDTO {
	stop: StationDTO | null;
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
	additional?: boolean;
	remarks?: RemarkDTO[];
}

export interface JourneyLegDTO {
	origin: StationDTO | null;
	destination: StationDTO | null;
	departure: string | null;
	plannedDeparture: string | null;
	departureDelay: number | null;
	prognosedDeparture?: string;
	arrival: string | null;
	plannedArrival: string | null;
	arrivalDelay: number | null;
	prognosedArrival?: string;
	tripId?: string;
	line?: LineDTO | null;
	direction?: string | null;
	walking?: boolean;
	transfer?: boolean;
	checkin?: boolean;
	public?: boolean;
	distance?: number | null;
	reachable?: boolean;
	stopovers?: StopoverDTO[];
	arrivalPlatform?: string | null;
	plannedArrivalPlatform?: string | null;
	prognosedArrivalPlatform?: string | null;
	arrivalPrognosisType?: string | null;
	departurePlatform?: string | null;
	plannedDeparturePlatform?: string | null;
	prognosedDeparturePlatform?: string | null;
	departurePrognosisType?: string | null;
	polyline?: FeatureCollectionDTO | null;
	currentLocation?: {latitude: number; longitude: number};
	cancelled?: boolean;
	cycle?: {min: number; max: number; nr?: number};
	alternatives?: Array<{tripId: string; line: LineDTO | null; direction: string | null; when: string | null; plannedWhen: string | null; delay: number | null}>;
	remarks?: RemarkDTO[];
	loadFactor?: string;
	price?: {amount: number; currency: string; hint: string | null};
	tickets?: Record<string, unknown>[];
}

export interface JourneyDTO {
	legs: JourneyLegDTO[];
	refreshToken: string | null;
	cycle?: {min: number; max: number; nr?: number};
	remarks?: RemarkDTO[];
	scheduledDays?: Record<string, boolean>;
	price?: {amount: number; currency: string; hint: string | null};
	tickets?: Record<string, unknown>[];
}

export interface FeatureCollectionDTO {
	type: 'FeatureCollection';
	features: Array<{
		type: 'Feature';
		properties: Record<string, unknown>;
		geometry: {type: 'Point'; coordinates: [number, number]};
	}>;
}

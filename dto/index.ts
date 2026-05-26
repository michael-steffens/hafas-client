import type {DepartureDTO} from './departure.js';
import type {ArrivalDTO} from './departure.js';
import type {JourneyDTO} from './journey.js';
import type {JourneyLegDTO} from './journey.js';
import type {StopoverDTO} from './journey.js';
import type {FeatureCollectionDTO} from './journey.js';
import type {StationDTO} from './location.js';
import type {AddressDTO} from './location.js';
import type {POIDTO} from './location.js';
import type {CoordinatesDTO} from './location.js';
import type {ParsedLocationDTO} from './location.js';
import type {LineDTO} from './line.js';
import type {OperatorDTO} from './line.js';
import type {TripDTO} from './trip.js';
import type {MovementDTO} from './trip.js';
import type {HintDTO} from './remark.js';
import type {WarningDTO} from './remark.js';
import type {RemarkDTO} from './remark.js';

export interface DeparturesResponse {
	departures: DepartureDTO[];
	realtimeDataUpdatedAt: number | null;
}

export interface ArrivalsResponse {
	arrivals: ArrivalDTO[];
	realtimeDataUpdatedAt: number | null;
}

export interface JourneysResponse {
	earlierRef: string | null;
	laterRef: string | null;
	journeys: JourneyDTO[];
	realtimeDataUpdatedAt: number | null;
}

export interface RefreshJourneyResponse {
	journey: JourneyDTO;
	realtimeDataUpdatedAt: number | null;
}

export interface JourneysFromTripResponse {
	journeys: JourneyDTO[];
	realtimeDataUpdatedAt: number | null;
}

export interface TripResponse {
	trip: TripDTO;
	realtimeDataUpdatedAt: number | null;
}

export interface TripsByNameResponse {
	trips: TripDTO[];
	realtimeDataUpdatedAt: number | null;
}

export interface RadarResponse {
	movements: MovementDTO[];
	realtimeDataUpdatedAt: number | null;
}

export interface RemarksResponse {
	remarks: WarningDTO[];
	realtimeDataUpdatedAt: number | null;
}

export interface LinesResponse {
	lines: LineSearchResultDTO[];
	realtimeDataUpdatedAt: number | null;
}

export interface LineSearchResultDTO {
	id: string | null;
	directions: string[] | null;
	trips: TripDTO[] | null;
	[name: string]: unknown;
}

export interface ReachableFromResponse {
	reachable: Array<{duration: number; stations: StationDTO[]}>;
	realtimeDataUpdatedAt: number | null;
}

export interface ServerInfoResponse {
	hciVersion: string | null;
	timetableStart: string | null;
	timetableEnd: string | null;
	serverTime: string | number | null;
	realtimeDataUpdatedAt: number | null;
}

export {
	DepartureDTO,
	ArrivalDTO,
	JourneyDTO,
	JourneyLegDTO,
	StopoverDTO,
	FeatureCollectionDTO,
	StationDTO,
	AddressDTO,
	POIDTO,
	CoordinatesDTO,
	ParsedLocationDTO,
	LineDTO,
	OperatorDTO,
	TripDTO,
	MovementDTO,
	HintDTO,
	WarningDTO,
	RemarkDTO,
};

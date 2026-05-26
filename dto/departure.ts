import type {StationDTO} from './location.js';
import type {LineDTO} from './line.js';
import type {StopoverDTO} from './journey.js';
import type {RemarkDTO} from './remark.js';

export interface DepartureDTO {
	tripId: string;
	stop: StationDTO | null;
	when: string | null;
	plannedWhen: string | null;
	delay: number | null;
	prognosedWhen?: string;
	platform: string | null;
	plannedPlatform: string | null;
	prognosedPlatform?: string;
	prognosisType: string | null;
	direction: string | null;
	line: LineDTO | null;
	remarks: RemarkDTO[];
	origin?: StationDTO | null;
	destination?: StationDTO | null;
	currentTripPosition?: {latitude: number; longitude: number};
	cancelled?: boolean;
	nextStopovers?: StopoverDTO[];
	loadFactor?: string;
	occupancy?: string;
}

export interface ArrivalDTO {
	tripId: string;
	stop: StationDTO | null;
	when: string | null;
	plannedWhen: string | null;
	delay: number | null;
	prognosedWhen?: string;
	platform: string | null;
	plannedPlatform: string | null;
	prognosedPlatform?: string;
	prognosisType: string | null;
	provenance: string | null;
	line: LineDTO | null;
	remarks: RemarkDTO[];
	origin?: StationDTO | null;
	destination?: StationDTO | null;
	currentTripPosition?: {latitude: number; longitude: number};
	cancelled?: boolean;
	previousStopovers?: StopoverDTO[];
	loadFactor?: string;
	occupancy?: string;
}

import type {Station} from './location.js';
import type {Line} from './line.js';
import type {Stopover} from './journey.js';
import type {Remark} from './remark.js';

export interface Departure {
	tripId: string;
	stop: Station | null;
	when: string | null;
	plannedWhen: string | null;
	delay: number | null;
	prognosedWhen?: string;
	platform: string | null;
	plannedPlatform: string | null;
	prognosedPlatform?: string;
	prognosisType: string | null;
	direction: string | null;
	line: Line | null;
	remarks: Remark[];
	origin?: Station | null;
	destination?: Station | null;
	currentTripPosition?: {type: 'location'; latitude: number; longitude: number};
	cancelled?: boolean;
	canceled?: boolean;
	nextStopovers?: Stopover[];
	// DB/BVG-specific
	loadFactor?: string;
	occupancy?: string;
}

export interface Arrival {
	tripId: string;
	stop: Station | null;
	when: string | null;
	plannedWhen: string | null;
	delay: number | null;
	prognosedWhen?: string;
	platform: string | null;
	plannedPlatform: string | null;
	prognosedPlatform?: string;
	prognosisType: string | null;
	provenance: string | null;
	line: Line | null;
	remarks: Remark[];
	origin?: Station | null;
	destination?: Station | null;
	currentTripPosition?: {type: 'location'; latitude: number; longitude: number};
	cancelled?: boolean;
	canceled?: boolean;
	previousStopovers?: Stopover[];
	// DB/BVG-specific
	loadFactor?: string;
	occupancy?: string;
}

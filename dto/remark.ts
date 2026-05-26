import type {LineDTO} from './line.js';
import type {StationDTO} from './location.js';

export interface HintDTO {
	type: string;
	code?: string | null;
	text?: string;
	summary?: string;
	tripId?: string;
}

export interface WarningDTO {
	id: string | null;
	type: string;
	summary: string | null;
	text: string | null;
	priority?: number;
	products?: Record<string, boolean>;
	company?: string | null;
	category?: number;
	categories?: string[];
	affectedLines?: LineDTO[];
	fromStops?: StationDTO[];
	toStops?: StationDTO[];
	validFrom?: string;
	validUntil?: string;
	modified?: string;
}

export type RemarkDTO = HintDTO | WarningDTO;

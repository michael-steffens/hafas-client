import type {Line} from './line.js';
import type {Station} from './location.js';

export interface Hint {
	type: string;
	code?: string | null;
	text?: string;
	summary?: string;
	tripId?: string;
}

export interface Warning {
	id: string | null;
	type: string;
	summary: string | null;
	text: string | null;
	icon: unknown;
	priority?: number;
	products?: Record<string, boolean>;
	company?: string | null;
	category?: number;
	categories?: string[];
	edges?: Array<{icon: unknown; fromLocation: unknown; toLocation: unknown}>;
	events?: Array<{
		fromLocation: unknown;
		toLocation: unknown;
		start: string;
		end: string;
		sections: unknown[];
	}>;
	affectedLines?: Line[];
	fromStops?: Station[];
	toStops?: Station[];
	validFrom?: string;
	validUntil?: string;
	modified?: string;
}

export type Remark = Hint | Warning;
